const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function harness(){const nodes=new Map(),timers=[],handlers=new Map();let now=Date.parse('2026-10-24T10:00:00Z');const RealDate=Date;
 class Clock extends RealDate{constructor(...a){super(...(a.length?a:[now]));}static now(){return now;}}
 function el(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',hidden:true,value:'',style:{},open:false,dataset:{},isConnected:true,classList:{toggle(){},add(){},remove(){}},focus(){},remove(){this.innerHTML=''},removeAttribute(){},insertAdjacentHTML(_,html){this.innerHTML+=html},setAttribute(k,v){this[k]=v;},addEventListener(type,fn){handlers.set(id+':'+type,fn)},querySelector:el,querySelectorAll:()=>[],close(){this.open=false}});return nodes.get(id);}
 const ctx={Date:Clock,Intl,console,navigator:{clipboard:{writeText:async()=>{}}},setTimeout:(fn,delay)=>{timers.push({fn,delay});return timers.length},clearTimeout(){},setInterval:()=>1,clearInterval(){},scrollTo(){},localStorage:{getItem(){return null},setItem(){}},document:{getElementById:el,querySelector:()=>null,querySelectorAll:()=>[],documentElement:{lang:'',style:{}}}};ctx.window=ctx;vm.createContext(ctx);
 for(const f of ['locales.js','refinements-locales.js','customer-locales.js','experience-locales.js','invite-demo.js','refinements.js','customer-contact.js','upgrade.js','service-finance.js','operations.js','header-outline.js','mobile9.js','design11.js','design12.js','experience.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
 vm.runInContext(fs.readFileSync('app.js','utf8').replace('splash();\n})();','globalThis.verify={s,go,customer,experience,error,refinements};\n})();'),ctx);
 return {...ctx.verify,ctx,el,timers,handlers,advance:ms=>now+=ms,flush:delay=>{const tasks=timers.filter(x=>x.delay===delay);tasks.forEach(x=>{x.delay=-1;x.fn()})}};
}

for(const lang of ['en','zh','ms','vi']){
 const {s,go,experience:x,customer,ctx,el,timers,flush,handlers}=harness();s.lang=lang;s.role='client';
 customer.toast('profileSaved');assert.equal(el('contact-toast')['data-tone'],'success');assert.equal(timers.at(-1).delay,3000);
 customer.toast('wechatInvalid');assert.equal(el('contact-toast')['data-tone'],'error');assert.equal(timers.at(-1).delay,8000);
 customer.toast('statementMonthBlocked');assert.equal(el('contact-toast')['data-tone'],'info');assert.equal(timers.at(-1).delay,8000);
 const click=dataset=>x.click({dataset});s.selected=[];go('browse');click({bulkPerson:'an'});click({bulkPerson:'yue'});assert(el('selected-staff-sidebar').innerHTML.includes('selection-sidebar collapsed'));
 click({design11:'toggleBulk'});assert(!el('selected-staff-sidebar').innerHTML.includes('selection-sidebar collapsed'));
 x.outside({dataset:{},closest:()=>null});assert(el('selected-staff-sidebar').innerHTML.includes('selection-sidebar collapsed'));
 click({design11:'toggleBulk'});assert.equal(click({profile:'lin'}),false);assert(el('selected-staff-sidebar').innerHTML.includes('selection-sidebar collapsed'));
 go('staffProfile');assert(el('tb-content').innerHTML.includes(ctx.COPY[lang].ageLabel));
 go('account');assert(el('tb-content').innerHTML.includes(ctx.COPY[lang].myCustomerQr));
 go('bookings');customer.click({dataset:{bookingTab:'history'}});const list=el('booking-panel').innerHTML;
 assert(list.includes('booking-history-row'));assert(!list.includes('data-spend='));assert(!list.includes('data-customer-booking='));
 const id=list.match(/data-history-booking="([^"]+)"/)[1];click({historyBooking:id});const detail=el('operations-overlay').innerHTML;
 assert(detail.includes('centered-backdrop'));assert(detail.includes(ctx.COPY[lang].bookingAndSpend));assert(detail.includes(ctx.COPY[lang].spendTotal));assert(detail.includes(ctx.COPY[lang].approvedBy));assert(!detail.includes('<span>'+ctx.COPY[lang].type+'</span>'));
 click({ops:'close'});assert.equal(el('operations-overlay').innerHTML,'');
 go('explore');click({reserveDetails:'room'});assert(el('experience-overlay').innerHTML.includes('reservation-details'));click({experience:'closeSheet'});assert.equal(timers.at(-1).delay,1000);flush(1000);assert.equal(el('experience-overlay').innerHTML,'');
 click({reserveDetails:'table'});const sheet=el('.reservation-sheet');sheet.scrollTop=0;handlers.get('.reservation-sheet:touchstart')({touches:[{clientX:50,clientY:20}],target:{closest:()=>null}});handlers.get('.reservation-sheet:touchend')({changedTouches:[{clientX:55,clientY:130}]});assert.equal(timers.at(-1).delay,1000);flush(1000);assert.equal(el('experience-overlay').innerHTML,'');
 click({reserveDetails:'table'});sheet.scrollTop=120;handlers.get('.reservation-sheet:touchstart')({touches:[{clientX:50,clientY:20}],target:{closest:()=>null}});handlers.get('.reservation-sheet:touchend')({changedTouches:[{clientX:55,clientY:130}]});assert(el('experience-overlay').innerHTML.includes('reservation-sheet'));click({experience:'closeSheet'});flush(1000);
 s.role='staff';go('roster');assert(!el('tb-content').innerHTML.includes('data-bulk-person='));assert.equal(el('selected-staff-sidebar').innerHTML,'');
 go('finance');const html=el('tb-content').innerHTML;assert(html.includes(ctx.COPY[lang].financeStatus));assert(html.includes('finance-status'));assert(html.includes('earnings-section'));assert(html.includes('finance-trend'));assert.equal((html.match(/<polyline/g)||[]).length,2);assert.equal((html.match(/<tr><th>/g)||[]).length,7);assert(!html.includes('NaN'));
 const tx=x.mobilePreview.transactions(0)[0];click({financeTransaction:tx.id});assert(el('mobile9-overlay').innerHTML.includes('centered-backdrop'));x.outside({dataset:{mobileOutside:'true'}});assert.equal(el('mobile9-overlay').innerHTML,'');
 go('staffHome');const record=x.mobilePreview.workRecords()[0];click({staffWork:record.id});assert(el('mobile9-overlay').innerHTML.includes('centered-backdrop'));click({mobile:'close'});
 click({mobile:'leaderboard'});assert(!el('mobile9-overlay').innerHTML.includes('NaN'));assert.equal((el('mobile9-overlay').innerHTML.match(/class="leaderboard-row /g)||[]).length,12);
}
console.log('PASS four locales: semantic toast duration, collapsed/overlay rail behavior, staff gallery selections, age, unified booking history popup, sheet dismissal, six-month finance chart and centered details, 12-person leaderboard.');
