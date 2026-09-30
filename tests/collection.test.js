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
 const filters=['all','45dh','fresh','woody','floral','soft','saved'].map(filter=>({dataset:{filter},classList:{toggle(){}},setAttribute(k,v){this[k]=v;}}));
 const c={Set,Object,money:n=>'€'+n,bottleMarkup:()=>'<img>',saveButton:()=>'<button></button>',$:s=>nodes[s],$$:s=>s.startsWith('.filters')?filters:[],prepareCarousel(){},persist(){},notify(){},renderBag(){},document:{activeElement:null},filter:'all',saved:new Set(),cart:[]};vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('const products ='),source.indexOf('function readStored')),c);
 vm.runInContext(source.slice(source.indexOf('function renderProducts()'),source.indexOf('function openProduct(')),c);
 vm.runInContext(source.slice(source.indexOf('function addToCart('),source.indexOf('function renderBag(')),c);
 c.renderProducts();assert.equal((nodes['#product-grid'].innerHTML.match(/data-card=/g)||[]).length,6);
 assert.equal(nodes['.filters [data-filter="all"] span'].textContent,'06');
 for(const [family,count] of [['fresh',1],['woody',3],['floral',1],['soft',1],['45dh',3]]){c.filter=family;c.renderProducts();assert.equal((nodes['#product-grid'].innerHTML.match(/data-card=/g)||[]).length,count);assert.equal(filters.find(f=>f.dataset.filter===family)['aria-pressed'],true);}
 assert.equal((nodes['#product-grid'].innerHTML.match(/45 DH/g)||[]).length,3);
 assert.doesNotMatch(nodes['#product-grid'].innerHTML,/50 ml|undefined|NaN/);
 c.filter='saved';c.renderProducts();assert.match(nodes['#product-grid'].innerHTML,/empty-state/);
 c.toggleSave('after');assert.match(nodes['#product-grid'].innerHTML,/data-card="after"/);assert.equal(nodes['#saved-count'].textContent,1);
 c.toggleSave('after');assert.match(nodes['#product-grid'].innerHTML,/empty-state/);
 c.toggleSave('sauvage-elixir');assert.match(nodes['#product-grid'].innerHTML,/data-card="sauvage-elixir"/);
 c.toggleSave('sauvage-elixir');assert.match(nodes['#product-grid'].innerHTML,/empty-state/);
 c.addToCart('solar','50');c.addToCart('solar','50');assert.equal(c.cart[0].quantity,2);assert.equal(c.cart[0].size,'50');
});

test('the three added fragrances cost 45 MAD and preserve an unconfirmed volume through cart totals',()=>{
 const c={cart:[{id:'le-male',size:'unit',quantity:1},{id:'sauvage-elixir',size:'unit',quantity:1},{id:'libre-le-parfum',size:'unit',quantity:1}],giftWrap:false};vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('const products ='),source.indexOf('function readStored')),c);
 vm.runInContext(source.slice(source.indexOf('function cartTotals()'),source.indexOf('function addToCart(')),c);
 vm.runInContext("globalThis.catalogue = products; globalThis.images = productImages; globalThis.total = cartTotals(); globalThis.volume = sizeText('unit');",c);
 assert.equal(c.total.madSubtotal,135);assert.equal(c.total.subtotal,0);assert.equal(c.total.shipping,0);assert.equal(c.volume,'Size to confirm');
 for(const id of ['le-male','sauvage-elixir','libre-le-parfum']){assert.equal(c.catalogue[id].currency,'MAD');assert.deepEqual(Object.keys(c.catalogue[id].sizes),['unit']);assert.equal(c.catalogue[id].sizes.unit,45);assert.ok(fs.existsSync(path.join(__dirname,'..',c.images[id].src)));}
 c.cart.push({id:'discovery',size:'set',quantity:1},{id:'solar',size:'50',quantity:1});vm.runInContext('globalThis.total = cartTotals();',c);assert.equal(c.total.madSubtotal,264);assert.equal(c.total.subtotal,89);
});
