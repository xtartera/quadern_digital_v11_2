(() => {
  const data = window.PROJECT || window.QUADERN_DADES; window.QUADERN_DADES = data;
  const state = { student:null, answers:{}, key:null, unlocked:false };
  const $ = (s) => document.querySelector(s);
  const saveState = $('#saveState');
  let saveTimer;

  function setText(id, value){ const el = document.getElementById(id); if(el && value) el.textContent = value; }
  function setAttr(id, attr, value){ const el = document.getElementById(id); if(el && value) el.setAttribute(attr, value); }
  function applyProjectMeta(){
    if(!data){ throw new Error('No s’ha carregat cap projecte. Revisa el fitxer js/projectes/*.js carregat a index.html.'); }
    document.title = `${data.subtitle || 'Quadern digital'} · ${data.title || 'Projecte'}`;
    setText('brandLabel', data.brandLabel || data.subtitle || 'Quadern digital');
    setText('projectEyebrow', data.eyebrow || data.institution || 'Projecte educatiu');
    setText('heroTitle', data.title || 'Quadern digital interactiu');
    setText('heroDescription', data.description || data.subtitle || '');
    setText('overviewDescription', data.overviewDescription || 'Resum del dossier i de les evidències que hauràs de lliurar.');
    setText('coverBadgeTitle', data.coverBadgeTitle || data.title || 'PROJECTE');
    setText('coverBadgeText', data.coverBadgeText || 'Configurar · Verificar · Analitzar');
    setAttr('brandLogo', 'src', data.logo || 'assets/logo.png');
    setAttr('coverImage', 'src', data.cover || 'assets/portades/ldap.svg');
  }


  function init(){
    applyProjectMeta();
    UILDAP.renderOverview(data);
    UILDAP.renderActivities(data);
    UILDAP.updateIntegrity(null);
    bind();
    refreshStudentFromInputs(false);
  }
  function bind(){
    $('#unlockBtn').addEventListener('click', unlock);
    $('#studentName').addEventListener('input', () => refreshStudentFromInputs(true));
    $('#studentSurname').addEventListener('input', () => refreshStudentFromInputs(true));
    $('#saveBtn').addEventListener('click', () => save('Desat manualment'));
    $('#exportBtn').addEventListener('click', exportData);
    $('#importFile').addEventListener('change', importData);
    $('#resetBtn').addEventListener('click', resetData);
    $('#printBtn').addEventListener('click', () => window.print());
    document.addEventListener('input', (e)=>{ if(e.target.matches('textarea.answer')){ ensureAnswer(e.target.dataset.step).text = e.target.value; scheduleSave(); updateCompletion(); }});
    document.addEventListener('click', (e)=>{
      const rm = e.target.closest('[data-remove-image]');
      if(rm){ const [stepId,imgId] = rm.dataset.removeImage.split(':'); removeImage(stepId,imgId); }
      const dz = e.target.closest('.dropzone'); if(dz) dz.focus();
    });
    document.addEventListener('change', (e)=>{ if(e.target.matches('[data-file]')) addFiles(e.target.dataset.file, Array.from(e.target.files || [])).then(()=>{ e.target.value=''; }); });
    document.addEventListener('dragover', (e)=>{ const dz=e.target.closest('.dropzone'); if(dz){ e.preventDefault(); dz.classList.add('is-dragover'); dz.focus(); }});
    document.addEventListener('dragleave', (e)=>{ const dz=e.target.closest('.dropzone'); if(dz) dz.classList.remove('is-dragover'); });
    document.addEventListener('drop', (e)=>{ const dz=e.target.closest('.dropzone'); if(dz){ e.preventDefault(); dz.classList.remove('is-dragover'); addFiles(dz.dataset.step, Array.from(e.dataTransfer.files || [])); }});
    document.addEventListener('pointerover', (e)=>{ const dz=e.target.closest('.dropzone'); if(dz && document.activeElement !== dz) dz.focus({ preventScroll:true }); });
    document.addEventListener('paste', (e)=>{ const active = document.activeElement; if(active?.classList?.contains('dropzone')){ const files = ImagesLDAP.filesFromPaste(e); if(files.length){ e.preventDefault(); addFiles(active.dataset.step, files); } }});
    ['input','click','keydown','paste','drop','dragover','pointerdown'].forEach(evt => document.addEventListener(evt, () => { if(state.unlocked) TempsLDAP.activity(); }, { passive:true }));
    window.addEventListener('beforeprint', () => { refreshStudentFromInputs(false); TempsLDAP.tick(); UILDAP.updateTime(TempsLDAP.summary()); PrintLDAP.before(state); });
    window.addEventListener('afterprint', () => PrintLDAP.after());
  }
  function inputName(){ return $('#studentName').value.trim(); }
  function inputSurname(){ return $('#studentSurname').value.trim(); }
  function currentFullName(){ return StorageLDAP.fullName(state.student?.currentName, state.student?.currentSurname); }
  function refreshStudentFromInputs(markDirty){
    const name = inputName();
    const surname = inputSurname();
    if(state.unlocked && state.student){
      state.student.currentName = name;
      state.student.currentSurname = surname;
      state.student = StorageLDAP.verifyStudent(data.projectId, state.student);
      UILDAP.updateIntegrity(state.student);
      if(markDirty) scheduleSave();
      updateCompletion();
      return;
    }
    $('#activeStudent').textContent = name || surname ? `${name} ${surname}`.trim() : 'Alumne no identificat';
  }
  function unlock(){
    const name = inputName();
    const surname = inputSurname();
    if(!name || !surname){ alert('Cal indicar nom i cognoms per desbloquejar el quadern.'); return; }
    const lookupKey = StorageLDAP.keyFor(data.projectId, name, surname);
    const saved = StorageLDAP.read(lookupKey);
    if(saved.student){
      state.student = StorageLDAP.normalizeStudent(data.projectId, saved.student);
      state.key = StorageLDAP.keyFor(data.projectId, state.student.originalName, state.student.originalSurname);
      state.answers = saved.answers || {};
      $('#studentName').value = state.student.currentName || state.student.originalName || '';
      $('#studentSurname').value = state.student.currentSurname || state.student.originalSurname || '';
    } else {
      state.student = StorageLDAP.createStudent(data.projectId, name, surname);
      state.key = StorageLDAP.keyFor(data.projectId, state.student.originalName, state.student.originalSurname);
      const originalSaved = StorageLDAP.read(state.key);
      if(originalSaved.student){
        state.student = StorageLDAP.normalizeStudent(data.projectId, originalSaved.student);
        state.answers = originalSaved.answers || {};
        $('#studentName').value = state.student.currentName || state.student.originalName || '';
        $('#studentSurname').value = state.student.currentSurname || state.student.originalSurname || '';
      } else {
        state.answers = {};
      }
    }
    state.unlocked = true;
    TempsLDAP.configure(state.key);
    UILDAP.updateTime(TempsLDAP.summary());
    $('#activities').classList.remove('locked');
    $('#lockState').classList.add('ok');
    UILDAP.updateIntegrity(state.student);
    applyStateToUI();
    save('Quadern desbloquejat');
  }
  function stepConfig(stepId){ return data.activities.flatMap(a => a.steps).find(s => s.id === stepId) || {}; }
  function allowsMultipleImages(stepId){ return stepConfig(stepId).allowMultipleImages === true; }
  function ensureAnswer(stepId){ if(!state.answers[stepId]) state.answers[stepId] = { text:'', images:[] }; if(!state.answers[stepId].images) state.answers[stepId].images=[]; return state.answers[stepId]; }
  function applyStateToUI(){
    Object.entries(state.answers).forEach(([stepId,ans])=>{
      const ta = document.querySelector(`textarea[data-step="${CSS.escape(stepId)}"]`); if(ta) ta.value = ans.text || '';
      UILDAP.renderGallery(stepId, ans.images || []);
    });
    document.querySelectorAll('[data-gallery]').forEach(g=>{ const id=g.dataset.gallery; UILDAP.renderGallery(id, ensureAnswer(id).images || []); });
    updateCompletion();
  }
  async function addFiles(stepId, files){
    if(!state.unlocked){ alert('Primer cal desbloquejar el quadern amb nom i cognoms.'); return; }
    const ans = ensureAnswer(stepId);
    const isMulti = allowsMultipleImages(stepId);
    const limit = isMulti ? (ImagesLDAP.MAX_IMAGES_PER_STEP || 4) : 1;
    const validImages = files.filter(f=>f.type && f.type.startsWith('image/'));
    if(!validImages.length) return;

    if(!isMulti){
      try {
        ans.images = [await ImagesLDAP.fileToImageData(validImages[0])];
        if(validImages.length > 1) alert('Aquest pas només admet una captura. S’ha desat la primera imatge seleccionada.');
      } catch(err){ alert(err.message); }
    } else {
      const remaining = Math.max(0, limit - ans.images.length);
      if(!remaining){ alert(`Aquest pas ja té el màxim de ${limit} imatges.`); return; }
      const images = validImages.slice(0, remaining);
      if(validImages.length > remaining){ alert(`Només s’han afegit ${remaining} imatges. Màxim: ${limit} per pas.`); }
      for(const file of images){
        try { ans.images.push(await ImagesLDAP.fileToImageData(file)); }
        catch(err){ alert(err.message); }
      }
    }
    UILDAP.renderGallery(stepId, ans.images);
    scheduleSave(); updateCompletion();
  }
  function removeImage(stepId,imgId){
    const ans = ensureAnswer(stepId); ans.images = ans.images.filter(i=>i.id !== imgId);
    UILDAP.renderGallery(stepId, ans.images); scheduleSave(); updateCompletion();
  }
  function scheduleSave(){ if(!state.unlocked) return; saveState.textContent = 'Canvis pendents...'; clearTimeout(saveTimer); saveTimer=setTimeout(()=>save('Autodesat'), 650); }
  function cloneAnswersWithoutImages(answers){
    const clean = {};
    Object.entries(answers || {}).forEach(([stepId, ans]) => {
      clean[stepId] = {
        ...ans,
        text: ans?.text || '',
        images: []
      };
    });
    return clean;
  }
  function stripImportedImages(answers){
    const clean = {};
    Object.entries(answers || {}).forEach(([stepId, ans]) => {
      clean[stepId] = {
        ...ans,
        text: ans?.text || '',
        images: []
      };
    });
    return clean;
  }
  function payload(extra = {}){
    state.student = StorageLDAP.verifyStudent(data.projectId, state.student);
    return { projectId:data.projectId, student:state.student, answers:state.answers, completion: completionSummary(), timeTracking: TempsLDAP.exportData(), updatedAt:new Date().toISOString(), ...extra };
  }
  function exportPayload(extra = {}){
    const base = payload(extra);
    return {
      ...base,
      answers: cloneAnswersWithoutImages(base.answers),
      exportPolicy: {
        visualEvidence: 'not-exported',
        message: data.exportPolicyMessage || 'Les evidències visuals no s’exporten ni s’importen; han de romandre al dispositiu original de l’alumne.'
      }
    };
  }
  function save(msg='Desat'){
    if(!state.unlocked || !state.key) return;
    TempsLDAP.tick();
    UILDAP.updateTime(TempsLDAP.summary());
    const result = StorageLDAP.write(state.key, payload());
    if(!result.ok){ saveState.textContent = 'No s’ha pogut desar'; alert(result.message); return; }
    UILDAP.updateIntegrity(state.student);
    saveState.textContent = `${msg} · ${new Date().toLocaleTimeString('ca-ES',{hour:'2-digit',minute:'2-digit'})}`;
  }
  function exportData(){
    if(!state.unlocked){ alert('Primer cal desbloquejar el quadern.'); return; }
    save('Desat abans d’exportar');
    StorageLDAP.download(`${state.key}.json`, JSON.stringify(exportPayload({exportedAt:new Date().toISOString()}), null, 2));
  }
  function importData(e){
    const file = e.target.files?.[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try{
        const imported = JSON.parse(reader.result);
        if(!imported || typeof imported !== 'object' || !imported.answers){ throw new Error('estructura'); }
        const activeName = inputName();
        const activeSurname = inputSurname();
        const importedStudent = StorageLDAP.normalizeStudent(data.projectId, imported.student || {});
        if(activeName && activeSurname){
          importedStudent.currentName = activeName;
          importedStudent.currentSurname = activeSurname;
        }
        state.student = StorageLDAP.verifyStudent(data.projectId, importedStudent);
        state.key = StorageLDAP.keyFor(data.projectId, state.student.originalName, state.student.originalSurname);
        state.answers = stripImportedImages(imported.answers || {});
        state.unlocked = true;
        TempsLDAP.configure(state.key);
        UILDAP.updateTime(TempsLDAP.summary());
        $('#activities').classList.remove('locked');
        $('#lockState').classList.add('ok');
        $('#studentName').value = state.student.currentName || '';
        $('#studentSurname').value = state.student.currentSurname || '';
        UILDAP.updateIntegrity(state.student);
        applyStateToUI();
        save('Dades importades');
        const integrityNotice = !state.student.verified ? ' A més, l’autoria no coincideix amb l’original i aquest avís apareixerà a la visió general i al peu del document imprès.' : '';
        alert('Dades importades. Per seguretat, les evidències visuals no s’importen; cal tornar a afegir les captures en aquest dispositiu.' + integrityNotice);
      }catch{ alert('El fitxer JSON no és vàlid.'); }
    };
    reader.readAsText(file); e.target.value='';
  }
  function resetData(){
    if(!state.unlocked){ alert('No hi ha cap alumne actiu.'); return; }
    if(!confirm('Vols esborrar el progrés d’aquest alumne en aquest navegador?')) return;
    localStorage.removeItem(state.key); TempsLDAP.reset(); TempsLDAP.configure(state.key); UILDAP.updateTime(TempsLDAP.summary()); state.answers = {}; document.querySelectorAll('textarea.answer').forEach(t=>t.value=''); document.querySelectorAll('[data-gallery]').forEach(g=>UILDAP.renderGallery(g.dataset.gallery, [])); saveState.textContent='Progrés esborrat'; updateCompletion();
  }
  function completionSummary(){
    const steps = data.activities.flatMap(a=>a.steps);
    let total = 0;
    let done = 0;
    const pending = [];
    steps.forEach(step => {
      const ans = state.answers[step.id] || {};
      const needsText = ['text','both'].includes(step.evidence);
      const needsImage = ['image','both'].includes(step.evidence);
      let required = 0;
      let completed = 0;
      if(needsText){ required++; if((ans.text || '').trim()) completed++; }
      if(needsImage){ required++; if((ans.images || []).length) completed++; }
      total += required;
      done += completed;
      if(required && completed < required) pending.push(step.id);
    });
    const percent = total ? (done / total) * 100 : 100;
    let statusLabel = '✖ Incomplert';
    let statusClass = 'completion-ko';
    if(percent >= 80){ statusLabel = '✔ Complert'; statusClass = 'completion-ok'; }
    else if(percent >= 70){ statusLabel = '⚠ Revisar'; statusClass = 'completion-review'; }
    const pendingLabel = pending.length ? pending.slice(0, 8).join(', ') + (pending.length > 8 ? ` +${pending.length-8}` : '') : 'Cap';
    return { done, total, pending, pendingLabel, percent, statusLabel, statusClass };
  }
  function updateCompletion(){
    const summary = completionSummary();
    UILDAP.updateCompletion(summary);
    if(state.unlocked) $('#activeStudent').textContent = `${currentFullName()} · ${summary.statusLabel}`;
  }
  if(document.readyState === 'loading') window.addEventListener('DOMContentLoaded', init);
  else init();
})();
