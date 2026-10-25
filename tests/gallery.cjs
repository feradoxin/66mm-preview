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
 const {s,go,experience:x,el,ctx}=harness();s.lang=lang;
 const keys=Object.keys(ctx.COPY.en).sort();assert.deepEqual(Object.keys(ctx.COPY[lang]).sort(),keys);
 for(const role of ['client','staff']){s.role=role;go(role==='client'?'browse':'roster');assert.equal((el('tb-content').innerHTML.match(/class="staff-card /g)||[]).length,12);assert.equal(el('tb-content').innerHTML.includes('data-bulk-person'),role==='client');
 x.click({dataset:{profile:'yue'}});go('staffProfile');const first=el('tb-content').innerHTML;assert(first.includes('yue-1.webp'));assert(!first.includes('data-photo='));assert(!first.includes('enlargePhoto'));assert(first.indexOf(ctx.COPY[lang].publicProfile)<first.indexOf(ctx.COPY[lang].availability));assert(first.indexOf(ctx.COPY[lang].availability)<first.indexOf(ctx.COPY[lang].languagesSpoken));x.click({dataset:{inlinePhoto:'2'}});assert(el('tb-content').innerHTML.includes('profile-large-photo photo-unavailable" src="assets/staff/yue-3.webp')||el('tb-content').innerHTML.includes('profile-large-photo " src="assets/staff/yue-3.webp'));assert.equal(el('tb-content').innerHTML.includes('data-reserve-person='),role==='client');}
}
for(const id of ['maya','lin','an','mei','sara','nhi','lina','soojin','yue','thao','hana','jia'])for(let i=1;i<=4;i++)assert(fs.statSync(`assets/staff/${id}-${i}.webp`).size>0);
assert(!fs.readFileSync('index.html','utf8').includes('id="staff-lightbox"'));
console.log('PASS four locales: 12-person Customer/Staff rosters, customer-only bulk controls, inline photo selection, profile segment order, no lightbox, 48 local assets.');
