# Spirit Guide App — COMPLETE Restore Pack (Matrix + Voice + WebAudio)
Date: 2025-09-03

Contents:
- index.html — Matrix rain ON by default, voice selector narrator, WebAudio ambient (no MP3s), full UI.
- numerology_descriptions.json — expanded deep meanings for 1–9, 11, 22, 33.

## Restore (GitHub/Netlify)
1) Replace your site's `index.html` with the one in this pack.
2) Put `numerology_descriptions.json` in the **same folder**.
3) Commit & push (if using Git) or re‑upload.
4) On Netlify: Deploys → *Trigger deploy* → **Clear cache and deploy site**.
5) Open your site in **Incognito** (to dodge cache).

## Verify you have the right build
- View‑source and confirm these appear:
  - `id="matrixCanvas"` (canvas present)
  - `id="voiceSelect"` (voice dropdown)
  - `const STORAGE_KEY = "spirit-guide-state-v13"` (version fingerprint)
- In the UI you should see:
  - A **Matrix rain background** immediately.
  - A **Narrator** section with a **voice dropdown**.
  - **Ambient** dropdown with Rain/Choir/Drone.

If anything is off, paste any Console errors here and I’ll fix fast.
