'use strict';
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const products = {
  'le-male': { name: 'Jean Paul Gaultier Le Male Le Parfum', cardName: 'Le Male Le Parfum', brand: 'Jean Paul Gaultier', number: '004', family: 'woody', descriptor: 'JEAN PAUL GAULTIER', tagline: 'Cardamom, iris, and a warm vanilla finish.', notes: 'Cardamom · Lavender & iris · Vanilla', top: 'Cardamom', heart: 'Lavender, iris', base: 'Vanilla', description: 'A woody fragrance with a spicy opening, a lavender and iris heart, and a warm vanilla base. Contact us to confirm the offered volume and presentation.', keywords: 'jean paul gaultier jpg le male parfum cardamom lavender iris vanilla woody', currency: 'MAD', sizes: { unit: 45 }, source: 'https://www.jeanpaulgaultier.com/ww/en/p/range-le-male/le-male-le-parfum-eau-de-parfum-intense-000000000065156533' },
  'sauvage-elixir': { name: 'Dior Sauvage Elixir', cardName: 'Sauvage Elixir', brand: 'Dior', number: '005', family: 'woody', descriptor: 'DIOR', tagline: 'Spices, lavender, and rich woods.', notes: 'Grapefruit & spices · Lavender · Woods', top: 'Grapefruit, cinnamon, nutmeg, cardamom', heart: 'Lavender', base: 'Rich woods, licorice, vetiver, patchouli', description: 'Spicy grapefruit meets lavender and a rich woody base. Contact us to confirm the offered volume and presentation.', keywords: 'dior sauvage elixir grapefruit spices lavender woods woody', currency: 'MAD', sizes: { unit: 45 }, source: 'https://www.dior.com/en_int/beauty/products/sauvage-elixir-C099700242.html' },
  'libre-le-parfum': { name: 'YSL Libre Le Parfum', cardName: 'Libre Le Parfum', brand: 'Yves Saint Laurent', number: '006', family: 'floral', descriptor: 'YVES SAINT LAURENT', tagline: 'Floral lavender with a warm saffron accent.', notes: 'Saffron · Orange blossom · Lavender', top: 'Bergamot, mandarin, ginger, saffron accord', heart: 'Lavender, orange blossom', base: 'Vetiver, tonka bean, honey accord, vanilla', description: 'Lavender and orange blossom meet a warm saffron accord. Contact us to confirm the offered volume and presentation.', keywords: 'ysl yves saint laurent libre parfum floral saffron orange blossom lavender', currency: 'MAD', sizes: { unit: 45 }, source: 'https://www.yslbeauty.com/int/fragrance/feminine-fragrance/libre/libre-le-parfum/WW-51020YSL.html' },
  solar: { name: 'Solar Drift', number: '001', family: 'fresh', descriptor: 'THE GOLDEN ONE', tagline: 'Sun on skin. Now bottled.', mood: 'a little sunshine<br>goes a long way.', notes: 'Bergamot · Neroli · Soft musk', top: 'Bergamot, mandarin', heart: 'Neroli, orange blossom', base: 'Soft musk, blonde woods', description: 'The windows are open. There is nowhere you need to be. Bright citrus drifts into a heart of orange blossom, settling into the soft warmth of skin. A little golden hour, whenever you need it.', keywords: 'sun sunshine sunny bright luminous citrus floral golden fresh summer morning', currency: 'MAD', sizes: { '50': 45, '100': 45 } },
  after: { name: 'After Hours', number: '002', family: 'woody', descriptor: 'THE UNEXPECTED ONE', tagline: 'Stay a little longer.', mood: 'one more<br>last night.', notes: 'Black tea · Iris · Sandalwood', top: 'Black tea, pink pepper', heart: 'Iris, violet leaf', base: 'Sandalwood, amber', description: 'The city is quieter now. The conversation is getting better. Smoky tea and a spark of pepper unfold into powdery iris and warm, textured woods. For the nights that become stories.', keywords: 'night evening deep dark warm woody amber smoky tea mysterious', currency: 'MAD', sizes: { '50': 45, '100': 45 } },
  soft: { name: 'Soft Static', number: '003', family: 'soft', descriptor: 'THE QUIET ONE', tagline: 'Close to skin. Closer to you.', mood: 'the art of<br>doing nothing.', notes: 'Pear · Ambrette · White woods', top: 'Pear, bergamot', heart: 'Ambrette, white iris', base: 'White woods, skin musk', description: 'Fresh sheets. A slow Sunday. The lovely luxury of having nothing planned. Crisp pear melts into ambrette and whisper-soft woods. An intimate fragrance that feels like your favorite version of home.', keywords: 'quiet clean soft intimate skin delicate gentle cozy musk pear sunday', currency: 'MAD', sizes: { '50': 45, '100': 45 } },
  discovery: { name: 'The OREYN Trio', number: '000', family: 'all', descriptor: 'THREE MOODS. ONE SIGNATURE.', notes: 'Solar Drift · After Hours · Soft Static', keywords: 'trio pack box gift set discovery all three fragrances', currency: 'MAD', sizes: { set: 129 } }
};
const productImages = {
  'le-male': { src: 'assets/le-male-le-parfum.jpg', alt: 'Jean Paul Gaultier Le Male Le Parfum catalogue bottle', width: 800, height: 800 },
  'sauvage-elixir': { src: 'assets/sauvage-elixir.png', alt: 'Dior Sauvage Elixir catalogue bottle', width: 800, height: 800 },
  'libre-le-parfum': { src: 'assets/libre-le-parfum.webp', alt: 'YSL Libre Le Parfum catalogue bottle', width: 800, height: 800 },
  solar: { src: 'assets/oreyn-solar-gold.jpg', alt: 'Solar Drift OREYN perfume bottle with soft gold liquid' },
  after: { src: 'assets/oreyn-after-lavender.jpg', alt: 'After Hours OREYN perfume bottle with muted lavender liquid' },
  soft: { src: 'assets/oreyn-soft-sage.jpg', alt: 'Soft Static OREYN perfume bottle with pale sage green liquid' },
  discovery: { src: 'assets/oreyn-fragrance-trio.jpg', alt: 'OREYN fragrance trio gift box with Solar Drift, After Hours, and Soft Static bottles', width: 1254, height: 1254 }
};
const sizeText = size => size === 'set' ? 'OREYN Trio' : size === 'unit' ? 'Size to confirm' : `${size} ml`;
const defaultSize = id => Object.keys(products[id].sizes)[0];
const dirham = value => `${new Intl.NumberFormat('en-MA', { maximumFractionDigits: 0 }).format(value)} DH`;
const productMoney = (id, value) => dirham(value);
function readStored(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function persist(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* The store remains usable with storage disabled. */ } }
const rawCart = readStored('oreyn-cart-v2', []);
let cart = Array.isArray(rawCart) ? rawCart.filter(item => item && typeof item.id === 'string' && Object.hasOwn(products, item.id) && typeof item.size === 'string' && Object.hasOwn(products[item.id].sizes, item.size) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99).map(({ id, size, quantity }) => ({ id, size, quantity })) : [];
// Preserve bags created in the original site.
if (!cart.length && localStorageAvailable() && localStorage.getItem('oreyn-cart-v2') === null) {
  const previous = readStored('oreyn-bag', {});
  if (previous && typeof previous === 'object') Object.entries(products).forEach(([id, product]) => { if (Number.isInteger(previous[product.name]) && previous[product.name] > 0 && previous[product.name] <= 99) cart.push({ id, size: defaultSize(id), quantity: previous[product.name] }); });
}
function localStorageAvailable() { try { return Boolean(window.localStorage); } catch { return false; } }
const savedRaw = readStored('oreyn-saved', []);
let saved = new Set(Array.isArray(savedRaw) ? savedRaw.filter(id => typeof id === 'string' && Object.hasOwn(products, id) && id !== 'discovery') : []);
let filter = 'all', heroId = 'solar', detailId = 'solar', detailSize = '50';
let toastTimer, lastModalTrigger;
let compareIds = ['le-male', 'sauvage-elixir'];
let compareSizes = compareIds.map(defaultSize);
const heart = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/></svg>';
function bottleMarkup(id, size = '50') {
  const image = productImages[id] || { src: 'assets/oreyn-original.jpg', alt: 'OREYN perfume bottle' };
  return `<img class="original-product-photo" src="${image.src}" alt="${image.alt}" width="${image.width || 1024}" height="${image.height || 1280}" loading="lazy">`;
}
function notify(message, showBag = false) {
  const el = $('#toast'); el.replaceChildren();
  const text = document.createElement('span'); text.textContent = message; el.append(text);
  if (showBag) { const button = document.createElement('button'); button.textContent = 'View bag ↗︎'; button.setAttribute('data-view-bag', ''); el.append(button); }
  el.classList.add('visible'); clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { if (!el.contains(document.activeElement)) el.classList.remove('visible'); }, showBag ? 6000 : 3200);
}
function openModal(id) {
  if (!$('dialog[open]')) lastModalTrigger = document.activeElement?.closest('#mobile-nav') ? $('#menu-toggle') : document.activeElement;
  $$('dialog[open]').forEach(dialog => dialog.close());
  closeMenu();
  const dialog = $(id); dialog.showModal(); dialog.scrollTop = 0;
  window.oreynModalOpen = true; window.dispatchEvent(new Event('oreyn-motion'));
}
function closeModal(dialog) {
  if (dialog.id === 'image-dialog') { closeProductImage(); return; }
  if (dialog.id === 'product-dialog' && $('#image-dialog').open) closeProductImage(false, true);
  dialog.close();
  if (dialog.id === 'product-dialog' && location.hash.startsWith('#scent/')) history.replaceState(null, '', location.pathname + location.search);
  if (lastModalTrigger?.isConnected) lastModalTrigger.focus({ preventScroll: true });
  else if (dialog.id === 'product-dialog') focusCollectionFilter();
}
$$('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => {
    if (dialog.id === 'image-dialog' && !dialog.open) { dialog.oreynZoomSession?.animations.forEach(animation => animation.cancel()); dialog.oreynZoomSession = null; }
    window.oreynModalOpen = Boolean($('dialog[open]')); window.dispatchEvent(new Event('oreyn-motion'));
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const b = dialog.getBoundingClientRect(); if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) closeModal(dialog); } });
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeModal(dialog); });
});
function saveButton(id) { return `<button class="save-button" data-save="${id}" aria-label="${saved.has(id) ? 'Unsave' : 'Save'} ${products[id].name}" aria-pressed="${saved.has(id)}">${heart}</button>`; }
function animateSavedHeart(button, isSaved) {
  const icon = button?.querySelector('svg');
  if (!icon || typeof icon.animate !== 'function' || reducedMotion.matches || window.oreynMotionPaused) return;
  icon.oreynHeartPulse?.cancel();
  const frames = isSaved
    ? [{ transform: 'scale(1)' }, { transform: 'scale(.82)', offset: .2 }, { transform: 'scale(1.24)', offset: .55 }, { transform: 'scale(1)' }]
    : [{ transform: 'scale(1)' }, { transform: 'scale(.88)', offset: .4 }, { transform: 'scale(1)' }];
  const pulse = icon.animate(frames, { duration: isSaved ? 420 : 220, easing: 'ease-in-out' });
  icon.oreynHeartPulse = pulse;
  const stopMotion = () => { if (reducedMotion.matches || window.oreynMotionPaused) pulse.cancel(); };
  const cleanup = () => {
    window.removeEventListener('oreyn-motion', stopMotion);
    if (icon.oreynHeartPulse === pulse) icon.oreynHeartPulse = null;
  };
  window.addEventListener('oreyn-motion', stopMotion);
  pulse.onfinish = cleanup;
  pulse.oncancel = cleanup;
}
function stopFilterTransition() {
  const track = $('#product-grid'), animations = track.oreynFilterAnimations || [];
  track.oreynFilterAnimations = [];
  animations.forEach(animation => animation.cancel());
}
function animateFilteredCards() {
  const track = $('#product-grid');
  if (reducedMotion.matches || window.oreynMotionPaused || typeof track.animate !== 'function') return;
  const bounds = track.getBoundingClientRect(), animations = [];
  track.oreynFilterAnimations = animations;
  [...track.children].filter(card => {
    const rect = card.getBoundingClientRect();
    return rect.right > bounds.left && rect.left < bounds.right;
  }).forEach((card, index) => {
    const animation = card.animate([
      { opacity: .65 },
      { opacity: 1 }
    ], { duration: 180, delay: Math.min(index * 20, 40), easing: 'ease-out', fill: 'backwards' });
    animations.push(animation);
    animation.onfinish = animation.oncancel = () => {
      if (track.oreynFilterAnimations === animations) animations.splice(animations.indexOf(animation), 1);
    };
  });
}
function renderProducts(animate = false) {
  stopFilterTransition();
  const matches = Object.entries(products).filter(([id, p]) => id !== 'discovery' && (filter === 'all' || filter === 'saved' && saved.has(id) || filter === '45dh' && p.currency === 'MAD' && p.sizes[defaultSize(id)] === 45 || p.family === filter));
  $('#product-grid').innerHTML = matches.map(([id, p]) => {
    const size = defaultSize(id);
    return `<article class="product-card ${id}${p.brand ? ' brand-card' : ''}" data-card="${id}"><div class="card-heading"><span class="card-brand">${p.brand || 'OREYN SIGNATURE'}</span><h3><button data-product="${id}" aria-label="Explore ${p.name}">${p.cardName || p.name}</button></h3><p>${p.notes}</p></div>${saveButton(id)}<button class="card-photo" data-product="${id}" aria-label="Explore ${p.name}">${bottleMarkup(id)}<svg class="card-photo-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></button><div class="card-purchase"><div class="card-price${p.currency === 'MAD' ? ' confirmed-price' : ''}"><strong>${productMoney(id, p.sizes[size])}</strong><span>${sizeText(size)}</span></div><button class="card-bag" data-add="${id}" data-size="${size}" aria-label="Add ${p.name}, ${sizeText(size)}, to bag">Add to bag <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></svg></button></div></article>`;
  }).join('') || '<div class="empty-state"><h3>A feeling worth keeping.</h3><p>Tap a heart on any scent to keep it here.</p><button class="pill dark" data-filter="all">Explore the collection <span>↗︎</span></button></div>';
  prepareCarousel();
  $('#saved-count').textContent = saved.size;
  $('.filters [data-filter="all"] span').textContent = String(Object.keys(products).filter(id => id !== 'discovery').length).padStart(2, '0');
  $$('.filters [data-filter]').forEach(button => { const active = button.dataset.filter === filter; button.classList.toggle('active', active); button.setAttribute('aria-pressed', active); });
  syncMobileFilter();
  if (animate) animateFilteredCards();
}
function syncMobileFilter() {
  const select = $('#mobile-scent-filter');
  if (!select) return;
  select.value = filter;
  select.querySelector('[value="all"]').textContent = `All scents (${Object.keys(products).length - 1})`;
  select.querySelector('[value="saved"]').textContent = `Saved (${saved.size})`;
}
function focusCollectionFilter() {
  const mobileSelect = $('#mobile-scent-filter');
  const target = mobileSelect?.getClientRects().length ? mobileSelect : $(`.filters [data-filter="${filter}"]`);
  target?.focus({ preventScroll: true });
}
function setCollectionFilter(next) {
  if (!['all', '45dh', 'fresh', 'woody', 'floral', 'soft', 'saved'].includes(next)) return;
  if (filter === next) { prepareCarousel(); return; }
  filter = next;
  renderProducts(true);
}
function toggleSave(id, trigger) {
  const gridFocused = Boolean(document.activeElement?.closest('#product-grid'));
  saved.has(id) ? saved.delete(id) : saved.add(id);
  persist('oreyn-saved', [...saved]);
  // Keep the tapped heart and carousel position stable while its fill animates.
  if (filter === 'saved') renderProducts();
  else $('#saved-count').textContent = saved.size;
  syncMobileFilter();
  const savedCard = $(`[data-card="${id}"]`);
  if (filter === 'saved' && gridFocused && savedCard) {
    $('#product-grid').scrollLeft = savedCard.offsetLeft - $('#product-grid').firstElementChild.offsetLeft;
    syncCarousel();
  }
  $$(`[data-save="${id}"]`).forEach(button => {
    button.setAttribute('aria-pressed', saved.has(id));
    button.setAttribute('aria-label', `${saved.has(id) ? 'Unsave' : 'Save'} ${products[id].name}`);
  });
  if (filter === 'saved' && gridFocused) {
    const nextHeart = $(`#product-grid [data-save="${id}"]`);
    if (nextHeart) nextHeart.focus({ preventScroll: true });
    else focusCollectionFilter();
  }
  if (trigger) animateSavedHeart(trigger.isConnected ? trigger : $(`#product-grid [data-save="${id}"]`), saved.has(id));
  notify(saved.has(id) ? `${products[id].name} saved to your collection` : `${products[id].name} removed from saved scents`);
}
function detailAddMarkup(added = false) {
  return added ? 'Added <span aria-hidden="true">✓</span>' : 'Add to bag <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></svg>';
}
function renderComparison() {
  compareIds.forEach((id, slot) => {
    const select = $(`[data-compare-slot="${slot}"]`);
    select.innerHTML = Object.entries(products).filter(([key]) => key !== 'discovery').map(([key, p]) => `<option value="${key}" ${key === id ? 'selected' : ''} ${key === compareIds[1 - slot] ? 'disabled' : ''}>${p.name}</option>`).join('');
  });
  const row = (label, values) => `<tr><th scope="row">${label}</th>${values.map(value => `<td>${value}</td>`).join('')}</tr>`;
  $('#compare-content').innerHTML = `<div class="compare-photos">${compareIds.map(id => `<div class="compare-photo ${id}">${bottleMarkup(id)}</div>`).join('')}</div>
    <table class="compare-table"><caption class="sr-only">Fragrance prices, sizes, and scent notes</caption><thead><tr><td></td>${compareIds.map(id => `<th scope="col">${products[id].name}</th>`).join('')}</tr></thead><tbody>
    ${row('Price', compareIds.map((id, slot) => `<strong>${productMoney(id, products[id].sizes[compareSizes[slot]])}</strong>`))}
    ${row('Size', compareIds.map((id, slot) => compareSizes[slot] === 'unit' ? 'Size to confirm' : `<select data-compare-size="${slot}" aria-label="Size for ${products[id].name}">${Object.keys(products[id].sizes).map(size => `<option value="${size}" ${size === compareSizes[slot] ? 'selected' : ''}>${sizeText(size)}</option>`).join('')}</select>`))}
    ${['Opening', 'Heart', 'Base'].map((label, index) => row(label, compareIds.map(id => products[id][['top', 'heart', 'base'][index]]))).join('')}
    </tbody></table><div class="compare-actions">${compareIds.map((id, slot) => `<button class="pill dark" data-add="${id}" data-size="${compareSizes[slot]}" aria-label="Add ${products[id].name}, ${sizeText(compareSizes[slot])}, to bag">Add to bag <span aria-hidden="true">+</span></button>`).join('')}</div>
    <p class="compare-note">${compareIds.some(id => products[id].brand) ? 'Catalogue photos. Offered volume and presentation to confirm.' : 'Choose a size to compare its price.'}</p><button class="compare-view-bag" data-view-bag hidden>View your bag <span aria-hidden="true">↗︎</span></button>`;
}
function openComparison(id) {
  if ($('#product-dialog').open && location.hash.startsWith('#scent/')) history.replaceState(null, '', location.pathname + location.search);
  if (id && products[id] && id !== 'discovery') {
    compareIds[0] = id;
    if (compareIds[1] === id) compareIds[1] = Object.keys(products).find(key => key !== id && key !== 'discovery');
    compareSizes = compareIds.map(defaultSize);
  }
  renderComparison();
  $('#compare-status').textContent = '';
  openModal('#compare-dialog');
}
function emptyBagMarkup() {
  return `<div class="bag-empty"><div class="bag-empty-art" aria-hidden="true"><span class="bag-empty-halo"></span><svg viewBox="0 0 120 120" fill="none"><path d="M30 43h60l6 61H24l6-61Z" stroke="currentColor" stroke-width="2"/><path d="M43 47V31a17 17 0 0 1 34 0v16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M57 68v15M50 75h14" stroke="currentColor" stroke-width="1.5"/></svg><i class="gold"></i><i class="lavender"></i><i class="sage"></i></div><span class="eyebrow">A LITTLE ROOM FOR YOU</span><h3>Your next scent<br>starts here.</h3><p>Find the fragrance that feels like you.</p><button class="pill dark" data-continue>Explore fragrances <span aria-hidden="true">↗︎</span></button></div>`;
}
function openProductImage(id, trigger) {
  if (!productImages[id] || !$('#product-dialog').open) return;
  const dialog = $('#image-dialog'), image = $('#enlarged-product-photo');
  dialog.oreynZoomSession?.animations.forEach(animation => animation.cancel());
  dialog.oreynZoomSession = { trigger, animations: [], closing: false };
  image.src = productImages[id].src;
  image.alt = productImages[id].alt;
  image.width = productImages[id].width || 1024;
  image.height = productImages[id].height || 1280;
  $('#image-dialog-title').textContent = products[id].name;
  dialog.showModal(); dialog.scrollTop = 0;
  if (!reducedMotion.matches && !window.oreynMotionPaused && typeof image.animate === 'function') {
    dialog.oreynZoomSession.animations = [
      dialog.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: 'ease-out' }),
      image.animate([{ opacity: .5, transform: 'scale(.94)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 260, easing: 'cubic-bezier(.22,1,.36,1)' })
    ];
  }
}
function closeProductImage(restoreFocus = true, immediate = false) {
  const dialog = $('#image-dialog'), session = dialog.oreynZoomSession;
  if (!dialog.open || !session || session.closing && !immediate) return;
  session.closing = true;
  session.animations.forEach(animation => animation.cancel());
  const finish = () => {
    if (dialog.oreynZoomSession !== session) return;
    dialog.oreynZoomSession = null;
    dialog.close(); session.animations.forEach(animation => animation.cancel());
    if (restoreFocus && $('#product-dialog').open && $$('dialog[open]').length === 1 && session.trigger?.isConnected) session.trigger.focus({ preventScroll: true });
  };
  if (immediate || reducedMotion.matches || window.oreynMotionPaused || typeof dialog.animate !== 'function') { finish(); return; }
  const animation = dialog.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, easing: 'ease-in' });
  session.animations = [animation];
  animation.finished.then(finish, finish);
}
function openProduct(id, updateUrl = true) {
  if (!products[id] || id === 'discovery') return;
  detailId = id; detailSize = defaultSize(id); const p = products[id];
  $('#product-detail').innerHTML = `<div class="product-detail-grid">
    <div class="detail-art ${id}"><span class="eyebrow">${p.number} / OREYN COLLECTION</span><button class="detail-image-button" data-zoom-product="${id}" aria-label="Enlarge ${p.name} photo" aria-haspopup="dialog" aria-controls="image-dialog">${bottleMarkup(id)}<span class="detail-zoom-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5M10 7v6M7 10h6"/></svg>View larger</span></button></div>
    <div class="detail-content"><span class="eyebrow">${p.brand || 'OREYN / slice of life'}</span><h2>${p.cardName || p.name}</h2><p class="detail-lede">${p.tagline}</p>
      <dl class="scent-profile"><div><dt>Opening</dt><dd>${p.top}</dd></div><div><dt>Heart</dt><dd>${p.heart}</dd></div><div><dt>Base</dt><dd>${p.base}</dd></div></dl>
      ${detailSize === 'unit' ? '<p class="detail-format-note">Catalogue image. Volume and presentation to confirm.</p>' : `<div class="detail-format"><span class="size-label">CHOOSE YOUR SIZE</span><div class="size-options" role="group" aria-label="Bottle size">${Object.keys(p.sizes).map(size => `<button data-detail-size="${size}" class="${size === detailSize ? 'active' : ''}" aria-pressed="${size === detailSize}">${sizeText(size)}</button>`).join('')}</div></div>`}
      <details class="detail-about"><summary>About this scent <span aria-hidden="true">+</span></summary><p class="detail-description">${p.description}</p>${p.brand ? `<a class="text-link fragrance-source" href="${p.source}" target="_blank" rel="noopener noreferrer">Fragrance profile from the brand ↗︎</a>` : ''}</details>
      <div class="detail-links"><button data-open-compare="${id}" aria-haspopup="dialog" aria-controls="compare-dialog">Compare this scent <span aria-hidden="true">↗︎</span></button><button data-share="${id}">Copy scent link <span aria-hidden="true">↗︎</span></button>${p.brand ? '' : '<button data-discovery-link>Explore the OREYN Trio <span aria-hidden="true">↗︎</span></button>'}<button class="detail-view-bag" id="detail-view-bag" data-view-bag hidden>View your bag <span aria-hidden="true">↗︎</span></button></div>
    </div></div>
    <div class="detail-purchase-bar"><div class="detail-price-block"><small id="detail-volume">${sizeText(detailSize)}</small><strong id="detail-price" aria-live="polite">${productMoney(id, p.sizes[detailSize])}</strong></div><button class="pill dark" id="detail-add" data-add="${id}" data-size="${detailSize}" aria-label="Add ${p.name}, ${sizeText(detailSize)}, to bag">${detailAddMarkup()}</button>${saveButton(id)}</div>`;
  $('#product-dialog').setAttribute('aria-label', `${p.name} fragrance details`);
  openModal('#product-dialog'); if (updateUrl) history.replaceState(null, '', `#scent/${id}`);
}
function cartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + products[item.id].sizes[item.size] * item.quantity, 0);
  return { subtotal, total: subtotal };
}
function animateAddedProduct(id, trigger) {
  const bag = $('#open-bag');
  if (!bag || reducedMotion.matches || window.oreynMotionPaused || typeof bag.animate !== 'function') return;
  // Keep the effect above native dialogs without taking focus or intercepting taps.
  const layer = document.createElement('div');
  layer.className = 'bag-flight-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.setAttribute('popover', 'manual');
  const modal = trigger.closest('dialog');
  (typeof layer.showPopover === 'function' ? document.body : modal || document.body).append(layer);
  const cleanup = () => { reducedMotion.removeEventListener('change', cleanup); layer.remove(); };
  try {
    if (typeof layer.showPopover === 'function') layer.showPopover();
    // Rapid taps still add every item; only the three newest visual flights remain.
    $$('.bag-flight-layer').slice(0, -3).forEach(el => el.remove());
    reducedMotion.addEventListener('change', cleanup);
    const photo = trigger.closest('.product-card, #product-detail, .trio-feature')?.querySelector('.card-photo, .detail-art, .discovery-photo');
    const photoRect = photo?.getBoundingClientRect();
    const buttonRect = trigger.getBoundingClientRect();
    const target = bag.getBoundingClientRect();
    const headerBottom = $('.site-header').getBoundingClientRect().bottom;
    const visiblePhoto = photoRect && photoRect.bottom > headerBottom && photoRect.top < innerHeight && photoRect.right > 0 && photoRect.left < innerWidth;
    const origin = visiblePhoto ? photoRect : buttonRect;
    const startX = Math.max(36, Math.min(innerWidth - 36, origin.left + origin.width / 2));
    const startY = visiblePhoto ? (Math.max(origin.top, headerBottom) + Math.min(origin.bottom, innerHeight)) / 2 : origin.top + origin.height / 2;
    const endX = target.left + target.width / 2, endY = target.top + target.height / 2;
    const flyer = document.createElement('img');
    flyer.className = 'bag-flight-photo';
    flyer.src = productImages[id].src;
    flyer.alt = '';
    flyer.draggable = false;
    layer.append(flyer);
    if (modal) {
      const destination = document.createElement('span');
      destination.className = 'bag-flight-target';
      destination.style.left = `${endX - 22}px`;
      destination.style.top = `${endY - 22}px`;
      destination.append(bag.querySelector('svg').cloneNode(true));
      layer.append(destination);
    }
    const flight = flyer.animate([
      { transform: `translate(${startX - 36}px, ${startY - 44}px) scale(1) rotate(-6deg)`, opacity: 0.95 },
      { transform: `translate(${(startX + endX) / 2 - 36}px, ${Math.max(16, (startY + endY) / 2 - 110)}px) scale(.7) rotate(8deg)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${endX - 36}px, ${endY - 44}px) scale(.14) rotate(0deg)`, opacity: 0 }
    ], { duration: 720, easing: 'ease-in-out', fill: 'forwards' });
    flight.finished.then(() => {
      if (!layer.isConnected || reducedMotion.matches) return;
      bag.querySelector('svg').animate([{ transform: 'scale(1)' }, { transform: 'scale(1.22)', offset: .4 }, { transform: 'scale(1)' }], { duration: 300, easing: 'ease-out' });
      $('#bag-count').animate([{ background: 'var(--orange)', transform: 'scale(1.15)' }, { background: 'var(--ink)', transform: 'scale(1)' }], { duration: 400, easing: 'ease-out' });
    }).catch(() => {}).finally(cleanup);
  } catch { cleanup(); /* Decorative motion must never interrupt adding an item. */ }
}
function addToCart(id, size, trigger) {
  if (!products[id] || !Object.hasOwn(products[id].sizes, size)) return;
  const item = cart.find(item => item.id === id && item.size === size);
  if (item?.quantity === 99) { notify('Maximum 99 of each size per bag.'); return; }
  item ? item.quantity++ : cart.push({ id, size, quantity: 1 }); renderBag(); notify(`${products[id].name} added to your bag`, true); const bagLink = $('#detail-view-bag'); if (bagLink) bagLink.hidden = false;
  if (trigger) animateAddedProduct(id, trigger);
  if ($('#compare-dialog').open) {
    $('#compare-status').textContent = `${products[id].name}, ${sizeText(size)}, added to your bag. Bag quantity: ${cart.reduce((sum, entry) => sum + entry.quantity, 0)}.`;
    $('#compare-content [data-view-bag]').hidden = false;
  }
  const button = $('#detail-add'); if (button && $('#product-dialog').open) {
    clearTimeout(button.oreynAddedTimer); button.innerHTML = detailAddMarkup(true);
    button.oreynAddedTimer = setTimeout(() => { if (button.isConnected) button.innerHTML = detailAddMarkup(); }, 1200);
  }
}
function renderBag() {
  const previousTotals = new Map($$('#bag-summary [data-bag-total]').map(el => [el.dataset.bagTotal, { value: el.dataset.value, text: el.querySelector('.bag-total-value').textContent }]));
  $('#bag-summary').oreynTotalAnimations?.forEach(animation => animation.cancel());
  persist('oreyn-cart-v2', cart); const count = cart.reduce((sum, item) => sum + item.quantity, 0); const t = cartTotals();
  $('#bag-count').textContent = count; $('#drawer-count').textContent = `(${count})`; $('#bag-dialog .bag-bottom').hidden = count === 0; $('#checkout-button').disabled = count === 0;
  $('#bag-items').innerHTML = cart.map((item, index) => { const p = products[item.id]; return `<div class="bag-row"><div class="bag-thumb ${item.id}">${bottleMarkup(item.id, item.size)}</div><div><h3>${p.name}</h3><small>${sizeText(item.size)} / ${item.id === 'discovery' ? 'THREE FRAGRANCES' : p.brand || 'EAU DE PARFUM'}</small><div class="quantity"><button data-quantity="${index}" data-delta="-1" aria-label="Remove one ${p.name}, ${sizeText(item.size)}">−</button><span>${item.quantity}</span><button data-quantity="${index}" data-delta="1" aria-label="Add one ${p.name}, ${sizeText(item.size)}" ${item.quantity >= 99 ? 'disabled' : ''}>+</button><button class="remove-item" data-remove="${index}" aria-label="Remove ${p.name}, ${sizeText(item.size)}, from bag">Remove</button></div></div><span class="price">${productMoney(item.id, p.sizes[item.size] * item.quantity)}</span></div>`; }).join('') || emptyBagMarkup();
  $('#bag-summary').innerHTML = count ? `<div class="summary-line total"><span>Total (MAD)</span><span class="bag-total-amount" data-bag-total="MAD" data-value="${t.total}"><span class="bag-total-value">${dirham(t.total)}</span></span></div>` : '';
  animateBagTotals(previousTotals);
}
function animateBagTotals(previousTotals) {
  const summary = $('#bag-summary');
  summary.oreynTotalAnimations = [];
  if (!$('#bag-dialog').open) return;
  const amounts = $$('#bag-summary [data-bag-total]');
  if (amounts.length !== previousTotals.size || amounts.some(el => previousTotals.get(el.dataset.bagTotal)?.value !== el.dataset.value)) {
    $('#bag-total-status').textContent = amounts.length ? 'Bag totals updated: ' + amounts.map(el => el.querySelector('.bag-total-value').textContent).join('; ') + '.' : 'Your bag is empty.';
  }
  if (reducedMotion.matches || window.oreynMotionPaused) return;
  amounts.forEach(amount => {
    const previous = previousTotals.get(amount.dataset.bagTotal);
    if (!previous || previous.value === amount.dataset.value) return;
    const value = amount.querySelector('.bag-total-value');
    if (typeof value.animate !== 'function') return;
    const ghost = document.createElement('span');
    ghost.className = 'bag-total-old';
    ghost.textContent = previous.text;
    ghost.setAttribute('aria-hidden', 'true');
    amount.append(ghost);
    const animations = [
      ghost.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-4px)' }], { duration: 120, easing: 'ease-out', fill: 'forwards' }),
      value.animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 180, delay: 120, easing: 'ease-out', fill: 'backwards' })
    ];
    summary.oreynTotalAnimations.push(...animations);
    Promise.all(animations.map(animation => animation.finished)).catch(() => {}).finally(() => { ghost.remove(); animations.forEach(animation => animation.cancel()); });
  });
}
function continueShopping() { $$('dialog[open]').forEach(closeModal); $('#collection').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }
function scrollToPageSection(selector) {
  const target = selector === '#' ? document.documentElement : $(selector);
  if (!target) return;
  closeMenu();
  if (selector === '#') window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  else {
    target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
    const heading = target.querySelector('h2');
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
  }
  if (location.hash) history.replaceState(null, '', `${location.pathname}${location.search}`);
}
function openCheckout() {
  if (!cart.length) return; const t = cartTotals();
  const summary = `<div class="summary-line total"><span>Total (MAD)</span><span>${dirham(t.total)}</span></div>`;
  $('#checkout-content').innerHTML = `<p class="checkout-intro">A look at your next chapter. This is a concept-store preview: no order is placed, no payment is taken, and nothing is sent to a server.</p><div class="checkout-lines">${cart.map(item => `<div class="checkout-product"><div>${products[item.id].name}<small>${sizeText(item.size)} · Quantity ${item.quantity}</small></div><span>${productMoney(item.id, products[item.id].sizes[item.size] * item.quantity)}</span></div>`).join('')}${summary}</div><form class="checkout-form" id="preview-form"><label for="preview-name">Make this preview yours (optional first name)</label><input id="preview-name" placeholder="Your first name" autocomplete="off" maxlength="40"><button class="pill dark full-width" type="submit">Finish my preview <span>↗︎</span></button></form>`;
  openModal('#checkout-dialog');
  $('#preview-form').addEventListener('submit', event => { event.preventDefault(); const name = $('#preview-name').value.trim(); $('#checkout-content').innerHTML = '<div class="preview-success"><span class="star-mark">✳</span><h3 id="preview-title"></h3><p>Your preview is complete. Your chosen scents are still saved in your bag, ready for your next visit.</p><p>No order has been placed and no personal details have been saved.</p><button class="pill dark" data-continue>Back to your world <span>↗︎</span></button></div>'; $('#preview-title').textContent = name ? `A little more you, ${name}.` : 'A little more you.'; $('#preview-title').tabIndex = -1; $('#preview-title').focus(); });
}
const questions = [
  { title: 'What does your kind of day feel like?', choices: [['solar', 'Wide open.', 'Bright energy. Windows down. Anything could happen.'], ['after', 'A little unexpected.', 'Depth, intrigue, and a plan that changes.'], ['soft', 'Beautifully unhurried.', 'Quiet comforts. Room to breathe.']] },
  { title: 'Choose somewhere to disappear.', choices: [['soft', 'A sunlit room.', 'Linen sheets, a book, and no notifications.'], ['solar', 'A citrus grove.', 'Warm air, green leaves, and a glimpse of the sea.'], ['after', 'The city after midnight.', 'Low lights, good company, one more conversation.']] },
  { title: 'What would you like to leave behind?', choices: [['after', 'A little mystery.', 'An unexpected presence that stays in the memory.'], ['soft', 'A sense of closeness.', 'Something soft and quietly familiar.'], ['solar', 'A little light.', 'An easy warmth that brightens the room.']] }
];
let quizAnswers = [];
function renderQuiz() {
  const step = quizAnswers.length;
  if (step === questions.length) {
    const scores = { solar: 0, after: 0, soft: 0 }; quizAnswers.forEach(id => scores[id]++);
    const winner = Object.keys(scores).sort((a, b) => scores[b] - scores[a] || quizAnswers.lastIndexOf(b) - quizAnswers.lastIndexOf(a))[0]; const p = products[winner];
    $('#quiz-content').innerHTML = `<div class="quiz-result"><span class="eyebrow">YOUR INSTINCT LED YOU HERE</span><h2>${p.name}</h2><span class="detail-tagline">${p.tagline}</span><div class="result-art ${winner}">${bottleMarkup(winner)}</div><p>${p.description}</p><button class="pill dark" data-product="${winner}">Meet your match <span>↗︎</span></button><p class="small-note" style="margin-top:18px">A starting point based on your answers. Your skin gets the final say.</p><button class="quiz-back" data-quiz-restart>Follow a different feeling — start again</button></div>`;
  } else { const question = questions[step]; $('#quiz-content').innerHTML = `<div class="quiz-progress" aria-hidden="true">${questions.map((_, i) => `<i class="${i <= step ? 'done' : ''}"></i>`).join('')}</div><span class="quiz-step">QUESTION 0${step + 1} / 03</span><h2 tabindex="-1" id="quiz-question">${question.title}</h2>${question.choices.map(([id, title, description], i) => `<button class="quiz-option" data-quiz-answer="${id}"><span>0${i + 1}</span><div><b>${title}</b><small>${description}</small></div></button>`).join('')}${step ? '<button class="quiz-back" data-quiz-back>← Previous question</button>' : '<p class="small-note" style="margin-top:20px">There are no wrong answers. Go with the first feeling.</p>'}`; }
  if ($('#quiz-dialog').open) { const heading = $('#quiz-content h2'); heading.tabIndex = -1; heading.focus({ preventScroll: true }); $('#quiz-dialog').scrollTop = 0; }
}
function searchProducts() {
  const query = $('#search-input').value.trim().toLowerCase();
  const matches = Object.entries(products).filter(([, p]) => `${p.name} ${p.notes} ${p.keywords} ${p.top || ''} ${p.heart || ''} ${p.base || ''}`.toLowerCase().includes(query));
  $('#search-results').innerHTML = matches.map(([id, p]) => `<button class="search-result" ${id === 'discovery' ? 'data-discovery-link' : `data-product="${id}"`}><div class="${id}">${bottleMarkup(id)}</div><div><strong>${p.name}</strong><small>${p.notes}</small></div><span>↗︎</span></button>`).join('') || '<p class="search-empty">No scent found just yet. Try a note like “iris” or a feeling like “warm”.</p>';
}
const info = {
  shipping: { title: 'The finer details.', paragraphs: ['OREYN is preparing to launch. Explore the fragrances and build your bag; orders and shipments are not available yet.', 'Delivery fees, delivery times, and return conditions will be confirmed before orders open.'] },
  privacy: { title: 'Your space. Your privacy.', paragraphs: ['This concept site stores your bag and saved fragrances in your browser using localStorage so they can remain available when you return. You can remove individual items or clear the site’s browser data at any time.', 'Search and scent-finder answers stay in this page. The optional name in the order preview is not stored or sent to a server. No newsletter signup is available.', 'Google Fonts supplies the site’s typography and may receive standard connection information such as your IP address. No analytics or advertising scripts have been added.'] },
  terms: { title: 'A note on this experience.', paragraphs: ['Oreyn is an original perfume-store concept. The fragrance compositions, prices, product imagery, and editorial content illustrate a proposed brand experience.', 'Adding items to your bag or completing an order preview does not create an order or a contract. No payment details are requested and no payments are processed.', 'Final product specifications, ingredients, pricing, availability, and sale terms will need to be confirmed before a commercial launch.'] },
  contact: { title: 'Stay in our orbit.', paragraphs: ['The Oreyn world is taking shape. A dedicated customer-care address will be added when the store launches.', 'In the meantime, explore the collection or take the scent finder. We hope you find a little moment that feels like you.'] }
};
function openInfo(id) { const content = info[id]; if (!content) return; $('#editorial-content').innerHTML = `<span class="eyebrow">OREYN / THE DETAILS</span><h2>${content.title}</h2>${content.paragraphs.map(p => `<p>${p}</p>`).join('')}`; openModal('#editorial-dialog'); }
async function swapHeroPhoto(photo, image) {
  photo.oreynSwap?.cancel();
  const stage = photo.parentElement;
  const swap = { animations: [], ghost: null, cancel() {
    swap.animations.forEach(animation => animation.cancel());
    swap.ghost?.remove();
    window.removeEventListener('oreyn-motion', stopMotion);
    if (photo.oreynSwap === swap) photo.oreynSwap = null;
  } };
  const showImage = () => { photo.src = image.src; photo.alt = image.alt; };
  const stopMotion = () => {
    if (reducedMotion.matches || window.oreynMotionPaused) { showImage(); swap.cancel(); }
  };
  photo.oreynSwap = swap;
  window.addEventListener('oreyn-motion', stopMotion);
  try {
    // Decode first so a slow connection never produces an empty bottle stage.
    const incoming = new Image();
    incoming.src = image.src;
    await incoming.decode();
    if (photo.oreynSwap !== swap) return;
    stage.classList.add('has-switched');
    const ghost = photo.cloneNode();
    ghost.removeAttribute('id');
    ghost.alt = '';
    ghost.setAttribute('aria-hidden', 'true');
    ghost.classList.add('hero-photo-outgoing');
    swap.ghost = ghost;
    stage.append(ghost);
    showImage();
    swap.animations = [
      ghost.animate([{ opacity: 1, transform: 'translateY(0) scale(1)' }, { opacity: 0, transform: 'translateY(-8px) scale(.98)' }], { duration: 320, easing: 'ease-in-out', fill: 'forwards' }),
      photo.animate([{ opacity: 0, transform: 'translateY(12px) scale(.97)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }], { duration: 440, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' })
    ];
    await Promise.all(swap.animations.map(animation => animation.finished));
  } catch {
    if (photo.oreynSwap === swap) showImage();
  } finally {
    if (photo.oreynSwap === swap) swap.cancel();
  }
}
function setHero(id) {
  if (!products[id] || id === 'discovery') return;
  const changed = heroId !== id;
  heroId = id;
  const p = products[id];
  $('.hero').dataset.active = id;
  $('#hero-name').textContent = p.name;
  const photo = $('#hero-bottle-photo');
  if (changed && typeof photo.animate === 'function' && !matchMedia('(prefers-reduced-motion: reduce)').matches && !window.oreynMotionPaused) {
    swapHeroPhoto(photo, productImages[id]);
  } else if (changed || typeof photo.animate !== 'function') {
    photo.oreynSwap?.cancel();
    photo.src = productImages[id].src;
    photo.alt = productImages[id].alt;
  }
  $$('[data-hero]').forEach(button => {
    const active = button.dataset.hero === id;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  $('#hero-status').textContent = p.name + ' selected.';
}
let menuScrollY = 0;
function closeMenu(restoreFocus = false) {
  const nav = $('#mobile-nav'), toggle = $('#menu-toggle');
  const wasOpen = !nav.hidden;
  nav.oreynMenuAnimations?.forEach(animation => animation.cancel());
  nav.oreynMenuAnimations = [];
  nav.hidden = true;
  document.body.classList.remove('menu-open');
  document.documentElement.classList.remove('menu-open');
  document.body.style.removeProperty('--menu-scroll-offset');
  $$('main, footer, .announcement, .site-header').forEach(element => { element.inert = false; });
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  if (wasOpen) window.scrollTo({ top: menuScrollY, behavior: 'instant' });
  if (restoreFocus) toggle.focus({ preventScroll: true });
}
function animateMenu(nav) {
  if (reducedMotion.matches || window.oreynMotionPaused || typeof nav.animate !== 'function') return;
  nav.oreynMenuAnimations = [...nav.querySelectorAll('.menu-intro, .menu-search, .mobile-nav-links > *, .menu-shortcuts > *, .menu-footer')].map((item, index) => item.animate([
    { opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 300, delay: index * 28, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }));
  nav.querySelectorAll('.menu-close-line').forEach((line, index) => {
    nav.oreynMenuAnimations.push(line.animate([{ transform: 'none' }, { transform: `translateY(${index ? -3 : 3}px) rotate(${index ? -45 : 45}deg)` }], { duration: 220, easing: 'ease-in-out' }));
  });
}
function openMenu() {
  const nav = $('#mobile-nav'), toggle = $('#menu-toggle');
  if (!nav.hidden || innerWidth > 760) return;
  menuScrollY = window.scrollY;
  document.body.style.setProperty('--menu-scroll-offset', -menuScrollY + 'px');
  nav.hidden = false;
  document.body.classList.add('menu-open');
  document.documentElement.classList.add('menu-open');
  $$('main, footer, .announcement, .site-header').forEach(element => { element.inert = true; });
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close navigation');
  nav.querySelector('.mobile-nav-content').scrollTop = 0;
  animateMenu(nav);
  requestAnimationFrame(() => { if (!nav.hidden) nav.querySelector('[data-menu-close]').focus({ preventScroll: true }); });
}

document.addEventListener('click', async event => {
  const button = event.target.closest('button, a'); if (!button) return;
  const pageAnchor = button.matches('a[href^="#"]') ? button.getAttribute('href') : null;
  if (pageAnchor !== null) { event.preventDefault(); scrollToPageSection(pageAnchor); }
  if (button.hasAttribute('data-menu-close')) closeMenu(true);
  if (button.dataset.menuFilter) { setCollectionFilter(button.dataset.menuFilter); scrollToPageSection('#collection'); }
  if (button.hasAttribute('data-close')) closeModal(button.closest('dialog'));
  if (button.dataset.filter) {
    setCollectionFilter(button.dataset.filter);
    if (!button.isConnected) focusCollectionFilter();
  }
  if (button.dataset.save) toggleSave(button.dataset.save, button);
  if (button.dataset.product) openProduct(button.dataset.product);
  if (button.hasAttribute('data-open-compare')) openComparison(button.dataset.openCompare);
  if (button.dataset.zoomProduct) openProductImage(button.dataset.zoomProduct, button);
  if (button.dataset.add) addToCart(button.dataset.add, button.dataset.size, button);
  if (button.dataset.hero) setHero(button.dataset.hero);
  if (button.hasAttribute('data-open-quiz')) { quizAnswers = []; renderQuiz(); openModal('#quiz-dialog'); }
  if (button.hasAttribute('data-open-search')) { $('#search-input').value = ''; searchProducts(); openModal('#search-dialog'); $('#search-input').focus(); }
  if (button.dataset.detailSize) {
    detailSize = button.dataset.detailSize;
    $$('.size-options button').forEach(el => { const active = el.dataset.detailSize === detailSize; el.classList.toggle('active', active); el.setAttribute('aria-pressed', active); });
    const add = $('#detail-add'); clearTimeout(add.oreynAddedTimer);
    add.dataset.size = detailSize; add.innerHTML = detailAddMarkup();
    add.setAttribute('aria-label', `Add ${products[detailId].name}, ${sizeText(detailSize)}, to bag`);
    $('#detail-price').textContent = productMoney(detailId, products[detailId].sizes[detailSize]);
    $('#detail-volume').textContent = sizeText(detailSize);
  }
  if (button.hasAttribute('data-quantity')) { const index = Number(button.dataset.quantity); const delta = Number(button.dataset.delta); if (cart[index]) { cart[index].quantity = Math.min(99, cart[index].quantity + delta); if (cart[index].quantity <= 0) cart.splice(index, 1); renderBag(); const next = $(`[data-quantity="${index}"][data-delta="${delta}"]:not(:disabled)`) || $('#bag-items [data-continue]') || $('#continue-shopping'); next?.focus({ preventScroll: true }); } }
  if (button.hasAttribute('data-remove')) { cart.splice(Number(button.dataset.remove), 1); renderBag(); ($('#bag-items [data-continue]') || $('#continue-shopping')).focus({ preventScroll: true }); }
  if (button.dataset.quizAnswer && quizAnswers.length < 3) { quizAnswers.push(button.dataset.quizAnswer); renderQuiz(); }
  if (button.hasAttribute('data-quiz-back')) { quizAnswers.pop(); renderQuiz(); }
  if (button.hasAttribute('data-quiz-restart')) { quizAnswers = []; renderQuiz(); }
  if (button.hasAttribute('data-continue')) continueShopping();
  if (button.hasAttribute('data-view-bag')) { renderBag(); openModal('#bag-dialog'); $('#toast').classList.remove('visible'); }
  if (button.hasAttribute('data-discovery-link')) { $$('dialog[open]').forEach(closeModal); scrollToPageSection('#discovery'); }
  if (button.dataset.info) openInfo(button.dataset.info);
  if (button.dataset.share) { const url = `${location.origin}${location.pathname}#scent/${button.dataset.share}`; try { await navigator.clipboard.writeText(url); button.textContent = 'Link copied ✓'; } catch { button.textContent = 'Use the scent URL in your address bar'; } }
  if (button.closest('#mobile-nav')) closeMenu();
});
document.addEventListener('change', event => {
  const select = event.target;
  if (select.id === 'mobile-scent-filter') setCollectionFilter(select.value);
  if (select.hasAttribute('data-compare-slot')) {
    const slot = Number(select.dataset.compareSlot), id = select.value;
    if (!products[id] || id === 'discovery' || id === compareIds[1 - slot]) return;
    compareIds[slot] = id; compareSizes[slot] = defaultSize(id); renderComparison();
    select.focus({ preventScroll: true });
    $('#compare-status').textContent = `Comparing ${products[compareIds[0]].name} and ${products[compareIds[1]].name}.`;
  }
  if (select.hasAttribute('data-compare-size')) {
    const slot = Number(select.dataset.compareSize);
    if (!Object.hasOwn(products[compareIds[slot]].sizes, select.value)) return;
    compareSizes[slot] = select.value; renderComparison();
    $(`[data-compare-size="${slot}"]`).focus({ preventScroll: true });
    $('#compare-status').textContent = `${products[compareIds[slot]].name}, ${sizeText(compareSizes[slot])}, ${productMoney(compareIds[slot], products[compareIds[slot]].sizes[compareSizes[slot]])}.`;
  }
});
$('#open-bag').addEventListener('click', () => { renderBag(); openModal('#bag-dialog'); });
$('#continue-shopping').addEventListener('click', continueShopping);
$('#checkout-button').addEventListener('click', openCheckout);
$('#hero-details').addEventListener('click', () => openProduct(heroId));
$('#search-input').addEventListener('input', searchProducts);
$('#menu-toggle').addEventListener('click', () => { if ($('#mobile-nav').hidden) openMenu(); else closeMenu(true); });
$('#mobile-nav').addEventListener('focusin', event => {
  // Keyboard users see the focused link immediately, even during the stagger.
  $('#mobile-nav').oreynMenuAnimations?.forEach(animation => {
    if (animation.effect?.target.contains(event.target)) animation.cancel();
  });
});
window.addEventListener('resize', () => { if (innerWidth > 760) closeMenu(); });
document.addEventListener('keydown', event => {
  if ($('#mobile-nav').hidden) return;
  if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); }
  if (event.key === 'Tab') {
    const controls = $$('#mobile-nav a, #mobile-nav button');
    const index = controls.indexOf(document.activeElement);
    if (event.shiftKey && index <= 0) { event.preventDefault(); controls.at(-1).focus(); }
    else if (!event.shiftKey && (index === -1 || index === controls.length - 1)) { event.preventDefault(); controls[0].focus(); }
  }
});
document.addEventListener('touchmove', event => { if (!$('#mobile-nav').hidden && !event.target.closest('#mobile-nav')) event.preventDefault(); }, { passive: false });
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
window.oreynMotionPaused = reducedMotion.matches;
function updateMotion() { document.body.classList.toggle('motion-paused', window.oreynMotionPaused); $('#motion-toggle').setAttribute('aria-pressed', String(window.oreynMotionPaused)); $('#motion-label').textContent = window.oreynMotionPaused ? 'RESUME MOTION' : 'PAUSE MOTION'; window.dispatchEvent(new Event('oreyn-motion')); }
window.addEventListener('oreyn-motion', () => {
  if (!reducedMotion.matches && !window.oreynMotionPaused) return;
  stopFilterTransition();
  $('#mobile-nav').oreynMenuAnimations?.forEach(animation => animation.cancel());
  $('#bag-summary').oreynTotalAnimations?.forEach(animation => animation.cancel());
  $('#image-dialog').oreynZoomSession?.animations.forEach(animation => animation.cancel());
  $$('.bag-total-old').forEach(el => el.remove());
});
// Tilt the photography stage, leaving selectors and text in their normal flow.
const heroStage = $('.hero-cinema');
let heroPointer = null, heroFrame = 0, heroPosition;
function resetHeroTilt() {
  cancelAnimationFrame(heroFrame); heroFrame = 0; heroPointer = null;
  heroStage?.classList.remove('is-following');
  heroStage?.style.removeProperty('--bottle-rotate-x');
  heroStage?.style.removeProperty('--bottle-rotate-y');
}
function followHeroPointer(event) {
  if (!heroStage || reducedMotion.matches || window.oreynMotionPaused || !event.isPrimary || (event.pointerType !== 'mouse' && event.pointerId !== heroPointer)) return;
  const bounds = heroStage.getBoundingClientRect();
  heroPosition = {
    x: Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)),
    y: Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height))
  };
  if (heroFrame) return;
  heroFrame = requestAnimationFrame(() => {
    heroFrame = 0;
    heroStage.style.setProperty('--bottle-rotate-x', `${(.5 - heroPosition.y) * 5}deg`);
    heroStage.style.setProperty('--bottle-rotate-y', `${(heroPosition.x - .5) * 7}deg`);
    heroStage.classList.add('is-following');
  });
}
if (heroStage) {
  // Passive listeners let the browser keep native scrolling and pinch zoom.
  heroStage.addEventListener('pointerdown', event => { if (event.isPrimary) { heroPointer = event.pointerId; followHeroPointer(event); } }, { passive: true });
  heroStage.addEventListener('pointermove', followHeroPointer, { passive: true });
  for (const event of ['pointerup', 'pointercancel', 'pointerleave']) heroStage.addEventListener(event, resetHeroTilt, { passive: true });
  window.addEventListener('scroll', resetHeroTilt, { passive: true });
  window.addEventListener('blur', resetHeroTilt);
  window.addEventListener('oreyn-motion', () => { if (reducedMotion.matches || window.oreynMotionPaused) resetHeroTilt(); });
}
const trioTilt = $('.discovery-tilt');
let trioVisible = false, trioShinePlayed = false;
function playTrioShine() {
  if (!trioTilt || !trioVisible || trioShinePlayed || document.hidden || reducedMotion.matches || window.oreynMotionPaused) return;
  trioShinePlayed = true;
  trioTilt.classList.add('is-shining');
}
if (trioTilt) {
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      trioVisible = entries[0].isIntersecting && entries[0].intersectionRatio >= .35;
      if (!trioVisible) trioTilt.classList.remove('is-shining');
      playTrioShine();
    }, { threshold: [0, .35] }).observe(trioTilt);
  } else { trioVisible = true; playTrioShine(); }
  trioTilt.addEventListener('animationend', event => { if (event.animationName === 'trio-light-sweep') trioTilt.classList.remove('is-shining'); });
  window.addEventListener('oreyn-motion', () => {
    if (reducedMotion.matches || window.oreynMotionPaused) trioTilt.classList.remove('is-shining');
    else playTrioShine();
  });
}
document.addEventListener('visibilitychange', () => {
  resetHeroTilt();
  if (document.hidden) trioTilt?.classList.remove('is-shining');
  else playTrioShine();
});
function resetTrioTilt() {
  if (!trioTilt) return;
  for (const property of ['--trio-rotate-x', '--trio-rotate-y', '--trio-shine-x', '--trio-shine-y']) trioTilt.style.removeProperty(property);
  trioTilt.classList.remove('is-tilting');
}
if (trioTilt) {
  trioTilt.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || reducedMotion.matches || window.oreynMotionPaused) return;
    const bounds = trioTilt.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    trioTilt.style.setProperty('--trio-rotate-x', `${(.5 - y) * 7}deg`);
    trioTilt.style.setProperty('--trio-rotate-y', `${(x - .5) * 9}deg`);
    trioTilt.style.setProperty('--trio-shine-x', `${x * 100}%`);
    trioTilt.style.setProperty('--trio-shine-y', `${y * 100}%`);
    trioTilt.classList.add('is-tilting');
  });
  trioTilt.addEventListener('pointerleave', resetTrioTilt);
  trioTilt.addEventListener('pointercancel', resetTrioTilt);
  window.addEventListener('oreyn-motion', () => { if (window.oreynMotionPaused) resetTrioTilt(); });
}
$('#motion-toggle').addEventListener('click', () => { window.oreynMotionPaused = !window.oreynMotionPaused; updateMotion(); });
reducedMotion.addEventListener('change', () => { window.oreynMotionPaused = reducedMotion.matches; updateMotion(); });
if ('IntersectionObserver' in window && !reducedMotion.matches) { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 }); $$('.reveal').forEach(el => { el.classList.add('ready'); observer.observe(el); }); }
function handleRoute() { const match = location.hash.match(/^#scent\/([a-z0-9-]+)$/); if (match && Object.hasOwn(products, match[1]) && match[1] !== 'discovery') openProduct(match[1], false); else if ($('#product-dialog').open) closeModal($('#product-dialog')); }
window.addEventListener('hashchange', handleRoute);
renderProducts(); renderBag(); updateMotion(); handleRoute();

function carouselCards() { return $$('#product-grid .product-card'); }
function carouselIndex() {
  const cards = carouselCards(), track = $('#product-grid');
  if (!cards.length) return -1;
  let nearest = 0, distance = Infinity;
  cards.forEach((card, index) => {
    const delta = Math.abs(card.offsetLeft - cards[0].offsetLeft - track.scrollLeft);
    if (delta < distance) { nearest = index; distance = delta; }
  });
  return nearest;
}
function syncCarousel() {
  const count = carouselCards().length, index = carouselIndex();
  $('#collection-count').textContent = count ? String(index + 1).padStart(2, '0') + ' / ' + String(count).padStart(2, '0') : '00 / 00';
  $('#collection-count').setAttribute('aria-label', count ? 'Fragrance ' + (index + 1) + ' of ' + count : 'No fragrances');
  $('#scents-previous').disabled = index <= 0;
  $('#scents-next').disabled = index < 0 || index >= count - 1;
}
function sizeCarouselTail() {
  const track = $('#product-grid'), cards = carouselCards();
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  track.style.setProperty('--carousel-tail', cards.length > 1 ? Math.max(0, track.clientWidth - 12 - cards[0].getBoundingClientRect().width - gap) + 'px' : '0px');
  track.classList.toggle('has-many', cards.length > 1);
}
function prepareCarousel() {
  sizeCarouselTail();
  const track = $('#product-grid');
  if (typeof track.scrollTo === 'function') track.scrollTo({ left: 0, behavior: 'instant' });
  else track.scrollLeft = 0;
  syncCarousel();
}
function stepCarousel(direction) {
  const cards = carouselCards();
  if (!cards.length) return;
  const index = Math.max(0, Math.min(cards.length - 1, carouselIndex() + direction));
  $('#product-grid').scrollTo({left: cards[index].offsetLeft - cards[0].offsetLeft, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
}
$('#scents-next').addEventListener('click', () => stepCarousel(1));
$('#scents-previous').addEventListener('click', () => stepCarousel(-1));
$('#product-grid').addEventListener('scroll', syncCarousel, {passive: true});
// A scroll container can retain :focus-visible after a touch on the same element.
document.addEventListener('pointerdown', () => $('#product-grid').classList.add('pointer-focus'), { passive: true });
document.addEventListener('keydown', event => {
  if (!event.altKey && !event.ctrlKey && !event.metaKey) $('#product-grid').classList.remove('pointer-focus');
});
$('#product-grid').addEventListener('keydown', event => {
  if (event.target === $('#product-grid') && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault(); stepCarousel(event.key === 'ArrowRight' ? 1 : -1);
  }
});
window.addEventListener('resize', () => { sizeCarouselTail(); syncCarousel(); });
