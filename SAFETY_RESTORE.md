# SGA — UK Voice Limit + Full Synchronicity

This bundle:
- Restricts narrator voices on the **homepage** to only **Google UK English Female/Male** (with friendly fallback).
- Replaces **synchronicity.html** with the full, working generator (v4.5.1 clean‑tts) using the same UK‑only filter.
- Keeps an obvious sticky **Synchronicity** entry bar on the homepage.

## Install
1) Open your repo in GitHub Desktop.
2) Drag **both files** into the **root** of the repo:
   - `index.html` (replace existing)
   - `synchronicity.html` (new or replace)
3) Commit → Push.

## Verify
- Home: https://spirit-guide-name-app.netlify.app/?v=uk-voices-2025-09-07
- Synchronicity: https://spirit-guide-name-app.netlify.app/synchronicity.html?v=full-2025-09-07

If your device/browser doesn’t expose Google voices, you’ll see a small note; narration will fall back to the best English voice available.
