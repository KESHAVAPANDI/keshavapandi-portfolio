/**
 * MEDIA & CERTIFICATE LIGHTBOX VIEWER
 * Lightbox modal for full-scale certificate viewing and achievement media.
 */

class MediaLightboxViewer {
  constructor() {
    this.lightboxEl = document.getElementById('media-lightbox-modal');
    this.titleEl = document.getElementById('lightbox-title');
    this.counterEl = document.getElementById('lightbox-counter');
    this.contentEl = document.getElementById('lightbox-content');
    this.prevBtn = document.getElementById('lightbox-prev');
    this.nextBtn = document.getElementById('lightbox-next');
    this.closeBtn = document.getElementById('lightbox-close');

    this.items = [];
    this.currentIndex = 0;
    this.initListeners();
  }

  initListeners() {
    if (!this.lightboxEl) return;

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      if (!this.lightboxEl.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        this.close();
      } else if (e.key === 'ArrowLeft') {
        this.prev();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });

    // Close on backdrop click
    this.lightboxEl.addEventListener('click', (e) => {
      if (e.target === this.lightboxEl || e.target === this.contentEl) {
        this.close();
      }
    });
  }

  open(items, startIndex = 0) {
    if (!items || items.length === 0) return;
    this.items = items;
    this.currentIndex = startIndex;
    this.render();

    document.body.style.overflow = 'hidden';
    this.lightboxEl.classList.add('is-open');
    this.lightboxEl.setAttribute('aria-hidden', 'false');
  }

  close() {
    if (!this.lightboxEl) return;
    this.lightboxEl.classList.remove('is-open');
    this.lightboxEl.setAttribute('aria-hidden', 'true');
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

    if (this.titleEl) this.titleEl.textContent = item.title;
    if (this.counterEl) this.counterEl.textContent = `${this.currentIndex + 1} / ${this.items.length}`;

    if (item.image) {
      this.contentEl.innerHTML = `<img src="${item.image}" alt="${item.title}" class="lightbox-main-media">`;
    } else {
      this.contentEl.innerHTML = `
        <div class="lightbox-placeholder-view">
          <div class="cert-badge-icon" style="width:68px; height:68px; font-size:1.8rem;" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
          </div>
          <h3 style="font-size:1.4rem; color:var(--text-primary);">${item.title}</h3>
          <p style="font-size:0.95rem; color:var(--accent-sky); font-family:var(--font-mono);">${item.issuer || item.organization || 'Verified Credential'}</p>
          <p style="font-size:0.9rem; color:var(--text-muted); max-width:440px; margin-top:0.5rem;">${item.description || 'Certificate scan file ready for future asset drop in assets/certifications.'}</p>
          ${item.credentialUrl ? `
            <a href="${item.credentialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="margin-top:1rem;">
              Verify Credential Authority
            </a>
          ` : ''}
        </div>
      `;
    }
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
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:1.25rem; line-height:1.55;">${c.description}</p>
          <button class="cert-view-btn" aria-label="Inspect certificate details">
            Inspect Certificate
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </article>
    `;
  }).join('');

  // Attach click events
  certsGrid.querySelectorAll('.cert-card').forEach(card => {
    const idx = parseInt(card.getAttribute('data-cert-index'), 10);
    const trigger = () => {
      if (lightboxInstance) lightboxInstance.open(certificatesData, idx);
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
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:1.25rem; line-height:1.6;">${a.description}</p>
          <div style="display:flex; flex-wrap:wrap; gap:0.45rem; margin-bottom:1.25rem;">
            ${highlightsHtml}
          </div>
          ${a.link ? `
            <a href="${a.link}" target="_blank" rel="noopener noreferrer" class="cert-view-btn" onclick="event.stopPropagation()">
              Explore Platform Profile ↗
            </a>
          ` : `
            <span class="cert-view-btn">
              View Milestone Details →
            </span>
          `}
        </div>
      </article>
    `;
  }).join('');

  achGrid.querySelectorAll('.achievement-card').forEach(card => {
    const idx = parseInt(card.getAttribute('data-ach-index'), 10);
    const trigger = () => {
      if (lightboxInstance) lightboxInstance.open(achievementsData, idx);
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
