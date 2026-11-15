const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

test('WhatsApp order contains confirmed volumes, quantities, references and product totals', () => {
  const context = { cart: [
    { id: 'stock-acqua-di-gio', size: 'unit', quantity: 2 },
    { id: 'stock-black-afgano', size: 'unit', quantity: 1 },
    { id: 'stock-photo-5', size: 'unit', quantity: 1 },
    { id: 'discovery', size: 'set', quantity: 1 }
  ] };
  vm.createContext(context);
  vm.runInContext(source.slice(source.indexOf('const products ='), source.indexOf('function readStored')), context);
  vm.runInContext(source.slice(source.indexOf('function cartTotals()'), source.indexOf('function animateAddedProduct(')), context);
  const link = new URL(vm.runInContext('whatsappUrl(orderMessage())', context));
  assert.equal(link.origin, 'https://wa.me');
  assert.equal(link.pathname, '/212605945848');
  const message = link.searchParams.get('text');
  assert.match(message, /سلام، بغيت نطلب من OREYN\./);
  assert.match(message, /Acqua di Giò \(008\) — 30 ml × 2 — 90 DH/);
  assert.match(message, /Black Afgano \(010\) — 30 ml × 1 — 45 DH/);
  assert.match(message, /Black Afgano \(011\) — 30 ml × 1 — 45 DH/);
  assert.match(message, /The OREYN Trio \(000\) — OREYN Trio × 1 — 129 DH/);
  assert.match(message, /مجموع المنتجات 309 DH/);
  assert.doesNotMatch(message, /undefined|NaN|to confirm|50 ml|100 ml/);
  context.cart[0].quantity = 3;
  assert.match(vm.runInContext('orderMessage()', context), /مجموع المنتجات 354 DH/);
});

test('order entry point opens WhatsApp and replaces the concept preview', () => {
  assert.match(html, /<a[^>]*id="checkout-button"[^>]*target="_blank"[^>]*>Order on WhatsApp/);
  assert.match(html, /href="https:\/\/wa\.me\/212605945848"/);
  assert.doesNotMatch(html, /checkout-dialog|preview-form|Preview your order|Order preview only/);
  assert.doesNotMatch(source, /function openCheckout|preview-form|preview-success/);
  assert.match(source, /if \(count\) orderLink\.href = whatsappUrl\(orderMessage\(\)\);/);
  assert.match(source, /else orderLink\.removeAttribute\('href'\);/);
});
