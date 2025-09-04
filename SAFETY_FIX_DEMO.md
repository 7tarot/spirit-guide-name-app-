# Demo Button Fix + Ambient Support
Date: 2025-09-04

This build fixes the Demo button (sets BOTH name and date of birth) and avoids clashes with `window.name` by using `document.getElementById(...)` everywhere.

**Deploy**
1) Replace your `index.html` with this one at the project root.
2) If you have your Ableton track, put it at `ambient/meditation.mp3` or `ambient/binaural.mp3`.
3) Commit & push → Netlify: Deploys → Clear cache and redeploy.
4) On site: click **Enable sound** → hit **Demo** → **Calculate**.

If Demo still doesn’t fill the name, your browser may be blocking global IDs. This file does not rely on them — it uses `getElementById` directly.
