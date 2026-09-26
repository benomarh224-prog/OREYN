'use strict';
const config = window.OREYN_CONFIG, S = window.OREYN_STORE;
const $ = selector => document.querySelector(selector);
const translations = {
 ar: {
 skip:'انتقل إلى المحتوى',location:'OREYN · عطور في تطوان، المغرب',perfumes:'العطور',how:'كيف تطلب',contact:'تواصل معنا',bag:'السلة',eyebrow:'تفاصيل بسيطة. حضور خاص.',intro:'اكتشف OREYN، علامتك للعطور في تطوان. قارورة تحمل توقيعنا، ولحظات تحمل بصمتك.',explore:'اكتشف العطور ↗',local:'من تطوان، لكل لحظة من يومك.',bottleAlt:'قارورة عطر OREYN الأصلية بغطاء أبيض وشعار slice of life',collection:'اختر عطرك.',collectionIntro:'المعلومات المؤكدة فقط، لاختيار واضح.',search:'ابحث عن عطر',searchPlaceholder:'اسم العطر…',filter:'عرض',all:'جميع العطور',available:'متاح للطلب',unknown:'التوفر قيد التأكيد',unavailable:'غير متاح حالياً',details:'تواصل معنا للتفاصيل',pending:'تفاصيل العطر والأحجام والأثمنة لم تُؤكد بعد.',pricePending:'الثمن قيد التأكيد',view:'عرض التفاصيل',emptyResults:'لا توجد عطور مطابقة لبحثك.',count:'عدد النتائج:',size:'الحجم',choose:'اختر الحجم',add:'أضف إلى السلة',added:'تمت الإضافة إلى السلة',remove:'حذف',quantity:'الكمية',emptyBag:'سلتك فارغة. اكتشف العطور وأضف اختيارك عندما تتوفر معلومات الطلب.',subtotal:'المجموع الفرعي',order:'اطلب عبر WhatsApp',orderingUnavailable:'الطلب عبر WhatsApp غير متاح حالياً. رقم التواصل لم يُضف بعد.',incomplete:'معلومات الطلب غير مكتملة. تواصل معنا للتفاصيل.',noConfirmation:'فتح WhatsApp لا يؤكد الطلب أو الدفع. يتم تأكيد التفاصيل مع المتجر.',step1:'اختر عطرك',step1text:'اطّلع على المعلومات والأحجام والأثمنة المؤكدة، ثم أضف اختيارك إلى السلة.',step2:'راجع سلتك',step2text:'حدد الكميات وراجع المجموع الفرعي بالدرهم المغربي.',step3:'تواصل عبر WhatsApp',step3text:'أرسل رسالة الطلب ثم اتفق معنا على التوفر والتوصيل والمبلغ النهائي.',delivery:'التوصيل في تطوان',deliveryArea:'نخدم مدينة تطوان، المغرب.',feePending:'تُؤكد تكلفة التوصيل عبر WhatsApp.',timePending:'يُؤكد موعد التوصيل عبر WhatsApp.',fee:'تكلفة التوصيل:',time:'مدة التوصيل:',finalAmount:'المجموع الفرعي لا يشمل التوصيل. يُؤكد المبلغ النهائي قبل إتمام الطلب.',storyTitle:'من تفاصيل الحياة.',story:'OREYN علامة عطور في تطوان. «slice of life» هو توقيعنا: مساحة للعطر في لحظاتك اليومية.',faq:'أسئلة تهمك',q1:'كيف أطلب؟',a1:'عند توفر معلومات المنتج ورقم التواصل، اختر الحجم والكمية من السلة وافتح WhatsApp لإرسال طلبك. نؤكد التفاصيل معك مباشرة.',q2:'لماذا بعض التفاصيل غير ظاهرة؟',a2:'نعرض فقط المعلومات المؤكدة. إذا لم يظهر الثمن أو الحجم أو التوفر، تواصل معنا عند إتاحة رقم التواصل.',q3:'هل فتح WhatsApp يعني تأكيد الطلب؟',a3:'لا. الرسالة بداية للتواصل فقط. لا يتم الدفع هنا، ولا يُؤكد الطلب تلقائياً.',footer:'تطوان، المغرب · OREYN',close:'إغلاق',whatsapp:'تواصل عبر WhatsApp',hello:'مرحباً OREYN، أود الاستفسار عن العطور المتوفرة والأحجام والأثمنة في تطوان.',productInquiry:'مرحباً OREYN، أود معرفة تفاصيل هذا العطر:',increase:'زيادة الكمية',decrease:'تقليل الكمية'
 },
 fr: {
 skip:'Aller au contenu',location:'OREYN · Parfums à Tétouan, Maroc',perfumes:'Parfums',how:'Comment commander',contact:'Contact',bag:'Panier',eyebrow:'DES DÉTAILS SIMPLES. UNE PRÉSENCE À SOI.',intro:'Découvrez OREYN, votre marque de parfums à Tétouan. Un flacon qui porte notre signature, des moments qui portent la vôtre.',explore:'Explorer les parfums ↗',local:'Depuis Tétouan, pour vos instants du quotidien.',bottleAlt:'Flacon original de parfum OREYN avec bouchon blanc et signature slice of life',collection:'Choisissez votre parfum.',collectionIntro:'Des informations confirmées, pour choisir en toute clarté.',search:'Rechercher un parfum',searchPlaceholder:'Nom du parfum…',filter:'Afficher',all:'Tous les parfums',available:'Disponible à la commande',unknown:'Disponibilité à confirmer',unavailable:'Indisponible actuellement',details:'Contactez-nous pour les détails',pending:'Les détails, les formats et les prix de ce parfum restent à confirmer.',pricePending:'Prix à confirmer',view:'Voir les détails',emptyResults:'Aucun parfum ne correspond à votre recherche.',count:'Résultats :',size:'Format',choose:'Choisir un format',add:'Ajouter au panier',added:'Ajouté au panier',remove:'Retirer',quantity:'Quantité',emptyBag:'Votre panier est vide. Découvrez les parfums et ajoutez votre choix lorsque les informations de commande sont disponibles.',subtotal:'Sous-total',order:'Commander via WhatsApp',orderingUnavailable:'Les commandes WhatsApp sont momentanément indisponibles. Le numéro de contact n’a pas encore été renseigné.',incomplete:'Les informations de commande sont incomplètes. Contactez-nous pour les détails.',noConfirmation:'Ouvrir WhatsApp ne confirme ni la commande ni le paiement. Les détails sont à confirmer avec la boutique.',step1:'Choisissez votre parfum',step1text:'Consultez les informations, formats et prix confirmés, puis ajoutez votre sélection au panier.',step2:'Vérifiez votre panier',step2text:'Ajustez les quantités et vérifiez le sous-total en dirhams marocains.',step3:'Échangez sur WhatsApp',step3text:'Envoyez votre demande, puis confirmez avec nous la disponibilité, la livraison et le montant final.',delivery:'Livraison à Tétouan',deliveryArea:'Nous desservons la ville de Tétouan, au Maroc.',feePending:'Les frais de livraison seront confirmés via WhatsApp.',timePending:'Le délai de livraison sera confirmé via WhatsApp.',fee:'Frais de livraison :',time:'Délai de livraison :',finalAmount:'Le sous-total ne comprend pas la livraison. Le montant final sera confirmé avant de finaliser la commande.',storyTitle:'Les détails de la vie.',story:'OREYN est une marque de parfums à Tétouan. « slice of life » est notre signature : une place pour le parfum dans vos instants du quotidien.',faq:'Vos questions',q1:'Comment commander ?',a1:'Lorsque les informations du produit et le numéro de contact sont disponibles, sélectionnez le format et la quantité dans le panier, puis ouvrez WhatsApp pour envoyer votre demande. Nous confirmerons les détails avec vous.',q2:'Pourquoi certaines informations manquent-elles ?',a2:'Nous affichons uniquement des informations confirmées. Si le prix, le format ou la disponibilité manque, contactez-nous dès que le numéro sera disponible.',q3:'Ouvrir WhatsApp confirme-t-il ma commande ?',a3:'Non. Le message lance simplement la conversation. Aucun paiement n’est effectué ici et aucune commande n’est confirmée automatiquement.',footer:'Tétouan, Maroc · OREYN',close:'Fermer',whatsapp:'Nous contacter sur WhatsApp',hello:'Bonjour OREYN, je souhaite connaître les parfums disponibles, les formats et les prix à Tétouan.',productInquiry:'Bonjour OREYN, je souhaite connaître les détails de ce parfum :',increase:'Augmenter la quantité',decrease:'Diminuer la quantité'
 }
};
function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function save(key,value) { try { localStorage.setItem(key,JSON.stringify(value)); } catch {} }
let lang=read('oreyn-language','ar'); if(!translations[lang]) lang='ar';
let cart=read('oreyn-business-cart',[]); if(!Array.isArray(cart)) cart=[];
cart=S.lines(config,cart.filter(item=>item && typeof item==='object')).map(r=>({productId:r.product.id,sizeId:r.size.id,quantity:r.quantity}));
let selectedProduct=null, modalTrigger=null, toastTimer;
const t=key=>translations[lang][key];
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const name=p=>S.local(p.name,lang)||'OREYN';
const money=n=>S.money(n,lang);
const validSizes=p=>p.sizes.filter(s=>S.priced(s)&&S.local(s.label,lang));
const canBuy=p=>p.availability==='available'&&validSizes(p).length>0;
const photo=p=>`<img src="${esc(p.image)}" alt="${esc(t('bottleAlt'))}" width="1024" height="1280" loading="lazy">`;
const wa=message=>`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
function contactMarkup(message=t('hello')) { return S.validPhone(config.whatsappNumber)?`<a class="pill" href="${esc(wa(message))}" target="_blank" rel="noopener noreferrer">${t('whatsapp')} ↗</a>`:`<p class="notice">${t('orderingUnavailable')}</p>`; }
function deliveryText() { const d=config.delivery; return `${Number.isFinite(d.feeMAD)&&d.feeMAD>=0?t('fee')+' '+money(d.feeMAD):t('feePending')} ${S.local(d.time,lang)?t('time')+' '+S.local(d.time,lang):t('timePending')}`; }
function renderProducts() {
 const query=$('#search').value.trim().toLocaleLowerCase();
 const products=config.products.filter(p=>(name(p)+' '+S.local(p.description,lang)).toLocaleLowerCase().includes(query)&&($('#filter').value==='all'||canBuy(p)));
 $('#result-count').textContent=`${t('count')} ${products.length}`;
 $('#products').innerHTML=products.map(p=>`<article class="product-card"><button class="product-image" data-product="${esc(p.id)}" aria-label="${esc(t('view')+' '+name(p))}">${photo(p)}</button><div class="product-copy"><span class="eyebrow">OREYN / TÉTOUAN</span><h3>${esc(name(p))}</h3><p>${esc(S.local(p.description,lang)||t('pending'))}</p><p class="availability">${t(p.availability==='available'?'available':p.availability==='unavailable'?'unavailable':'unknown')}</p><strong>${validSizes(p).length?esc(money(Math.min(...validSizes(p).map(s=>s.priceMAD)))):t('pricePending')}</strong><button class="outline" data-product="${esc(p.id)}">${canBuy(p)?t('view'):t('details')} ↗</button></div></article>`).join('')||`<p class="empty">${t('emptyResults')}</p>`;
}
function renderDetail() {
 const p=selectedProduct; if(!p)return;
 const previous=$('#size-choice')?.value;
 $('#product-detail').innerHTML=`<div class="detail-image">${photo(p)}</div><div><span class="eyebrow">OREYN</span><h2 id="product-title">${esc(name(p))}</h2><p>${esc(S.local(p.description,lang)||t('pending'))}</p><p>${t(p.availability==='available'?'available':p.availability==='unavailable'?'unavailable':'unknown')}</p>${canBuy(p)?`<label for="size-choice">${t('size')}</label><select id="size-choice">${validSizes(p).map(s=>`<option value="${esc(s.id)}">${esc(S.local(s.label,lang))} · ${esc(money(s.priceMAD))}</option>`).join('')}</select><button class="pill" id="add-product">${t('add')}</button>`:`<p class="notice">${t('incomplete')}</p>${contactMarkup(t('productInquiry')+' '+name(p))}`}</div>`;
 if(previous&&$('#size-choice')&&validSizes(p).some(s=>s.id===previous))$('#size-choice').value=previous;
}
function renderCart() {
 const rows=S.lines(config,cart); $('#bag-count').textContent=rows.reduce((n,r)=>n+r.quantity,0);
 $('#cart-items').innerHTML=rows.map((r,i)=>`<article class="cart-row">${photo(r.product)}<div><h3>${esc(name(r.product))}</h3><p>${esc(S.local(r.size.label,lang))} · ${esc(money(r.size.priceMAD))}</p><div class="quantity"><button data-quantity="${i}" data-delta="-1" aria-label="${t('decrease')} ${esc(name(r.product))}" ${r.quantity===1?'disabled':''}>−</button><span aria-label="${t('quantity')}">${r.quantity}</span><button data-quantity="${i}" data-delta="1" aria-label="${t('increase')} ${esc(name(r.product))}" ${r.quantity===99?'disabled':''}>+</button><button data-remove="${i}">${t('remove')}</button></div></div><b>${esc(money(r.quantity*r.size.priceMAD))}</b></article>`).join('')||`<p class="empty">${t('emptyBag')}</p>`;
 $('#subtotal').textContent=money(S.subtotal(rows)); $('#cart-delivery').textContent=deliveryText();
 const url=S.order(config,cart,lang);
 $('#order-action').innerHTML=url?`<a class="pill" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${t('order')} ↗</a>`:`<button class="pill" disabled>${t('order')}</button><p class="notice">${S.validPhone(config.whatsappNumber)?t('emptyBag'):t('orderingUnavailable')}</p>`;
}
function render() {
 document.documentElement.lang=lang; document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));
 document.querySelectorAll('[data-alt]').forEach(el=>el.alt=t(el.dataset.alt));
 document.querySelectorAll('[data-label]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.label)));
 $('nav').setAttribute('aria-label',lang==='ar'?'التنقل الرئيسي':'Navigation principale');
 $('#language').textContent=lang==='ar'?'Français':'العربية'; $('#language').lang=lang==='ar'?'fr':'ar';
 $('#search').placeholder=t('searchPlaceholder'); $('#delivery-info').textContent=deliveryText();
 $('#contact-action').innerHTML=contactMarkup();
 $('#mobile-contact').innerHTML=S.validPhone(config.whatsappNumber)?contactMarkup():'';
 document.body.classList.toggle('has-mobile-contact',S.validPhone(config.whatsappNumber));
 $('#toast').textContent=''; renderProducts();renderDetail();renderCart();
}
function openDialog(id) { modalTrigger=document.activeElement; $(id).showModal(); }
function closeDialog(dialog) { dialog.close(); modalTrigger?.focus(); }
$('#language').addEventListener('click',()=>{lang=lang==='ar'?'fr':'ar';save('oreyn-language',lang);render();});
$('#search').addEventListener('input',renderProducts);$('#filter').addEventListener('change',renderProducts);
$('#bag-open').addEventListener('click',()=>{renderCart();openDialog('#bag-dialog');});
document.addEventListener('click',event=>{
 const b=event.target.closest('button');if(!b)return;
 if(b.hasAttribute('data-close'))closeDialog(b.closest('dialog'));
 if(b.dataset.product){selectedProduct=config.products.find(p=>p.id===b.dataset.product);renderDetail();openDialog('#product-dialog');}
 if(b.id==='add-product') {
  const sizeId=$('#size-choice').value,p=selectedProduct;
  if(!canBuy(p)||!validSizes(p).some(s=>s.id===sizeId))return;
  const row=cart.find(r=>r.productId===p.id&&r.sizeId===sizeId);
  if(row)row.quantity=Math.min(99,row.quantity+1);else cart.push({productId:p.id,sizeId,quantity:1});
  save('oreyn-business-cart',cart);renderCart();closeDialog($('#product-dialog'));$('#toast').textContent=t('added');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').textContent='',3500);
 }
 if(b.dataset.quantity!==undefined){const i=Number(b.dataset.quantity),delta=Number(b.dataset.delta);cart[i].quantity=Math.max(1,Math.min(99,cart[i].quantity+delta));save('oreyn-business-cart',cart);renderCart();document.querySelector(`[data-quantity="${i}"][data-delta="${delta}"]:not(:disabled)`)?.focus();}
 if(b.dataset.remove!==undefined){cart.splice(Number(b.dataset.remove),1);save('oreyn-business-cart',cart);renderCart();$('#bag-dialog .close').focus();}
});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog(dialog);});dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog(dialog);}});});
render();
