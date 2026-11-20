# Villa Diodati

A gothic dark theme for Visual Studio Code and Cursor, named after the villa on Lake Geneva where, in the wet summer of 1816, Mary Shelley first conceived *Frankenstein; or, The Modern Prometheus*. Leather, moss, lab green and a single flash of lightning — built for long sessions at night.

Villa Diodati is an independent theme and is not affiliated with or endorsed by the Shelley estate or any other *Frankenstein* adaptation.

The theme covers the current workbench and Cursor UI (chat and inline edits, command center, sticky scroll, bracket pairs, inlay hints, diffs and merge editor) and uses semantic highlighting.

## The theme

**Villa Diodati** is a test theme built from a ten-color palette taken from Guillermo del Toro's *Frankenstein* shots: tan `#7c6545`, olive moss `#535a27`, dark olive `#363a19`, parchment `#c5be88`, leather brown `#302218`, olive-gold `#b5b253`, lab green `#03422f`, burgundy `#411d29`, dark gold `#5a5416` and dark brown `#472f17`.

The dark tones stay as surfaces: the editor is leather brown, the sidebar and chrome are dark olive, selections are burgundy, and inactive selections lean lab green. Every syntax color is a lifted tint of one of those hues, so keywords are olive-gold, types pale moss, constants dusty rose, functions warm sand and strings cream parchment.

One color sits outside the palette: spark `#a8e6f2`, an electric pale cyan used only for the cursor, matching bracket highlights and find matches.

# Installation

Search for `villa-diodati` in the Extensions view of VS Code or Cursor ([Open VSX](https://open-vsx.org/extension/rgsx/villa-diodati)), install it, then pick **Villa Diodati** under Preferences: Color Theme (or run **Preferences: Color Theme** from the Command Palette).

To install a `.vsix` file instead, run **Extensions: Install from VSIX...** from the Command Palette, or use `cursor --install-extension villa-diodati-0.1.0.vsix` (`code --install-extension ...` for VS Code).

## Build from source

All themes are generated from one source, so edit `src/` rather than `themes/*.json`:

- `src/palettes.js`: the palette of each theme (a theme can override the shared syntax colors with its own `syntax`)
- `src/ui-colors.js`: workbench colors
- `src/token-colors.js` and `src/semantic-token-colors.js`: syntax colors

```sh
npm run build        # regenerates themes/*.json (Node only, no dependencies)
npm run build:check  # fails if themes/ or the theme list in package.json is out of date
npm run package      # builds villa-diodati-<version>.vsix
npm run icons        # builds the 256 px icon from the 2048 px master logo (needs Pillow)
npm run screenshots  # scales the README screenshots (needs Pillow)
```

To try changes, open the folder in VS Code or Cursor and press F5. The `demo/` folder has sample files in many languages (TypeScript, JSX/TSX, Vue, Svelte, HTML, CSS, Python, Ruby, C#, Rust, JSON, YAML and Markdown) for checking the colors.

## Contrast

Measured against the editor background `#302218` (WCAG contrast ratio):

| Theme         | Syntax colors  | Comments | Line numbers | White on buttons |
| ------------- | -------------- | -------- | ------------ | ---------------- |
| Villa Diodati | 5.52:1 or more | 3.16:1   | 3.16:1       | 11.51:1          |

In the terminal, the character under a block cursor stays visible, and bright blue matches the lab-green buttons so labels shown on it keep white text. The spark cursor is `#a8e6f2` (11.16:1 on the editor).

# Changelog

See [CHANGELOG.md](CHANGELOG.md).

# License

[MIT](LICENSE).

:zap:
