const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),{webcrypto}=require('node:crypto');
const nodes=new Map(),handlers=new Map(),storage=new Map();
function el(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',value:'',style:{},open:false,classList:{toggle(){},add(){},remove(){}},remove(){},removeAttribute(){},insertAdjacentHTML(_,html){this.innerHTML+=html},setAttribute(){},addEventListener(type,fn){const k=id+':'+type;handlers.set(k,[...(handlers.get(k)||[]),fn]);},querySelector:el});return nodes.get(id);}
const ctx={Intl,console,TextEncoder,crypto:webcrypto,navigator:{},setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},scrollTo(){},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},document:{getElementById:el,querySelector:()=>null,querySelectorAll:()=>[],documentElement:{lang:'',style:{}}}};ctx.window=ctx;vm.createContext(ctx);
for(const file of ['locales.js','refinements-locales.js','customer-locales.js','customer-contact.js','experience-locales.js','upgrade.js','service-finance.js','operations.js','header-outline.js','mobile9.js','design11.js','experience.js','invite-demo.js','vendor/qrcode.js','refinements.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
vm.runInContext(fs.readFileSync('app.js','utf8').replace('splash();\n})();','globalThis.verify={s,go,refinements,customer};\n})();'),ctx);
const {s,go,refinements,customer}=ctx.verify;
const button=data=>({dataset:data,hasAttribute(){return false}});
(async()=>{
const now=20000*100+19999;
for(let age=0;age<=2;age++){const result=await ctx.InviteDemo.validate(await ctx.InviteDemo.codeFor(100-age),now);assert(result.ok);}
assert.equal((await ctx.InviteDemo.validate(await ctx.InviteDemo.codeFor(101),now)).error,'inviteFuture');
assert.equal((await ctx.InviteDemo.validate(await ctx.InviteDemo.codeFor(97),now)).error,'inviteExpired');
assert.equal((await ctx.InviteDemo.validate(await ctx.InviteDemo.codeFor(98),20000*101)).error,'inviteExpired');
const code=await ctx.InviteDemo.codeFor(100);assert.equal((await ctx.InviteDemo.validate(code.slice(0,-1)+(code.endsWith('0')?'1':'0'),now)).error,'inviteInvalid');
assert.equal((await ctx.InviteDemo.validate('hello',now)).error,'inviteInvalid');
let renders=0;const keys=Object.keys(ctx.COPY.en).sort();
for(const lang of ['en','zh','ms','vi']){
 assert.deepEqual(Object.keys(ctx.COPY[lang]).sort(),keys);s.lang=lang;s.role='manager';go('floor');
 for(const tab of ['tables','rooms','staff']){refinements.click(button({floorTab:tab}));const html=el('tb-content').innerHTML;assert(html.includes('floor-scroll'));assert(html.includes(`data-floor-tab="${tab}" aria-selected="true"`));renders++;}
 refinements.click(button({floorTab:'tables'}));assert.equal((el('tb-content').innerHTML.match(/data-space=/g)||[]).length,8);assert(!el('tb-content').innerHTML.includes('assignment-person'));
 refinements.click(button({space:'T04'}));assert(el('tb-content').innerHTML.includes('Maya'));assert(el('tb-content').innerHTML.includes('20:00'));assert(el('tb-content').innerHTML.includes('22:00'));
 refinements.click(button({opsStaff:'sara'}));assert(el('tb-content').innerHTML.includes(ctx.COPY[lang].medicalToday));
 refinements.click(button({packageStaff:'nhi'}));assert(el('tb-content').innerHTML.includes('Nhi'));assert(el('tb-content').innerHTML.includes(ctx.COPY[lang].packageB));
 s.role='client';customer.input({id:'wechat-id',value:'demo_customer'});customer.click(button({action:'saveWechat'}));go('request');assert(!el('tb-content').innerHTML.includes('alternativeDate'));assert(!el('tb-content').innerHTML.includes('alternativeTime'));
 for(const role of ['manager','admin']){s.role=role;go(role==='manager'?'managerManage':'adminManage');assert(el('tb-content').innerHTML.includes('inviteIssuer'));}
}
s.role='manager';s.lang='en';go('actions');const before=refinements.pendingCount();refinements.click(button({task:'booking'}));refinements.click(button({action:'resolveTask'}));assert.equal(refinements.pendingCount(),before-1);assert(el('tb-nav').innerHTML.includes('nav-count'));
const qr=ctx.qrcode(0,'M');qr.addData(code);qr.make();assert(qr.createImgTag().includes('data:image/gif;base64,'));
console.log(`PASS: QR current / two past / no future / expiry boundary / tamper checks; ${renders} localized floor tab views; table details, package identity, 7-staff statuses, action count and client date fields.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
