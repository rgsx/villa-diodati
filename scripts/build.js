#!/usr/bin/env node
// Generates themes/*.json from src/. Plain Node, no dependencies.
// Usage: node scripts/build.js [--check]   (--check: fail if themes/ is out of date)
// Only palettes with `registered !== false` are built; package.json must list exactly those.
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const { syntax, themes: allThemes } = require('../src/palettes');
const themes = allThemes.filter((p) => p.registered !== false);
const uiColors = require('../src/ui-colors');
const tokenColors = require('../src/token-colors');
const semanticTokenColors = require('../src/semantic-token-colors');

const HEX = /^#(?:[0-9a-f]{6}|[0-9a-f]{8})$/;

// Lowercase every color value and make sure it is a valid #rrggbb or #rrggbbaa.
function color(value, where) {
  const v = String(value).toLowerCase();
  if (!HEX.test(v)) throw new Error(`Invalid color ${value} at ${where}`);
  return v;
}

// Shared syntax colors with the theme's own `syntax` overrides on top.
function syntaxFor(p) {
  return { ...syntax, ...(p.syntax || {}) };
}

function buildColors(p) {
  const out = {};
  for (const [section, entries] of uiColors(p, syntaxFor(p))) {
    for (const [key, value] of Object.entries(entries)) {
      if (value === undefined) continue; // not defined for this theme
      if (key in out) throw new Error(`${p.id}: duplicate color key ${key} (${section})`);
      out[key] = color(value, `${p.id} ${key}`);
    }
  }
  return out;
}

function normalizeSettings(settings, where) {
  const out = {};
  for (const [k, v] of Object.entries(settings)) {
    if (v === undefined) continue;
    out[k] = k === 'foreground' || k === 'background' ? color(v, where) : v;
  }
  return out;
}

function buildTheme(p) {
  const theme = {
    name: p.name,
    type: 'dark',
    semanticHighlighting: true,
    colors: buildColors(p),
  };
  const sem = {};
  for (const [k, v] of Object.entries(semanticTokenColors(p, syntaxFor(p)))) {
    sem[k] = typeof v === 'string' ? color(v, `${p.id} semantic ${k}`) : normalizeSettings(v, `${p.id} semantic ${k}`);
  }
  theme.semanticTokenColors = sem;
  theme.tokenColors = tokenColors(p, syntaxFor(p)).map((rule, i) => ({
    ...(rule.name ? { name: rule.name } : {}),
    scope: rule.scope,
    settings: normalizeSettings(rule.settings, `${p.id} tokenColors[${i}]`),
  }));
  return theme;
}

// package.json contributes.themes must match the registered palettes (label and file).
function checkManifest() {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const listed = ((pkg.contributes || {}).themes || []).map((t) => `${t.label} -> ${path.normalize(t.path)}`).sort();
  const expected = themes.map((p) => `${p.name} -> ${path.normalize(`themes/${p.file}`)}`).sort();
  if (JSON.stringify(listed) !== JSON.stringify(expected)) {
    console.error('package.json contributes.themes does not match the registered palettes:');
    console.error('  package.json: ' + (listed.join(', ') || '(none)'));
    console.error('  palettes.js:  ' + expected.join(', '));
    return false;
  }
  return true;
}

function main() {
  const check = process.argv.includes('--check');
  let stale = !checkManifest();
  for (const p of themes) {
    const file = path.join(root, 'themes', p.file);
    const text = JSON.stringify(buildTheme(p), null, 2) + '\n';
    if (check) {
      const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
      if (current !== text) { console.error(`out of date: themes/${p.file}`); stale = true; }
      continue;
    }
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, text);
    const t = JSON.parse(text);
    console.log(`themes/${p.file}: ${Object.keys(t.colors).length} colors, ${t.tokenColors.length} token rules` +
      `, ${Object.keys(t.semanticTokenColors).length} semantic rules`);
  }
  if (stale) process.exit(1);
}

if (require.main === module) main();
module.exports = { buildTheme, themes, syntax, syntaxFor };
