/* Read-only current-calendar-month projection of simulated source records. No posting or totals. */
window.buildMonthTransactions20=({now=Date.now(),bookings=[],spend=[],advances=[],events=[]}={})=>{
 const month=new Date(now+8*3600000).toISOString().slice(0,7),entries=[],seen=new Set();
 const cents=value=>{const m=String(value??'').match(/^(\d+)(?:\.(\d{1,2}))?$/);return m?BigInt(m[1])*100n+BigInt((m[2]||'').padEnd(2,'0')):null;};
 const stamp=value=>typeof value==='number'?value:Date.parse(value);
 const put=(id,type,at,amount,meta={})=>{at=stamp(at);if(!Number.isFinite(at)||at>now||new Date(at+8*3600000).toISOString().slice(0,7)!==month||amount===null||amount===0n||seen.has(id))return;seen.add(id);entries.push({id,type,at,amount,...meta});};
 const bookingId=r=>r?.bookingId||r?.id||'';
 const service=(id,r,gross,at,meta,salesAt=at)=>{if(gross===null)return;put(id+'-sales','month20ServiceSales',salesAt,gross,{service:r.type,...meta});put(id+'-staff','month20StaffEarnings',at,(gross*60n+50n)/100n,{service:r.type,...meta});};
 // Spending components are canonical for historical mixed room/service/package bookings.
 for(const h of spend){const parent=bookings.find(r=>r.spendId===h.id),used=new Set(),fallback=h.end||h.date+'T23:00:00+08:00';
  (h.components||[]).forEach((c,i)=>{const ix=(h.services||[]).findIndex((r,j)=>!used.has(j)&&r.type===c.key);if(ix>=0)used.add(ix);const r=h.services?.[ix],meta={bookingId:bookingId(parent)||h.id,staff:r?.staff||parent?.staff||'',venue:h.venue||parent?.venue||'venueA',place:r?.table&&r.table!=='—'?r.table:h.table||parent?.table||''};
   if(['ordinary','packageA','packageB'].includes(c.key))service('spend:'+h.id+':'+i,{type:c.key},cents(c.amount),r?.endedAt||fallback,meta,['packageA','packageB'].includes(c.key)?r?.startedAt||h.start||fallback:r?.endedAt||fallback);
   else if(['roomReservation','tableReservation'].includes(c.key))put('spend:'+h.id+':'+i,c.key==='roomReservation'?'month20RoomEarnings':'month20TableEarnings',h.start||fallback,cents(c.amount),meta);
  });
 }
 for(const r of bookings){if(r.parentBookingId||['pending','cancelled','rejected'].includes(r.status)||r.spendId&&spend.some(h=>h.id===r.spendId))continue;
  const meta={bookingId:bookingId(r),venue:r.venue||'venueA',place:r.table&&r.table!=='—'?r.table:'',staff:r.staff||''},pkg=['packageA','packageB'].includes(r.type);
  if(r.reservationKind==='room'&&r.startedAt)put('booking:'+r.id+':room','month20RoomEarnings',r.startedAt,168800n,{...meta,staff:''});
  if(r.assignmentSessions?.length){for(const a of r.assignmentSessions){if(!a.startedAt||a.cancelledAt&&!a.endedAt)continue;const gross=cents(a.amount??(pkg?(r.type==='packageA'?1288:2500):null)),item={...meta,staffId:a.staffId,staff:a.staff||a.staffId,sessionId:a.id};
    if(pkg){put('booking:'+r.id+':'+a.id+'-sales','month20ServiceSales',a.startedAt,gross,{service:r.type,...item});if(a.endedAt&&gross!==null)put('booking:'+r.id+':'+a.id+'-staff','month20StaffEarnings',a.endedAt,(gross*60n+50n)/100n,{service:r.type,...item});}
    else if(a.endedAt)service('booking:'+r.id+':'+a.id,{type:'ordinary'},gross,a.endedAt,item);
   }}else if(!r.reservationKind){const gross=cents(r.price??r.spend??(pkg?(r.type==='packageA'?1288:2500):null));if(pkg&&r.startedAt){put('booking:'+r.id+'-sales','month20ServiceSales',r.startedAt,gross,{service:r.type,...meta});if(r.endedAt&&gross!==null)put('booking:'+r.id+'-staff','month20StaffEarnings',r.endedAt,(gross*60n+50n)/100n,{service:r.type,...meta});}else if(r.status==='completed'&&r.endedAt)service('booking:'+r.id,r,gross,r.endedAt,meta);}
 }
 for(const a of advances)if(a.state==='disbursed')put('advance:'+a.id,'month20CashAdvance',a.disbursedAt,BigInt(a.amountCents),{staff:a.staff||'Maya',reference:a.id});
 // Financial deltas only: no request/approval/hold/export records masquerading as transactions.
 for(const e of events){const p=e.params||{},before=e.before?.rows||[],after=e.after?.rows||[],amount=()=>cents(p.amount),base={reference:e.id};
  if(e.kind==='fund')put(e.id+':fund',p.direction==='return'?'month20FundsReturn':'month20FundsAdvance',e.at,amount(),{...base,manager:e.after?.funds?.find(f=>f.id===p.manager)?.name});
  if(e.kind==='debt')put(e.id+':debt',p.direction==='decrease'?'month20OutstandingDecrease':'month20OutstandingIncrease',e.at,amount(),{...base,staff:after.find(r=>r.id===e.ids[0])?.name,description:p.description});
  if(e.kind==='recovery')put(e.id+':recovery',p.resolution==='writeOff'?'month20WriteOff':'month20Repayment',e.at,amount(),{...base,staff:after.find(r=>r.id===e.ids[0])?.name});
  for(const id of e.ids||[]){const b=before.find(r=>r.id===id),a=after.find(r=>r.id===id);if(!a||!b)continue;const meta={...base,staff:a.name,venue:a.primary,period:a.period};
   if(['direct','confirmReport','reconcile'].includes(e.kind))put(e.id+':'+id+':payout','month20WagePayout',e.at,BigInt(a.paidAmount)-BigInt(b.paidAmount),meta);
   if(e.kind==='tally')put(e.id+':'+id+':tally','month20Tally',e.at,BigInt(a.offset)-BigInt(b.offset),meta);
   if(e.kind==='revision'){put(e.id+':'+id+':revision','month20WageCorrection',e.at,BigInt(a.fullWage)-BigInt(b.fullWage),meta);if(BigInt(b.offset)>BigInt(a.offset))put(e.id+':'+id+':restore','month20TallyRestored',e.at,BigInt(b.offset)-BigInt(a.offset),meta);}
  }
 }
 return {month,asOf:now,entries:entries.sort((a,b)=>a.at-b.at||a.id.localeCompare(b.id))};
};
