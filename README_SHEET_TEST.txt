Sheet Fix — Test Page (No Code Edits)
=====================================
What this is
- A simple page you can upload alongside your app to TEST that your Google Sheet receives a row.
- It does NOT touch your main app or overwrite index.html.

How to use
1) Unzip this bundle.
2) Drag BOTH files/folders into your GitHub repo root:
   - sheet-test.html
   - assets/app.css
3) Commit & Push in GitHub Desktop. Let Netlify deploy.
4) Visit: https://YOUR-SITE.NETLIFY.APP/sheet-test.html
   - Fill the form with a fake entry, click "Send test".
   - Open your Google Sheet — confirm a new row appears.

Result meanings
- "Response: { ok: true }" + a new row in the sheet = your Apps Script URL works.
- If no row: check Apps Script > Deploy > Manage deployments > Web app:
  - Who has access: Anyone (or Anyone with the link)
  - Use the URL that ends with /exec
  Then try again.

Next step
- If this works and you want your MAIN app to submit to the same URL,
  say "make the Main App Sheet Fix zip", and I will generate a drag-and-drop
  replacement that points your existing form to the correct URL automatically.
