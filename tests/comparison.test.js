const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
function fixture() {
  const nodes = { '[data-compare-slot="0"]': {}, '[data-compare-slot="1"]': {}, '#compare-content': {}, '#compare-status': {}, '#product-dialog': { open: false } };
  const c = { $: selector => nodes[selector], money: n => '€' + n, bottleMarkup: id => `<img data-photo="${id}">`, openModal(id) { c.opened = id; } };
  vm.createContext(c);
  vm.runInContext(source.slice(source.indexOf('const products ='), source.indexOf('function readStored')), c);
  vm.runInContext("let compareIds = ['stock-sauvage', 'stock-acqua-di-gio']; let compareSizes = compareIds.map(defaultSize);", c);
  vm.runInContext(source.slice(source.indexOf('function renderComparison()'), source.indexOf('function openProductImage(')), c);
  return { c, nodes };
}
test('comparison keeps two distinct fragrances and uses catalogue prices and size-specific bag actions', () => {
  const { c, nodes } = fixture();
  c.openComparison();
  assert.equal(c.opened, '#compare-dialog');
  assert.match(nodes['#compare-content'].innerHTML, /45 DH/);
  assert.match(nodes['#compare-content'].innerHTML, /Size to confirm/);
  assert.doesNotMatch(nodes['[data-compare-slot="0"]'].innerHTML, /value="discovery"/);
  assert.match(nodes['[data-compare-slot="0"]'].innerHTML, /value="stock-acqua-di-gio"\s+disabled/);
  c.openComparison('stock-acqua-di-gio');
  assert.notEqual(vm.runInContext('compareIds[0]', c), vm.runInContext('compareIds[1]', c));
  c.openComparison('stock-photo-6');
  vm.runInContext("renderComparison();", c);
  assert.match(nodes['#compare-content'].innerHTML, /45 DH/);
  assert.doesNotMatch(nodes['#compare-content'].innerHTML, /€/);
  assert.match(nodes['#compare-content'].innerHTML, /data-add="stock-photo-6" data-size="unit"/);
  assert.doesNotMatch(nodes['[data-compare-slot="0"]'].innerHTML, /le-male|sauvage-elixir|libre-le-parfum|value="solar"|value="after"|value="soft"/);
  assert.equal((nodes['[data-compare-slot="0"]'].innerHTML.match(/<option /g) || []).length, 7);
  assert.doesNotMatch(nodes['#compare-content'].innerHTML, /undefined|NaN/);
});
