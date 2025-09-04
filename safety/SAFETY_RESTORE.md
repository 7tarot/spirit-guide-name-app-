# SAFETY_RESTORE
To roll back quickly:
- Remove `<script type="module" src="patch/narrator.js"></script>` from your HTML.
- Remove `<link rel="stylesheet" href="patch/voices.css">`.
- Delete the `patch/` folder.
- Re-deploy.
