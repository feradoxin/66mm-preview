const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function harness(){const context={role:'admin',actor:'Victor Wong'},ctx={Date,console};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(fs.readFileSync('payroll19-model.js','utf8'),ctx);const m=ctx.createPayrollModel19(()=>context);const prepare=(kind,ids=[],p={})=>{const r=m.review(kind,ids,p);assert(r.ok,r.error);return r.review;};const commit=(kind,ids=[],p={})=>{const r=prepare(kind,ids,p),out=m.commit(r,{reason:'Reviewed evidence',checked:true,confirmed:ids});assert(out.ok,out.error);return out;};return {m,context,ctx,prepare,commit};}
{
 const {m,prepare,commit,context}=harness();assert.equal(m.amount('0.01'),1n);assert.equal(m.money(128800n),'MYR 1288.00');assert.throws(()=>m.amount('1.001'));assert.throws(()=>m.amount('-1'));
 assert(!m.review('tally',['maya']).ok);assert(!m.review('finalize',[],{period:m.previous,venue:'venueB'}).ok);commit('source',['soojin']);commit('finalize',[],{period:m.previous,venue:'venueB'});commit('finalize',[],{period:m.previous,venue:'venueA'});assert.equal(m.get('maya').state,'finalized');assert(Object.isFrozen(m.get('maya').snapshots[0]));
 const tally=prepare('tally',['maya','lin','an']);assert(!m.commit(tally,{reason:'Review',checked:true,confirmed:['maya']}).ok);assert.equal(m.get('maya').state,'finalized');assert(m.commit(tally,{reason:'Review',checked:true,confirmed:['maya','lin','an']}).ok);assert.equal(m.get('maya').offset,15000n);assert.equal(m.get('maya').payable,85000n);assert.equal(m.debt.lin,20000n);assert.equal(m.get('lin').state,'settled');assert(!m.review('direct',['lin'],{evidenceById:{lin:'zero'}}).ok);assert(!m.commit(tally,{reason:'Again',checked:true,confirmed:['maya','lin','an']}).ok);
 // Batch items are independent; the second item cannot spend held funds.
 const batch=commit('prepare',['maya','an'],{manager:'daniel'});assert.equal(batch.results[0].state,'success');assert.equal(batch.results[1].state,'failed');assert.equal(m.get('maya').state,'prepared');assert.equal(m.get('an').state,'tallied');assert(!m.review('fund',[],{manager:'daniel',direction:'return',amount:'500',evidence:'Return proof'}).ok);
 context.role='manager';context.actor='Daniel Tan';assert(!m.review('tally',['an']).ok);assert(!m.review('debt',['an'],{amount:'1',direction:'increase',description:'x'}).ok);assert(!m.review('export',[],{period:m.previous,format:'PDF',language:'en'}).ok);commit('reportPayment',['maya'],{outcome:'paid',evidence:'Receipt MAYA-850'});assert.equal(m.get('maya').state,'reported');assert.equal(m.get('maya').paidAmount,0n);
 context.role='admin';context.actor='Victor Wong';const balance=m.fund('daniel').balance;commit('confirmReport',['maya'],{evidence:'Reviewed Manager receipt'});assert.equal(m.get('maya').paidAmount,85000n);assert.equal(m.fund('daniel').balance,balance-85000n);assert(!m.review('confirmReport',['maya'],{evidence:'Duplicate'}).ok);
 commit('direct',['an'],{evidenceById:{an:'Receipt AN-600'}});assert.equal(m.get('an').state,'paid');assert.equal(m.fund('daniel').balance,balance-85000n);
 // Debt is continuous; posting uses today while a reference date is separate.
 const review=prepare('debt',['lin'],{amount:'10',direction:'increase',description:'Replacement uniform',referenceDate:'2026-01-01'});commit('debt',['lin'],{amount:'2',direction:'increase',description:'Supplies'});assert(!m.commit(review,{reason:'Stale',checked:true}).ok);assert.equal(m.debt.lin,20200n);assert(!m.review('debt',['lin'],{amount:'203',direction:'decrease',description:'Too large'}).ok);assert(!m.review('debt',['lin'],{amount:'1',direction:'increase',description:'  '}).ok);
 assert(m.oversight.every(x=>x.required));assert(Object.isFrozen(m.events[0]));assert(m.events.every(x=>x.before&&x.after));
}
{
 const {m,commit,prepare}=harness();const before=m.state();assert(!m.review('revision',['mei'],{amount:'600'}).ok);assert(!m.review('reconcile',['mei'],{outcome:'paid',evidence:'Partial',observedAmount:'100'}).ok);assert.equal(m.state().rows.find(r=>r.id==='mei').state,'uncertain');commit('reconcile',['mei'],{outcome:'notPaid',evidence:'Verified no external disbursement'});const tally=m.get('mei').tally;commit('revision',['mei'],{amount:'600'});assert.equal(m.get('mei').offset,60000n);assert.equal(m.get('mei').payable,0n);assert.equal(m.debt.mei,20000n);assert.equal(m.get('mei').state,'settled');commit('revision',['mei'],{amount:'500'});assert.equal(m.debt.mei,30000n);assert.equal(m.get('mei').compensations.length,2);
 // Paid correction is a separate recovery, never Outstanding or another wage debit.
 const oldDebt=m.debt.sara,paid=m.get('sara').paidAmount;commit('revision',['sara'],{amount:'500'});assert.equal(m.recoveries[0].amount,10000n);assert.equal(m.get('sara').paidAmount,paid);assert.equal(m.debt.sara,oldDebt);commit('recovery',['sara'],{caseId:m.recoveries[0].id,resolution:'repayment',amount:'40',evidence:'Repayment evidence'});commit('recovery',['sara'],{caseId:m.recoveries[0].id,resolution:'writeOff',amount:'60',evidence:'Authorized decision'});assert.equal(m.recoveries[0].remaining,0n);assert.equal(m.debt.sara,oldDebt);
 commit('revision',['sara'],{amount:'550'});const supplement=m.rows.find(r=>r.parent==='sara');assert.equal(supplement.wage,5000n);assert.equal(m.get('sara').paidAmount,paid);assert.equal(supplement.period,m.older);
 assert(!m.review('export',[],{period:m.current,format:'PDF',language:'en'}).ok);commit('export',[],{period:m.older,format:'XLSX',language:'vi',version:'latest',scope:'all'});assert.equal(m.reports[0].state,'previewOnly');
 const r=prepare('fund',[],{manager:'daniel',direction:'advance',amount:'100',evidence:'Funding reference'});assert(!m.commit(r,{reason:'',checked:true}).ok);assert.equal(m.fund('daniel').balance,200000n);
}
// Step 2 regressions: unique items, stored receipts, report versions, retries and stale scope.
{
 const {m,prepare,commit,context}=harness();
 assert(!m.review('unknown',[]).ok);
 commit('finalize',[],{period:m.previous,venue:'venueA'});
 assert(!m.review('tally',['maya','maya']).ok);
 commit('tally',['maya','an']);
 const result=commit('prepare',['maya','an'],{manager:'daniel'}),batch=m.batches.at(-1);
 assert.equal(result.results[1].state,'failed');
 assert(!m.review('prepare',['maya'],{manager:'daniel',parentBatch:batch.id}).ok);
 assert(!m.review('prepare',['an'],{manager:'daniel',parentBatch:'missing'}).ok);
 commit('fund',[],{manager:'daniel',direction:'advance',amount:'1000',evidence:'Funding'});
 commit('prepare',['an'],{manager:'daniel',parentBatch:batch.id});
 context.role='manager';context.actor='Daniel Tan';
 const report=prepare('reportPayment',['an'],{evidence:'Receipt',outcome:'paid'});
 m.fund('daniel').delegated=false;
 assert(!m.commit(report,{reason:'Check',checked:true}).ok);assert.equal(m.get('an').state,'prepared');
 m.fund('daniel').delegated=true;
 commit('reportPayment',['an'],{evidence:'Saved full receipt',outcome:'paid'});
 context.role='admin';context.actor='Victor Wong';
 commit('confirmReport',['an']);assert.equal(m.get('an').paymentEvidence,'Saved full receipt');
 const pending=prepare('fund',[],{manager:'daniel',direction:'advance',amount:'1',evidence:'Funding'});
 m.fund('daniel').balance+=1n;assert(!m.commit(pending,{reason:'Stale balance',checked:true}).ok);
 const oldFunds=m.fund('daniel').balance;
 context.role='manager';context.actor='Daniel Tan';commit('reportPayment',['maya'],{outcome:'notPaid',evidence:'No disbursement'});
 context.role='admin';context.actor='Victor Wong';commit('direct',['maya'],{evidenceById:{maya:'Boss direct receipt'}});assert.equal(m.fund('daniel').balance,oldFunds);
 assert(!m.review('export',[],{period:m.older,scope:'sara',version:'999',format:'PDF',language:'en'}).ok);
 assert(!m.review('export',[],{period:m.older,scope:'missing',version:'latest',format:'PDF',language:'en'}).ok);
 assert(!m.review('export',[],{period:m.older,scope:'all',version:'1',format:'PDF',language:'en'}).ok);
 commit('export',[],{period:m.older,scope:'sara',version:'1',format:'PDF',language:'en'});
 assert.equal(m.reports.at(-1).version,'1');
}
// Full app composition: four languages, all Boss sections and role-restricted handlers.
const base=fs.readFileSync('tests/service17.cjs','utf8').split("for(const lang of ['en','zh','ms','vi'])")[0].replace("const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');",'').replace("'experience.js','lock-screen.js'","'payroll19-locales.js','payroll19-model.js','payroll19.js','experience.js','lock-screen.js'");
const appHarness=new Function('require','fs','vm',base+';return harness;')(require,fs,vm);
for(const lang of ['en','zh','ms','vi']){const {s,go,experience:x,el,ctx}=appHarness();s.lang=lang;s.role='admin';go('payroll');assert(el('tb-content').innerHTML.includes(ctx.COPY[lang].payWorkspace));assert(el('tb-content').innerHTML.includes('data-pay19-tab="finalize"'));assert(el('tb-content').innerHTML.includes('Maya'));assert(x.payroll);for(const section of ['outstanding','funds','revisions','reports','history']){x.payroll.change({id:'pay19-tool',value:section});assert(!el('tb-content').innerHTML.includes('undefined'));}
 x.payroll.change({id:'pay19-tool',value:'finalize'});x.payroll.click({dataset:{pay19:'finalize'}});assert(el('payroll19-overlay').innerHTML.includes('pay19-checked'));assert(el('payroll19-overlay').innerHTML.includes('>X</button>'));el('pay19-reason').value='Finalization reviewed';el('pay19-checked').checked=true;x.payroll.click({dataset:{pay19:'confirm'}});assert.equal(x.payroll.model.get('maya').state,'finalized');x.payroll.click({dataset:{pay19:'confirmReport',pay19Id:'nhi'}});assert(el('payroll19-overlay').innerHTML.includes('pay19-checked'));assert(el('payroll19-overlay').innerHTML.includes('Nhi'));x.payroll.back();x.payroll.click({dataset:{pay19:'export'}});assert(el('payroll19-overlay').innerHTML.includes('<select id="pay19-version">'));x.payroll.back();s.role='staff';assert(!x.payroll.model.review('finalize',[],{period:x.payroll.model.previous,venue:'venueA'}).ok);s.role='manager';go('funds');assert(el('tb-content').innerHTML.includes(ctx.COPY[lang].payFundHelp));assert(!el('tb-content').innerHTML.includes('data-pay19="fundAdvance"'));
 const records=x.operationPreview.allBookings();records.filter(r=>r.customerId==='demo-customer-001').forEach(r=>{r.status='cancelled';r.ongoing=false;});s.role='client';x.operationPreview.addDemoBooking({id:'lockFuture19',customerId:'demo-customer-001',type:'ordinary',status:'confirmed',date:'2030-01-20',time:'21:15',staff:'An'});let tile=ctx.verify.lock.summary().tiles;assert.equal(tile.length,1);assert(tile[0].value.includes('2030-01-20 21:15'));x.operationPreview.addDemoBooking({id:'lockActive19',customerId:'demo-customer-001',type:'ordinary',status:'confirmed',ongoing:true,date:'2026-10-24',time:'18:00',staff:'Maya'});tile=ctx.verify.lock.summary().tiles;assert(tile[0].value.includes(ctx.COPY[lang].ongoingBooking));assert(tile[0].value.includes('2030-01-20'));
}
console.log('PASS payroll: exact money, venue/source finalization, once-only Tally/zero settlement, full independent batches, delegated report/Boss confirmation, holds/funds, stale/role guards, FIN-CL.2 compensation, supplements/recovery, report limits and four-locale UI + Customer lock active/future tile.');
