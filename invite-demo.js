/* Visual-demo time codes only. These are public, forgeable and not authentication. */
(()=>{
const slotAt=(now=Date.now())=>Math.floor(now/20000);
async function codeFor(slot){
 // Public FNV-1a demo hash, identical on HTTP previews and HTTPS devices.
 // Deliberately not an authentication secret or a production TOTP.
 let hash=2166136261;
 for(const char of '66MM-PREVIEW|'+slot){hash^=char.charCodeAt(0);hash=Math.imul(hash,16777619);}
 return `66MM-DEMO|${slot}|${(hash>>>0).toString(16).padStart(8,'0')}`;
}
async function validate(code,now=Date.now()){
 const text=String(code).trim(),parts=text.split('|');
 if(parts.length!==3||parts[0]!=='66MM-DEMO'||!/^\d+$/.test(parts[1])||!/^[a-f0-9]{8}$/.test(parts[2]))return {ok:false,error:'inviteInvalid'};
 const slot=Number(parts[1]),age=slotAt(now)-slot;
 if(age<0)return {ok:false,error:'inviteFuture'};
 if(age>2)return {ok:false,error:'inviteExpired'};
 if(text!==await codeFor(slot))return {ok:false,error:'inviteInvalid'};
 return {ok:true,code:text};
}
window.InviteDemo={slotAt,codeFor,validate};
})();
