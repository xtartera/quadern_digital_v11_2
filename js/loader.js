(function(){
  const grid = document.getElementById('projectGrid');
  const status = document.getElementById('loaderStatus');

  function escapeHTML(value){
    return String(value || '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }

  function openProject(project){
    localStorage.setItem('selectedProject', JSON.stringify(project));
    window.location.href = 'app.html';
  }

  function render(projects){
    if(!Array.isArray(projects) || !projects.length){
      status.textContent = 'No hi ha projectes configurats a data/projects.json.';
      return;
    }
    status.textContent = `${projects.length} projecte${projects.length === 1 ? '' : 's'} disponible${projects.length === 1 ? '' : 's'}`;
    grid.innerHTML = '';
    projects.forEach(project => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.tabIndex = 0;
      card.innerHTML = `
        <div class="project-cover"><img src="${escapeHTML(project.cover || 'assets/portades/ldap.svg')}" alt=""></div>
        <div class="project-info">
          <span class="project-tag">${escapeHTML(project.tag || project.id)}</span>
          <h2>${escapeHTML(project.title)}</h2>
          <p>${escapeHTML(project.description || '')}</p>
          <button type="button">Obrir projecte</button>
        </div>
      `;
      card.addEventListener('click', () => openProject(project));
      card.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openProject(project); }
      });
      grid.appendChild(card);
    });
  }

  fetch('data/projects.json', {cache:'no-store'})
    .then(res => {
      if(!res.ok) throw new Error('No s’ha pogut carregar data/projects.json');
      return res.json();
    })
    .then(data => render(data.projects || []))
    .catch(err => {
      status.textContent = 'No s’ha pogut carregar el catàleg. Obre el projecte amb Live Server o un servidor local.';
      console.error(err);
    });
})();