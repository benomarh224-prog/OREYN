const test=require('node:test');
const assert=require('node:assert/strict');
const S=require('../store');
const actual=require('../config');
// Test-only fixture; never included in the deployed storefront.
const fixture={whatsappNumber:'212600000000',products:[{id:'test',name:{ar:'عطر اختبار',fr:'Parfum test & essai'},availability:'available',sizes:[{id:'small',label:{ar:'حجم اختبار',fr:'Format test'},priceMAD:12.35}]}]};
const cart=[{productId:'test',sizeId:'small',quantity:3}];
test('live missing business data cannot create a WhatsApp order',()=>{assert.equal(S.order(actual,cart,'ar'),null);assert.equal(S.validPhone(actual.whatsappNumber),false);assert.ok(actual.products.every(p=>p.availability==='unknown'&&p.sizes.length===0));});
test('cart validates price, size, quantity and availability before totaling',()=>{assert.equal(S.subtotal(S.lines(fixture,cart)),37.05);for(const quantity of [0,-1,100,1.5])assert.deepEqual(S.lines(fixture,[{...cart[0],quantity}]),[]);assert.deepEqual(S.lines(fixture,[{...cart[0],sizeId:'missing'}]),[]);const unknown=structuredClone(fixture);unknown.products[0].availability='unknown';assert.equal(S.order(unknown,cart,'fr'),null);unknown.products[0].availability='available';unknown.products[0].sizes[0].priceMAD=null;assert.equal(S.order(unknown,cart,'ar'),null);});
test('French and Arabic order URLs encode names, quantities, MAD totals and honest confirmation text',()=>{for(const lang of ['ar','fr']){const url=new URL(S.order(fixture,cart,lang));assert.equal(url.hostname,'wa.me');const message=url.searchParams.get('text');assert.ok(message.includes(fixture.products[0].name[lang]));assert.ok(message.includes('× 3'));assert.ok(message.includes(S.money(37.05,lang)));assert.ok(message.includes(lang==='ar'?'ليست تأكيداً':'pas une confirmation'));assert.equal(url.searchParams.size,1);}});
test('invalid contact numbers and incomplete carts never generate a link',()=>{for(const number of ['',null,'+212600000000','abc','123','0000000000'])assert.equal(S.order({...fixture,whatsappNumber:number},cart,'fr'),null);assert.equal(S.order(fixture,[],'fr'),null);assert.equal(S.order(fixture,[...cart,{...cart[0],sizeId:'missing'}],'fr'),null);});
