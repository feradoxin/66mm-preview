const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function harness(){const nodes=new Map(),timers=[],handlers=new Map();let now=Date.parse('2026-10-24T10:00:00Z');const RealDate=Date;
 class Clock extends RealDate{constructor(...a){super(...(a.length?a:[now]));}static now(){return now;}}
 function el(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',hidden:true,value:'',style:{},open:false,dataset:{},isConnected:true,classList:{toggle(){},add(){},remove(){}},focus(){},remove(){this.innerHTML=''},removeAttribute(){},insertAdjacentHTML(_,html){this.innerHTML+=html},setAttribute(){},addEventListener(type,fn){handlers.set(id+':'+type,fn)},querySelector:el,querySelectorAll:()=>[],close(){this.open=false}});return nodes.get(id);}
 const saved=new Map();const ctx={Date:Clock,Intl,console,navigator:{clipboard:{writeText:async()=>{}}},setTimeout:(fn,delay)=>{timers.push({fn,delay});return timers.length},clearTimeout(){},setInterval:()=>1,clearInterval(){},scrollTo(){},localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v),removeItem:k=>saved.delete(k)},document:{getElementById:el,querySelector:()=>null,querySelectorAll:()=>[],documentElement:{lang:'',style:{}}}};ctx.window=ctx;vm.createContext(ctx);
 for(const f of ['locales.js','refinements-locales.js','customer-locales.js','experience-locales.js','invite-demo.js','refinements.js','customer-contact.js','upgrade.js','service-finance.js','operations.js','header-outline.js','mobile9.js','design11.js','design12.js','experience.js','lock-screen.js','shift-checkin.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
 vm.runInContext(fs.readFileSync('app.js','utf8').replace('splash();\n})();','globalThis.verify={s,go,customer,experience,error,lock,splash,refinements};\n})();'),ctx);
 return {...ctx.verify,ctx,el,timers,saved,advance:ms=>now+=ms,flush:delay=>{const tasks=timers.filter(x=>x.delay===delay);tasks.forEach(x=>{x.delay=-1;x.fn()})}};
}




for(const lang of ['en','zh','ms','vi']){
 const {s,go,experience:x,customer,ctx,el,advance}=harness(),e=x.design12,d=x.design11,ops=x.operationPreview;
 s.lang=lang;s.role='client';go('account');
 // Arrival never controls availability; noon-to-evening previews the upcoming shift.
 advance(-6*3600000);const an={id:'an'};assert(d.availability(an).available);assert.equal(d.availability(an).day,'2026-10-24');assert(!d.availability({id:'sara'}).available);
 const before=d.availability(an).available;s.role='manager';x.click({dataset:{checkinAction:'openScanner'}});assert(x.checkin.acceptCode(x.checkin.codeFor('an')));assert(x.checkin.arrive());assert.equal(d.availability(an).available,before);x.checkin.back();advance(6*3600000);
 // Clear existing active examples to isolate eligibility cases.
 for(const op of ctx.verify.refinements.floorData().ops)if(op.status==='atTable')op.status='availableNow';
 for(const r of d.allBookings())if(r.ongoing){r.ongoing=false;r.endedAt=new ctx.Date().toISOString();}
 s.role='client';go('account');assert.equal(el('customer-service-sidebar').innerHTML,'');assert(!e.requestService('mirror'));assert(!e.sendService());
 const r={id:'service17-active',customerId:'demo-customer-001',venue:'venueA',type:'ordinary',status:'confirmed',staffId:'maya',staff:'Maya',date:'2026-10-24',time:'18:00',table:'R01'};ops.addDemoBooking(r);e.ensure(r);
 go('account');assert.equal(el('customer-service-sidebar').innerHTML,'');r.ongoing=true;go('account');assert.equal(el('customer-service-sidebar').innerHTML,'');
 r.startedAt=new ctx.Date().toISOString();r.assignmentSessions[0].startedAt=r.startedAt;go('account');assert(el('customer-service-sidebar').innerHTML.includes('service-sidebar'));
 assert.equal(customer.getWechat(),'');assert(e.requestService('mirror'));assert.equal(e.calls.length,0);assert(el('design12-overlay').innerHTML.includes('R01'));x.back();assert.equal(e.calls.length,0);
 assert(e.requestService('mirror'));assert(e.sendService());assert(!e.sendService());const call=e.calls[0];assert.equal(call.place,'R01');assert.equal(call.bookingId,r.bookingId);assert.equal(call.requesterRole,'client');assert(e.requestService('mirror'));assert(!e.sendService());x.back();
 s.role='staff';go('staffHome');assert(el('customer-service-sidebar').innerHTML.includes('service-sidebar'));assert(e.requestService('waiter'));assert(e.sendService());assert.equal(e.calls[1].requesterId,'maya');assert.equal(e.calls[1].customerId,r.customerId);
 // Staff and Customer share duplicate prevention for the same booking/place/type.
 assert(e.requestService('mirror'));assert(!e.sendService());x.back();
 // Revalidate end/unassignment and location at confirmation time.
 assert(e.requestService('waiter'));r.assignmentSessions[0].endedAt=new ctx.Date().toISOString();assert(!e.sendService());go('staffHome');assert.equal(el('customer-service-sidebar').innerHTML,'');assert(!e.requestService('mirror'));
 r.assignmentSessions[0].endedAt=null;r.assignmentSessions[0].cancelledAt=new ctx.Date().toISOString();assert(!e.requestService('mirror'));r.assignmentSessions[0].cancelledAt=null;r.assignmentSessions[0].startedAt=null;assert(!e.requestService('mirror'));
 r.assignmentSessions[0].startedAt=new ctx.Date().toISOString();assert(e.requestService('mirror'));r.table='R02';assert(!e.sendService());assert.equal(e.calls.length,2);assert.equal(call.place,'R01');
 // No access for an unrelated customer, role, venue, completed or remote booking.
 s.role='client';r.customerId='demo-customer-002';assert(!e.requestService('mirror'));r.customerId='demo-customer-001';r.table='—';assert(!e.requestService('mirror'));r.table='R02';s.venue='venueB';assert(!e.requestService('mirror'));s.venue='venueA';r.status='completed';assert(!e.requestService('mirror'));r.status='confirmed';
 s.role='manager';go('actions');assert(el('tb-content').innerHTML.includes('R01'));assert(e.actions()[0].body.includes(call.bookingId));s.venue='venueB';go('actions');assert(!el('tb-content').innerHTML.includes('data-expand-action="'+call.id+'"'));x.click({dataset:{resolveService12:call.id}});assert.equal(call.state,'pending');s.venue='venueA';go('actions');x.click({dataset:{resolveService12:call.id}});assert.equal(call.state,'resolved');
 // Staff added/replaced partway through work gain access only with a live session.
 s.role='staff';r.assignmentSessions=[];go('staffHome');assert.equal(el('customer-service-sidebar').innerHTML,'');r.assignmentSessions.push({id:'replacement17',staffId:'maya',assignedAt:new ctx.Date().toISOString(),startedAt:new ctx.Date().toISOString(),endedAt:null});go('staffHome');assert(el('customer-service-sidebar').innerHTML.includes('service-sidebar'));r.ongoing=false;assert(!e.requestService('waiter'));
 // Main profile image retains its colour; roster-only desaturation is 50%.
 x.click({dataset:{profile:'sara'}});go('staffProfile');assert(el('tb-content').innerHTML.includes('class="profile-large-photo"'));assert(!el('tb-content').innerHTML.includes('photo-unavailable'));
}
const css=fs.readFileSync('design11.css','utf8');assert(css.includes('.staff-unavailable .roster-image img{filter:saturate(.3)}'));assert(!css.includes('.photo-unavailable'));
const lock=fs.readFileSync('lock-screen.css','utf8');for(const value of ['lock-rise .325s .025s','lock-avatar-rise .325s .375s','lock-rise .325s .725s','lock-rise .3s 1.05s'])assert(lock.includes(value));
console.log('PASS four locales: availability independent of arrival including noon gap, roster-only 30% saturation, active located booking and live Staff assignment guards, confirmation/cancel/revalidation, no WeChat dependency, duplicates, Manager routing/location and role/venue isolation.');
