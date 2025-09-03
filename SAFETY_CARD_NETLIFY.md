# Spirit Guide App — Matrix Rain + WebAudio Ambient (Drop‑in)
Date: 2025-09-03

Files:
- index.html — matrix rain visible (ON by default), voice selector, WebAudio ambient.
- numerology_descriptions.json — minimal sample; replace with your expanded file if you wish.

## Restore on Netlify
1) Download and unzip this pack.
2) Replace your site’s `index.html` at the project root with the one from this pack.
3) Ensure there is a `numerology_descriptions.json` in the same folder (use ours or your expanded one).
4) Trigger a deploy (push to Git or use Netlify’s “Deploys → Trigger deploy → Clear cache and deploy site”).

## Troubleshooting
- If you still don’t see rain, open DevTools → Console. No errors should appear. 
- Make sure the page includes `<canvas id="matrixCanvas"></canvas>` (it’s in this file).
- If audio is silent, click once on the page, then pick an ambient type — browsers need a user gesture.
