
# SAFETY_RESTORE

This package contains a *drop-in* update for your Netlify site:

- `index.html` — Homepage with sticky Synchronicity button + two-voice UI (Google UK Female/Male) with graceful fallback.
- `synchronicity.html` — Standalone Synchronicity Reader (no external libs). Deterministic readings, seeded by the exact input string. TTS with the same two-voice preference + fallback.
- `health.txt` — Smoke test file.

## How to deploy (GitHub Desktop → Netlify)

1. **Drag-and-drop** these files into your repo working folder (the one Netlify deploys).
2. In **GitHub Desktop**, you should see the changes. Commit with a message like:
   ```
   Patch: Voices + Synchronicity page (2025-09-07)
   ```
3. **Push** to `main` (or your production branch).
4. Wait for Netlify to redeploy; then test:
   - `/` loads the updated homepage.
   - `/synchronicity.html` loads and works offline (no external libs).

## Rollback

If anything looks off, simply revert the commit in GitHub Desktop (History → Right‑click the latest commit → Revert this commit). Netlify will redeploy the previous good version.

## Troubleshooting

- **No voices in the dropdown?** Some browsers expose speech voices only after a user gesture. Press **Test Voice** once and wait ~1–2s.
- **Google UK voices not listed?** We automatically fall back to the best available English voice and show a small note.
- **iOS Safari** can be inconsistent with voice lists. The fallback still speaks using the system voice.

## Acceptance checks

- Homepage shows only the two Google UK voices when they exist, otherwise shows the fallback note and still speaks.
- `/synchronicity.html` → enter `2222` → shows segments, bases, final base; the `22 → 4` master explanation appears **once** with an `×2` chip.
- Click **Test Voice** then **Speak (selected)** → it reads text **without** “slash‑n” or markup.
- Enter `1234` twice → the reading changes meaningfully from `2222`, and is **identical** on repeated inputs.

— Built for 7 Tarot, 2025-09-07.
