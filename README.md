# LLL Simple QR

Developed by LLL Inc.'s dev team — visit us at https://www.live-laugh-love.world

A minimal, privacy-first QR code generator with a hanko/washi-paper visual
style. Everything runs client-side — nothing is uploaded to a server.

## Features

- **Generate** — enter a URL, text, or contact info to create a QR code
- **Customize** — adjustable size, error correction level, foreground/background color, and quiet zone margin
- **Live preview** — instant "scan to verify" preview as you adjust settings
- **Export** — download as PNG or SVG

## Tech

- Static HTML page, QR generation via the locally vendored node-qrcode 1.5.3 browser encoder
- Serve or copy `index.html` together with `vendor/`; no build or CDN is required for QR generation
- Encoder sources, pinned rebuild instructions, and MIT licenses are in [`vendor/README.md`](vendor/README.md)

## Regression check

Run `node --test tests/qr.test.cjs` (Node.js 18+). This checks the actual local
browser bundle and SVG encoding for URL and Unicode text with custom options.
For a browser smoke check, open `index.html`, generate a code, change its settings,
and download both PNG and SVG.
