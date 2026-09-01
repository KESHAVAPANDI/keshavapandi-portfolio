/**
 * PROMINENT 2-COLUMN MEDIA & CERTIFICATE LIGHTBOX VIEWER
 * Features large certificate/achievement image stage on the left,
 * structured metadata panel on the right, and prev/next controls.
 */

class MediaLightboxViewer {
  constructor() {
    this.modalEl = document.getElementById('media-lightbox-modal');
    this.items = [];
    this.currentIndex = 0;
    this.type = 'cert'; // 'cert' or 'achievement'
    this.initListeners();
  }

  initListeners() {
    if (!this.modalEl) return;

    // Backdrop click dismiss
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) {
        this.close();
      }
    });

    // Keyboard ESC and Left/Right Arrow listeners
    document.addEventListener('keydown', (e) => {
      if (!this.modalEl.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        this.close();
      } else if (e.key === 'ArrowLeft') {
        this.prev();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });
  }

  open(items, startIndex = 0, type = 'cert') {
    if (!items || items.length === 0) return;
    this.items = items;
    this.currentIndex = startIndex;
    this.type = type;
    this.render();

    document.body.style.overflow = 'hidden';
    this.modalEl.classList.add('is-open');
    this.modalEl.setAttribute('aria-hidden', 'false');

    setTimeout(() => {
      const closeBtn = this.modalEl.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.focus();
    }, 80);
  }

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('is-open');
    this.modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  prev() {
    if (this.items.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.render();
  }

  next() {
    if (this.items.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.render();
  }

  render() {
    const item = this.items[this.currentIndex];
    if (!item) return;

    const total = this.items.length;
    const currentNum = this.currentIndex + 1;

    // Left Stage: Real Image or Polished Placeholder
    let mediaStageHtml = '';
    if (item.image) {
      mediaStageHtml = `<img src="${item.image}" alt="${item.title} certificate scan" loading="lazy">`;
    } else if (item.images && item.images.length > 0) {
      mediaStageHtml = `<img src="${item.images[0]}" alt="${item.title}" loading="lazy">`;
    } else {
      mediaStageHtml = `
        <div class="lightbox-placeholder-view">
          <div class="lightbox-placeholder-badge" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
          </div>
          <h4 class="lightbox-placeholder-title">${this.type === 'cert' ? 'Official Certificate Image' : 'Milestone Verification Media'}</h4>
          <p class="lightbox-placeholder-hint">Image scan file ready for future upload in assets/${this.type === 'cert' ? 'certifications' : 'achievements'}/</p>
        </div>
      `;
    }

    // Right Info Panel Badges
    let tagsHtml = '';
    if (item.skills && item.skills.length > 0) {
      tagsHtml = item.skills.map(s => `<span class="tag-badge">${s}</span>`).join('');
    } else if (item.highlights && item.highlights.length > 0) {
      tagsHtml = item.highlights.map(h => `<span class="tag-badge">${h}</span>`).join('');
    }

    // Action Link (if available)
    let actionLinkHtml = '';
    if (item.credentialUrl) {
      actionLinkHtml = `
        <a href="${item.credentialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="margin-top:auto;">
          Verify Credential Authority
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      `;
    } else if (item.link) {
      actionLinkHtml = `
        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="margin-top:auto;">
          Explore Profile
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      `;
    }

    this.modalEl.innerHTML = `
      <div class="lightbox-window">
        <!-- Header -->
        <div class="lightbox-header">
          <div class="lightbox-title-group">
            <h3 class="lightbox-title">${item.title}</h3>
            <span class="lightbox-counter">${currentNum} / ${total}</span>
          </div>
          <button class="modal-close-btn" id="lightbox-close-btn" aria-label="Close viewer">✕</button>
        </div>

        <!-- 2-Column Body -->
        <div class="lightbox-body">
          <!-- Left: Image Stage -->
          <div class="lightbox-image-stage">
            ${mediaStageHtml}
          </div>

          <!-- Right: Information Panel -->
          <div class="lightbox-info-panel">
            <div class="lightbox-info-row">
              <span class="lightbox-info-label">${this.type === 'cert' ? 'Issuing Organization' : 'Affiliation / Platform'}</span>
              <span class="lightbox-info-value">${item.issuer || item.organization || 'Verified Credential'}</span>
            </div>

            <div class="lightbox-info-row">
              <span class="lightbox-info-label">Verification Status</span>
              <span style="font-size: 0.95rem; color: var(--accent-emerald); font-weight:600; display:flex; align-items:center; gap:0.4rem;">
                <span class="status-dot"></span> ${item.date || 'Verified'}
              </span>
            </div>

            <div class="lightbox-info-row">
              <span class="lightbox-info-label">Description & Scope</span>
              <p class="lightbox-info-desc">${item.description}</p>
            </div>

            ${tagsHtml ? `
              <div class="lightbox-info-row">
                <span class="lightbox-info-label">${this.type === 'cert' ? 'Key Competencies Covered' : 'Key Focus Areas'}</span>
                <div class="lightbox-skills-list">
                  ${tagsHtml}
                </div>
              </div>
            ` : ''}

            ${actionLinkHtml}
          </div>
        </div>

        <!-- Footer Navigation -->
        <div class="lightbox-footer">
          <button class="lightbox-nav-btn" id="lightbox-nav-prev" ${total <= 1 ? 'disabled' : ''} aria-label="Previous certificate">
            ← Previous
          </button>
          <span style="font-family:var(--font-mono); font-size:0.84rem; color:var(--text-muted);">
            Use ← → arrow keys to navigate
          </span>
          <button class="lightbox-nav-btn" id="lightbox-nav-next" ${total <= 1 ? 'disabled' : ''} aria-label="Next certificate">
            Next →
          </button>
        </div>
      </div>
    `;

    // Hook listeners
    const closeBtn = document.getElementById('lightbox-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    const prevBtn = document.getElementById('lightbox-nav-prev');
    const nextBtn = document.getElementById('lightbox-nav-next');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
  }
}

function renderCertificates(lightboxInstance) {
  const certsGrid = document.getElementById('certificates-grid');
  if (!certsGrid || !certificatesData) return;

  certsGrid.innerHTML = certificatesData.map((c, index) => {
    return `
      <article class="cert-card" data-cert-index="${index}" tabindex="0" role="button" aria-label="View ${c.title} Certificate">
        <div class="cert-media-preview">
          ${c.image ? `<img src="${c.image}" alt="${c.title}" loading="lazy">` : `
            <div class="cert-placeholder">
              <div class="cert-badge-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <span class="placeholder-label" style="font-size:0.75rem;">Verified Credential</span>
            </div>
          `}
        </div>
        <div class="cert-card-body">
          <span class="cert-issuer">${c.issuer}</span>
          <h3 class="cert-title">${c.title}</h3>
          <span class="cert-date">${c.date}</span>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:1.15rem; line-height:1.55;">${c.description}</p>
          <button class="cert-view-btn" aria-label="Inspect certificate details">
            Inspect Certificate
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </article>
    `;
  }).join('');

  // Attach click listeners
  certsGrid.querySelectorAll('.cert-card').forEach(card => {
    const idx = parseInt(card.getAttribute('data-cert-index'), 10);
    const trigger = () => {
      if (lightboxInstance) lightboxInstance.open(certificatesData, idx, 'cert');
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

function renderAchievements(lightboxInstance) {
  const achGrid = document.getElementById('achievements-grid');
  if (!achGrid || !achievementsData) return;

  achGrid.innerHTML = achievementsData.map((a, index) => {
    const highlightsHtml = a.highlights.map(h => `<span class="tag-badge" style="font-size:0.75rem;">${h}</span>`).join('');
    return `
      <article class="achievement-card" data-ach-index="${index}" tabindex="0" role="button" aria-label="View ${a.title} achievement">
        <div class="cert-card-body">
          <span class="cert-issuer">${a.organization}</span>
          <h3 class="cert-title">${a.title}</h3>
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:1.15rem; line-height:1.6;">${a.description}</p>
          <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:1.15rem;">
            ${highlightsHtml}
          </div>
          <button class="cert-view-btn" aria-label="View milestone details">
            View Milestone Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </article>
    `;
  }).join('');

  achGrid.querySelectorAll('.achievement-card').forEach(card => {
    const idx = parseInt(card.getAttribute('data-ach-index'), 10);
    const trigger = () => {
      if (lightboxInstance) lightboxInstance.open(achievementsData, idx, 'achievement');
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

window.MediaLightboxViewer = MediaLightboxViewer;
window.renderCertificates = renderCertificates;
window.renderAchievements = renderAchievements;
