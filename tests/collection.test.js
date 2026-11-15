const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../script.js'),'utf8');
test('carousel navigation and indicator handle scroll positions, boundaries and zero or one result',()=>{
 let cards=[];
 const nodes={'#collection-count':{setAttribute(){}},'#scents-previous':{},'#scents-next':{}};
 const track={scrollLeft:0,clientWidth:320,style:{setProperty(){}},classList:{toggle(){}},scrollTo(o){this.scrollLeft=o.left;this.behavior=o.behavior;}};nodes['#product-grid']=track;
 const c={$:s=>nodes[s],$$:()=>cards,getComputedStyle:()=>({columnGap:'16'}),reducedMotion:{matches:false}};vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('function carouselCards()'),source.indexOf("$('#scents-next').addEventListener")),c);
 for(const count of [0,1,3]){
 cards=Array.from({length:count},(_,i)=>({offsetLeft:6+i*287,getBoundingClientRect:()=>({width:271})}));
 c.prepareCarousel();assert.equal(track.scrollLeft,0);assert.equal(nodes['#collection-count'].textContent,count?'01 / 0'+count:'00 / 00');assert.equal(nodes['#scents-previous'].disabled,true);assert.equal(nodes['#scents-next'].disabled,count<=1);
 if(count===3){c.stepCarousel(1);c.syncCarousel();assert.equal(nodes['#collection-count'].textContent,'02 / 03');track.scrollLeft=574;c.syncCarousel();assert.equal(nodes['#scents-next'].disabled,true);c.stepCarousel(1);assert.equal(track.scrollLeft,574);c.reducedMotion.matches=true;c.stepCarousel(-1);assert.equal(track.behavior,'instant');assert.equal(track.scrollLeft,287);}
 }
});
test('filters, empty Saved, favorites and bag quantities preserve product actions',()=>{
 const nodes={'#product-grid':{},'#saved-count':{},'#detail-view-bag':{},'.filters [data-filter="all"] span':{}};
 const mobileOptions={'[value="all"]':{},'[value="saved"]':{}};
 nodes['#mobile-scent-filter']={querySelector:selector=>mobileOptions[selector]};
 const filters=['all','45dh','saved'].map(filter=>({dataset:{filter},classList:{toggle(){}},setAttribute(k,v){this[k]=v;}}));
 const c={Set,Object,money:n=>'€'+n,bottleMarkup:()=>'<img>',saveButton:()=>'<button></button>',$:s=>nodes[s],$$:s=>s.startsWith('.filters')?filters:[],prepareCarousel(){},persist(){},notify(){},renderBag(){},document:{activeElement:null},filter:'all',saved:new Set(),cart:[]};vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('const products ='),source.indexOf('function readStored')),c);
 vm.runInContext(source.slice(source.indexOf('function renderProducts('),source.indexOf('function openProduct(')),c);
 vm.runInContext(source.slice(source.indexOf('function addToCart('),source.indexOf('function renderBag(')),c);
 c.renderProducts();assert.equal((nodes['#product-grid'].innerHTML.match(/data-card=/g)||[]).length,7);
 assert.equal(nodes['.filters [data-filter="all"] span'].textContent,'07');
 for(const [family,count] of [['45dh',7],['all',7]]){c.filter=family;c.renderProducts();assert.equal((nodes['#product-grid'].innerHTML.match(/data-card=/g)||[]).length,count);assert.equal(filters.find(f=>f.dataset.filter===family)['aria-pressed'],true);assert.equal(nodes['#mobile-scent-filter'].value,family);}
 assert.equal((nodes['#product-grid'].innerHTML.match(/45 DH/g)||[]).length,7);
 assert.doesNotMatch(nodes['#product-grid'].innerHTML,/€|undefined|NaN/);
 c.filter='saved';c.renderProducts();assert.match(nodes['#product-grid'].innerHTML,/empty-state/);
 c.toggleSave('stock-photo-6');assert.match(nodes['#product-grid'].innerHTML,/data-card="stock-photo-6"/);assert.equal(nodes['#saved-count'].textContent,1);
 assert.equal(mobileOptions['[value="saved"]'].textContent,'Saved (1)');
 c.toggleSave('stock-photo-6');assert.match(nodes['#product-grid'].innerHTML,/empty-state/);
 c.toggleSave('stock-photo-7');assert.match(nodes['#product-grid'].innerHTML,/data-card="stock-photo-7"/);
 c.toggleSave('stock-photo-7');assert.match(nodes['#product-grid'].innerHTML,/empty-state/);
 assert.equal(mobileOptions['[value="saved"]'].textContent,'Saved (0)');
 c.reducedMotion={matches:true};c.window={oreynMotionPaused:false};c.setCollectionFilter('all');assert.equal((nodes['#product-grid'].innerHTML.match(/data-card=/g)||[]).length,7);assert.equal(nodes['#mobile-scent-filter'].value,'all');c.setCollectionFilter('unknown');assert.equal(c.filter,'all');
 c.addToCart('stock-sauvage','unit');c.addToCart('stock-sauvage','unit');assert.equal(c.cart[0].quantity,2);assert.equal(c.cart[0].size,'unit');
});

test('supplied stock photos retain confirmed names and prices without invented volumes or notes',()=>{
 const c={};vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('const products ='),source.indexOf('function readStored')),c);
 vm.runInContext('globalThis.catalogue=products;globalThis.images=productImages;',c);
 assert.equal(Object.keys(c.catalogue).length,8);
 assert.ok(Object.keys(c.catalogue).every(id=>id==='discovery'||id.startsWith('stock-')));
 assert.doesNotMatch(source,/stopScentPhotoMotion|tiltScentPhoto|card-glint|card-colour/);
 for(const [id,name] of [['stock-sauvage','Sauvage'],['stock-acqua-di-gio','Acqua di Giò'],['stock-you','You'],['stock-black-afgano','Black Afgano'],['stock-photo-5','Black Afgano'],['stock-photo-6','Amouage'],['stock-photo-7','Tom Ford']]){
  const product=c.catalogue[id];assert.equal(product.name,name);assert.equal(product.customerPhoto,true);assert.equal(product.family,'unspecified');assert.equal(product.sizes.unit,45);
  assert.notEqual(product.namePending,true);assert.doesNotMatch(product.notes,/Name to confirm/);
  assert.deepEqual(Object.keys(product.sizes),['unit']);assert.equal(product.top,undefined);assert.equal(product.heart,undefined);assert.equal(product.base,undefined);assert.equal(product.source,undefined);
  assert.ok(fs.existsSync(path.join(__dirname,'..',c.images[id].src)));assert.match(c.images[id].src,/-cutout\.webp$/);assert.equal(c.images[id].width,1200);assert.equal(c.images[id].height,1600);
 }
});

test('all fragrances cost 45 MAD, with quantity-aware totals and the 129 DH trio',()=>{
 const c={cart:[{id:'stock-sauvage',size:'unit',quantity:1},{id:'stock-photo-7',size:'unit',quantity:1},{id:'stock-you',size:'unit',quantity:1}]};vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('const products ='),source.indexOf('function readStored')),c);
 vm.runInContext(source.slice(source.indexOf('function cartTotals()'),source.indexOf('function addToCart(')),c);
 vm.runInContext("globalThis.catalogue = products; globalThis.images = productImages; globalThis.total = cartTotals(); globalThis.volume = sizeText('unit');",c);
 assert.equal(c.total.total,135);assert.equal(c.total.subtotal,135);assert.equal(c.volume,'Size to confirm');
 for(const [id,product] of Object.entries(c.catalogue)){assert.equal(product.currency,'MAD');for(const price of Object.values(product.sizes))assert.equal(price,id==='discovery'?129:45);}
 for(const id of ['stock-sauvage','stock-photo-7','stock-you']){assert.equal(c.catalogue[id].currency,'MAD');assert.deepEqual(Object.keys(c.catalogue[id].sizes),['unit']);assert.equal(c.catalogue[id].sizes.unit,45);assert.ok(fs.existsSync(path.join(__dirname,'..',c.images[id].src)));}
 c.cart.push({id:'discovery',size:'set',quantity:1},{id:'stock-photo-5',size:'unit',quantity:1},{id:'stock-photo-6',size:'unit',quantity:2});vm.runInContext('globalThis.total = cartTotals();',c);assert.equal(c.total.total,399);assert.equal(c.total.subtotal,399);
});
