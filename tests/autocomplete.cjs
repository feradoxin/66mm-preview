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
 const {s,go,experience:x,ctx,el}=harness(),op=x.operationPreview,click=data=>x.click({dataset:data}),key=value=>{let prevented=false;const handled=x.keydown({key:value,target:{id:'customer-lookup',closest:()=>null},preventDefault(){prevented=true;}});return {handled,prevented};};s.lang=lang;s.role='manager';go('managerBookings');click({ops:'manualBooking'});
 for(const [i,username] of ['alex_demo','adam_tan_demo','aaron_demo','agatha_demo','amy_demo','amelia_demo'].entries())op.customers.push({id:'lookup-'+i,username,name:username});
 const list=value=>Array.from(op.usernameSuggestions(value),c=>c.username);
 assert.deepEqual(list('@a'),list('a'));assert.deepEqual(list('@AD'),['adam_tan_demo','adrian_lee_demo']);assert.deepEqual(list('adam'),['adam_tan_demo']);assert.deepEqual(list('  @Ad '),['adam_tan_demo','adrian_lee_demo']);assert.equal(list('a').length,7);assert.deepEqual(list('a'),[...list('a')].sort());assert.deepEqual(list(''),[]);assert.deepEqual(list('@'),[]);assert.deepEqual(list('not_a_customer'),[]);
 assert(el('operations-overlay').innerHTML.includes('role="combobox"'));assert(el('operations-overlay').innerHTML.includes('aria-controls="customer-suggestions"'));
 const type=value=>{el('customer-lookup').value=value;x.input({id:'customer-lookup',value,selectionStart:value.length});};
 type('a');assert.equal(el('customer-suggestions').hidden,false);assert.equal((el('customer-suggestions').innerHTML.match(/role="option"/g)||[]).length,7);assert(!el('customer-suggestions').innerHTML.includes('kevin_chan_demo'));
 type('@ad');assert.equal((el('customer-suggestions').innerHTML.match(/role="option"/g)||[]).length,2);assert(el('customer-suggestions').innerHTML.indexOf('adam_tan_demo')<el('customer-suggestions').innerHTML.indexOf('adrian_lee_demo'));
 click({customerSuggestion:'lookup-1'});assert.equal(el('customer-lookup').value,'@adam_tan_demo');assert.equal(el('customer-suggestions').hidden,true);
 type('ad');key('ArrowDown');assert(el('customer-suggestions').innerHTML.includes('customer-suggestion-0" aria-selected="true"'));assert(key('Enter').handled);assert.equal(el('customer-lookup').value,'@adam_tan_demo');
 type('ad');key('ArrowUp');assert(el('customer-suggestions').innerHTML.includes('customer-suggestion-1" aria-selected="true"'));key('Enter');assert.equal(el('customer-lookup').value,'@adrian_lee_demo');
 type('a');assert(key('Escape').handled);assert.equal(el('customer-suggestions').hidden,true);assert(el('operations-overlay').innerHTML.includes('customer-lookup'));
 type('zzzzz');assert.equal(el('customer-suggestions').hidden,true);type('a');key('Tab');assert.equal(el('customer-suggestions').hidden,true);
 type('kevin');click({customerSuggestion:'demo-customer-002'});assert.equal(el('customer-lookup').value,'@kevin_chan_demo');click({ops:'lookupCustomer'});assert(el('operations-overlay').innerHTML.includes('Kevin Chan'));type('chloe');assert(!el('operations-overlay').innerHTML.includes('createManualBooking'));assert(el('customer-suggestions').innerHTML.includes('chloe_wong_demo'));
 // Scanning/exact lookup still accepts the original QR identity path.
 assert.equal(op.findCustomer('66MM-CUSTOMER:demo-customer-003').username,'chloe_wong_demo');
 s.role='staff';type('a');click({customerSuggestion:'demo-customer-001'});assert.equal(el('customer-lookup').value,'a');
}
const css=fs.readFileSync('operations.css','utf8');assert(css.includes('max-height:194px'));assert(css.includes('height:48px'));assert(css.includes('overflow-y:auto'));assert(css.includes('overscroll-behavior:contain'));
console.log('PASS four locales: optional @ and case-insensitive prefix filtering, alphabetical suggestions, four-visible scrolling, tap/autofill, keyboard navigation, dismissal, stale-customer clearing and unchanged QR lookup.');
