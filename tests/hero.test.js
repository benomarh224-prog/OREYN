const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = name => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');

test('a page load starts at the top instead of restoring a stale scroll position', () => {
  const js = read('script.js');
  assert.match(js, /history\.scrollRestoration\s*=\s*'manual'/);
  assert.match(js, /function resetPageScroll\(\) \{ window\.scrollTo\(0, 0\); \}/);
  assert.match(js, /window\.addEventListener\('pageshow',[\s\S]*?resetPageScroll/);
});

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
  const productImages = {
    solar: { src: 'assets/oreyn-solar-gold.jpg', alt: 'Solar Drift OREYN perfume bottle with soft gold liquid' },
    after: { src: 'assets/oreyn-after-lavender.jpg', alt: 'After Hours OREYN perfume bottle with muted lavender liquid' },
    soft: { src: 'assets/oreyn-soft-sage.jpg', alt: 'Soft Static OREYN perfume bottle with pale sage green liquid' }
  };
  const buttons = ids.map(id => ({dataset: {hero: id}, classList: {toggle() {}}, attrs: {}, setAttribute(k,v) { this.attrs[k] = v; }}));
  const nodes = {'.hero': {dataset: {}}, '#hero-name': {}, '#hero-status': {}, '#hero-bottle-photo': {}, '#hero-details': {addEventListener(type, fn) { this.click = fn; }}};
  const context = {heroId: 'solar', productImages, products: Object.fromEntries(ids.map((id,i) => [id,{name:names[i]}])), $:s=>nodes[s], $$:()=>buttons, openProduct:id=>{ context.opened=id; }};
  vm.createContext(context);
  vm.runInContext(js.slice(js.indexOf('function setHero(id)'),js.indexOf('function closeMenu()')),context);
  vm.runInContext(js.match(/\$\('#hero-details'\)\.addEventListener[^\n]+/)[0],context);
  ids.forEach((id,i) => {
    context.setHero(id);
    assert.equal(nodes['#hero-name'].textContent,names[i]);
    assert.equal(nodes['#hero-status'].textContent,names[i]+' selected.');
    assert.equal(nodes['#hero-bottle-photo'].src,productImages[id].src);
    assert.equal(nodes['#hero-bottle-photo'].alt,productImages[id].alt);
    assert.equal(buttons.filter(b=>b.attrs['aria-pressed']==='true').length,1);
    assert.equal(buttons[i].attrs['aria-pressed'],'true');
    nodes['#hero-details'].click(); assert.equal(context.opened,id);
  });
});

test('hero bottle has a decorative cinematic entrance and a reduced-motion fallback', () => {
  const html = read('index.html');
  const css = read('refinement.css');
  assert.match(html, /class="original-product-stage hero-cinema"/);
  for (const decoration of ['hero-bottle-aura', 'hero-bottle-mist-back', 'hero-bottle-light', 'hero-bottle-mist-front']) {
    assert.match(html, new RegExp(`class="[^"]*${decoration}[^"]*" aria-hidden="true"`));
  }
  assert.match(css, /@keyframes hero-bottle-arrive/);
  assert.match(css, /@keyframes hero-light-sweep/);
  assert.match(css, /@keyframes hero-mist-front/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)[\s\S]*?\.hero-cinema \.hero-original-photo/);
});
