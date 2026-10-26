/* Shared popup lifecycle: 200ms entrance and the same motion reversed over 125ms on exit.
   Removal still stops cameras/timers and commits no delayed business action. */
(() => {
 const openDuration=200, closeDuration=125, easing='cubic-bezier(.2,.8,.2,1)';
 const frames=[{transform:'translateY(100%)',opacity:.6},{transform:'translateY(0)',opacity:1}];
 const reduced=()=>window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
 window.PreviewPopupMotion={openDuration,closeDuration,easing,frames};
 const app=document.getElementById('tbw06');
 if(!app)return;
 const footer=document.getElementById('tb-nav');
 function updateToastOffset(){if(!footer)return;const rect=footer.getBoundingClientRect(),visible=footer.children.length&&getComputedStyle(footer).display!=='none';app.style.setProperty('--preview-toast-bottom',(50+(visible?Math.max(0,window.innerHeight-rect.top):0))+'px');}
 const footerObserver=window.ResizeObserver&&footer?new ResizeObserver(updateToastOffset):null;footerObserver?.observe(footer);window.addEventListener?.('resize',updateToastOffset);window.visualViewport?.addEventListener('resize',updateToastOffset);updateToastOffset();
 if(!window.MutationObserver||!window.Element?.prototype.animate)return;
 const tracked=new Map(),selector='[role="dialog"],dialog,.app-popup';
 const ghostHost=document.createElement('div');ghostHost.id='popup-motion-ghosts';ghostHost.setAttribute('aria-hidden','true');ghostHost.inert=true;app.append(ghostHost);
 const rectFor=el=>{const r=el.getBoundingClientRect(),style=getComputedStyle(el);let dy=0;try{dy=style.transform==='none'?0:new DOMMatrixReadOnly(style.transform).m42;}catch{}return {left:r.left,top:r.top-dy,width:r.width,height:r.height};};
 const visible=el=>el.isConnected&&!el.closest('#popup-motion-ghosts')&&(!el.matches('dialog')||el.open)&&getComputedStyle(el).display!=='none'&&el.getBoundingClientRect().width>0;
 const key=el=>{let parent=el.parentElement;while(parent&&parent!==app&&!parent.id)parent=parent.parentElement;return (parent?.id||'app')+'|'+(el.id||el.getAttribute('aria-labelledby')||el.className);};
 const ro=window.ResizeObserver?new ResizeObserver(entries=>{for(const {target} of entries){const state=tracked.get(target);if(state&&visible(target))state.rect=rectFor(target);}}):null;
 function enter(el,skip=false){el.style.setProperty('animation','none','important');const state={key:key(el),rect:rectFor(el),animation:null};tracked.set(el,state);ro?.observe(el);if(!skip&&!reduced())state.animation=el.animate(frames,{duration:openDuration,easing,fill:'both'});}
 function exit(el,state){ro?.unobserve(el);if(reduced()||app.classList.contains('is-lock-preview')){state.animation?.cancel();return;}const clone=el.cloneNode(true);clone.removeAttribute('id');if(clone.matches('dialog'))clone.setAttribute('open','');clone.removeAttribute('role');clone.removeAttribute('aria-modal');clone.setAttribute('aria-hidden','true');clone.inert=true;clone.querySelectorAll('[id]').forEach(x=>x.removeAttribute('id'));clone.querySelectorAll('video,audio').forEach(x=>{x.removeAttribute('src');x.srcObject=null;});clone.querySelectorAll('input,button,textarea,select,a,[tabindex]').forEach(x=>{x.setAttribute('tabindex','-1');x.removeAttribute('autofocus');});const r=state.rect;for(const [k,v] of Object.entries({position:'fixed',left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px',maxWidth:'none',maxHeight:'none',margin:'0',translate:'none',animation:'none',pointerEvents:'none',zIndex:'1000'}))clone.style.setProperty(k.replace(/[A-Z]/g,m=>'-'+m.toLowerCase()),v,'important');ghostHost.append(clone);const opening=state.animation?.playState==='running'?Number(state.animation.currentTime)||0:openDuration;state.animation?.cancel();const animation=clone.animate(frames,{duration:closeDuration,easing,direction:'reverse',fill:'both'});animation.currentTime=closeDuration*(1-Math.min(1,opening/openDuration));const cleanup=()=>clone.remove();animation.finished.then(cleanup,cleanup);setTimeout(cleanup,closeDuration+100);}
 function standardizeClose(el){const labels=new Set(['Close','close',...Object.values(window.COPY||{}).flatMap(c=>[c.closePhoto,c.closeModal,c.close]).filter(Boolean)]);for(const b of el.querySelectorAll('button')){const text=b.textContent.trim();if(labels.has(text)||['×','✕'].includes(text)||b.classList.contains('notice-close')||b.classList.contains('sheet-close')){if(!b.getAttribute('aria-label'))b.setAttribute('aria-label',text==='X'?'Close':text);if(text!=='X')b.textContent='X';if(!b.classList.contains('popup-close19'))b.classList.add('popup-close19');}}}
 function sync(){
  updateToastOffset();
  // Suppress re-entry/exit effects for in-place renders of the same dialog.
  const live=[...app.querySelectorAll(selector)].filter(visible);live.forEach(standardizeClose);
  const added=live.filter(el=>!tracked.has(el)),removed=[...tracked].filter(([el])=>!live.includes(el));
  for(const [el,state] of removed){tracked.delete(el);if(added.some(next=>key(next)===state.key)||removed.some(([parent,ps])=>parent!==el&&parent.contains(el)&&!added.some(next=>key(next)===ps.key))){ro?.unobserve(el);state.animation?.cancel();}else exit(el,state);}
  for(const el of added)enter(el,removed.some(([,state])=>state.key===key(el))||added.some(parent=>parent!==el&&parent.contains(el)));
  if(app.classList.contains('is-lock-preview'))ghostHost.replaceChildren();
 }
 new MutationObserver(sync).observe(app,{childList:true,subtree:true,attributes:true,attributeFilter:['open','class']});sync();
})();
