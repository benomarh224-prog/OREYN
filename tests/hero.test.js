const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = name => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');

test('hero copy stays in normal flow without legacy positioning at any breakpoint', () => {
  for (const file of ['style.css', 'refinement.css']) {
    for (const [, selector, declarations] of read(file).matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      if (!selector.split(',').some(s => /^\.(hero|hero-copy)\s*$/.test(s.trim()))) continue;
      assert.doesNotMatch(declarations, /position\s*:\s*(absolute|fixed)|display\s*:\s*contents|(?:^|;)\s*(?:height|max-height|top|bottom|transform|grid-row)\s*:/, selector);
    }
  }
  const html = read('index.html');
  const hero = html.slice(html.indexOf('<section class="hero'), html.indexOf('</section>', html.indexOf('<section class="hero')));
  for (const name of ['hero-copy', 'hero-lede', 'hero-description', 'hero-actions']) assert.equal((hero.match(new RegExp('class="' + name + '"', 'g')) || []).length, 1);
});

test('every hero swatch updates its name, exclusive pressed state, announcement and details target', () => {
  const js = read('script.js');
  const ids = ['solar', 'after', 'soft'];
  const names = ['Solar Drift', 'After Hours', 'Soft Static'];
  const buttons = ids.map(id => ({dataset: {hero: id}, classList: {toggle() {}}, attrs: {}, setAttribute(k,v) { this.attrs[k] = v; }}));
  const nodes = {'.hero': {dataset: {}}, '#hero-name': {}, '#hero-status': {}, '#hero-details': {addEventListener(type, fn) { this.click = fn; }}};
  const context = {heroId: 'solar', products: Object.fromEntries(ids.map((id,i) => [id,{name:names[i]}])), $:s=>nodes[s], $$:()=>buttons, openProduct:id=>{ context.opened=id; }};
  vm.createContext(context);
  vm.runInContext(js.slice(js.indexOf('function setHero(id)'),js.indexOf('function closeMenu()')),context);
  vm.runInContext(js.match(/\$\('#hero-details'\)\.addEventListener[^\n]+/)[0],context);
  ids.forEach((id,i) => {
    context.setHero(id);
    assert.equal(nodes['#hero-name'].textContent,names[i]);
    assert.equal(nodes['#hero-status'].textContent,names[i]+' selected.');
    assert.equal(buttons.filter(b=>b.attrs['aria-pressed']==='true').length,1);
    assert.equal(buttons[i].attrs['aria-pressed'],'true');
    nodes['#hero-details'].click(); assert.equal(context.opened,id);
  });
});
