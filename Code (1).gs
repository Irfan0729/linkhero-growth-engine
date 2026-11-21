/**
 * Code.gs — saves lead form submissions to the "Responses" sheet tab.
 *
 * Setup:
 *  1. Open your Google Sheet → Extensions → Apps Script.
 *  2. Paste this file's contents into Code.gs (replace anything there).
 *  3. Deploy → New deployment → type: Web app
 *       - Execute as: Me
 *       - Who has access: Anyone
 *  4. Copy the Web app URL (ends in /exec) and send it back.
 *
 * Optional: if the script is NOT opened from the sheet itself, put the
 * spreadsheet ID between the quotes below. Otherwise leave it empty.
 */

const SPREADSHEET_ID = "";
const SHEET_NAME = "Responses";
const HEADERS = ["Timestamp", "Name", "Email", "Phone"];

function getSpreadsheet_() {
  return SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Returns the "Responses" sheet, creating it with bold headers if missing.
 */
function getResponsesSheet_() {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setValues([HEADERS]);
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * Builds a JSON response.
 */
function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Reads name/email/phone from query params (GET) or form/JSON body (POST).
 */
function readFields_(e) {
  const params = (e && e.parameter) || {};
  let data = {};

  if (e && e.postData && e.postData.contents) {
    try {
      data = JSON.parse(e.postData.contents) || {};
    } catch (err) {
      data = {};
    }
  }

  return {
    name: String(params.name || data.name || "").trim(),
    email: String(params.email || data.email || "").trim(),
    phone: String(params.phone || data.phone || "").trim()
  };
}

/**
 * Appends one row. Uses a lock so simultaneous submissions don't collide.
 */
function saveRow_(fields) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getResponsesSheet_();
    sheet.appendRow([new Date(), fields.name, fields.email, fields.phone]);
  } finally {
    lock.releaseLock();
  }
}

function handleSubmission_(e) {
  try {
    const fields = readFields_(e);

    if (!fields.name || !fields.email || !fields.phone) {
      return jsonOutput_({ success: false, error: "Missing name, email or phone" });
    }

    saveRow_(fields);
    return jsonOutput_({ success: true });
  } catch (err) {
    return jsonOutput_({ success: false, error: String(err) });
  }
}

/**
 * GET handler — used by the website's fetch() call (query params).
 */
function doGet(e) {
  return handleSubmission_(e);
}

/**
 * POST handler — same behaviour as doGet, for flexibility.
 */
function doPost(e) {
  return handleSubmission_(e);
}
