(()=>{'use strict';
const root=document.getElementById('tbw06'),content=document.getElementById('tb-content'),header=document.getElementById('tb-header'),nav=document.getElementById('tb-nav'),controls=document.getElementById('demo-controls');
const locales={en:'English',zh:'简体中文',ms:'Bahasa Melayu',vi:'Tiếng Việt'};
let saved='';try{saved=localStorage.getItem('66mm-preview-language')||'';}catch{}
const s={lang:locales[saved]?saved:'en',chosen:!!locales[saved],role:'onboarding',page:'splash',venue:'venueA',selected:['Maya'],type:'ordinary',finance:'summary',tableFirst:true,requested:false,finalized:false,tallied:false,paid:false,released:false,freed:false,evidenceMode:'photo',image:'',imageName:'',reference:'',reading:false};
const staffProfiles=[{id:'maya',name:'Maya',venue:'venueA'},{id:'lin',name:'Lin',venue:'venueA'},{id:'an',name:'An',venue:'venueA'},{id:'mei',name:'Mei',venue:'venueA'},{id:'sara',name:'Sara',venue:'venueA'},{id:'nhi',name:'Nhi',venue:'venueA'},{id:'lina',name:'Lina',venue:'venueA'}];
let profileId='maya',profileReturn='browse',lightboxIndex=0,lightboxProfile=null,lightboxTrigger=null,scrollOverflow='';
const lightbox=document.getElementById('staff-lightbox');
const photoPath=(person,index)=>`assets/staff/${person.id}-${index+1}.webp?v=contact3`;
function photoAlt(person,index){return `${person.name} · ${t('photo')} ${index+1}`;}
const tabs={client:['explore','bookings','updates','account'],staff:['home','roster','finance','account'],manager:['floor','bookings','actions','manage'],admin:['overview','actions','payroll','manage']};
const dest={client:['venues','bookings','updates','account'],staff:['staffHome','roster','finance','account'],manager:['floor','managerBookings','actions','managerManage'],admin:['overview','actions','payroll','adminManage']};
let activeTab=0,backPage='',timer,exitTimer,readId=0;
const t=k=>{if(!(k in COPY[s.lang]))throw new Error('Missing translation: '+s.lang+'.'+k);return COPY[s.lang][k];};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>new Intl.NumberFormat({en:'en-MY',zh:'zh-Hans-MY',ms:'ms-MY',vi:'vi-VN'}[s.lang],{style:'currency',currency:'MYR',currencyDisplay:'code'}).format(n);
const B=(key,page,cls='tb-full')=>`<button type="button" class="${cls}" data-go="${page}">${t(key)}</button>`;
const A=(key,action,cls='tb-main')=>`<button type="button" class="${cls}" data-action="${action}">${t(key)}</button>`;
const row=(key,value)=>`<div class="tb-row"><span>${t(key)}</span><strong>${value}</strong></div>`;
const box=(key,body)=>`<section class="tb-box"><h3>${t(key)}</h3>${body}</section>`;
const note=key=>`<div class="tb-note">${t(key)}</div>`;
const small=key=>`<p class="tb-small">${t(key)}</p>`;
const badge=key=>`<span class="tb-tag">${t(key)}</span>`;
const field=(key,html)=>`<label class="tb-field">${t(key)}${html}</label>`;
const fieldInput=(key,type,value='',id=key)=>field(key,`<input id="${id}" data-draft="${id}" type="${type}" value="${esc(s[id]||value)}">`);
const area=(key,id,required=false)=>field(key,`<textarea id="${id}" data-draft="${id}" rows="3" ${required?'required':''}>${esc(s[id]||'')}</textarea>`);
const logo='<img src="logo.webp" alt="66MM" width="1774" height="887">';
function persistLanguage(k){s.lang=k;s.chosen=true;try{localStorage.setItem('66mm-preview-language',k);}catch{}render();}
function renderControls(){controls.innerHTML=`<span class="demo-label">${t('preview')}</span><label>${t('language')}<select id="locale">${Object.entries(locales).map(([k,v])=>`<option value="${k}" ${k===s.lang?'selected':''}>${v}</option>`).join('')}</select></label><label>${t('role')}<select id="role">${['onboarding','client','staff','manager','admin'].map(k=>`<option value="${k}" ${s.role===k?'selected':''}>${t(k)}</option>`).join('')}</select></label>`;}
function shell(title,body,back=''){
 backPage=back;
 header.innerHTML=`<div class="tb-head">${s.role==='manager'?`<label class="compact-venue"><span class="sr-only">${t('venue')}</span><select id="venue" aria-label="${t('venue')}">${['venueA','venueB'].map(k=>`<option value="${k}" ${s.venue===k?'selected':''}>${t(k)}</option>`).join('')}</select></label>`:''}<img class="brand" src="logo.webp" alt="66MM">${back?B('back',back,'tb-back'):''}<div class="tb-context">${s.role==='onboarding'?t('onboarding'):t(s.role)+' · '+(s.role==='admin'?t('company'):t(s.venue))}</div><h2>${title}</h2></div>`;
 content.innerHTML=body+customer.managerPanel(s.page,body)+'<p id="error" class="tb-form-error" role="alert"></p>';
 nav.innerHTML=s.role==='onboarding'?'':tabs[s.role].map((k,i)=>`<button type="button" data-tab="${i}" ${i===activeTab?'aria-current="page"':''}><span class="tb-nav-mark" aria-hidden="true"></span><span>${t(k)}</span>${s.role==='manager'&&k==='actions'&&(refinements.pendingCount()+customer.pendingCount())?`<span class="nav-count" aria-label="${(refinements.pendingCount()+customer.pendingCount())} ${t('needAttention')}">${(refinements.pendingCount()+customer.pendingCount())}</span>`:''}</button>`).join('');
 nav.setAttribute('aria-label',t('preview'));document.documentElement.lang=s.lang==='zh'?'zh-Hans':s.lang;document.title='66MM · '+t('preview');
 if(tg&&inTelegram){try{back?tg.BackButton.show():tg.BackButton.hide();}catch{}}
 refinements.afterRender();customer.afterRender();
}
function go(p){
 if(customer.beforeGo(p))return;
 if(lightbox.open)lightbox.close();
 clearTimeout(timer);clearTimeout(exitTimer);s.page=p;
 const groups={client:[['venues','explore','types','browse','request','requestReview'],['bookings','bookingHistory','bookingDetail','bookingChange','changeSent','customerConflict'],['updates'],['account','wechatEdit']],staff:[['staffHome','assignment','assignmentRequest','leaderboard'],['roster'],['finance','statement','document'],['account','profile','profilePending','leave','leaveForm','leavePending']],manager:[['floor','visit','freeVisit','reservedVisit','billing','serviceReview','freeReview','overrun','package','earlyEnd','price','priceReview'],['managerBookings','managerBooking','managerConfirm','packageReservation'],['actions'],['managerManage','funds','account','payoutReview','payoutConfirm','payoutResult']],admin:[['overview','venueOverview'],['actions'],['payroll','finalizeReview','tally','tallyReview','tallyRecorded','payout','payoutReview','payoutConfirm','payoutResult','uncertain'],['adminManage','account']]};
 const i=groups[s.role]?.findIndex(g=>g.includes(p));if(i>=0)activeTab=i;
 if(p==='staffProfile')activeTab=s.role==='client'?0:1;
 if(['spaceDetail','opsStaffDetail'].includes(p))activeTab=0;
 if(p==='actionDetail')activeTab=2;
 if(p==='inviteIssuer')activeTab=3;
 render();window.scrollTo({top:0,behavior:'instant'});
}
function bookingCard(){return box('bookingDetail',badge(s.requested?'pending':'confirmed')+row('venue',t(s.venue))+row('staffLabel',s.selected.join(', '))+row('start',`${s.preferredDate||'2026-10-24'} · ${s.preferredTime||'22:00'}`)+B('viewBooking','bookingDetail'));}
function settlementTabs(){return `<div class="tb-tabs">${B('finalize','payroll')}${B('tally','tally')}${B('paidOut','payout')}</div>`;}
function evidenceImage(){return s.image?`<figure class="tb-evidence-preview"><img src="${s.image}" alt="${t('evidence')}"><figcaption>${esc(s.imageName)}</figcaption></figure>`:'';}
function evidenceForm(){return `<h3>${t('evidence')}</h3><div class="tb-evidence-modes">${[['photo','takePhoto'],['upload','upload'],['text','textRef']].map(([k,label])=>`<button type="button" data-mode="${k}" aria-pressed="${s.evidenceMode===k}">${t(label)}</button>`).join('')}</div>`+(s.evidenceMode==='text'?area('reference','reference'):
 field(s.evidenceMode==='photo'?'takePhoto':'upload',`<input id="evidence-file" type="file" accept="image/*" ${s.evidenceMode==='photo'?'capture="environment"':''}>`)+small(s.evidenceMode==='photo'?'photoHelp':'uploadHelp')+evidenceImage()+(s.image?A('removeImage','removeImage','tb-link'):'')+(s.reading?small('imageReading'):''))+small('imageLocal');}
function render(){
 renderControls();root.querySelector('.tb-phone').classList.toggle('is-splash',s.page==='splash');
 const p=s.page;
 const customerView=customer.view(p);if(customerView)return shell(customerView.title,customerView.body,customerView.back);
 const refined=refinements.view(p);if(refined)return shell(refined.title,refined.body,refined.back);
 if(p==='splash'){backPage='';header.innerHTML='';nav.innerHTML='';content.innerHTML=`<div class="tb-splash is-playing"><div class="tb-logo-reveal">${logo}</div><div class="tb-loading-detail"><div class="tb-loader" aria-hidden="true"><span></span></div><div class="tb-splash-label" role="status">${t('loadingLabel')}</div></div></div>`;return;}
 if(p==='language')return shell(t('chooseLanguage'),`<div class="tb-language-logo">${logo}</div><div class="tb-stack">${Object.entries(locales).map(([k,v])=>`<button type="button" data-language="${k}" aria-pressed="${s.chosen&&s.lang===k}">${v}${s.chosen&&s.lang===k?' ✓':''}</button>`).join('')}</div><button class="tb-main" type="button" data-go="invite" ${s.chosen?'':'disabled'}>${t('continue')}</button>`+small('safePreview'));
 if(p==='invite')return shell(t('invitation'),box('invitationVerified',row('venue',t('venueA'))+row('telegramIdentity',t('exampleUser')))+note('clientEnrollment')+B('continue','enrolled','tb-main'),'language');
 if(p==='enrolled')return shell(t('ready'),box('yourAccount',row('role',t('client'))+row('language',locales[s.lang]))+A('exploreVenues','enter'),'invite');
 if(p==='account')return shell(t('account'),box('yourAccount',row('role',t(s.role))+row('status',t('active')))+field('language',`<select id="account-locale">${Object.entries(locales).map(([k,v])=>`<option value="${k}" ${s.lang===k?'selected':''}>${v}</option>`).join('')}</select>`)+(s.role==='staff'?B('profile','profile')+B('leaveHistory','leave'):'')+A('replay','replay','tb-full'));
 if(p==='venues')return shell(t('chooseVenue'),['venueA','venueB'].map(k=>box(k,badge('active')+`<button type="button" class="tb-main" data-venue="${k}">${t('explore')}</button>`)).join(''));
 if(p==='explore')return shell(t(s.venue),box('plan',B('browse','browse','tb-main')+B('type','types')),'venues');
 if(p==='types')return shell(t('type'),`<div class="tb-stack">${['ordinary','packageA','packageB'].map(k=>`<button type="button" data-type="${k}">${t(k)}</button>`).join('')}</div>`,'explore');
 if(p==='browse'||p==='roster')return shell(t(p==='browse'?'chooseStaff':'roster'),small('fictionalPhotos')+`<div class="staff-gallery">${staffProfiles.map(person=>`<article class="staff-card"><button type="button" class="staff-open" data-profile="${person.id}" aria-label="${t('viewProfile')} · ${person.name}"><img src="${photoPath(person,0)}" alt="${photoAlt(person,0)}" width="561" height="701" loading="lazy"><span class="staff-info"><span class="staff-name">${person.name}</span><span class="staff-venue">${t(person.venue)}</span></span></button>${p==='browse'?`<button type="button" class="staff-select" data-person="${person.name}" aria-pressed="${s.selected.includes(person.name)}">${t(s.selected.includes(person.name)?'selected':'select')}</button>`:''}</article>`).join('')}</div>`+(p==='browse'?B('continue','request','tb-main'):''),p==='browse'?'explore':'');
 if(p==='staffProfile'){
  const person=staffProfiles.find(x=>x.id===profileId)||staffProfiles[0];
  return shell(person.name,`<button type="button" class="staff-profile-photo" data-photo="0" aria-label="${t('enlargePhoto')} · ${person.name}"><img src="${photoPath(person,0)}" alt="${photoAlt(person,0)}" width="561" height="701"><span>${t('enlargePhoto')}</span></button><h3 style="margin-top:22px">${t('photos')}</h3><div class="photo-reel" role="group" aria-label="${t('photos')}">${[0,1,2,3].map(i=>`<button type="button" data-photo="${i}" aria-label="${t('enlargePhoto')} · ${photoAlt(person,i)}"><img src="${photoPath(person,i)}" alt="${photoAlt(person,i)}" width="92" height="116" loading="lazy"></button>`).join('')}</div>`+box('publicProfile',row('nickname',person.name)+row('primaryVenue',t(person.venue))+row('availability',t('availabilityByTime')))+small('fictionalPhotos')+(s.role==='client'?`<button type="button" class="tb-full" data-person="${person.name}" aria-pressed="${s.selected.includes(person.name)}">${t(s.selected.includes(person.name)?'selected':'select')}</button>`+B('continue','request','tb-main'):''),profileReturn);
 }
 if(p==='request')return shell(t('request'),field('type',`<select id="booking-type" data-draft="type">${['ordinary','packageA','packageB'].map(k=>`<option value="${k}" ${s.type===k?'selected':''}>${t(k)}</option>`).join('')}</select>`)+fieldInput('preferredDate','date','2026-10-24')+fieldInput('preferredTime','time','22:00')+small('timezone')+B('reviewRequest','requestReview','tb-main'),'browse');
 if(p==='requestReview')return shell(t('reviewRequest'),box('bookingDetail',row('venue',t(s.venue))+row('staffLabel',s.selected.join(', '))+row('type',t(s.type))+row('start',`${s.preferredDate||'2026-10-24'} · ${s.preferredTime||'22:00'}`))+note('pendingBooking')+A('submit','submitBooking'),'request');
 if(p==='bookings')return shell(t('bookings'),`<div class="tb-tabs">${B('upcoming','bookings')}${B('history','bookingHistory')}</div>`+bookingCard());
 if(p==='bookingHistory')return shell(t('history'),box('bookingDetail',badge('completed')+row('venue',t('venueA'))+row('staffLabel','Maya')+row('start','2026-10-17 · 22:00')),'bookings');
 if(p==='bookingDetail')return shell(t('bookingDetail'),bookingCard()+note(s.requested?'pendingBooking':'pendingChange')+B('requestChange','bookingChange'),'bookings');
 if(p==='bookingChange')return shell(t('requestChange'),field('request',`<select><option>${t('change')}</option><option>${t('cancelBooking')}</option></select>`)+note('pendingChange')+B('sendRequest','changeSent','tb-main'),'bookingDetail');
 if(p==='changeSent')return shell(t('sent'),note('pendingChange')+B('viewBooking','bookingDetail','tb-main'),'bookingDetail');
 if(p==='updates')return shell(t('updates'),box('confirmed',row('venue',t('venueA'))+row('staffLabel','Maya, Lin')+B('viewBooking','bookingDetail')));
 if(p==='staffHome')return shell('Maya',box('shift',row('schedule','18:00–04:00')+row('status',t('scheduled')))+box('assignment',row('venue',t('venueA')+' · T04')+row('start','20:00')+B('viewAssignment','assignment'))+box('nextBooking',row('start','22:00')+small('resolveEarlier'))+`<div class="tb-grid">${B('requestAssignment','assignmentRequest')}${B('applyLeave','leave')}</div>`+box('topPerformers',B('leaderboard','leaderboard')));
 if(p==='assignment')return shell(t('assignment'),box('assignment',row('venue',t('venueA')+' · T04')+row('start','20:00')),'staffHome');
 if(p==='assignmentRequest')return shell(t('requestAssignment'),box('occupied',B('requestAssignment','result','tb-main')),'staffHome');
 if(p==='leaderboard')return shell(t('topPerformers'),`<section class="tb-box">${row('staffLabel','Lin · '+money(1240))}${row('staffLabel','Maya · '+money(1000))}${row('staffLabel','An · '+money(920))}</section>`+small('privacy'),'staffHome');
 if(p==='finance'){
 let body='';
 if(s.finance==='summary')body=box('concluded',small('entitlement')+`<div class="tb-amount">${money(1000)}</div>`+row('offset',money(150))+row('fullPaid',money(850)))+box('currentPeriod',badge('provisional')+row('posted',money(240)));
 if(s.finance==='earnings')body=box('completedService',row('ordinary',money(120))+row('ordinary',money(120)));
 if(s.finance==='outstanding')body=box('debt',`<div class="tb-amount">${money(0)}</div>`+row('previousBalance',money(150))+row('appliedTally',money(150)));
 if(s.finance==='settlements'||s.finance==='history')body=box('financialHistory',row('tally',money(150))+row('paidOut',money(850)))+small('recoverySeparate');
 return shell(t('myFinance'),`<div class="tb-tabs">${['summary','earnings','outstanding','settlements','history'].map(k=>`<button type="button" data-finance="${k}" aria-pressed="${s.finance===k}">${t(k)}</button>`).join('')}</div>`+body+B('statement','statement'));
 }
 if(p==='statement')return shell(t('statement'),field('format','<select><option>PDF</option><option>XLSX</option></select>')+field('period',`<select><option>2026-10-01 — 2026-10-15</option></select>`)+field('documentLanguage',`<select>${Object.entries(locales).map(([k,v])=>`<option ${k===s.lang?'selected':''}>${v}</option>`).join('')}</select>`)+B('generate','document','tb-main'),'finance');
 if(p==='document')return shell(t('statement'),note('documentPending'),'statement');
 if(p==='profile')return shell(t('profile'),fieldInput('nickname','text','Maya')+B('save','profilePending','tb-main'),'account');
 if(p==='profilePending')return shell(t('profile'),note('profilePending'),'profile');
 if(p==='leave')return shell(t('leaveHistory'),box('leave',badge('pending')+row('from','2026-10-28')+row('until','2026-10-29'))+B('applyLeave','leaveForm','tb-main'),'account');
 if(p==='leaveForm')return shell(t('applyLeave'),field('type',`<select><option>${t('offDay')}</option><option>${t('medical')}</option></select>`)+fieldInput('from','date','2026-10-28')+fieldInput('until','date','2026-10-29')+area('notes','leaveNotes')+B('submit','leavePending','tb-main'),'leave');
 if(p==='leavePending')return shell(t('leave'),note('leavePending'),'leave');
 if(p==='floor')return shell(t('liveFloor'),field('venue',`<select id="venue">${['venueA','venueB'].map(k=>`<option value="${k}" ${s.venue===k?'selected':''}>${t(k)}</option>`).join('')}</select>`)+`<div class="tb-tabs">${A('tables','tables','tb-full')}${A('staffLabel','staffFloor','tb-full')}</div>`+(s.tableFirst?`<div class="tb-grid">${B('occupied','visit')}${B('free','freeVisit')}${B('reserved','reservedVisit')}${B('occupied','visit')}</div>`:box('staffLabel',row('staffLabel','Maya · T04')+B('viewAssignment','visit')))+box('attention',small('overrun')+B('reviewCommitment','overrun'))+B('activePackage','package'));
 if(p==='visit')return shell('T04',box('visit',row('occupiedSince','19:45')+row('assignedSince','20:00')+row('status',t(s.released?'released':'active')))+(s.released?note('tableStillOccupied')+B('freeTable','freeReview','tb-main'):B('completeService','billing','tb-main')),'floor');
 if(p==='freeVisit'||p==='reservedVisit')return shell(p==='freeVisit'?'T02':'T08',badge(p==='freeVisit'?'free':'reserved'),'floor');
 if(p==='billing')return shell(t('completeService'),box('assignment',row('staffLabel','Maya · T04')+row('actualDuration','02:05'))+fieldInput('billable','number','120')+B('releaseReview','serviceReview','tb-main'),'visit');
 if(p==='serviceReview')return shell(t('review'),box('assignment',row('staffLabel','Maya · T04')+row('actualDuration','125')+row('billable',esc(s.billable||'120')))+note('tableStillOccupied')+A('confirmCompletion','release'),'billing');
 if(p==='freeReview')return shell(t('freeTable'),A('confirmFree','free'),'visit');
 if(p==='overrun')return shell(t('resolveBefore'),note('manualResolution')+B('viewAssignment','visit','tb-main'),'floor');
 if(p==='managerBookings')return shell(t('bookings'),`<div class="tb-tabs">${B('calendar','managerBookings')}${B('chronology','managerBookings')}</div>`+box('request',row('staffLabel','Maya, Lin')+row('start','2026-10-24 · 22:00')+B('reviewRequest','managerBooking'))+B('packageReservation','packageReservation'));
 if(p==='managerBooking')return shell(t('reviewRequest'),box('bookingDetail',row('staffLabel','Maya, Lin')+row('start','2026-10-24 · 22:00'))+note('allStaff')+B('confirmBooking','managerConfirm','tb-main'),'managerBookings');
 if(p==='managerConfirm')return shell(t('confirmBooking'),note('allStaff')+B('confirmBooking','result','tb-main'),'managerBooking');
 if(p==='packageReservation')return shell(t('packageReservation'),box('packageA',badge('notCommenced')+row('type',t('remote'))+row('staffLabel','Lin')+row('start','2026-10-24 · 22:00'))+note('noCharge'),'managerBookings');
 if(p==='package')return shell(t('packageService'),box('packageA',badge('commenced')+row('type',t('onPremises'))+row('staffLabel','Lin')+row('actualStart','2026-10-24 · 22:00')+row('restriction','2026-10-25 · 21:00'))+B('earlyEnd','earlyEnd')+B('priceAdjustment','price'),'floor');
 if(p==='earlyEnd')return shell(t('earlyEnd'),note('retainCharge')+B('confirmCompletion','result','tb-main'),'package');
 if(p==='price')return shell(t('priceAdjustment'),fieldInput('proposedAmount','number','')+area('reason','reason',true)+note('pricePending')+A('reviewProposal','priceReview'),'package');
 if(p==='priceReview')return shell(t('reviewProposal'),note('pricePending')+B('submit','result','tb-main'),'price');
 if(p==='actions')return shell(t('actions'),box('attention',small('overrun')+B('review','overrun'))+box('pendingApprovals',B('reviewProposal','placeholder')));
 if(p==='managerManage')return shell(t('manage'),`<div class="tb-stack">${['schedules','transfers','primaryPayroll'].map(k=>B(k,'placeholder')).join('')}${B('inviteGuest','inviteIssuer')}${B('funds','funds')}${B('accountLanguage','account')}</div>`);
 if(p==='funds')return shell(t('funds'),box('custody',row('available',money(2000))+row('held',money(0)))+box('staffLabel',row('staffLabel','Maya')+row('remainder',money(850))+small('delegated')+B(s.paid?'view':'reviewPaidOut',s.paid?'payoutResult':'payoutReview')),'managerManage');
 if(p==='overview')return shell(t('company'),`<div class="tb-tabs">${B('company','overview')}${B('venueDashboards','venueOverview')}</div>`+box('operations',small('overrun')+B('openActions','actions'))+box('pendingApprovals',B('review','actions'))+B('openPayroll','payroll'));
 if(p==='venueOverview')return shell(t('venueDashboards'),box(s.venue,row('status',t('active'))+B('openActions','actions')),'overview');
 if(p==='adminManage')return shell(t('manage'),`<div class="tb-stack">${['accounts','venues','policies','reports','notifications'].map(k=>B(k,'placeholder')).join('')}${B('inviteGuest','inviteIssuer')}${B('accountLanguage','account')}</div>`);
 if(p==='payroll')return shell(t('payroll'),settlementTabs()+field('primaryVenue',`<select><option>${t('venueA')}</option><option>${t('venueB')}</option></select>`)+box('entitlement',badge(s.finalized?'finalized':'pending')+row('staffLabel','Maya')+row('fullEntitlement',money(1000))+small('sources')+B('reviewFinalization','finalizeReview')));
 if(p==='finalizeReview')return shell(t('reviewFinalization'),box('entitlement',row('staffLabel','Maya')+row('fullEntitlement',money(1000))+small('sources'))+A('confirmFinalization','finalize'),'payroll');
 if(p==='tally')return shell(t('payroll'),settlementTabs()+(s.finalized?box('tally',row('staffLabel','Maya')+row('entitlement',money(1000))+row('offset',money(150))+row('remainder',money(850))+B('reviewTally','tallyReview')):B('reviewFinalization','finalizeReview')));
 if(p==='tallyReview')return shell(t('reviewTally'),box('tally',row('beforeOutstanding',money(150))+row('offset',money(150))+row('afterOutstanding',money(0))+row('remainder',money(850)))+A('confirmTally','tally'),'tally');
 if(p==='tallyRecorded')return shell(t('tallyRecorded'),box('tally',row('offset',money(150))+row('remainder',money(850)))+B('openPaidOut','payout','tb-main'),'tally');
 if(p==='payout')return shell(t('payroll'),settlementTabs()+(s.tallied?box('paidOut',row('staffLabel','Maya')+row('remainder',money(850))+B(s.paid?'view':'reviewPaidOut',s.paid?'payoutResult':'payoutReview')):B('reviewTally','tally'))+B('uncertain','uncertain'));
 if(p==='payoutReview')return shell(t('reviewPaidOut'),box('staffLabel',row('staffLabel','Maya')+row('remainder',money(850))+row('afterOutstanding',money(0)))+evidenceForm()+note('evidenceOnly')+A('continue','evidence'),s.role==='manager'?'funds':'payout');
 if(p==='payoutConfirm')return shell(t('confirmPaidOut'),box('paidOut',row('staffLabel','Maya')+row('amount',money(850)))+(s.evidenceMode==='text'?box('reference',esc(s.reference)):evidenceImage())+B('changeEvidence','payoutReview')+A('confirmPaidOut','pay'),'payoutReview');
 if(p==='payoutResult')return shell(t('paidRecorded'),box('paidOut',row('amount',money(850))+row('remaining',money(0)))+small('safePreview')+B('return',s.role==='manager'?'funds':'payout','tb-main'),s.role==='manager'?'funds':'payout');
 if(p==='uncertain')return shell(t('reconciliation'),note('retryBlocked')+`<button type="button" disabled>${t('retry')}</button>`,'payout');
 if(p==='result')return shell(t('completed'),note('previewResult')+B('return',dest[s.role]?.[activeTab]||'venues','tb-main'),dest[s.role]?.[activeTab]||'venues');
 return shell(t('placeholder'),note('placeholderBody'),dest[s.role]?.[activeTab]||'account');
}
function error(k){document.getElementById('error').textContent=t(k);}
root.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b||b.disabled)return;
 if(customer.click(b))return;
 if(refinements.click(b))return;
 if(b.dataset.profile){profileId=b.dataset.profile;profileReturn=s.page;return go('staffProfile');}
 if(b.dataset.photo!==undefined)return openLightbox(Number(b.dataset.photo),b);
 if(b.dataset.language)return persistLanguage(b.dataset.language);
 if(b.dataset.tab!==undefined){activeTab=Number(b.dataset.tab);return go(dest[s.role][activeTab]);}
 if(b.dataset.venue){s.venue=b.dataset.venue;return go('explore');}
 if(b.dataset.type){s.type=b.dataset.type;return go('browse');}
 if(b.dataset.person){const n=b.dataset.person;s.selected=s.selected.includes(n)?s.selected.filter(x=>x!==n):[...s.selected,n];return render();}
 if(b.dataset.finance){s.finance=b.dataset.finance;return render();}
 if(b.dataset.mode){s.evidenceMode=b.dataset.mode;readId++;s.reading=false;return render();}
 if(b.dataset.go)return go(b.dataset.go);
 switch(b.dataset.action){
 case 'enter':s.role='client';activeTab=0;return go('venues');
 case 'submitBooking':s.requested=true;activeTab=1;return go('bookingDetail');
 case 'tables':s.tableFirst=true;return render();case 'staffFloor':s.tableFirst=false;return render();
 case 'release':s.released=true;return go('visit');case 'free':s.freed=true;return go('result');
 case 'priceReview':if(!s.reason?.trim()||!s.proposedAmount)return error('reasonRequired');return go('priceReview');
 case 'finalize':s.finalized=true;return go('tally');case 'tally':s.tallied=true;return go('tallyRecorded');
 case 'removeImage':readId++;s.image='';s.imageName='';s.reading=false;return render();
 case 'evidence':if(s.evidenceMode==='text'?!s.reference.trim():!s.image||s.reading)return error(s.evidenceMode==='text'?'referenceRequired':'photoRequired');return go('payoutConfirm');
 case 'pay':s.paid=true;return go('payoutResult');case 'replay':return splash();
 }
});
root.addEventListener('keydown',e=>{
 const tab=e.target.closest('[data-booking-tab],[data-floor-tab]');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
 const items=[...tab.parentElement.querySelectorAll('[role="tab"]')],index=items.indexOf(tab);
 const next=e.key==='Home'?0:e.key==='End'?items.length-1:(index+(e.key==='ArrowRight'?1:-1)+items.length)%items.length;
 e.preventDefault();items[next].click();const selector=tab.dataset.bookingTab?'[data-booking-tab="'+items[next].dataset.bookingTab+'"]':'[data-floor-tab="'+items[next].dataset.floorTab+'"]';root.querySelector(selector)?.focus();
});
root.addEventListener('input',e=>{if(e.target.dataset.draft)s[e.target.dataset.draft]=e.target.value;refinements.input(e.target);customer.input(e.target);});
root.addEventListener('change',e=>{
 const el=e.target;
 if(el.dataset.draft)s[el.dataset.draft]=el.value;
 if(el.id==='locale'||el.id==='account-locale')return persistLanguage(el.value);
 if(el.id==='role'){readId++;s.image='';s.imageName='';s.reference='';s.reading=false;s.evidenceMode='photo';s.role=el.value;activeTab=0;return go(s.role==='onboarding'?'language':dest[s.role][0]);}
 if(el.id==='venue'){s.venue=el.value;return render();}
 if(el.id!=='evidence-file'||!el.files?.[0])return;
 const file=el.files[0],version=++readId;
 if(!file.type.startsWith('image/'))return error('imageError');
 s.reading=true;s.image='';s.imageName='';render();
 const fail=()=>{if(version!==readId)return;s.reading=false;if(s.page==='payoutReview'){render();error('imageError');}};
 const reader=new FileReader();reader.onerror=fail;reader.onload=()=>{
  if(version!==readId)return;const img=new Image();img.onerror=fail;img.onload=()=>{if(version!==readId)return;s.image=reader.result;s.imageName=file.name;s.reading=false;if(s.page==='payoutReview')render();};img.src=reader.result;
 };reader.readAsDataURL(file);
});
function splash(){clearTimeout(timer);clearTimeout(exitTimer);s.page='splash';render();timer=setTimeout(()=>{root.querySelector('.tb-splash')?.classList.add('is-leaving');exitTimer=setTimeout(()=>go(s.chosen&&s.role!=='onboarding'?dest[s.role][0]:'language'),450);},2800);}
function refreshLightbox(){
 const img=document.getElementById('lightbox-image');
 img.src=photoPath(lightboxProfile,lightboxIndex);img.alt=photoAlt(lightboxProfile,lightboxIndex);
 document.getElementById('lightbox-title').textContent=lightboxProfile.name+' · '+t('photos');
 document.getElementById('lightbox-count').textContent=`${lightboxIndex+1} / 4`;
 document.getElementById('lightbox-close').textContent=t('closePhoto');
 document.getElementById('lightbox-prev').textContent='‹ '+t('previousPhoto');
 document.getElementById('lightbox-next').textContent=t('nextPhoto')+' ›';
 document.getElementById('lightbox-help').textContent=t('swipePhotos');
}
function openLightbox(index,trigger){
 lightboxProfile=staffProfiles.find(x=>x.id===profileId)||staffProfiles[0];lightboxIndex=index;lightboxTrigger=trigger;
 refreshLightbox();scrollOverflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';
 lightbox.showModal();document.getElementById('lightbox-close').focus();
 if(tg&&inTelegram){try{tg.BackButton.show();}catch{}}
}
function cyclePhoto(delta){lightboxIndex=(lightboxIndex+delta+4)%4;refreshLightbox();}
document.getElementById('lightbox-close').addEventListener('click',()=>lightbox.close());
document.getElementById('lightbox-prev').addEventListener('click',()=>cyclePhoto(-1));
document.getElementById('lightbox-next').addEventListener('click',()=>cyclePhoto(1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox||e.target.classList.contains('lightbox-stage'))lightbox.close();});
lightbox.addEventListener('close',()=>{
 document.documentElement.style.overflow=scrollOverflow;
 if(lightboxTrigger?.isConnected)lightboxTrigger.focus();
 if(tg&&inTelegram){try{backPage?tg.BackButton.show():tg.BackButton.hide();}catch{}}
});
lightbox.addEventListener('keydown',e=>{
 if(e.key==='ArrowLeft'){e.preventDefault();cyclePhoto(-1);}
 if(e.key==='ArrowRight'){e.preventDefault();cyclePhoto(1);}
});
let swipeStart=null;
const lightboxImage=document.getElementById('lightbox-image');
lightboxImage.addEventListener('pointerdown',e=>{if(!e.isPrimary)return;swipeStart={x:e.clientX,y:e.clientY,id:e.pointerId};lightboxImage.setPointerCapture(e.pointerId);});
lightboxImage.addEventListener('pointerup',e=>{
 if(!swipeStart||swipeStart.id!==e.pointerId)return;
 const dx=e.clientX-swipeStart.x,dy=e.clientY-swipeStart.y;swipeStart=null;
 if(Math.abs(dx)>=48&&Math.abs(dx)>Math.abs(dy)*1.5)cyclePhoto(dx<0?1:-1);
});
lightboxImage.addEventListener('pointercancel',()=>{swipeStart=null;});
const tg=window.Telegram?.WebApp,inTelegram=!!tg?.initData;
const customer=createCustomerContact({s,t,B,A,row,box,note,small,field,esc,go,render});
const refinements=createRefinements({s,t,B,A,row,box,note,small,field,esc,money,staffProfiles,photoPath,go,render,customerPendingCount:()=>customer.pendingCount()});
if(tg&&inTelegram){try{tg.ready();tg.expand();if(tg.isVersionAtLeast('6.1')){tg.setHeaderColor('#040b17');tg.setBackgroundColor('#040b17');}tg.BackButton.onClick(()=>{if(lightbox.open)lightbox.close();else if(backPage)go(backPage);});}catch{}}
splash();
})();
