// Single source of truth for every theme.
// Each palette holds the UI roles plus its own `syntax` colors, merged over the shared syntax below.
// A palette with `registered: false` is kept here but not built or listed in package.json.
'use strict';

// Villa Diodati — faithful plus spark.
//
// Source palette, from Guillermo del Toro's Frankenstein shots (user-provided):
//   #7c6545  tan / old leather
//   #535a27  olive moss
//   #363a19  dark olive
//   #c5be88  parchment
//   #302218  leather brown
//   #b5b253  olive-gold
//   #03422f  lab green
//   #411d29  burgundy
//   #5a5416  dark gold
//   #472f17  dark brown
//
// Dark tones stay as surfaces. Syntax colors are the same hues, lifted toward a
// same-hue veil or white until they meet WCAG contrast on the editor background
// (main tokens 5.52:1 or more, comments and line numbers 3.16:1). Ratios below
// are measured on editor background #302218.
//
// One color sits outside the palette: spark #a8e6f2, an electric pale cyan
// (a softened neighbor of #9fe6ff). It is used only for the cursor, matching
// bracket highlights, and find matches — a flash of lightning in the room.

const diodatiSyntax = {
  comment: '#6f754a', // olive moss #535a27 lifted, 3.16:1
  keyword: '#b5b253', // olive-gold, the base color itself, 6.92:1
  type: '#6ea695', // lab green #03422f lifted to pale moss, 5.52:1
  constant: '#c9a4ae', // burgundy #411d29 lifted to dusty rose, 6.88:1
  function: '#bca687', // tan #7c6545 lifted to sand, 6.54:1
  attribute: '#c4b06a', // dark gold #5a5416 lifted, 7.14:1
  parameter: '#d3c5b0', // tan #7c6545 lifted, 9.05:1, in italics
  parameterItalic: true,
  string: '#e4deb0', // parchment #c5be88 lifted to cream, 11.24:1
  regexp: '#8fc4b8', // lab green #03422f lifted to mint, 7.86:1
  tag: '#d4c4a0', // tan #7c6545 lifted to pale sand, 8.92:1
  interpolation: '#c4b06a', // dark gold #5a5416 lifted, 7.14:1
  component: '#d0c07a', // olive-gold #b5b253 / dark gold #5a5416 lifted, 8.41:1
  variable: '#c5be88', // parchment, 8.11:1
  punctuation: '#b8b280', // parchment #c5be88, a step dimmer, 7.11:1
  heading: '#f0ead0', // parchment #c5be88 lifted, 12.71:1
  magenta: '#c4909a', // burgundy #411d29 lifted: this / self / super, 5.71:1
  pink: '#e0b8c0', // burgundy #411d29 lifted: macros, CSS functions, 8.62:1
  cssVariable: '#c4b06a', // dark gold #5a5416 lifted, 7.14:1
  cssProperty: '#b8b280',
  deprecated: '#8a9064', // olive moss #535a27 lifted, 4.57:1
  invalid: '#ffffff',
  info: '#8fc4b8', // pale moss, 7.86:1
  warn: '#c4b06a', // lifted dark gold, 7.14:1
  error: '#d898a0', // burgundy #411d29 lifted, 6.52:1
  debug: '#c4909a',
};

const spark = '#a8e6f2'; // lightning: cursor, bracket match, find match only

const diodati = {
  id: 'diodati',
  name: 'Villa Diodati',
  file: 'villa-diodati-color-theme.json',
  spark,
  // Main roles
  bg: '#363a19', // dark olive, sidebar / activity bar / status bar / tabs
  editorBg: '#302218', // leather brown
  contrastBg: '#68273d', // burgundy #411d29 lifted, 1.42:1, lists
  border: '#472f17', // dark brown
  accent: '#03422f', // lab green; white text 11.51:1
  accentHover: '#0a5440', // lab green #03422f lifted; white text 8.92:1
  fg: '#c5be88', // parchment, 8.11:1
  cyan: '#e4deb0', // parchment lifted, links and highlights, 11.24:1
  muted: '#8a9064', // olive moss #535a27 lifted, 4.57:1 (3.52:1 on the sidebar)
  lineNumber: '#6f754a', // olive moss #535a27 lifted, 3.16:1
  activityBarInactiveForeground: '#8a9064', // muted, so the activity bar keeps 3.5:1 on dark olive
  light: '#dcd6a0', // parchment lifted, 10.36:1
  red: '#d898a0', // burgundy #411d29 lifted, 6.52:1
  green: '#9aaa6e', // olive moss #535a27 lifted: git additions and diffs, 6.10:1
  modified: '#c4b06a', // dark gold #5a5416 lifted, 7.14:1
  orange: '#d4a06a', // tan #7c6545 lifted, 6.61:1
  // Values unique to this theme
  activityBarForeground: '#b5b253',
  breadcrumbBackground: '#302218',
  breadcrumbForeground: '#8a9064',
  listSelection: '#68273d',
  listErrorForeground: '#d898a0',
  statusBarForeground: '#8a9064',
  statusBarDebuggingBackground: '#411d29', // source burgundy
  statusBarDebuggingForeground: '#ffffff',
  tabActiveBorderTop: '#b5b253cc',
  terminalBorder: '#472f17',
  areaBorder: '#472f17',
  // Editor and workbench details
  breadcrumbFocusForeground: '#e4deb0',
  findMatchBackground: '#a8e6f299', // spark
  findMatchHighlightBackground: '#a8e6f240', // spark
  inactiveSelectionBackground: '#1c544340', // lab green #03422f lifted, with alpha
  lineHighlightBackground: '#392b1f', // leather #302218 mixed with parchment, 1.13:1
  selectionBackground: '#762d45', // burgundy #411d29 lifted, 1.63:1
  cursor: '#a8e6f2', // spark
  editorGroupDropBackground: '#03422f40',
  indentGuide: '#472f17',
  suggestWidgetBorder: '#472f17',
  whitespace: '#472f17',
  gitIgnored: '#8a9064',
  gitUntracked: '#9aaa6eee',
  tabInactiveForeground: '#8a9064',
  terminal: {
    ansiBlack: '#1b140f',
    ansiRed: '#d898a0',
    ansiGreen: '#9aaa6e',
    ansiYellow: '#dcd6a0',
    ansiBlue: '#6ea695', // pale moss, not the spark
    ansiMagenta: '#c4909a',
    ansiCyan: '#8fc4b8',
    ansiWhite: '#c5be88',
    ansiBrightBlack: '#6f754a',
    ansiBrightRed: '#e0b8c0',
    ansiBrightGreen: '#c5d49a',
    ansiBrightYellow: '#f0ead0',
    ansiBrightBlue: '#03422f', // the button color, so labels such as "History restored" keep white text
    ansiBrightMagenta: '#e0b8c0',
    ansiBrightCyan: '#e4deb0',
    ansiBrightWhite: '#f0ead0',
    foreground: '#c5be88',
    cursorBackground: '#302218', // the character under a block cursor
    cursorForeground: '#a8e6f2', // spark
  },
  syntax: diodatiSyntax,
};

module.exports = { syntax: diodatiSyntax, themes: [diodati] };
