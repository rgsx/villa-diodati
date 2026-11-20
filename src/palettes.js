// Single source of truth for every theme.
// Each palette holds the UI roles plus its own `syntax` colors, merged over the shared syntax below.
// A palette with `registered: false` is kept here but not built or listed in package.json.
'use strict';

// Villa Diodati — moodier rework, after a still from Guillermo del Toro's Frankenstein:
// a woman in a translucent emerald-teal veil over acid chartreuse-gold silk, with a
// wine ribbon, in a near-black mossy forest and a few amber candle glints.
//
// Original ten-color palette (user-provided, still the source of several roles):
//   #7c6545  tan / old leather        #535a27  olive moss
//   #363a19  dark olive               #c5be88  parchment
//   #302218  leather brown            #b5b253  olive-gold
//   #03422f  lab green                #411d29  burgundy
//   #5a5416  dark gold                #472f17  dark brown
//
// Shot-derived colors (quantized darks and mids, highlights estimated by eye):
//   darks  #0d0e09 #1b160e #102318 #123121 #1a3422 #1e3f2a
//          #15402c #265135 #252116 #313121 #3c4128 #2e2416
//   mids   #474126 #5b5324 #556132 #41522c #646e3b
//   veil teal   #1f9a7a / #2aa58a
//   gold silk   #c8b83a / #d4c94a
//   wine ribbon #6a1f3a / #7a2240
//   skin        #c88a7a
//
// Surfaces are near-black moss (the brown leather editor is gone). Syntax is
// restrained: veil teal and acid gold do most of the work, wine is for
// constants and diagnostics, and tan/amber appear only sparingly. Ratios below
// are measured on editor background #12160f. Main tokens are 4.59:1 or more,
// comments 3.34:1.
//
// Spark is #8fe0c8, a lifted bright veil teal (same hue as #1f9a7a / #2aa58a).
// The old icy cyan #a8e6f2 is retired: that hue does not appear in the shot or
// the original palette, and it was part of what felt odd. The spark is used
// only for the cursor, matching bracket highlights, and find matches.

const diodatiSyntax = {
  comment: '#646e3b', // shot mid moss #646e3b, 3.34:1
  keyword: '#2aa58a', // veil teal, 5.97:1
  type: '#54b7a1', // veil teal #2aa58a lifted, 7.55:1
  constant: '#c88a7a', // shot skin, a warm wine-rose, 6.43:1
  function: '#c8b83a', // gold silk highlight, 9.04:1
  attribute: '#b5b253', // olive-gold, 8.24:1
  parameter: '#c4c2b0', // parchment #c5be88, desaturated, 10.19:1, in italics
  parameterItalic: true,
  string: '#c0bda5', // parchment #c5be88, muted, 9.64:1
  regexp: '#75c5b3', // veil teal #2aa58a lifted, 9.06:1
  tag: '#c4b85a', // gold silk, slightly quieted, 9.02:1
  interpolation: '#b5b253', // olive-gold, 8.24:1
  component: '#c4b85a', // gold silk, slightly quieted, 9.02:1
  variable: '#b8b499', // parchment #c5be88, desaturated, 8.74:1
  punctuation: '#b0ab8d', // parchment #c5be88, a step dimmer, 7.89:1
  heading: '#cdc9b7', // parchment #c5be88, muted lift, 11.09:1
  magenta: '#a86f82', // wine ribbon #7a2240 lifted: this / self / super, 4.59:1
  pink: '#c39ca9', // wine ribbon #7a2240 lifted: macros, 7.54:1
  cssVariable: '#b5b253', // olive-gold, 8.24:1
  cssProperty: '#b0ab8d',
  deprecated: '#7d835a', // olive moss #535a27 / mid #646e3b lifted, 4.56:1
  invalid: '#ffffff',
  info: '#75c5b3', // veil teal lifted, 9.06:1
  warn: '#b5b253', // olive-gold, 8.24:1
  error: '#b87880', // wine ribbon #7a2240 lifted, muted, 5.26:1
  debug: '#a86f82',
};

const spark = '#8fe0c8'; // lifted veil teal: cursor, bracket match, find match only

const diodati = {
  id: 'diodati',
  name: 'Villa Diodati',
  file: 'villa-diodati-color-theme.json',
  spark,
  // Main roles
  bg: '#0d0e09', // shot near-black moss, sidebar / activity bar / status bar / tabs
  editorBg: '#12160f', // mossy green-black
  contrastBg: '#1a3422', // shot forest dark, 1.36:1, lists
  border: '#23281c', // low-chroma moss, 1.21:1
  accent: '#03422f', // lab green, same hue as the veil; white text 11.51:1
  accentHover: '#0a5440', // lab green #03422f lifted; white text 8.92:1
  fg: '#b8b499', // parchment #c5be88, desaturated, 8.74:1
  cyan: '#c4b85a', // gold silk, slightly quieted, links and highlights, 9.02:1
  muted: '#7d835a', // olive moss #535a27 / mid #646e3b lifted, 4.56:1
  lineNumber: '#646e3b', // shot mid moss, 3.34:1
  activityBarInactiveForeground: '#626839', // olive moss #535a27 lifted, 3.16:1
  light: '#d0c868', // gold silk #d4c94a, slightly quieted, 10.58:1
  red: '#b87880', // wine ribbon #7a2240 lifted, muted, 5.26:1
  green: '#8a9166', // mid moss #646e3b lifted: git additions and diffs, 5.51:1
  modified: '#c4b85a', // gold silk, slightly quieted, 9.02:1
  orange: '#c4b85a', // same gold family; tan is used sparingly
  // Values unique to this theme
  activityBarForeground: '#c8b83a',
  breadcrumbBackground: '#12160f',
  breadcrumbForeground: '#7d835a',
  listSelection: '#1a3422',
  listErrorForeground: '#b87880',
  statusBarForeground: '#7d835a',
  statusBarDebuggingBackground: '#6a1f3a', // shot wine ribbon
  statusBarDebuggingForeground: '#ffffff',
  tabActiveBorderTop: '#c8b83acc',
  terminalBorder: '#23281c',
  areaBorder: '#1e2418', // quieter than the editor border, 1.15:1
  // Editor and workbench details
  breadcrumbFocusForeground: '#c4b85a',
  findMatchBackground: '#8fe0c855', // spark, translucent
  findMatchHighlightBackground: '#8fe0c833',
  inactiveSelectionBackground: '#1f9a7a26', // veil teal, translucent
  lineHighlightBackground: '#132118', // editor mixed with veil teal, 1.10:1
  selectionBackground: '#1f9a7a40', // veil teal, translucent, never a solid block
  cursor: '#8fe0c8', // spark
  editorGroupDropBackground: '#03422f40',
  indentGuide: '#23281c',
  suggestWidgetBorder: '#23281c',
  whitespace: '#23281c',
  gitIgnored: '#7d835a',
  gitUntracked: '#8a9166ee',
  tabInactiveForeground: '#7d835a',
  terminal: {
    ansiBlack: '#0a0b08',
    ansiRed: '#b87880',
    ansiGreen: '#8a9166',
    ansiYellow: '#c8b83a',
    ansiBlue: '#54b7a1', // lifted veil, not the spark
    ansiMagenta: '#a86f82',
    ansiCyan: '#75c5b3',
    ansiWhite: '#b8b499',
    ansiBrightBlack: '#646e3b',
    ansiBrightRed: '#c39ca9',
    ansiBrightGreen: '#9da484',
    ansiBrightYellow: '#d0c868',
    ansiBrightBlue: '#03422f', // the button color, so labels such as "History restored" keep white text
    ansiBrightMagenta: '#c39ca9',
    ansiBrightCyan: '#9ad4c8', // lifted veil teal
    ansiBrightWhite: '#cdc9b7',
    foreground: '#b8b499',
    cursorBackground: '#12160f', // the character under a block cursor
    cursorForeground: '#8fe0c8', // spark
  },
  syntax: diodatiSyntax,
};

module.exports = { syntax: diodatiSyntax, themes: [diodati] };
