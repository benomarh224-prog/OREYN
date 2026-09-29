const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const source = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'refinement.css'), 'utf8');

test('OREYN Trio uses the supplied artwork and confirmed 129 DH price', () => {
  assert.match(html, /assets\/oreyn-fragrance-trio\.jpg/);
  assert.match(html, /<strong>129<\/strong> DH/);
  assert.doesNotMatch(html, /class="discovery-box"/);
  assert.doesNotMatch(html, /class="set-list"/);
  assert.match(html, /class="trio-scent-strip"/);
  assert.ok(fs.statSync(path.join(root, 'assets', 'oreyn-fragrance-trio.jpg')).size > 250000);

  const context = {};
  vm.createContext(context);
  const data = source.slice(source.indexOf('const products ='), source.indexOf('const sizeText'));
  vm.runInContext(`${data}\nglobalThis.trio = products.discovery; globalThis.trioImage = productImages.discovery;`, context);
  assert.equal(context.trio.name, 'The OREYN Trio');
  assert.equal(context.trio.currency, 'MAD');
  assert.equal(context.trio.sizes.set, 129);
  assert.equal(context.trioImage.src, 'assets/oreyn-fragrance-trio.jpg');
});

test('cart totals keep the MAD trio separate from existing euro concept prices', () => {
  const context = { cart: [{ id: 'solar', size: '50', quantity: 1 }, { id: 'discovery', size: 'set', quantity: 1 }], giftWrap: false };
  vm.createContext(context);
  const data = source.slice(source.indexOf('const products ='), source.indexOf('function readStored'));
  const totals = source.slice(source.indexOf('function cartTotals()'), source.indexOf('function addToCart('));
  vm.runInContext(`${data}\n${totals}\nglobalThis.result = cartTotals(); globalThis.trioPrice = productMoney('discovery', 129);`, context);
  assert.equal(context.result.subtotal, 89);
  assert.equal(context.result.madSubtotal, 129);
  assert.equal(context.result.total, 95);
  assert.equal(context.trioPrice, '129 DH');
});

test('trio artwork has layered 3D motion with a reduced-motion fallback', () => {
  assert.match(html, /class="discovery-tilt"/);
  assert.match(source, /trioTilt\.addEventListener\('pointermove'/);
  assert.match(source, /reducedMotion\.matches \|\| window\.oreynMotionPaused/);
  assert.match(css, /transform-style:\s*preserve-3d/);
  assert.match(css, /@media\(hover:none\) and \(prefers-reduced-motion:no-preference\)/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)[\s\S]*?\.discovery-tilt/);
});
