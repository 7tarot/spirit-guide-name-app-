# Spirit Guide App — Google Sheets Fix Kit

This kit solves the **"back story error"** by giving you a robust Apps Script endpoint and a safe front‑end call.

## 1) Make a Sheet
- Create a Google Sheet named **Spirit Guide Backstories**.
- Copy the Sheet **ID** from the URL (the long string between `/d/` and `/edit`).

## 2) Apps Script Web App
- In the Sheet: **Extensions → Apps Script**.
- Create a file `GSHEETS_WEBAPP.gs` and paste the contents from this repo file.
- (Optional) In `doPost`, set a default Sheet ID via: `PropertiesService.getScriptProperties().setProperty('SHEET_ID','YOUR_SHEET_ID')`
- **Deploy**: `Deploy → Manage deployments → New deployment → Web app`  
  - Execute as: **Me**  
  - Who has access: **Anyone**  
  - Copy the **Web app URL**.

## 3) Front-end
- In your Spirit Guide App, after you generate the **backstory** and **reading**, call `sendBackstoryToSheet(...)` using `client_post_example.js` as your template.
- Add a tiny diagnostics element somewhere in the page:
  ```html
  <div id="sheetDiag" class="small"></div>
  ```
- Replace `YOUR_APPS_SCRIPT_WEBAPP_URL` and `YOUR_SHEET_ID`.

## Common pitfalls
- **Wrong headers** → this script auto-creates the header row `Timestamp, Name, Number, Tone, FinalBase, Reading, Backstory, ClientIP, UserAgent`.
- **Access denied** → Web App must be “Anyone” (or adjust and use OAuth).
- **No JSON** → Make sure your `fetch` has `Content-Type: application/json` and a JSON-encoded body.

— Built for 7 Tarot, 2025-09-08.
