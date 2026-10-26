const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function harness(){let observer,reduced=false,resize;const animations=[],timers=[];
 class Node{
  constructor(tag='div',attrs={}){this.tag=tag;this.attrs={...attrs};this.children=[];this.parentElement=null;this.className='';this.style={setProperty:(k,v)=>this.style[k]=v};this.classList={contains:k=>this.className.split(' ').includes(k)};this.isConnected=false;this.inert=false;this.open=!!attrs.open;this.rect={left:40,top:90,width:320,height:400};}
  get id(){return this.attrs.id||''} set id(v){this.attrs.id=v}
  setAttribute(k,v){this.attrs[k]=v;if(k==='open')this.open=true}getAttribute(k){return this.attrs[k]||null}removeAttribute(k){delete this.attrs[k]}
  matches(sel){return sel.split(',').some(s=>s==='dialog'?this.tag==='dialog':s==='[role="dialog"]'?this.attrs.role==='dialog':s==='.app-popup'?this.className.includes('app-popup'):s==='[id]'?!!this.id:s.startsWith('#')?this.id===s.slice(1):this.tag===s)}
  closest(sel){return this.matches(sel)?this:this.parentElement?.closest(sel)||null}
  querySelectorAll(sel){return this.children.flatMap(c=>[...(c.matches(sel)?[c]:[]),...c.querySelectorAll(sel)])}
  append(c){c.remove();this.children.push(c);c.parentElement=this;c.connect(this.isConnected)}connect(v){this.isConnected=v;this.children.forEach(c=>c.connect(v))}
  contains(el){return el===this||this.children.some(c=>c.contains(el))}
  remove(){if(this.parentElement)this.parentElement.children=this.parentElement.children.filter(c=>c!==this);this.parentElement=null;this.connect(false)}replaceChildren(){this.children.slice().forEach(c=>c.remove())}
  getBoundingClientRect(){return this.rect}
  cloneNode(){const c=new Node(this.tag,this.attrs);c.className=this.className;this.children.forEach(x=>c.append(x.cloneNode(true)));return c}
  animate(frames,options){let resolve;const a={frames,options,currentTime:0,playState:'running',cancel(){this.playState='idle'},finished:new Promise(r=>resolve=r),finish(){this.playState='finished';resolve()}};animations.push(a);return a}
 }
 const app=new Node('div',{id:'tbw06'});app.connect(true);const ctx={console,Element:Node,document:{getElementById:id=>id===app.id?app:app.querySelectorAll('#'+id)[0],createElement:tag=>new Node(tag)},matchMedia:()=>({matches:reduced}),getComputedStyle:el=>({display:el.tag==='dialog'&&!el.open?'none':'block',transform:'none'}),MutationObserver:class{constructor(fn){observer=fn}observe(){}},ResizeObserver:class{constructor(fn){resize=fn}observe(){}unobserve(){}},setTimeout:fn=>timers.push(fn)};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(fs.readFileSync('popup-motion.js','utf8'),ctx);
 const root=new Node('div',{id:'test-overlay'});app.append(root);const dialog=(id='modal-title')=>new Node('section',{role:'dialog','aria-labelledby':id});
 return {app,root,dialog,animations,timers,ctx,sync:()=>observer(),reduced:v=>reduced=v,resize:el=>resize([{target:el}])};
}
(async()=>{
 const h=harness(),d=h.dialog();h.root.append(d);h.sync();assert.equal(h.animations.length,1);const entry=h.animations[0];assert.equal(entry.options.duration,2000);assert.equal(entry.options.easing,'cubic-bezier(.2,.8,.2,1)');entry.currentTime=500;
 d.remove();h.sync();const exit=h.animations[1],host=h.app.querySelectorAll('#popup-motion-ghosts')[0],ghost=host.children[0];assert(ghost.inert);assert.equal(ghost.getAttribute('role'),null);assert.equal(ghost.style['pointer-events'],'none');assert.equal(exit.options.direction,'reverse');assert.equal(exit.currentTime,1500);assert.deepEqual(entry.frames,exit.frames);exit.finish();await Promise.resolve();assert.equal(host.children.length,0);
 // A content repaint is not a new popup entrance or exit.
 const one=h.dialog();h.root.append(one);h.sync();const count=h.animations.length;one.remove();h.root.append(h.dialog());h.sync();assert.equal(h.animations.length,count);
 // New future semantic dialogs inherit the same policy, including native dialogs.
 h.root.replaceChildren();h.sync();const native=new h.ctx.Element('dialog',{open:''});native.open=true;h.root.append(native);h.sync();assert.equal(h.animations.at(-1).options.duration,2000);h.animations.at(-1).finish();native.open=false;h.sync();assert(host.children.some(x=>x.tag==='dialog'&&x.open));
 h.reduced(true);h.root.replaceChildren();h.sync();const quiet=h.dialog('quiet');h.root.append(quiet);const n=h.animations.length;h.sync();quiet.remove();h.sync();assert.equal(h.animations.length,n);
 h.app.className='is-lock-preview';h.sync();assert.equal(host.children.length,0);
 // Nested popup closes animate while its parent remains mounted.
 const nested=harness(),parent=nested.dialog('parent'),child=nested.dialog('child');parent.append(child);nested.root.append(parent);nested.sync();assert.equal(nested.animations.length,1);child.remove();nested.sync();assert.equal(nested.animations.at(-1).options.direction,'reverse');
 console.log('PASS shared popup lifecycle: symmetric 2s frames/easing, reverse interrupted entrance, inert exits and cleanup, repaint suppression, native/nested/future dialogs, reduced motion and lock privacy.');
})().catch(e=>{console.error(e);process.exit(1)});
