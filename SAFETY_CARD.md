# Spirit Guide App — Quick Restore (Steve)
**Date:** 2025-09-03

## Files in this pack
- `index.html` — polished UI, narrator, email banner, expanded meanings
- `numerology_descriptions.json` — long text for 1–9, 11, 22, 33

## Restore in 60 seconds
1. Open your repo in **GitHub Desktop** → Repository → *Show in Explorer*.
2. Drop these two files in the repo root (same level as `style.css`).
3. Back in GitHub Desktop → **Commit** → **Push origin**.
4. Open your live Pages URL in an **incognito window**.
5. If it still looks old, make a tiny edit comment at the end of `index.html` and push again (forces a rebuild).

## Note
- The page fetches `numerology_descriptions.json?v=<timestamp>` so it always pulls the latest text.
- Email banner is prominent so we collect addresses; Apps Script URL lives inside `index.html` (search for `SHEETS_URL`).