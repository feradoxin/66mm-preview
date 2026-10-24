// Shared restrained content transition for in-screen segmented tabs.
window.animatePreviewPanel=panel=>{if(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches)return;panel?.animate?.([{opacity:.5,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:180,easing:'ease-out'});};
window.createRefinements=({s,t,B,A,row,box,note,small,field,esc,money,staffProfiles,photoPath,go,render,customerPendingCount=()=>0})=>{
const ops=[
 {id:'maya',status:'atTable',place:'T04',since:'20:00',booked:'22:00',minutes:125,earnings:240,packages:0},
 {id:'lin',status:'onPackage',place:'packageA',since:'22:00',minutes:70,earnings:360,packages:1},
 {id:'an',status:'availableNow',place:'',minutes:90,earnings:180,packages:0},
 {id:'mei',status:'atTable',place:'R01',since:'20:30',minutes:85,earnings:170,packages:0},
 {id:'sara',status:'medicalToday',place:'',minutes:0,earnings:0,packages:0},
 {id:'nhi',status:'onPackage',place:'packageB',since:'22:00',minutes:60,earnings:300,packages:1},
 {id:'lina',status:'offToday',place:'',minutes:0,earnings:0,packages:0}
];
const tables=[
 {id:'T01',status:'free',people:0},{id:'T02',status:'free',people:0},
 {id:'T03',status:'reserved',people:0,booking:'22:00'},
 {id:'T04',status:'occupied',people:3,since:'19:45',assigned:['maya'],booking:'22:00'},
 {id:'T05',status:'occupied',people:2,since:'20:15',assigned:[]},
 {id:'T06',status:'occupied',people:4,since:'20:30',assigned:[]},
 {id:'T07',status:'free',people:0},{id:'T08',status:'reserved',people:0,booking:'00:00'}
];
const rooms=[{id:'R01',status:'occupied',people:6,since:'20:00',assigned:['mei']},{id:'R02',status:'free',people:0},{id:'R03',status:'reserved',people:0,booking:'22:00'},{id:'R04',status:'occupied',people:3,since:'21:00',assigned:[]},{id:'R05',status:'free',people:0},{id:'R06',status:'reserved',people:0,booking:'00:00'}];
const tasks=[{id:'booking',title:'newBookingTask',detail:'bookingTaskBody',link:'managerBooking'},{id:'overrun',title:'overrunTask',detail:'overrunTaskBody',link:'overrun'},{id:'assignment',title:'assignmentTask',detail:'assignmentTaskBody',link:'floor'},{id:'leave',title:'leaveTask',detail:'leaveTaskBody',link:'placeholder'},{id:'profile',title:'profileTask',detail:'profileTaskBody',link:'placeholder'},{id:'package',title:'packageTask',detail:'packageTaskBody',link:'price'}];
let floorTab='tables',selectedSpace=tables[3],selectedStaff='maya',selectedTask='booking',pending=new Set(tasks.map(x=>x.id)),qrTimer=null,qrGeneration=0,qrCode='',cameraStream=null,scanGeneration=0,qrSlot=-1;
const profile=id=>staffProfiles.find(p=>p.id===id)||staffProfiles[0];
const view=(title,body,back='')=>({title:t(title),body,back});
const pendingCount=()=>pending.size;
const seg=(key,title)=>`<button type="button" role="tab" data-floor-tab="${key}" aria-selected="${floorTab===key}" aria-controls="floor-panel">${t(title)}</button>`;
function spaceList(list){return `<div class="floor-scroll" role="region" aria-label="${t(floorTab)}" tabindex="0">${list.map(x=>`<button type="button" class="space-card" data-space="${x.id}"><span class="space-top"><strong>${x.id}</strong><span class="status-tag ${x.status}">${t(x.status)}</span></span><span class="space-summary">${x.status==='occupied'?t('since')+' '+x.since+' · '+x.people+' '+t('guests')+' · '+(x.assigned?.length||0)+' '+t('staffAssignedCount'):x.status==='reserved'?t('bookingStarts')+' '+x.booking:t('readyForGuests')}</span></button>`).join('')}</div>`;}
function staffList(){return `<div class="floor-scroll staff-scroll" role="region" aria-label="${t('staffLabel')}" tabindex="0">${ops.map(x=>{const p=profile(x.id);return `<button type="button" class="ops-staff-row" data-ops-staff="${x.id}"><img src="${photoPath(p,0)}" alt="${p.name}" width="56" height="70"><span><strong>${p.name}</strong><span class="ops-status">${t(x.status)}</span><span class="space-meta">${x.place?(x.place.startsWith('package')?t(x.place):x.place)+' · '+t('since')+' '+x.since:t(x.status==='availableNow'?'readyForAssignment':x.status)}</span></span><span aria-hidden="true">›</span></button>`}).join('')}</div>`;}
function packagesStrip(){return `<section class="package-strip" aria-label="${t('packagesNow')}"><div><span class="section-kicker">${t('packagesNow')}</span><strong>2</strong></div><div class="package-chips">${['lin','nhi'].map(id=>{const p=profile(id),op=ops.find(x=>x.id===id);return `<button type="button" data-package-staff="${id}"><img src="${photoPath(p,0)}" alt="" width="28" height="35"><span>${p.name} · ${t(op.place)}</span><span aria-hidden="true">›</span></button>`}).join('')}</div></section>`;}
function floor(){return view('liveFloor',packagesStrip()+`<div class="tb-tabs raised-tabs" role="tablist" aria-label="${t('liveFloor')}">${seg('tables','tables')}${seg('rooms','rooms')}${seg('staff','staffLabel')}</div><div id="floor-panel" role="tabpanel">${floorTab==='staff'?staffList():spaceList(floorTab==='rooms'?rooms:tables)}</div>`);}
function spaceDetail(){const x=selectedSpace;return {title:x.id,back:'floor',body:box('spaceDetails',`<span hidden data-current-space-status="${x.status}"></span>`+row('status',t(x.status))+(x.since?row('occupiedSince',x.since):'')+(x.people?row('guests',String(x.people)):'')+(x.booking?row('bookingStarts',x.booking):''))+(x.status==='occupied'?`<section class="tb-box"><h3>${t('staffAssignedTitle')}</h3>${x.assigned?.length?x.assigned.map(id=>{const p=profile(id),op=ops.find(y=>y.id===id);return `<button type="button" class="assignment-person" data-ops-staff="${id}"><img src="${photoPath(p,0)}" alt="${p.name}" width="44" height="55"><span><strong>${p.name}</strong><span>${t('serviceStarted')} ${op.since}</span>${op.booked?`<span>${t('bookingStarts')} ${op.booked}</span>`:''}</span><span aria-hidden="true">›</span></button>`}).join(''):small('noStaffAssigned')}</section>`:'')+(x.status==='occupied'&&x.assigned?.length?B('completeService','billing','tb-main'):'')};}
function staffDetail(){const p=profile(selectedStaff),op=ops.find(x=>x.id===selectedStaff);return {title:p.name,back:'floor',body:`<div class="ops-staff-hero"><img src="${photoPath(p,0)}" alt="${p.name}" width="84" height="105"><div><span class="section-kicker">${t('currentStatus')}</span><h3>${t(op.status)}</h3>${op.place?`<p>${op.place.startsWith('package')?t(op.place):op.place} · ${t('since')} ${op.since}</p>`:''}</div></div>`+box('todayWork',row('tableMinutes',op.minutes+' '+t('minutesShort'))+row('packagesDone',String(op.packages))+row('todayEarnings',money(op.earnings)))+small('demoDayStats')+(op.booked?box('nextBooking',row('start',op.booked)):'')+(op.status==='onPackage'?B('viewPackage','package'):'')};}
function actionList(){return view('actions',`<div class="action-inbox-head"><span class="large-count">${pending.size+customerPendingCount()}</span><div><h3>${t('needAttention')}</h3><span class="tb-small">${t('allAlertsHere')}</span></div></div>`+(pending.size+customerPendingCount()?tasks.filter(x=>pending.has(x.id)).map((x,i)=>`<button type="button" class="inbox-item" data-task="${x.id}"><span class="inbox-dot" aria-hidden="true"></span><span><strong>${t(x.title)}</strong><span>${t(x.detail)}</span></span><span aria-hidden="true">›</span></button>`).join(''):note('allCaughtUp')));}
function taskDetail(){const task=tasks.find(x=>x.id===selectedTask);return view(task.title,note(task.detail)+B('openRelated',''+task.link)+A('resolveDemo','resolveTask','tb-main')+small('previewResult'),'actions');}
function inviteIssuer(){return view('inviteGuest',small('showQrGuest')+`<div class="invite-qr-card"><div id="invite-qr" aria-label="${t('inviteQr')}"></div><p id="invite-countdown" role="status">${t('loading')}</p></div>`+A('copyInvite','copyInvite','tb-full')+`<details class="invite-code-details"><summary>${t('manualCode')}</summary><textarea id="issuer-code" readonly aria-label="${t('manualCode')}"></textarea></details>`+small('demoInviteWarning'),s.role==='manager'?'managerManage':'adminManage');}
function inviteScan(){return view('scanInvite',note('askManagerQr')+A('scanQr','scanQr','tb-main')+`<video id="invite-camera" playsinline muted hidden></video>`+areaInvite()+A('checkInvite','checkInvite','tb-full')+small('demoInviteWarning'),'language');}
function areaInvite(){return field('manualCode',`<textarea id="invite-token" rows="3" autocomplete="off" placeholder="${t('pasteInvite')}">${esc(s.inviteToken||'')}</textarea>`);}
function stopCamera(){scanGeneration++;if(cameraStream){cameraStream.getTracks().forEach(track=>track.stop());cameraStream=null;}}
async function checkInvite(text){
 if(s.page!=='invite')return;
 let result;try{result=await InviteDemo.validate(text);}catch{return showError('inviteInvalid');}
 if(s.page!=='invite')return;
 if(!result.ok)return showError(result.error);
 let used=[];try{used=JSON.parse(localStorage.getItem('66mm-demo-used-invites')||'[]');}catch{}
 if(used.includes(result.code))return showError('inviteUsed');
 used.push(result.code);try{localStorage.setItem('66mm-demo-used-invites',JSON.stringify(used.slice(-30)));}catch{}
 stopCamera();go('inviteVerified');
}
function showError(key){const el=document.getElementById('error');if(el)el.textContent=t(key);}
async function scanQr(){
 const tg=window.Telegram?.WebApp;
 if(tg?.initData&&tg.isVersionAtLeast('6.4')){try{tg.showScanQrPopup({text:t('scanQr')},text=>{checkInvite(text);return true;});return;}catch{}}
 if(!window.BarcodeDetector||!navigator.mediaDevices?.getUserMedia)return showError('scanFallback');
 const generation=++scanGeneration;
 try{
  const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false});
  if(generation!==scanGeneration||s.page!=='invite'){stream.getTracks().forEach(x=>x.stop());return;}
  cameraStream=stream;const video=document.getElementById('invite-camera');video.hidden=false;video.srcObject=stream;await video.play();
  const detector=new BarcodeDetector({formats:['qr_code']});
  const read=async()=>{if(s.page!=='invite'||!cameraStream||generation!==scanGeneration)return;try{const codes=await detector.detect(video);if(codes[0]){stopCamera();checkInvite(codes[0].rawValue);return;}}catch{}setTimeout(read,300);};read();
 }catch{stopCamera();showError('scanFallback');}
}
async function refreshQr(force=false){
 const generation=++qrGeneration,slot=InviteDemo.slotAt();
 if(slot!==qrSlot||force){
  const code=await InviteDemo.codeFor(slot);if(generation!==qrGeneration||s.page!=='inviteIssuer')return;
  qrCode=code;qrSlot=slot;const qr=qrcode(0,'M');qr.addData(qrCode);qr.make();
  const el=document.getElementById('invite-qr');if(el)el.innerHTML=qr.createImgTag(5,20,t('inviteQr'));
  const token=document.getElementById('issuer-code');if(token)token.value=qrCode;
 }
 const counter=document.getElementById('invite-countdown');if(counter)counter.textContent=t('refreshIn')+' '+(20-Math.floor(Date.now()/1000)%20)+' '+t('secondsShort');
}
function sizeFloorList(){
 const list=document.querySelector('.floor-scroll');
 if(s.page==='floor'&&list){const top=list.getBoundingClientRect().top,nav=document.getElementById('tb-nav');list.style.maxHeight=Math.max(180,Math.min(440,window.innerHeight-top-(nav?.offsetHeight||80)-24))+'px';}
}
window.addEventListener?.('resize',sizeFloorList);
window.addEventListener?.('scroll',sizeFloorList,{passive:true});
function afterRender(){
 clearInterval(qrTimer);qrGeneration++;
 if(s.page==='inviteIssuer'){qrSlot=-1;refreshQr(true);qrTimer=setInterval(()=>refreshQr(),1000);}
 if(s.page!=='invite')stopCamera();
 sizeFloorList();
 document.querySelectorAll('.tb-tabs').forEach(group=>{
  group.classList.add('raised-tabs');group.querySelectorAll('button').forEach(button=>{
   if(button.hasAttribute('aria-selected')||button.hasAttribute('aria-pressed'))return;
   const active=button.dataset.go===s.page;
   button.classList.toggle('tab-current',active);button.setAttribute('aria-pressed',String(active));
  });
 });
}
return {pendingCount,afterRender,view(page){
 if(s.role==='manager'&&page==='floor')return floor();
 if(s.role==='manager'&&['managerBookings','bookingChronology'].includes(page))return view('bookings',`<div class="tb-tabs">${B('calendar','managerBookings')}${B('chronology','bookingChronology')}</div>`+box('request',row('staffLabel','Maya, Lin')+row('start','2026-10-24 · 22:00')+B('reviewRequest','managerBooking'))+B('packageReservation','packageReservation'));
 if(page==='spaceDetail')return spaceDetail();
 if(page==='opsStaffDetail')return staffDetail();
 if(page==='package'&&s.role==='manager'){
  const op=ops.find(x=>x.id===selectedStaff&&x.status==='onPackage')||ops.find(x=>x.id==='lin'),person=profile(op.id);
  return view('packageService',box(op.place,row('staffLabel',person.name)+row('status',t('commenced'))+row('type',t(op.id==='nhi'?'remote':'onPremises'))+row('actualStart','2026-10-24 · '+op.since)+row('restriction','2026-10-25 · 21:00'))+B('earlyEnd','earlyEnd')+B('priceAdjustment','price'),'floor');
 }
 if(page==='billing'&&s.role==='manager'){const person=profile(selectedStaff);return view('completeService',box('staffLabel',row('staffLabel',person.name+' · '+selectedSpace.id)+row('actualDuration','02:05'))+field('billable',`<input type="number" id="billable" data-draft="billable" min="1" value="${esc(s.billable||120)}">`)+B('releaseReview','serviceReview','tb-main'),'spaceDetail');}
 if(page==='serviceReview'&&s.role==='manager')return view('review',box('staffLabel',row('staffLabel',profile(selectedStaff).name+' · '+selectedSpace.id)+row('billable',esc(s.billable||120)))+note('tableStillOccupied')+A('confirmCompletion','release'),'billing');
 if(s.role==='manager'&&page==='actions')return actionList();
 if(page==='actionDetail')return taskDetail();
 if(page==='inviteIssuer')return inviteIssuer();
 if(page==='invite')return inviteScan();
 if(page==='inviteVerified')return view('inviteAccepted',note('clientEnrollment')+B('continue','wechatOnboarding','tb-main'),'invite');
 return null;
},click(b){
 if(b.dataset.floorTab){floorTab=b.dataset.floorTab;render();window.animatePreviewPanel(document.getElementById('floor-panel'));return true;}
 if(b.dataset.space){selectedSpace=[...tables,...rooms].find(x=>x.id===b.dataset.space);if(selectedSpace.assigned?.length)selectedStaff=selectedSpace.assigned[0];go('spaceDetail');return true;}
 if(b.dataset.opsStaff){selectedStaff=b.dataset.opsStaff;go('opsStaffDetail');return true;}
 if(b.dataset.packageStaff){selectedStaff=b.dataset.packageStaff;go('package');return true;}
 if(b.dataset.task){selectedTask=b.dataset.task;go('actionDetail');return true;}
 if(b.dataset.action==='release'&&s.role==='manager'){selectedSpace.assigned=(selectedSpace.assigned||[]).filter(id=>id!==selectedStaff);const op=ops.find(x=>x.id===selectedStaff);op.status='availableNow';op.place='';op.since='';go('spaceDetail');return true;}
 if(b.dataset.action==='resolveTask'){pending.delete(selectedTask);go('actions');return true;}
 if(b.dataset.action==='copyInvite'){if(!navigator.clipboard?.writeText){showError('copyFallback');return true;}navigator.clipboard.writeText(qrCode).then(()=>showError('inviteCopied')).catch(()=>showError('copyFallback'));return true;}
 if(b.dataset.action==='checkInvite'){checkInvite(document.getElementById('invite-token').value);return true;}
 if(b.dataset.action==='scanQr'){scanQr();return true;}
 return false;
},input(el){if(el.id==='invite-token')s.inviteToken=el.value;},packagePerson(){return profile(selectedStaff);}};
};
