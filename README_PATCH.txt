Voices Patch — Quick Integration
=================================
What this fixes
- Restores voice selector (full system voices list)
- Adds Test voice button
- Keeps Force English toggle
- Reliable Stop button (speechSynthesis.cancel())

How to install
1) Unzip next to your existing repo (or drag the folders into your repo).
   You should end up with: patch/, safety/, reference/, data/, ambient/
2) In your index.html:
   - Add: <link rel="stylesheet" href="patch/voices.css">
   - Add: the voice bar HTML (copy from reference/index_voice_snippet.html)
   - Add: <script type="module" src="patch/narrator.js"></script> (near the end of body)
3) Deploy to Netlify. The voice list should populate automatically.
4) Replace data/*.json with your real files, and put your ambient/binaural.mp3 into ambient/.

Notes
- The narrator picks a high-quality English voice by default if available.
- Force English sets utterance.lang to en-GB regardless of the selected voice’s native language.
- Preferences persist in localStorage (voice name, Force English, disclaimer read).

Rollback
- Delete the patch/ folder and remove the added link/script + voice bar markup.
- Re-deploy (see safety/SAFETY_RESTORE.md).
