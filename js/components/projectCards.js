/**
 * PROJECT CARDS RENDERER
 * Populates AI Projects and Other Projects grids from projectsData.
 * Features top-right card-level INTERNSHIP overlay badge (hidden on hover),
 * category badge on left, and clean direct links.
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
    
    // Thumbnail or Placeholder
    let mediaHtml = '';
    if (p.thumbnail) {
      mediaHtml = `<img src="${p.thumbnail}" alt="${p.title} thumbnail" loading="lazy">`;
    } else {
      mediaHtml = `
        <div class="media-placeholder">
          <div class="placeholder-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <span class="placeholder-label">Engineering Case Study</span>
          <span class="placeholder-hint">Media ready for future drop</span>
        </div>
      `;
    }

    return `
      <article class="project-card ${p.type === 'ai' ? 'card-ai' : ''}" data-project-id="${p.id}" tabindex="0" role="button" aria-label="View case study for ${p.title}">
        ${p.isInternship ? `<span class="card-internship-badge">INTERNSHIP</span>` : ''}
        <div class="project-media-preview">
          ${mediaHtml}
        </div>
        <div class="project-card-body">
          <div class="card-meta-top">
            <span class="tag-badge ${p.type === 'ai' ? 'tag-ai' : 'tag-web'}">${p.category}</span>
          </div>
          <h3 class="project-card-title">${p.title}</h3>
          <p class="project-card-desc">${p.description}</p>
          <div class="card-tech-stack">
            ${techTags}
          </div>
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
