Synchronicity Reader — 2025-09-06

What it does
- Client enters a seen number (e.g., 2011, 2222, 1234).
- We split left→right into 2‑digit segments (2011 → 20, 11).
- Segments map to base digits: 11→2 (Libra), 22→4 (Scorpio/Aries), 33→6 (Capricorn/Gemini). Others reduce by digit sum.
- Show chips per segment: zodiac signs (your overrides + digit’s signs), Majors, and all Minors of that base digit.
- Sum segment bases → final base digit (reduce to 1–9). Provide a compact reading + action focus and astro emphasis.

Files
- synchronicity.html — page (drag into your repo root; visit /synchronicity.html).
- synchronicity_mapping.json — your mapping (copied from your upload).
- synchronicity_overrides.json — master overrides per your instruction (11/22/33).

How to deploy
1) Drag all files into your Netlify repo root (don’t replace index.html unless you want).
2) Commit → Push.
3) Open /synchronicity.html, enter a number, press Analyze.
4) Use “Copy reading” to paste into YouTube/community posts or emails.

Notes
- If you later expand your mapping, just update synchronicity_mapping.json — no code change needed.
- Want 11/22/33 to have custom Majors/Minors lists too? Add those in overrides, and I’ll tweak the page to prefer them.
