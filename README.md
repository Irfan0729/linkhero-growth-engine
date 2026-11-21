# LinkHero Growth Engine 🚀

## Live Demo
🔗 https://irfan0729.github.io/linkhero-growth-engine/

## About the Project
LinkHero Growth Engine is a responsive landing page designed for a LinkedIn personal branding and growth service.

It helps professionals and business owners explore LinkedIn growth services and request a profile audit.

## Features
- Modern landing page design
- LinkedIn growth service information
- Achievement section
- ₹1 LinkedIn profile audit
- Lead generation form
- Form validation
- Customer testimonials
- Frequently Asked Questions
- Contact information

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Google Apps Script
- Cashfree Payment Integration

## Project Structure
```
linkhero-growth-engine/
├── index.html   # Landing page (HTML, CSS, JavaScript)
├── Code.gs      # Google Apps Script backend for saving form responses
└── README.md    # Project documentation
```

## How to Run
1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in your browser.

## Google Sheets Setup (Form Backend)
The lead form saves submissions to Google Sheets through Google Apps Script.

1. Create a new Google Sheet.
2. Go to **Extensions → Apps Script**.
3. Paste the contents of `Code.gs` into the editor and save.
4. Click **Deploy → New deployment**, choose **Web app**, set:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Copy the Web app URL and paste it into the `SCRIPT_URL` variable in `index.html`.

Submissions will appear in a tab named **Responses** with the columns Timestamp, Name, Email, and Phone.

## Project Type
Frontend Web Development Project

## Developer
Developed by [@irfan0729](https://github.com/irfan0729) with assistance from AI tools and online tutorials.
