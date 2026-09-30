'use strict';
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const money = value => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
const products = {
  'le-male': { name: 'Jean Paul Gaultier Le Male Le Parfum', cardName: 'Le Male Le Parfum', brand: 'Jean Paul Gaultier', number: '004', family: 'woody', descriptor: 'JEAN PAUL GAULTIER', tagline: 'Cardamom, iris, and a warm vanilla finish.', notes: 'Cardamom · Lavender & iris · Vanilla', top: 'Cardamom', heart: 'Lavender, iris', base: 'Vanilla', description: 'A woody fragrance with a spicy opening, a lavender and iris heart, and a warm vanilla base. Contact us to confirm the offered volume and presentation.', keywords: 'jean paul gaultier jpg le male parfum cardamom lavender iris vanilla woody', currency: 'MAD', sizes: { unit: 45 }, source: 'https://www.jeanpaulgaultier.com/ww/en/p/range-le-male/le-male-le-parfum-eau-de-parfum-intense-000000000065156533' },
  'sauvage-elixir': { name: 'Dior Sauvage Elixir', cardName: 'Sauvage Elixir', brand: 'Dior', number: '005', family: 'woody', descriptor: 'DIOR', tagline: 'Spices, lavender, and rich woods.', notes: 'Grapefruit & spices · Lavender · Woods', top: 'Grapefruit, cinnamon, nutmeg, cardamom', heart: 'Lavender', base: 'Rich woods, licorice, vetiver, patchouli', description: 'Spicy grapefruit meets lavender and a rich woody base. Contact us to confirm the offered volume and presentation.', keywords: 'dior sauvage elixir grapefruit spices lavender woods woody', currency: 'MAD', sizes: { unit: 45 }, source: 'https://www.dior.com/en_int/beauty/products/sauvage-elixir-C099700242.html' },
  'libre-le-parfum': { name: 'YSL Libre Le Parfum', cardName: 'Libre Le Parfum', brand: 'Yves Saint Laurent', number: '006', family: 'floral', descriptor: 'YVES SAINT LAURENT', tagline: 'Floral lavender with a warm saffron accent.', notes: 'Saffron · Orange blossom · Lavender', top: 'Bergamot, mandarin, ginger, saffron accord', heart: 'Lavender, orange blossom', base: 'Vetiver, tonka bean, honey accord, vanilla', description: 'Lavender and orange blossom meet a warm saffron accord. Contact us to confirm the offered volume and presentation.', keywords: 'ysl yves saint laurent libre parfum floral saffron orange blossom lavender', currency: 'MAD', sizes: { unit: 45 }, source: 'https://www.yslbeauty.com/int/fragrance/feminine-fragrance/libre/libre-le-parfum/WW-51020YSL.html' },
  solar: { name: 'Solar Drift', number: '001', family: 'fresh', descriptor: 'THE GOLDEN ONE', tagline: 'Sun on skin. Now bottled.', mood: 'a little sunshine<br>goes a long way.', notes: 'Bergamot · Neroli · Soft musk', top: 'Bergamot, mandarin', heart: 'Neroli, orange blossom', base: 'Soft musk, blonde woods', description: 'The windows are open. There is nowhere you need to be. Bright citrus drifts into a heart of orange blossom, settling into the soft warmth of skin. A little golden hour, whenever you need it.', keywords: 'sun sunshine sunny bright luminous citrus floral golden fresh summer morning', sizes: { '50': 89, '100': 139 } },
  after: { name: 'After Hours', number: '002', family: 'woody', descriptor: 'THE UNEXPECTED ONE', tagline: 'Stay a little longer.', mood: 'one more<br>last night.', notes: 'Black tea · Iris · Sandalwood', top: 'Black tea, pink pepper', heart: 'Iris, violet leaf', base: 'Sandalwood, amber', description: 'The city is quieter now. The conversation is getting better. Smoky tea and a spark of pepper unfold into powdery iris and warm, textured woods. For the nights that become stories.', keywords: 'night evening deep dark warm woody amber smoky tea mysterious', sizes: { '50': 89, '100': 139 } },
  soft: { name: 'Soft Static', number: '003', family: 'soft', descriptor: 'THE QUIET ONE', tagline: 'Close to skin. Closer to you.', mood: 'the art of<br>doing nothing.', notes: 'Pear · Ambrette · White woods', top: 'Pear, bergamot', heart: 'Ambrette, white iris', base: 'White woods, skin musk', description: 'Fresh sheets. A slow Sunday. The lovely luxury of having nothing planned. Crisp pear melts into ambrette and whisper-soft woods. An intimate fragrance that feels like your favorite version of home.', keywords: 'quiet clean soft intimate skin delicate gentle cozy musk pear sunday', sizes: { '50': 89, '100': 139 } },
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
const productMoney = (id, value) => products[id]?.currency === 'MAD' ? dirham(value) : money(value);
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
let filter = 'all', heroId = 'solar', detailId = 'solar', detailSize = '50', giftWrap = false;
let toastTimer, lastModalTrigger;
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
function closeModal(dialog) { dialog.close(); if (dialog.id === 'product-dialog' && location.hash.startsWith('#scent/')) history.replaceState(null, '', location.pathname + location.search); if (lastModalTrigger?.isConnected) lastModalTrigger.focus({ preventScroll: true }); }
$$('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => { window.oreynModalOpen = Boolean($('dialog[open]')); window.dispatchEvent(new Event('oreyn-motion')); });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const b = dialog.getBoundingClientRect(); if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) closeModal(dialog); } });
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeModal(dialog); });
});
function saveButton(id) { return `<button class="save-button" data-save="${id}" aria-label="${saved.has(id) ? 'Unsave' : 'Save'} ${products[id].name}" aria-pressed="${saved.has(id)}">${heart}</button>`; }
function renderProducts() {
  const matches = Object.entries(products).filter(([id, p]) => id !== 'discovery' && (filter === 'all' || filter === 'saved' && saved.has(id) || filter === '45dh' && p.currency === 'MAD' && p.sizes[defaultSize(id)] === 45 || p.family === filter));
  $('#product-grid').innerHTML = matches.map(([id, p]) => {
    const size = defaultSize(id);
    return `<article class="product-card ${id}${p.brand ? ' brand-card' : ''}" data-card="${id}"><div class="card-heading">${p.brand ? `<span class="card-brand">${p.brand}</span>` : ''}<h3><button data-product="${id}" aria-label="Explore ${p.name}">${p.cardName || p.name}</button></h3><p>${p.notes}</p></div>${saveButton(id)}<button class="card-photo" data-product="${id}" aria-label="Explore ${p.name}">${bottleMarkup(id)}</button><div class="card-purchase"><div class="card-price${p.currency === 'MAD' ? ' confirmed-price' : ''}"><strong>${productMoney(id, p.sizes[size])}</strong><span>${sizeText(size)}</span></div><button class="card-bag" data-add="${id}" data-size="${size}" aria-label="Add ${p.name}, ${sizeText(size)}, to bag">Add to bag <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></svg></button></div></article>`;
  }).join('') || '<div class="empty-state"><h3>A feeling worth keeping.</h3><p>Tap a heart on any scent to keep it here.</p><button class="pill dark" data-filter="all">Explore the collection <span>↗︎</span></button></div>';
  prepareCarousel();
  $('#saved-count').textContent = saved.size;
  $('.filters [data-filter="all"] span').textContent = String(Object.keys(products).filter(id => id !== 'discovery').length).padStart(2, '0');
  $$('.filters [data-filter]').forEach(button => { const active = button.dataset.filter === filter; button.classList.toggle('active', active); button.setAttribute('aria-pressed', active); });
}
function toggleSave(id) { const gridFocused = Boolean(document.activeElement?.closest('#product-grid')); saved.has(id) ? saved.delete(id) : saved.add(id); persist('oreyn-saved', [...saved]); renderProducts(); const savedCard = $(`[data-card="${id}"]`); if (gridFocused && savedCard) { $('#product-grid').scrollLeft = savedCard.offsetLeft - $('#product-grid').firstElementChild.offsetLeft; syncCarousel(); } $$(`[data-save="${id}"]`).forEach(button => { button.setAttribute('aria-pressed', saved.has(id)); button.setAttribute('aria-label', `${saved.has(id) ? 'Unsave' : 'Save'} ${products[id].name}`); }); if (gridFocused) ($(`#product-grid [data-save="${id}"]`) || $(`.filters [data-filter="${filter}"]`))?.focus({ preventScroll: true }); notify(saved.has(id) ? `${products[id].name} saved to your collection` : `${products[id].name} removed from saved scents`); }
function openProduct(id, updateUrl = true) {
  if (!products[id] || id === 'discovery') return;
  detailId = id; detailSize = defaultSize(id); const p = products[id];
  $('#product-detail').innerHTML = `<div class="product-detail-grid"><div class="detail-art ${id}"><span class="eyebrow">${p.number} / ${p.descriptor}</span>${bottleMarkup(id)}<span class="art-mood">${p.mood || ''}</span></div><div class="detail-content"><span class="eyebrow">${p.brand || 'EAU DE PARFUM / A SLICE OF LIFE'}</span><h2>${p.name}</h2><p class="detail-tagline">${p.tagline}</p><p class="detail-description">${p.description}</p><div class="note-pyramid"><div class="note-row"><span>OPENING</span>${p.top}</div><div class="note-row"><span>HEART</span>${p.heart}</div><div class="note-row"><span>LINGERING</span>${p.base}</div></div>${detailSize === 'unit' ? '<p class="small-note">Volume and presentation to be confirmed. Catalogue image shown.</p>' : '<span class="size-label">CHOOSE YOUR SIZE</span>'}<div class="size-options" role="group" aria-label="Bottle size">${Object.entries(p.sizes).map(([size, price]) => `<button data-detail-size="${size}" class="${size === detailSize ? 'active' : ''}" aria-pressed="${size === detailSize}">${sizeText(size)} · ${productMoney(id, price)}</button>`).join('')}</div><div class="detail-actions"><button class="pill dark" id="detail-add" data-add="${id}" data-size="${detailSize}">Add to bag — ${productMoney(id, p.sizes[detailSize])}<span>↗︎</span></button>${saveButton(id)}</div><button class="text-link detail-view-bag full-width" id="detail-view-bag" data-view-bag hidden>View your bag <span>↗︎</span></button><div class="detail-bottom"><span>${p.brand ? 'Explore the fragrance details.' : 'A scent without labels. For everyone.'}</span><button data-share="${id}">Copy scent link ↗︎</button></div>${p.brand ? `<a class="text-link fragrance-source" href="${p.source}" target="_blank" rel="noopener noreferrer">Fragrance profile from the brand ↗︎</a>` : '<button class="text-link" data-discovery-link style="margin-top:20px">Prefer all three? Meet the OREYN Trio ↗︎</button>'}</div></div>`;
  $('#product-dialog').setAttribute('aria-label', `${p.name} fragrance details`);
  openModal('#product-dialog'); if (updateUrl) history.replaceState(null, '', `#scent/${id}`);
}
function cartTotals() {
  let subtotal = 0, madSubtotal = 0;
  cart.forEach(item => {
    const value = products[item.id].sizes[item.size] * item.quantity;
    products[item.id].currency === 'MAD' ? madSubtotal += value : subtotal += value;
  });
  const wrapping = giftWrap && subtotal > 0 ? 5 : 0;
  const shipping = subtotal === 0 || subtotal >= 120 ? 0 : 6;
  return { subtotal, madSubtotal, wrapping, shipping, total: subtotal + wrapping + shipping };
}
function addToCart(id, size) {
  if (!products[id] || !Object.hasOwn(products[id].sizes, size)) return;
  const item = cart.find(item => item.id === id && item.size === size);
  if (item?.quantity === 99) { notify('Maximum 99 of each size per bag.'); return; }
  item ? item.quantity++ : cart.push({ id, size, quantity: 1 }); renderBag(); notify(`${products[id].name} added to your bag`, true); const bagLink = $('#detail-view-bag'); if (bagLink) bagLink.hidden = false;
  const button = $('#detail-add'); if (button && $('#product-dialog').open) { button.innerHTML = 'Added to your bag <span>✓</span>'; setTimeout(() => { if (button.isConnected) button.innerHTML = `Add to bag — ${productMoney(detailId, products[detailId].sizes[detailSize])}<span>↗︎</span>`; }, 1400); }
}
function renderBag() {
  persist('oreyn-cart-v2', cart); const count = cart.reduce((sum, item) => sum + item.quantity, 0); const t = cartTotals();
  $('#bag-count').textContent = count; $('#drawer-count').textContent = `(${count})`; $('#checkout-button').disabled = count === 0;
  $('#shipping-progress').innerHTML = t.subtotal ? `<div class="shipping-progress">${t.subtotal >= 120 ? 'Your preview includes complimentary delivery.' : `${money(120 - t.subtotal)} away from complimentary delivery in this preview.`}<div><i style="width:${Math.min(t.subtotal / 120 * 100, 100)}%"></i></div></div>` : '';
  $('#bag-items').innerHTML = cart.map((item, index) => { const p = products[item.id]; return `<div class="bag-row"><div class="bag-thumb ${item.id}">${bottleMarkup(item.id, item.size)}</div><div><h3>${p.name}</h3><small>${sizeText(item.size)} / ${item.id === 'discovery' ? 'THREE FRAGRANCES' : p.brand || 'EAU DE PARFUM'}</small><div class="quantity"><button data-quantity="${index}" data-delta="-1" aria-label="Remove one ${p.name}, ${sizeText(item.size)}">−</button><span>${item.quantity}</span><button data-quantity="${index}" data-delta="1" aria-label="Add one ${p.name}, ${sizeText(item.size)}" ${item.quantity >= 99 ? 'disabled' : ''}>+</button><button class="remove-item" data-remove="${index}" aria-label="Remove ${p.name}, ${sizeText(item.size)}, from bag">Remove</button></div></div><span class="price">${productMoney(item.id, p.sizes[item.size] * item.quantity)}</span></div>`; }).join('') || '<div class="empty-state"><span class="star-mark">✳</span><h3>A little possibility.</h3><p>Your bag is waiting for its first feeling.</p><button class="pill dark" data-continue>Explore the collection <span>↗︎</span></button></div>';
  const euroSummary = t.subtotal ? `<label class="gift-option"><input type="checkbox" id="gift-wrap" ${giftWrap ? 'checked' : ''}> Make individual scents a gift <span style="margin-left:auto">+ €5</span></label><div class="summary-line"><span>Individual scents subtotal</span><span>${money(t.subtotal)}</span></div><div class="summary-line"><span>Delivery estimate</span><span>${t.shipping ? money(t.shipping) : 'Complimentary'}</span></div>${t.wrapping ? `<div class="summary-line"><span>Gift presentation</span><span>${money(t.wrapping)}</span></div>` : ''}<div class="summary-line total"><span>Fragrance total</span><span>${money(t.total)}</span></div>` : '';
  const madSummary = t.madSubtotal ? `<div class="summary-line total"><span>Total (MAD)</span><span>${dirham(t.madSubtotal)}</span></div>` : '';
  $('#bag-summary').innerHTML = count ? euroSummary + madSummary : '';
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
  const euroSummary = t.subtotal ? `<div class="summary-line"><span>Delivery estimate</span><span>${t.shipping ? money(t.shipping) : 'Complimentary'}</span></div>${t.wrapping ? `<div class="summary-line"><span>Gift presentation</span><span>${money(t.wrapping)}</span></div>` : ''}<div class="summary-line total"><span>Fragrance total</span><span>${money(t.total)}</span></div>` : '';
  const madSummary = t.madSubtotal ? `<div class="summary-line total"><span>Total (MAD)</span><span>${dirham(t.madSubtotal)}</span></div>` : '';
  $('#checkout-content').innerHTML = `<p class="checkout-intro">A look at your next chapter. This is a concept-store preview: no order is placed, no payment is taken, and nothing is sent to a server.</p><div class="checkout-lines">${cart.map(item => `<div class="checkout-product"><div>${products[item.id].name}<small>${sizeText(item.size)} · Quantity ${item.quantity}</small></div><span>${productMoney(item.id, products[item.id].sizes[item.size] * item.quantity)}</span></div>`).join('')}${euroSummary}${madSummary}</div><form class="checkout-form" id="preview-form"><label for="preview-name">Make this preview yours (optional first name)</label><input id="preview-name" placeholder="Your first name" autocomplete="off" maxlength="40"><button class="pill dark full-width" type="submit">Finish my preview <span>↗︎</span></button></form>`;
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
  shipping: { title: 'The finer details.', paragraphs: ['Oreyn is currently a concept store. Products, prices, delivery estimates, and gift presentation are shown to demonstrate the shopping experience. Orders and shipments are not available.', 'The bag preview uses €6 estimated delivery, waived at a merchandise subtotal of €120. Gift presentation adds €5. These are preview values, not live shipping terms.', 'Actual delivery regions, dispatch times, and return conditions will be published before the store begins accepting orders.'] },
  privacy: { title: 'Your space. Your privacy.', paragraphs: ['This concept site stores your bag and saved fragrances in your browser using localStorage so they can remain available when you return. You can remove individual items or clear the site’s browser data at any time.', 'Search and scent-finder answers stay in this page. The optional name in the order preview is not stored or sent to a server. No newsletter signup is available.', 'Google Fonts supplies the site’s typography and may receive standard connection information such as your IP address. No analytics or advertising scripts have been added.'] },
  terms: { title: 'A note on this experience.', paragraphs: ['Oreyn is an original perfume-store concept. The fragrance compositions, prices, product imagery, and editorial content illustrate a proposed brand experience.', 'Adding items to your bag or completing an order preview does not create an order or a contract. No payment details are requested and no payments are processed.', 'Final product specifications, ingredients, pricing, availability, and sale terms will need to be confirmed before a commercial launch.'] },
  contact: { title: 'Stay in our orbit.', paragraphs: ['The Oreyn world is taking shape. A dedicated customer-care address will be added when the store launches.', 'In the meantime, explore the collection or take the scent finder. We hope you find a little moment that feels like you.'] }
};
function openInfo(id) { const content = info[id]; if (!content) return; $('#editorial-content').innerHTML = `<span class="eyebrow">OREYN / THE DETAILS</span><h2>${content.title}</h2>${content.paragraphs.map(p => `<p>${p}</p>`).join('')}`; openModal('#editorial-dialog'); }
function setHero(id) {
  if (!products[id] || id === 'discovery') return;
  heroId = id;
  const p = products[id];
  $('.hero').dataset.active = id;
  $('#hero-name').textContent = p.name;
  const photo = $('#hero-bottle-photo');
  photo.src = productImages[id].src;
  photo.alt = productImages[id].alt;
  $$('[data-hero]').forEach(button => {
    const active = button.dataset.hero === id;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  $('#hero-status').textContent = p.name + ' selected.';
}
function closeMenu(restoreFocus = false) {
  const nav = $('#mobile-nav'), toggle = $('#menu-toggle');
  nav.hidden = true;
  document.body.classList.remove('menu-open');
  document.documentElement.classList.remove('menu-open');
  $$('main, footer, .announcement, .site-header .logo, .desktop-nav, .header-actions > :not(#menu-toggle)').forEach(element => { element.inert = false; });
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  if (restoreFocus) toggle.focus({ preventScroll: true });
}
function openMenu() {
  const nav = $('#mobile-nav'), toggle = $('#menu-toggle');
  nav.style.top = `${$('.site-header').getBoundingClientRect().bottom}px`;
  nav.hidden = false;
  document.body.classList.add('menu-open');
  document.documentElement.classList.add('menu-open');
  $$('main, footer, .announcement, .site-header .logo, .desktop-nav, .header-actions > :not(#menu-toggle)').forEach(element => { element.inert = true; });
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close navigation');
  requestAnimationFrame(() => { if (!nav.hidden) nav.querySelector('.mobile-nav-link')?.focus({ preventScroll: true }); });
}
document.addEventListener('click', async event => {
  const button = event.target.closest('button, a'); if (!button) return;
  const pageAnchor = button.matches('a[href^="#"]') ? button.getAttribute('href') : null;
  if (pageAnchor !== null) { event.preventDefault(); scrollToPageSection(pageAnchor); }
  if (button.hasAttribute('data-close')) closeModal(button.closest('dialog'));
  if (button.dataset.filter) { filter = button.dataset.filter; renderProducts(); }
  if (button.dataset.save) toggleSave(button.dataset.save);
  if (button.dataset.product) openProduct(button.dataset.product);
  if (button.dataset.add) addToCart(button.dataset.add, button.dataset.size);
  if (button.dataset.hero) setHero(button.dataset.hero);
  if (button.hasAttribute('data-open-quiz')) { quizAnswers = []; renderQuiz(); openModal('#quiz-dialog'); }
  if (button.hasAttribute('data-open-search')) { $('#search-input').value = ''; searchProducts(); openModal('#search-dialog'); $('#search-input').focus(); }
  if (button.dataset.detailSize) { detailSize = button.dataset.detailSize; $$('.size-options button').forEach(el => { const active = el.dataset.detailSize === detailSize; el.classList.toggle('active', active); el.setAttribute('aria-pressed', active); }); $('#detail-add').dataset.size = detailSize; $('#detail-add').innerHTML = `Add to bag — ${productMoney(detailId, products[detailId].sizes[detailSize])}<span>↗︎</span>`; }
  if (button.hasAttribute('data-quantity')) { const index = Number(button.dataset.quantity); const delta = Number(button.dataset.delta); if (cart[index]) { cart[index].quantity = Math.min(99, cart[index].quantity + delta); if (cart[index].quantity <= 0) cart.splice(index, 1); renderBag(); const next = $(`[data-quantity="${index}"][data-delta="${delta}"]:not(:disabled)`) || $('#continue-shopping'); next?.focus({ preventScroll: true }); } }
  if (button.hasAttribute('data-remove')) { cart.splice(Number(button.dataset.remove), 1); renderBag(); $('#continue-shopping').focus({ preventScroll: true }); }
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
document.addEventListener('change', event => { if (event.target.id === 'gift-wrap') { giftWrap = event.target.checked; renderBag(); $('#gift-wrap')?.focus(); } });
$('#open-bag').addEventListener('click', () => { renderBag(); openModal('#bag-dialog'); });
$('#continue-shopping').addEventListener('click', continueShopping);
$('#checkout-button').addEventListener('click', openCheckout);
$('#hero-details').addEventListener('click', () => openProduct(heroId));
$('#search-input').addEventListener('input', searchProducts);
$('#menu-toggle').addEventListener('click', () => { if ($('#mobile-nav').hidden) openMenu(); else closeMenu(true); });
window.addEventListener('resize', () => { if (innerWidth > 760) closeMenu(); else if (!$('#mobile-nav').hidden) $('#mobile-nav').style.top = `${$('.site-header').getBoundingClientRect().bottom}px`; });
document.addEventListener('keydown', event => {
  if ($('#mobile-nav').hidden) return;
  if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); }
  if (event.key === 'Tab') {
    const controls = [$('#menu-toggle'), ...$$('#mobile-nav a, #mobile-nav button')];
    const index = controls.indexOf(document.activeElement);
    if (event.shiftKey && index <= 0) { event.preventDefault(); controls.at(-1).focus(); }
    else if (!event.shiftKey && (index === -1 || index === controls.length - 1)) { event.preventDefault(); controls[0].focus(); }
  }
});
document.addEventListener('touchmove', event => { if (!$('#mobile-nav').hidden && !event.target.closest('#mobile-nav')) event.preventDefault(); }, { passive: false });
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
window.oreynMotionPaused = reducedMotion.matches;
function updateMotion() { document.body.classList.toggle('motion-paused', window.oreynMotionPaused); $('#motion-toggle').setAttribute('aria-pressed', String(window.oreynMotionPaused)); $('#motion-label').textContent = window.oreynMotionPaused ? 'RESUME MOTION' : 'PAUSE MOTION'; window.dispatchEvent(new Event('oreyn-motion')); }
const trioTilt = $('.discovery-tilt');
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
  $('#product-grid').scrollLeft = 0;
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
$('#product-grid').addEventListener('keydown', event => {
  if (event.target === $('#product-grid') && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault(); stepCarousel(event.key === 'ArrowRight' ? 1 : -1);
  }
});
window.addEventListener('resize', () => { sizeCarouselTail(); syncCarousel(); });
