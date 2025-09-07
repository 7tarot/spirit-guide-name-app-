# SAFETY_RESTORE — Numerology Longform + Render Fix

This bundle replaces the placeholder `numerology_descriptions.json` with **deep content** and injects a **render fix** into your homepage so paragraph breaks display correctly and the narrator doesn’t read backslash‑n.

## Files
- `numerology_descriptions.json` — long‑form descriptions for 1–9, 11, 22, 33 (with clean paragraph breaks).
- `index.html` — your original file **plus** a tiny script at the end that converts \n to real paragraphs after the app renders.
- This note.

## Install (drag + drop)
1) Open your repo in GitHub Desktop.
2) Drag **both files** into the **root** of the repo (same level as your current `index.html`).
   - If prompted, click **Replace** for `index.html`.
3) Commit → Push.
4) Check: https://spirit-guide-name-app.netlify.app/?v=longform-2025-09-07
   - Your numerology cards should show clean paragraphs (no “\n\n”).

## Rollback
If anything looks odd, revert the commit in GitHub Desktop and you’re back to your previous version.
