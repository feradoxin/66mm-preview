const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const elements=new Map(),handlers=new Map();
function el(id){
 if(!elements.has(id))elements.set(id,{id,innerHTML:'',textContent:'',style:{},value:'',open:false,isConnected:true,classList:{toggle(){},contains(k){return id===k},add(){},remove(){}},remove(){},removeAttribute(){},insertAdjacentHTML(_,html){this.innerHTML+=html},setAttribute(){},focus(){},querySelector:el,setPointerCapture(){},addEventListener(type,fn){const key=id+':'+type;handlers.set(key,[...(handlers.get(key)||[]),fn])},showModal(){this.open=true},close(){this.open=false;for(const fn of handlers.get(id+':close')||[])fn({})}});
 return elements.get(id);
}
const ctx={Intl,console,setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},scrollTo(){},localStorage:{getItem(){return ''},setItem(){}},document:{getElementById:el,querySelector:()=>null,querySelectorAll:()=>[],documentElement:{lang:'',style:{overflow:''}}}};ctx.window=ctx;
vm.createContext(ctx);vm.runInContext(fs.readFileSync('locales.js','utf8'),ctx);
for(const file of ['refinements-locales.js','customer-locales.js','customer-contact.js','experience-locales.js','upgrade.js','service-finance.js','operations.js','header-outline.js','mobile9.js','experience.js','refinements.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
const code=fs.readFileSync('app.js','utf8').replace('splash();\n})();','globalThis.verify={s,go,openLightbox,staffProfiles};\n})();');vm.runInContext(code,ctx);
const {s,go,openLightbox,staffProfiles}=ctx.verify;
function fire(id,type,event={}){for(const fn of handlers.get(id+':'+type)||[])fn(event)}
function counter(){return el('lightbox-count').textContent}
const keys=Object.keys(ctx.COPY.en).sort();let checks=0;
for(const lang of ['en','zh','ms','vi']){
 assert.deepEqual(Object.keys(ctx.COPY[lang]).sort(),keys);s.lang=lang;
 for(const role of ['client','staff']){
  s.role=role;go(role==='client'?'browse':'roster');assert.equal((el('tb-content').innerHTML.match(/class="staff-card"/g)||[]).length,7);
  assert.equal(el('tb-content').innerHTML.includes('data-person='),role==='client');checks++;
 }
 go('staffProfile');assert.equal((el('tb-content').innerHTML.match(/data-photo=/g)||[]).length,5);
 openLightbox(3,el('thumb'));assert.equal(counter(),'4 / 4');
 fire('lightbox-next','click');assert.equal(counter(),'1 / 4');fire('lightbox-prev','click');assert.equal(counter(),'4 / 4');
 fire('lightbox-image','pointerdown',{isPrimary:true,clientX:200,clientY:100,pointerId:1});fire('lightbox-image','pointerup',{clientX:100,clientY:105,pointerId:1});assert.equal(counter(),'1 / 4');
 fire('lightbox-image','pointerdown',{isPrimary:true,clientX:100,clientY:100,pointerId:2});fire('lightbox-image','pointerup',{clientX:200,clientY:105,pointerId:2});assert.equal(counter(),'4 / 4');
 fire('lightbox-image','pointerdown',{isPrimary:true,clientX:100,clientY:100,pointerId:3});fire('lightbox-image','pointerup',{clientX:110,clientY:220,pointerId:3});assert.equal(counter(),'4 / 4');
 fire('staff-lightbox','click',{target:el('lightbox-image')});assert.equal(el('staff-lightbox').open,true);
 fire('staff-lightbox','click',{target:el('lightbox-stage')});assert.equal(el('staff-lightbox').open,false);assert.equal(ctx.document.documentElement.style.overflow,'');checks+=9;
}
for(const person of staffProfiles)for(let i=1;i<=4;i++)assert(fs.statSync(`assets/staff/${person.id}-${i}.webp`).size>0);
assert(!/fetch\(|XMLHttpRequest|sendData\(/.test(code));
console.log(`PASS: ${checks} gallery/lightbox checks across four locales; all 28 local photo assets; no transaction or upload API.`);
