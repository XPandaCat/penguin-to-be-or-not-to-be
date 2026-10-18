# Penguin: To Be or Not to Be

A lightweight, static PWA quiz game. No build step, package manager, backend, API key, or paid service required.

## Included

- Three-question quiz with the specified correct answers (B, B, A).
- Wrong answer ends the run and shows the matching penguin gag.
- Correct answers advance from the candidate to the wizard to the final boss.
- Responsive layout for desktop and mobile.
- PWA manifest and service worker for installability and offline loading after the first visit.
- Original CSS-built toy characters and icy scene art. These can later be replaced with generated illustrations.

## Run locally

Because service workers require HTTPS or localhost, the game can be previewed by opening `index.html` directly, but PWA/offline behavior should be tested from a local server or GitHub Pages.

If Python is installed, open a terminal in this folder and run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish on GitHub Pages

1. Create a repository named `penguin-to-be-or-not-to-be`.
2. Upload all files and folders in this project to the repository root. Do not upload only the ZIP.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then save.
6. Wait for the published URL to appear. It will look like `https://YOUR-USERNAME.github.io/penguin-to-be-or-not-to-be/`.

For free GitHub Pages hosting, assume the repository must be public. The published site is accessible to anyone with the URL. Do not put confidential information in the game or repository.

## Install on iPhone

1. Open the published HTTPS URL in Safari.
2. Tap **Share**.
3. Choose **Add to Home Screen**.
4. Confirm the name and tap **Add**.

The first visit requires a connection. After the service worker has cached the app shell, the game should load offline. If you change files, update the cache name in `service-worker.js` (for example, `penguin-quest-v2`) so devices refresh the cached version.

## Customize the quiz

Edit the `questions` array near the top of `game.js`. `correct` is zero-based: `0` = A, `1` = B, `2` = C.

## Notes

- The characters and scenery are built from CSS shapes, so this is a playable first version rather than a pre-rendered 3D game.
- The optional Google Fonts import improves the look when online; system fonts are used as fallback. For fully offline typography, remove the `@import` in `styles.css`.
