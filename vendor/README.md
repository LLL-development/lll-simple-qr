# QR encoder

`qrcode-1.5.3.min.js` is a browser IIFE exposing `QRCode`, bundled from
[`qrcode@1.5.3/lib/browser.js`](https://github.com/soldair/node-qrcode/tree/v1.5.3)
with esbuild 0.25.12. It preserves the `toCanvas` and `toString` APIs used by the
page. Only these runtime packages are included:

| Package | Version | License |
| --- | --- | --- |
| qrcode (node-qrcode) | 1.5.3 | [MIT](qrcode.LICENSE) |
| dijkstrajs | 1.0.3 | [MIT](dijkstrajs.LICENSE) |
| encode-utf8 | 1.0.3 | [MIT](encode-utf8.LICENSE) |

The encode-utf8 license is copied from upstream `master/LICENCE` (blob
`a2db003e7210fd64ee07b6768f0416dbbf3448ea`); its npm 1.0.3 package declares MIT
but omits the license file. No server rendering, CLI dependencies, or build tool
is included in the browser bundle.

To rebuild, run these commands in a temporary directory (not the project):

```sh
npm install --ignore-scripts --no-audit --no-fund --save-exact qrcode@1.5.3 dijkstrajs@1.0.3 encode-utf8@1.0.3 esbuild@0.25.12
./node_modules/.bin/esbuild node_modules/qrcode/lib/browser.js --bundle --platform=browser --format=iife --global-name=QRCode --minify --outfile=qrcode-1.5.3.min.js
```

Prepend the existing license banner, copy the result here, and run
`node --test tests/qr.test.cjs` from the project root. Keep the license files
with the bundle when redistributing it.
