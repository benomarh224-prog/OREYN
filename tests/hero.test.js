const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = name => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');

test('the storefront does not render a visible skip-content control', () => {
  const html = read('index.html');
  assert.doesNotMatch(html, /Skip to content|class="skip-link"/i);
});

test('mobile navigation has an independent accessible shell and working storefront destinations', () => {
  const html = read('index.html');
  const css = read('refinement.css');
  const js = read('script.js');
  assert.match(html, /class="mobile-nav-head"/);
  assert.equal((html.match(/class="mobile-nav-link"/g) || []).length, 2);
  assert.match(html, /id="mobile-nav"[^>]*role="dialog"[^>]*aria-modal="true"/);
  assert.match(html, /data-menu-close aria-label="Close navigation"/);
  assert.match(html, /data-menu-filter="45dh"/);
  assert.match(html, /class="mobile-nav-link" href="#clarity"/);
  assert.match(css, /body\.menu-open \{ overflow: hidden; position: fixed;/);
  assert.match(css, /\.mobile-nav:not\(\[hidden\]\)[^}]*inset: 0;/);
  assert.doesNotMatch(js, /nav\.style\.top/);
  assert.match(js, /function openMenu\(\)[\s\S]*?document\.body\.classList\.add\('menu-open'\)/);
  assert.match(js, /function closeMenu\(restoreFocus = false\)[\s\S]*?document\.body\.classList\.remove\('menu-open'\)/);
});

test('a page load starts at the top instead of restoring a stale scroll position', () => {
  const js = read('script.js');
  for (const [type, hash] of [['reload', '#collection'], ['navigate', ''], ['navigate', '#scent/solar']]) {
    const listeners = {}, scrollCalls = [], replaceCalls = [];
    const context = {
      performance: { getEntriesByType: () => [{ type }] },
      history: { scrollRestoration: 'auto', replaceState: (...args) => replaceCalls.push(args) },
      location: { hash, pathname: '/', search: '?campaign=oreyn' },
      window: { scrollTo: options => scrollCalls.push(options), addEventListener: (type, fn) => { listeners[type] = fn; } },
      requestAnimationFrame: fn => fn()
    };
    vm.createContext(context);
    vm.runInContext(read('page-start.js'), context);
    listeners.load(); listeners.pageshow();
    assert.equal(context.history.scrollRestoration, 'manual');
    if (type === 'reload') assert.deepEqual(replaceCalls[0], [null, '', '/?campaign=oreyn']);
    else assert.equal(replaceCalls.length, 0);
    if (hash && type !== 'reload') assert.equal(scrollCalls.length, 0);
    else {
      assert.ok(scrollCalls.length > 1);
      scrollCalls.forEach(options => {
        assert.equal(options.top, 0);
        assert.equal(options.behavior, 'instant');
      });
    }
  }
  const html = read('index.html');
  assert.ok(html.indexOf('src="page-start.js"') < html.indexOf('<body>'));
  assert.match(js, /a\[href\^="#"\][\s\S]*?scrollToPageSection\(pageAnchor\)/);
  assert.doesNotMatch(js, /location\.hash\s*=\s*'discovery'/);
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
  vm.runInContext(js.slice(js.indexOf('function setHero(id)'),js.indexOf('function closeMenu(')),context);
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

test('hero bottle has no decorative backdrop and keeps its entrance and reduced-motion fallback', () => {
  const html = read('index.html');
  const css = read('refinement.css');
  assert.match(html, /class="original-product-stage hero-cinema"/);
  assert.doesNotMatch(html, /hero-bottle-aura|hero-bottle-mist|hero-glow-layer/);
  assert.match(html, /class="hero-bottle-light" aria-hidden="true"/);
  assert.doesNotMatch(css, /\.hero-cinema:after/);
  assert.match(css, /@keyframes hero-bottle-arrive/);
  assert.match(css, /@keyframes hero-light-sweep/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)[\s\S]*?\.hero-cinema \.hero-original-photo/);
});
