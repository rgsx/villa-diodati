# Release checklist

Steps left before publishing Villa Diodati 0.1.0 to Open VSX. Keep these notes here, not in source or the README body.

## Icon and screenshots

- PENDIENTE(villa-diodati): add the master logo at `assets/images/villa-diodati-logo-2048px.png` (square, at least 256 px). Run `npm run icons` to write the 256 px marketplace icon at `assets/images/villa-diodati-logo.png`. `package.json` already points `icon` at that path, and `.vscodeignore` already packages only that file from `assets/`.
- PENDIENTE(villa-diodati): `vsce package` (and `npm run package`) will fail until `assets/images/villa-diodati-logo.png` exists, because the icon field is already set. Do not add a placeholder icon; wait for the real one, then package.
- PENDIENTE(villa-diodati): add full-window Cursor screenshots in `assets/screenshots/src/`:
  - `diodati.png` and `diodati-2.png` for Villa Diodati
  - `crypt.png` and `crypt-2.png` for Villa Diodati Crypt Black
  Then run `npm run screenshots` to write `assets/screenshots/diodati-1.png`, `diodati-2.png`, `crypt-1.png` and `crypt-2.png`.
- PENDIENTE(villa-diodati): uncomment the logo and screenshot figures in `README.md` once those files are in the repo.

## GitHub and publish

The GitHub repository `rgsx/villa-diodati` is created as **private**. Origin is set; nothing has been pushed yet.

- PENDIENTE(villa-diodati): review the local commits, then push `master` to `origin` (`git@github.com:rgsx/villa-diodati.git`).
- PENDIENTE(villa-diodati): flip the GitHub repository to public before or when publishing, so the README logo and screenshot URLs resolve.
- PENDIENTE(villa-diodati): confirm `npm run build` and `npm run build:check` still pass, then run `npm run package` and install the `.vsix` once more to check both themes and the icon.
- PENDIENTE(villa-diodati): publish to Open VSX with `npm run publish:ovsx` (needs the Open VSX token in the local environment, as with Carfax Abbey).
- PENDIENTE(villa-diodati): tag the release `v0.1.0` after a successful publish, following Carfax Abbey.
