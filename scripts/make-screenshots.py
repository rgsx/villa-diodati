#!/usr/bin/env python3
"""Build the README screenshots from the full-window shots in assets/screenshots/src/.

Usage:
    npm run screenshots
    python3 scripts/make-screenshots.py [--src DIR] [--out DIR] [--main-width 2056]

Input: full-window screenshots named after the theme: diodati.png (main scene) and diodati-2.png
(second scene). The case of the file name does not matter.
Output, in assets/screenshots/:
  diodati-1.png  from diodati.png, scaled to --main-width (Lanczos)
  diodati-2.png  from diodati-2.png, same width
Themes without shots are skipped.
Images are only scaled down, never up. Output is lossless, optimized PNG.

Needs Python 3 and Pillow (pip3 install --user pillow).
"""
import argparse
import os
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit('Pillow is required: pip3 install --user pillow')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAINS = ['diodati']
# Source suffix -> README shot number: diodati.png -> diodati-1.png, diodati-2.png -> diodati-2.png.
SHOTS = [('', 1), ('-2', 2)]


def shrink(img, width):
    """Scale down to `width` with Lanczos (never up). Halving exactly keeps text crisp."""
    if img.width <= width:
        return img
    height = round(img.height * width / img.width)
    return img.resize((width, height), Image.LANCZOS, reducing_gap=3.0)


def save(img, path):
    img.convert('RGB').save(path, optimize=True)
    rel = os.path.relpath(path, ROOT)
    shown = path if rel.startswith('..') else rel
    print(f'wrote {shown} ({img.width}x{img.height}, {os.path.getsize(path) // 1024} KB)')


def find(src, theme_id, suffix=''):
    """The shot for a theme, matching the file name without regard to case."""
    for name in sorted(os.listdir(src)):
        if name.lower() == f'{theme_id}{suffix}.png':
            return os.path.join(src, name)
    return None


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--src', default=os.path.join(ROOT, 'assets', 'screenshots', 'src'), help='folder with the {theme}.png shots')
    ap.add_argument('--out', default=os.path.join(ROOT, 'assets', 'screenshots'), help='output folder')
    ap.add_argument('--main-width', type=int, default=2056, help='width of the {theme}-N.png shots')
    args = ap.parse_args()
    if not os.path.isdir(args.src):
        sys.exit(f'no screenshot folder at {args.src}')
    os.makedirs(args.out, exist_ok=True)
    for theme_id in MAINS:
        for suffix, number in SHOTS:
            path = find(args.src, theme_id, suffix)
            if path:
                save(shrink(Image.open(path).convert('RGB'), args.main_width),
                     os.path.join(args.out, f'{theme_id}-{number}.png'))
            else:
                print(f'skipped {theme_id}-{number}.png (no {theme_id}{suffix}.png in {args.src})')


if __name__ == '__main__':
    main()
