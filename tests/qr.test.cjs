const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

test('the page loads a local encoder with the browser APIs used for QR exports', async () => {
  const root = path.join(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const src = html.match(/<script src="([^"]+)"/)[1];
  assert.ok(!/^(https?:)?\/\//.test(src), 'QR generation must not depend on a CDN');
  const context = vm.createContext({});
  vm.runInContext(fs.readFileSync(path.join(root, src), 'utf8'), context);
  const qr = context.QRCode;
  assert.equal(typeof qr.toCanvas, 'function');
  assert.equal(typeof qr.toString, 'function');

  for (const text of ['https://example.com/qr-regression', 'こんにちは QR 印']) {
    const svg = await qr.toString(text, {
      type: 'svg', width: 384, margin: 4, errorCorrectionLevel: 'H',
      color: { dark: '#123456', light: '#ffffff' }
    });
    assert.match(svg, /^<svg xmlns="http:\/\/www.w3.org\/2000\/svg"/);
    assert.match(svg, /width="384" height="384"/);
    assert.match(svg, /stroke="#123456"/);
    assert.match(svg, /fill="#ffffff"/);
    assert.match(svg, /<path[^>]+d="[^"]+"/);
  }
});
