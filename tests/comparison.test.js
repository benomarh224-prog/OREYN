const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
function fixture() {
  const nodes = { '[data-compare-slot="0"]': {}, '[data-compare-slot="1"]': {}, '#compare-content': {}, '#compare-status': {}, '#product-dialog': { open: false } };
  const c = { $: selector => nodes[selector], money: n => '€' + n, bottleMarkup: id => `<img data-photo="${id}">`, openModal(id) { c.opened = id; } };
  vm.createContext(c);
  vm.runInContext(source.slice(source.indexOf('const products ='), source.indexOf('function readStored')), c);
  vm.runInContext("let compareIds = ['le-male', 'sauvage-elixir']; let compareSizes = compareIds.map(defaultSize);", c);
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
  assert.match(nodes['[data-compare-slot="0"]'].innerHTML, /value="sauvage-elixir"\s+disabled/);
  c.openComparison('sauvage-elixir');
  assert.notEqual(vm.runInContext('compareIds[0]', c), vm.runInContext('compareIds[1]', c));
  c.openComparison('solar');
  vm.runInContext("compareSizes[0] = '100'; renderComparison();", c);
  assert.match(nodes['#compare-content'].innerHTML, /€139/);
  assert.match(nodes['#compare-content'].innerHTML, /data-add="solar" data-size="100"/);
  assert.match(nodes['#compare-content'].innerHTML, /option value="100" selected/);
  assert.doesNotMatch(nodes['#compare-content'].innerHTML, /undefined|NaN/);
});
