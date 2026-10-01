/**
 * PROJECT CARDS RENDERER (COMPACT INDEX)
 * Minimal cards: project name + tech stack only, with an INTERNSHIP
 * overlay badge where relevant. Full details live in the case study modal.
 */

function renderProjectCards(caseStudyViewerInstance) {
  const aiGrid = document.getElementById('ai-projects-grid');
  const otherGrid = document.getElementById('other-projects-grid');
  const aiCountBadge = document.getElementById('ai-projects-count');
  const otherCountBadge = document.getElementById('other-projects-count');
  const heroCountBadge = document.getElementById('hero-project-count');

  if (!projectsData || !Array.isArray(projectsData)) return;

  const aiProjects = projectsData.filter(p => p.type === 'ai');
  const otherProjects = projectsData.filter(p => p.type === 'other');

  if (aiCountBadge) aiCountBadge.textContent = `${aiProjects.length} Projects`;
  if (otherCountBadge) otherCountBadge.textContent = `${otherProjects.length} Projects`;
  if (heroCountBadge) heroCountBadge.textContent = `${projectsData.length} Projects`;

  function createCardHtml(p) {
    const techTags = p.technologies.slice(0, 4).map(t => `<span class="tag-badge">${t}</span>`).join('');

    return `
      <article class="project-card project-card-compact ${p.type === 'ai' ? 'card-ai' : ''}" data-project-id="${p.id}" tabindex="0" role="button" aria-label="Open case study: ${p.title}">
        ${p.isInternship ? `<span class="card-internship-badge">INTERNSHIP</span>` : ''}
        <div class="project-card-body">
          <h3 class="project-card-title">${p.title}</h3>
          <div class="card-tech-stack">
            ${techTags}
          </div>
          <span class="card-open-hint" aria-hidden="true">
            Case study
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </span>
        </div>
      </article>
    `;
  }

  if (aiGrid) {
    aiGrid.innerHTML = aiProjects.map(p => createCardHtml(p)).join('');
  }

  if (otherGrid) {
    otherGrid.innerHTML = otherProjects.map(p => createCardHtml(p)).join('');
  }

  // Attach click listeners to cards
  const allCards = document.querySelectorAll('.project-card');
  allCards.forEach(card => {
    const projectId = card.getAttribute('data-project-id');
    const trigger = () => {
      if (caseStudyViewerInstance) {
        caseStudyViewerInstance.open(projectId);
      }
    };

    card.addEventListener('click', trigger);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger();
      }
    });
  });
}

window.renderProjectCards = renderProjectCards;
