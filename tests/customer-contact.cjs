const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function harness(){
 const nodes=new Map(),handlers=new Map();
 function el(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',hidden:true,value:'',style:{},open:false,classList:{toggle(){},add(){}},focus(){this.focused=true},select(){},remove(){},removeAttribute(){},insertAdjacentHTML(_,html){this.innerHTML+=html},setAttribute(){},addEventListener(type,fn){handlers.set(id+':'+type,fn)},querySelector:el});return nodes.get(id)}
 const ctx={Intl,console,navigator:{clipboard:{writeText:async()=>{}}},setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},scrollTo(){},localStorage:{getItem(){return null},setItem(){}},document:{getElementById:el,querySelector:()=>null,querySelectorAll:()=>[],documentElement:{lang:'',style:{}}}};ctx.window=ctx;vm.createContext(ctx);
 for(const f of ['locales.js','refinements-locales.js','customer-locales.js','invite-demo.js','refinements.js','customer-contact.js','experience-locales.js','upgrade.js','service-finance.js','operations.js','header-outline.js','mobile9.js','design11.js','design12.js','experience.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
 vm.runInContext(fs.readFileSync('app.js','utf8').replace('splash();\n})();','globalThis.verify={s,go,customer};\n})();'),ctx);
 const {s,go,customer}=ctx.verify,button=data=>({dataset:data}),click=data=>customer.click(button(data));
 return {s,go,customer,el,ctx,click,save:(value,onboarding=false)=>{customer.input({id:'wechat-id',value});click({action:onboarding?'saveWechatOnboarding':'saveWechat'})}};
}
for(const lang of ['en','zh','ms','vi']){
 const {s,go,customer,el,ctx,click,save}=harness();s.lang=lang;s.role='onboarding';go('inviteVerified');assert(el('tb-content').innerHTML.includes('wechatOnboarding'));
 go('wechatOnboarding');assert(el('tb-content').innerHTML.includes('skipWechat'));assert(!customer.hasWechat());click({action:'skipWechat'});assert.equal(s.page,'enrolled');
 s.role='client';go('browse');
 for(const dest of ['request','requestReview','bookingChange','changeSent','customerConflict']){go(dest);assert.equal(s.page,'browse');assert(!el('contact-toast').hidden);assert(el('contact-toast').innerHTML.includes(ctx.COPY[lang].wechatRequired));}
 s.lang=lang==='en'?'vi':'en';go('browse');assert(el('contact-toast').innerHTML.includes(ctx.COPY[s.lang].wechatRequired));s.lang=lang;go('browse');
 click({action:'submitBooking'});assert.equal(customer.openRecords().length,1);
 for(const action of ['sendCustomerChange','sendCustomerConflict']){click({action});assert.equal(customer.pendingCount(),0);}
 for(const page of ['bookings','bookingHistory','bookingDetail','account','updates','browse','staffProfile']){go(page);assert.equal(s.page,['bookingHistory','bookingDetail'].includes(page)?'bookings':page);}
 go('bookings');click({bookingTab:'upcoming'});const bookingHeader=el('tb-header').innerHTML;click({bookingTab:'history'});assert.equal(s.page,'bookings');assert.equal(el('tb-header').innerHTML,bookingHeader);assert(el('booking-panel').innerHTML.includes(ctx.COPY[lang].completed));click({bookingTab:'upcoming'});assert.equal(s.page,'bookings');assert(el('booking-panel').innerHTML.includes('Maya'));
 click({action:'toastAddWechat'});assert.equal(s.page,'wechatEdit');assert(el('wechat-id').focused);
 save('<script>bad</script>');assert(!customer.hasWechat());save('demo_customer');assert(customer.hasWechat());
 for(const page of ['request','requestReview','bookingChange','customerConflict']){go(page);assert.equal(s.page,page);assert(!el('tb-content').innerHTML.includes('<textarea'));}
 s.role='onboarding';go('wechatOnboarding');click({action:'skipWechat'});assert(customer.hasWechat());assert.equal(s.page,'wechatOnboarding');s.role='client';go('wechatEdit');save('');assert(customer.hasWechat());assert(el('contact-toast').innerHTML.includes(ctx.COPY[lang].wechatRemoveBlocked));click({action:'removeWechat'});assert(customer.hasWechat());
 customer.currentRecord().ongoing=false;el('customer-change').value='cancel';click({action:'sendCustomerChange'});assert.equal(customer.pendingCount(),1);click({action:'removeWechat'});assert(customer.hasWechat());
 s.role='manager';go('actions');assert(el('tb-content').innerHTML.includes('uniform-actions'));assert(el('tb-nav').innerHTML.includes('nav-count'));assert(el('tb-content').innerHTML.includes('data-expand-action="booking-example-1"'));
 for(const page of ['managerBooking','managerConfirm','packageReservation','package','overrun','visit','reservedVisit','billing','serviceReview']){go(page);assert(el('tb-content').innerHTML.includes('data-contact-customer'));}
 go('spaceDetail');assert(el('tb-content').innerHTML.includes('data-contact-customer'));
 click({action:'contactCustomer'});assert.equal(s.page,'customerContact');assert(el('tb-content').innerHTML.includes('demo_customer'));assert(!el('tb-content').innerHTML.includes('weixin://'));
 click({action:'approveCustomerCancel'});assert.equal(customer.openRecords().length,0);assert.equal(customer.pendingCount(),0);
 s.role='client';go('account');click({action:'removeWechat'});assert(!customer.hasWechat());assert(el('tb-content').innerHTML.includes('id="profile-wechat" value=""'));
 save('demo_customer');for(const type of ['ordinary','packageA','packageB']){s.type=type;go('request');click({action:'submitBooking'});}assert.equal(customer.openRecords().length,3);
 click({action:'removeWechat'});assert(customer.hasWechat());
 s.role='manager';click({action:'completeCustomerBooking'});assert.equal(customer.openRecords().length,2);s.role='client';save('');assert(customer.hasWechat());
 for(const id of ['example-2','example-3']){s.role='manager';click({customerBooking:id,managerBooking:'true'});click({action:'completeCustomerBooking'});}assert.equal(customer.openRecords().length,0);
 s.role='client';save('');assert(!customer.hasWechat());go('request');assert.notEqual(s.page,'request');
 const keys=Object.keys(ctx.COPY.en).sort();assert.deepEqual(Object.keys(ctx.COPY[lang]).sort(),keys);
 for(const v of Object.values(ctx.COPY[lang]))assert(!/\b(client|admin)\b|管理员|Pentadbir|Quản trị viên/i.test(v));
}
console.log('PASS: four-language onboarding/skip, all contact gates, direct-action guards, toast/focus, blank-save and removal guards, pending cancellation, manager approval/completion, multiple bookings/packages, manager contact entry points, in-place booking tabs, no notes fields, role terminology and locale parity.');
