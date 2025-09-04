# SAFETY CARD — Voice Patch
Date: 2025-09-04

This bundle *only* affects the narrator/voice functionality.

## Restore Plan
1) If anything breaks, delete the `patch/` folder and remove the voice-bar HTML from your `index.html`.
2) Re-deploy. Your app will return to the previous narrator state.
3) To try again, re-add the files and the voice-bar markup (see `reference/index_voice_snippet.html`).

## Notes
- This patch does not replace your existing numerology logic or layout.
- It is safe to add/commit alongside your current files.
