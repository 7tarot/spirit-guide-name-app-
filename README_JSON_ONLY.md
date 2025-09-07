# JSON‑ONLY UPDATE (Safe)

This package updates **numerology_descriptions.json** with long‑form text and **no newline characters**.
That means your current UI will show full sentences without printing "\n". No code changes needed.

## Install (drag + drop)
1) Open your repo in GitHub Desktop.
2) Drag `numerology_descriptions.json` into the **root** of the repo (same place as `index.html`).
3) Commit → Push.
4) Verify:
   - Open: https://spirit-guide-name-app.netlify.app/numerology_descriptions.json?v=deep-2025-09-07
   - You should see long sentences (no "Overview for number X." placeholders, no "\n").
5) Refresh your homepage with a cache‑buster:
   - https://spirit-guide-name-app.netlify.app/?v=deep-2025-09-07

## Rollback
Use GitHub Desktop → History → right‑click the commit → Revert.
