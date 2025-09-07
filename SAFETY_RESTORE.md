# SAFETY_RESTORE

This bundle restores your **Spirit Guide App** homepage and keeps **Synchronicity Reader** as a separate page.

## Files
- `index.html` — your main Spirit Guide App (restores the homepage).
- `synchronicity.html` — Synchronicity Reader (v4.5.0 Variation Packs).
- `health.txt` — quick deploy check (should show "OK 2025-09-07").

## Install (drag + drop)
1) Open your repo in GitHub Desktop.
2) Drag **all files** from this zip into the **root** of the repo (the top level, NOT inside any subfolder).
   - If prompted, click **Replace** for `index.html`.
3) Commit → Push.
4) Verify:
   - Main app: https://spirit-guide-name-app.netlify.app/?v=restore-2025-09-07
   - Synchronicity: https://spirit-guide-name-app.netlify.app/synchronicity.html?v=var450-2025-09-07
   - Health file: https://spirit-guide-name-app.netlify.app/health.txt?v=2025-09-07

If the homepage still shows anything like "Index placeholder", your repo’s root probably doesn’t contain `index.html` (it might be inside a folder). Move `index.html` to the **top level** and redeploy.
