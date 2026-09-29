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
 const nodes={'#product-grid':{},'#saved-count':{},'#detail-view-bag':{}};
 const filters=['all','fresh','woody','soft','saved'].map(filter=>({dataset:{filter},classList:{toggle(){}},setAttribute(k,v){this[k]=v;}}));
 const c={Set,Object,money:n=>'€'+n,bottleMarkup:()=>'<img>',saveButton:()=>'<button></button>',$:s=>nodes[s],$$:s=>s.startsWith('.filters')?filters:[],prepareCarousel(){},persist(){},notify(){},renderBag(){},document:{activeElement:null},filter:'all',saved:new Set(),cart:[]};vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('const products ='),source.indexOf('const sizeText')),c);
 vm.runInContext(source.slice(source.indexOf('function renderProducts()'),source.indexOf('function openProduct(')),c);
 vm.runInContext(source.slice(source.indexOf('function addToCart('),source.indexOf('function renderBag(')),c);
 c.renderProducts();assert.equal((nodes['#product-grid'].innerHTML.match(/data-card=/g)||[]).length,3);
 for(const family of ['fresh','woody','soft']){c.filter=family;c.renderProducts();assert.equal((nodes['#product-grid'].innerHTML.match(/data-card=/g)||[]).length,1);assert.equal(filters.find(f=>f.dataset.filter===family)['aria-pressed'],true);}
 c.filter='saved';c.renderProducts();assert.match(nodes['#product-grid'].innerHTML,/empty-state/);
 c.toggleSave('after');assert.match(nodes['#product-grid'].innerHTML,/data-card="after"/);assert.equal(nodes['#saved-count'].textContent,1);
 c.toggleSave('after');assert.match(nodes['#product-grid'].innerHTML,/empty-state/);
 c.addToCart('solar','50');c.addToCart('solar','50');assert.equal(c.cart[0].quantity,2);assert.equal(c.cart[0].size,'50');
});
