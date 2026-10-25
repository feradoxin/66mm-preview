const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function harness(){const nodes=new Map(),timers=[],handlers=new Map();let now=Date.parse('2026-10-24T10:00:00Z');const RealDate=Date;
 class Clock extends RealDate{constructor(...a){super(...(a.length?a:[now]));}static now(){return now;}}
 function el(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',hidden:true,value:'',style:{},open:false,dataset:{},isConnected:true,classList:{toggle(){},add(){},remove(){}},focus(){},remove(){this.innerHTML=''},removeAttribute(){},insertAdjacentHTML(_,html){this.innerHTML+=html},setAttribute(){},addEventListener(type,fn){handlers.set(id+':'+type,fn)},querySelector:el,querySelectorAll:()=>[],close(){this.open=false}});return nodes.get(id);}
 const ctx={Date:Clock,Intl,console,navigator:{clipboard:{writeText:async()=>{}}},setTimeout:(fn,delay)=>{timers.push({fn,delay});return timers.length},clearTimeout(){},setInterval:()=>1,clearInterval(){},scrollTo(){},localStorage:{getItem(){return null},setItem(){}},document:{getElementById:el,querySelector:()=>null,querySelectorAll:()=>[],documentElement:{lang:'',style:{}}}};ctx.window=ctx;vm.createContext(ctx);
 for(const f of ['locales.js','refinements-locales.js','customer-locales.js','experience-locales.js','invite-demo.js','refinements.js','customer-contact.js','upgrade.js','service-finance.js','operations.js','header-outline.js','mobile9.js','design11.js','design12.js','experience.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
 vm.runInContext(fs.readFileSync('app.js','utf8').replace('splash();\n})();','globalThis.verify={s,go,customer,experience,error};\n})();'),ctx);
 return {...ctx.verify,ctx,el,timers,advance:ms=>now+=ms,flush:delay=>{const tasks=timers.filter(x=>x.delay===delay);tasks.forEach(x=>{x.delay=-1;x.fn()})}};
}
for(const lang of ['en','zh','ms','vi']){
 const {s,go,experience:x,customer,ctx,el,advance}=harness();const click=data=>x.click({dataset:data});
 s.lang=lang;s.role='staff';go('staffHome');assert(!el('tb-content').innerHTML.includes('staff-unread'));assert(!el('tb-content').innerHTML.includes('data-experience="clockOut"'));assert(el('tb-header').innerHTML.includes('notification-bell'));assert(el('tb-content').innerHTML.includes('MYR'));
 // A manager must mark in the package before the staff member can clock out.
 click({packageClock:'package-demo-a'});assert.equal(x.pendingCount(),1);
 s.role='manager';go('managerManage');el('start-package-demo-a').value='2026-10-24T18:01';click({packageStart:'package-demo-a'});assert(el('contact-toast').innerHTML.includes(ctx.COPY[lang].invalidPackageStart));
 el('start-package-demo-a').value='2026-10-24T18:00';click({packageStart:'package-demo-a'});
 s.role='client';go('updates');assert(el('tb-content').innerHTML.includes(ctx.COPY[lang].packageStartNotice));
 s.role='staff';go('staffHome');click({staffWork:'package-demo-a'});assert(el('mobile9-overlay').innerHTML.includes('data-package-clock="package-demo-a"'));click({mobile:'close'});
 click({upgrade:'notifications'});assert(el('upgrade-overlay').innerHTML.includes(ctx.COPY[lang].needsResponse));const unread=x.unreadCount();click({experience:'markReadSafe'});assert.equal(x.unreadCount(),unread);click({upgrade:'closeNotice'});
 advance(8*3600000);click({packageClock:'package-demo-a'});click({packageClock:'package-demo-a'});assert.equal(x.pendingCount(),2);
 s.role='manager';go('actions');assert(!el('tb-content').innerHTML.includes(ctx.COPY[lang].packageOverEight));click({expandAction:'package-package-demo-a'});assert(el('tb-content').innerHTML.includes('data-package-ack="package-demo-a"'));click({packageAck:'package-demo-a'});assert.equal(x.pendingCount(),1);
 go('managerManage');el('start-package-demo-b').value='2026-10-25T02:00';click({packageStart:'package-demo-b'});
 s.role='staff';go('staffHome');advance(8*3600000+1);click({packageClock:'package-demo-b'});
 s.role='manager';go('actions');click({expandAction:'package-package-demo-b'});assert(el('tb-content').innerHTML.includes(ctx.COPY[lang].packageOverEight));assert(!el('tb-header').innerHTML.includes('notification-bell'));assert(el('tb-nav').innerHTML.includes('nav-count'));const n=x.unreadCount();click({experience:'markReadSafe'});assert.equal(x.unreadCount(),n);click({upgrade:'closeNotice'});
 s.role='client';go('updates');assert(el('tb-content').innerHTML.includes(ctx.COPY[lang].packageEndNotice));
 s.role='staff';go('account');assert(el('tb-content').innerHTML.includes(ctx.COPY[lang].languagesSpoken));assert(el('tb-content').innerHTML.includes('staff-gallery-upload'));el('profile-nickname').value='Maya';el('staff-dob').value='2000-01-15';for(const k of ['en','zh','ms','vi'])el('staff-language-'+k).value='fluent';click({experience:'saveProfile'});go('roster');assert(el('tb-content').innerHTML.includes(ctx.COPY[lang].ageLabel+': 26'));click({coverPhoto:'1'});go('roster');assert(el('tb-content').innerHTML.includes('maya-2.webp'));
 s.role='onboarding';go('language');assert(el('tb-header').innerHTML.includes('language-flip'));
}
console.log('PASS: four-locale gallery ages/editor/cover, language heading, notification bell/action retention, manager-only package start, staff-only package clock-out, exact 8-hour/no-excess and >8-hour/excess, duplicate prevention and customer timestamps.');
