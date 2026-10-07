/**
 * PROMINENT 2-COLUMN MEDIA & CERTIFICATE LIGHTBOX VIEWER
 * Features large certificate/achievement image stage on the left,
 * structured metadata panel on the right, directional slide animations,
 * and keyboard navigation controls.
 *
 * PDF documents render through PDF.js as a single static front-page
 * image — no native viewer toolbar, no download button, no page carousel.
 */

const PDFJS_VERSION = '3.11.174';
const PDFJS_LIB_URL = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`;
const PDFJS_WORKER_URL = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;

class MediaLightboxViewer {
  constructor() {
    this.modalEl = document.getElementById('media-lightbox-modal');
    this.items = [];
    this.currentIndex = 0;
    this.type = 'cert'; // 'cert' or 'achievement'
    this.isAnimating = false;
    this._pdfJsPromise = null;
    this._pdfDoc = null;
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
        return;
      }

      // Arrow keys always move between certificates/achievements.
      if (e.key === 'ArrowLeft') {
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
    this.isAnimating = false;
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
    // Keep the page locked if the project case-study modal is still open underneath.
    const caseBackdrop = document.getElementById('case-study-modal-backdrop');
    const caseOpen = caseBackdrop && caseBackdrop.classList.contains('is-open');
    document.body.style.overflow = caseOpen ? 'hidden' : '';
    this.destroyPdfDoc();
  }

  prev() {
    if (this.items.length <= 1 || this.isAnimating) return;
    this.navigateWithAnimation('prev');
  }

  next() {
    if (this.items.length <= 1 || this.isAnimating) return;
    this.navigateWithAnimation('next');
  }

  navigateWithAnimation(direction) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const body = this.modalEl.querySelector('.lightbox-body');

    if (prefersReducedMotion || !body) {
      if (direction === 'next') {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
      } else {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
      }
      this.render();
      return;
    }

    this.isAnimating = true;
    const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

    body.classList.add(outClass);

    setTimeout(() => {
      if (direction === 'next') {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
      } else {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
      }
      this.render();

      const newBody = this.modalEl.querySelector('.lightbox-body');
      if (newBody) {
        newBody.classList.add(inClass);
        setTimeout(() => {
          newBody.classList.remove(inClass);
          this.isAnimating = false;
        }, 300);
      } else {
        this.isAnimating = false;
      }
    }, 140);
  }

  /* ------------------------------------------------------------------
     PDF.js loading — fetched once, only when a PDF is actually opened.
  ------------------------------------------------------------------ */
  ensurePdfJs() {
    if (window.pdfjsLib) return Promise.resolve();
    if (this._pdfJsPromise) return this._pdfJsPromise;
    this._pdfJsPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = PDFJS_LIB_URL;
      script.onload = () => {
        try {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      script.onerror = () => reject(new Error('PDF engine failed to load'));
      document.head.appendChild(script);
    });
    return this._pdfJsPromise;
  }

  destroyPdfDoc() {
    if (this._pdfDoc && typeof this._pdfDoc.destroy === 'function') {
      try { this._pdfDoc.destroy(); } catch (e) { /* noop */ }
    }
    this._pdfDoc = null;
  }

  /* ------------------------------------------------------------------
     Front-page-only PDF render. The certificate's first page renders to a
     single static canvas — no carousel, no swipe, no page counter.
  ------------------------------------------------------------------ */
  initPdfStage(stage, item) {
    stage.innerHTML = `
      <div class="pdf-loading" role="status" aria-label="Loading document">
        <span class="pdf-spinner" aria-hidden="true"></span>
        <span>Loading document…</span>
      </div>
    `;

    this.ensurePdfJs()
      .then(() => window.pdfjsLib.getDocument({ url: item.pdf }).promise)
      .then(async (pdf) => {
        // If the user already moved on, drop this render.
        if (!stage.isConnected) {
          try { pdf.destroy(); } catch (e) { /* noop */ }
          return;
        }
        this.destroyPdfDoc();
        this._pdfDoc = pdf;

        // Front page only.
        const page = await pdf.getPage(1);
        if (!stage.isConnected) return;
        const stageH = stage.clientHeight || 520;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const base = page.getViewport({ scale: 1 });
        const cssH = Math.max(120, stageH - 48);
        const scale = (cssH / base.height) * dpr;
        const viewport = page.getViewport({ scale });

        const wrap = document.createElement('div');
        wrap.className = 'pdf-single';
        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label', `${item.title} — certificate front page`);
        wrap.appendChild(canvas);
        stage.innerHTML = '';
        stage.appendChild(wrap);

        try {
          await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        } catch (e) {
          if (!stage.isConnected) return;
          stage.innerHTML = `
            <div class="pdf-error">
              <p>This document can't be previewed inline right now.</p>
              <a href="${item.pdf}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">Open the full document</a>
            </div>
          `;
        }
      })
      .catch(() => {
        if (!stage.isConnected) return;
        stage.innerHTML = `
          <div class="pdf-error">
            <p>This document can't be previewed inline right now.</p>
            <a href="${item.pdf}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">Open the full document</a>
          </div>
        `;
      });
  }

  render() {
    const item = this.items[this.currentIndex];
    if (!item) return;

    this.destroyPdfDoc();

    const total = this.items.length;
    const currentNum = this.currentIndex + 1;
    const pdfMode = !!item.pdf;

    // ---------- Left stage: PDF carousel, image, or placeholder ----------
    let mediaStageHtml = '';
    let stageClass = 'lightbox-image-stage';
    if (pdfMode) {
      stageClass += ' has-pdf';
      mediaStageHtml = `<div class="lightbox-pdf-stage" aria-label="${item.title} document pages"></div>`;
    } else if (item.image) {
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

    // ---------- Right info panel (shared by all media types) ----------
    let tagsHtml = '';
    if (item.skills && item.skills.length > 0) {
      tagsHtml = item.skills.map(s => `<span class="tag-badge">${s}</span>`).join('');
    } else if (item.highlights && item.highlights.length > 0) {
      tagsHtml = item.highlights.map(h => `<span class="tag-badge">${h}</span>`).join('');
    }

    const actions = [];
    if (item.credentialUrl) {
      actions.push(`
        <a href="${item.credentialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          Verify Credential Authority
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      `);
    } else if (item.link) {
      actions.push(`
        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          Explore Profile
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      `);
    }
    if (pdfMode) {
      actions.push(`
        <a href="${item.pdf}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">
          Open Full Document
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      `);
    }
    const actionLinkHtml = actions.length
      ? `<div class="lightbox-actions-row" style="margin-top:auto; display:flex; flex-wrap:wrap; gap:0.6rem;">${actions.join('')}</div>`
      : '';

    const bodyHtml = `
      <div class="lightbox-body">
        <!-- Left: document / image stage -->
        <div class="${stageClass}">
          ${mediaStageHtml}
        </div>

        <!-- Right: information panel -->
        <div class="lightbox-info-panel">
          <div class="lightbox-info-row">
            <span class="lightbox-info-label">${this.type === 'cert' ? 'Issuing Organization' : 'Affiliation / Platform'}</span>
            <span class="lightbox-info-value">${item.issuer || item.organization || 'Verified Credential'}</span>
          </div>

          <div class="lightbox-info-row">
            <span class="lightbox-info-label">Verification Status</span>
            <span style="font-size: 0.9375rem; color: var(--accent-emerald); font-weight:600; display:flex; align-items:center; gap:0.4rem;">
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
    `;

    const footerHint = 'Use \u2190 \u2192 arrow keys to navigate';

    this.modalEl.innerHTML = `
      <div class="lightbox-window">
        <!-- Header -->
        <div class="lightbox-header">
          <div class="lightbox-title-group">
            <h3 class="lightbox-title">${item.title}</h3>
            <span class="lightbox-counter">${currentNum} / ${total}</span>
          </div>
          <button class="modal-close-btn" id="lightbox-close-btn" aria-label="Close viewer">\u2715</button>
        </div>

        ${bodyHtml}

        <!-- Footer Navigation -->
        <div class="lightbox-footer">
          <button class="lightbox-nav-btn" id="lightbox-nav-prev" ${total <= 1 ? 'disabled' : ''} aria-label="Previous certificate">
            \u2190 Previous
          </button>
          <span style="font-family:var(--font-mono); font-size:0.8125rem; color:var(--text-muted);">
            ${footerHint}
          </span>
          <button class="lightbox-nav-btn" id="lightbox-nav-next" ${total <= 1 ? 'disabled' : ''} aria-label="Next certificate">
            Next \u2192
          </button>
        </div>
      </div>
    `;

    // Kick off the PDF carousel after the stage exists in the DOM.
    if (pdfMode) {
      const stage = this.modalEl.querySelector('.lightbox-pdf-stage');
      if (stage) this.initPdfStage(stage, item);
    }

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
    return `
      <article class="cert-card" data-ach-index="${index}" tabindex="0" role="button" aria-label="View ${a.title} achievement">
        <div class="cert-media-preview">
          ${a.image ? `<img src="${a.image}" alt="${a.title}" loading="lazy">` : `
            <div class="cert-placeholder">
              <div class="cert-badge-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <span class="placeholder-label" style="font-size:0.75rem;">Verified Achievement</span>
            </div>
          `}
        </div>
        <div class="cert-card-body">
          <span class="cert-issuer">${a.issuer || a.organization}</span>
          <h3 class="cert-title">${a.title}</h3>
          <span class="cert-date">${a.date}</span>
        </div>
      </article>
    `;
  }).join('');

  achGrid.querySelectorAll('.cert-card').forEach(card => {
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
