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
          <div class="project-card-footer">
            <span class="view-case-study-btn">
              View Case Study
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </span>
            <div class="card-links-group" onclick="event.stopPropagation()">
              ${p.demo ? `
                <a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="card-quick-link" aria-label="Live demo for ${p.title}">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              ` : (p.github ? `
                <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="card-quick-link" aria-label="GitHub repository for ${p.title}">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              ` : '')}
            </div>
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
