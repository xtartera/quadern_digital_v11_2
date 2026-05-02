window.TempsLDAP = (() => {
  const IDLE_LIMIT_MS = 5 * 60 * 1000;
  const TICK_SECONDS = 60;
  let storageKey = null, lastInteraction = Date.now(), enabled = false, timer = null;
  function empty(){ return { totalSeconds:0, sessions:[], firstOpenedAt:null, lastActiveAt:null, note:'Temps estimat segons activitat local del navegador.' }; }
  function read(){ if(!storageKey) return empty(); try{return {...empty(), ...(JSON.parse(localStorage.getItem(storageKey)||'{}'))};}catch{return empty();} }
  function write(data){ if(!storageKey) return; try{localStorage.setItem(storageKey, JSON.stringify(data));}catch{} }
  function nowISO(){ return new Date().toISOString(); }
  function ensureSession(data){ if(!data.firstOpenedAt) data.firstOpenedAt=nowISO(); const last=data.sessions[data.sessions.length-1]; const now=nowISO(); if(!last || last.closed){ data.sessions.push({start:now,end:now,seconds:0}); } return data.sessions[data.sessions.length-1]; }
  function configure(baseKey){ storageKey=`${baseKey}_temps`; enabled=true; lastInteraction=Date.now(); const data=read(); ensureSession(data); data.lastActiveAt=nowISO(); write(data); if(!timer) timer=setInterval(tick,TICK_SECONDS*1000); }
  function activity(){ if(!enabled||!storageKey) return; lastInteraction=Date.now(); const data=read(); ensureSession(data); data.lastActiveAt=nowISO(); write(data); }
  function tick(){ if(!enabled||!storageKey) return; if(document.visibilityState!=='visible') return; if(Date.now()-lastInteraction>IDLE_LIMIT_MS) return; const data=read(); const session=ensureSession(data); data.totalSeconds=Math.max(0,Number(data.totalSeconds||0))+TICK_SECONDS; session.seconds=Math.max(0,Number(session.seconds||0))+TICK_SECONDS; session.end=nowISO(); data.lastActiveAt=nowISO(); write(data); }
  function closeSession(){ if(!storageKey) return; const data=read(); const last=data.sessions[data.sessions.length-1]; if(last&&!last.closed){last.end=nowISO(); last.closed=true;} write(data); }
  function reset(){ if(storageKey) localStorage.removeItem(storageKey); }
  function pad(n){return String(n).padStart(2,'0');}
  function formatSeconds(seconds){ const s=Math.max(0,Number(seconds||0)); const h=Math.floor(s/3600); const m=Math.floor((s%3600)/60); return `${h} h ${pad(m)} min`; }
  function formatDate(iso){ if(!iso) return '—'; try{return new Date(iso).toLocaleString('ca-ES',{dateStyle:'short',timeStyle:'short'});}catch{return iso;} }
  function summary(){ const data=read(); return { total:formatSeconds(data.totalSeconds), sessions:String((data.sessions||[]).length||0), firstOpenedAt:formatDate(data.firstOpenedAt), lastActiveAt:formatDate(data.lastActiveAt), note:data.note||'Temps estimat segons activitat local del navegador.', raw:data }; }
  function exportData(){ return read(); }
  document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible') activity(); });
  window.addEventListener('beforeunload',closeSession);
  return { configure, activity, tick, summary, exportData, reset, closeSession };
})();
