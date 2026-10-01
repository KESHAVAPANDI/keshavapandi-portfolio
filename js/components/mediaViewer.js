/**
 * PROMINENT 2-COLUMN MEDIA & CERTIFICATE LIGHTBOX VIEWER
 * Features large certificate/achievement image stage on the left,
 * structured metadata panel on the right, directional slide animations,
 * and keyboard navigation controls.
 *
 * PDF documents render through PDF.js into a full-width, horizontally
 * scrollable page carousel — no native viewer toolbar, no download button.
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
    this.pdfApi = null;   // { total, current, goTo } for the active PDF stage
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

      // When a multi-page PDF is on stage, arrows turn its pages;
      // otherwise they move between certificates/achievements.
      const item = this.items[this.currentIndex];
      const pdfPaging = item && item.pdf && this.pdfApi && this.pdfApi.total > 1;

      if (e.key === 'ArrowLeft') {
        if (pdfPaging) this.pdfApi.go(-1); else this.prev();
      } else if (e.key === 'ArrowRight') {
        if (pdfPaging) this.pdfApi.go(1); else this.next();
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
    this.pdfApi = null;
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
     Full-width horizontal PDF carousel. Pages render to canvas and sit
     side by side in a swipeable strip — no native toolbar, no download.
  ------------------------------------------------------------------ */
  initPdfStage(stage, item) {
    const startPage = Math.max(1, item.startPage || 1);
    stage.innerHTML = `
      <div class="pdf-loading" role="status" aria-label="Loading document">
        <span class="pdf-spinner" aria-hidden="true"></span>
        <span>Loading document…</span>
      </div>
    `;

    this.ensurePdfJs()
      .then(() => window.pdfjsLib.getDocument({ url: item.pdf }).promise)
      .then((pdf) => {
        // If the user already moved on, drop this render.
        if (!stage.isConnected) {
          try { pdf.destroy(); } catch (e) { /* noop */ }
          return;
        }
        this.destroyPdfDoc();
        this._pdfDoc = pdf;
        this.buildPdfCarousel(stage, pdf, startPage);
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

  buildPdfCarousel(stage, pdf, startPage) {
    const total = pdf.numPages;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    stage.innerHTML = `
      <div class="pdf-strip" role="region" aria-label="Document pages, swipe horizontally"></div>
      <div class="pdf-ui">
        <button class="pdf-nav-btn pdf-nav-prev" aria-label="Previous page">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <span class="pdf-counter" aria-live="polite"><strong>1</strong> / ${total}</span>
        <button class="pdf-nav-btn pdf-nav-next" aria-label="Next page">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    `;

    const strip = stage.querySelector('.pdf-strip');
    const counterNum = stage.querySelector('.pdf-counter strong');
    const prevBtn = stage.querySelector('.pdf-nav-prev');
    const nextBtn = stage.querySelector('.pdf-nav-next');

    const api = {
      total,
      current: 1,
      go: (dir) => api.goTo(api.current + dir),
      goTo: (n) => {
        const target = Math.min(total, Math.max(1, n));
        const pageEl = strip.children[target - 1];
        if (!pageEl) return;
        const left = pageEl.offsetLeft - (strip.clientWidth - pageEl.clientWidth) / 2;
        strip.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    };
    this.pdfApi = api;

    const setCounter = (n) => {
      api.current = n;
      if (counterNum) counterNum.textContent = n;
      if (prevBtn) prevBtn.disabled = n <= 1;
      if (nextBtn) nextBtn.disabled = n >= total;
    };

    if (prevBtn) prevBtn.addEventListener('click', () => api.go(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => api.go(1));

    // Track the centered page as the user swipes/scrolls.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          setCounter(parseInt(entry.target.dataset.page, 10));
        }
      });
    }, { root: strip, threshold: [0.55] });

    const stageH = stage.clientHeight || 520;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    (async () => {
      for (let n = 1; n <= total; n++) {
        if (!strip.isConnected) return;
        const page = await pdf.getPage(n);
        const base = page.getViewport({ scale: 1 });
        // Fit page height to the stage; canvas renders at device pixel ratio for crispness.
        const cssH = Math.max(120, stageH - 56);
        const scale = (cssH / base.height) * dpr;
        const viewport = page.getViewport({ scale });

        const wrap = document.createElement('div');
        wrap.className = 'pdf-page';
        wrap.dataset.page = n;
        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.setAttribute('aria-label', `Page ${n} of ${total}`);
        wrap.appendChild(canvas);
        strip.appendChild(wrap);
        observer.observe(wrap);

        try {
          await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        } catch (e) { /* keep the slot; a failed page still occupies layout */ }
      }

      // Jump to the requested page (e.g. a single internship certificate inside a bundle).
      const first = Math.min(total, startPage);
      setCounter(first);
      requestAnimationFrame(() => api.goTo(first));
    })();
  }

  render() {
    const item = this.items[this.currentIndex];
    if (!item) return;

    this.destroyPdfDoc();
    this.pdfApi = null;

    const total = this.items.length;
    const currentNum = this.currentIndex + 1;
    const pdfMode = !!item.pdf;

    // ---------- Media stage ----------
    let bodyHtml = '';
    if (pdfMode) {
      // Full-width horizontal document carousel + compact meta strip.
      const metaActions = [];
      if (item.credentialUrl) {
        metaActions.push(`
          <a href="${item.credentialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            Verify Credential Authority
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        `);
      } else if (item.link) {
        metaActions.push(`
          <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            Explore Profile
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        `);
      }
      metaActions.push(`
        <a href="${item.pdf}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">
          Open Full Document
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      `);

      bodyHtml = `
        <div class="lightbox-body pdf-mode">
          <div class="lightbox-pdf-stage" aria-label="${item.title} document pages"></div>
          <div class="lightbox-pdf-meta">
            <div class="pdf-meta-group">
              <span class="lightbox-info-label">${this.type === 'cert' ? 'Issuing Organization' : 'Affiliation / Platform'}</span>
              <span class="pdf-meta-value">${item.issuer || item.organization || 'Verified Credential'}</span>
            </div>
            <div class="pdf-meta-group">
              <span class="lightbox-info-label">${this.type === 'cert' ? 'Issued' : 'Date'}</span>
              <span class="pdf-meta-value pdf-meta-date"><span class="status-dot"></span>${item.date || 'Verified'}</span>
            </div>
            <div class="lightbox-actions-row pdf-meta-actions">${metaActions.join('')}</div>
          </div>
        </div>
      `;
    } else {
      // Image / placeholder stage + info panel (unchanged two-column layout).
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
      const actionLinkHtml = actions.length
        ? `<div class="lightbox-actions-row" style="margin-top:auto; display:flex; flex-wrap:wrap; gap:0.6rem;">${actions.join('')}</div>`
        : '';

      bodyHtml = `
        <div class="lightbox-body">
          <div class="lightbox-image-stage">
            ${mediaStageHtml}
          </div>

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
      `;
    }

    const footerHint = pdfMode
      ? 'Swipe sideways or use ← → to turn pages'
      : 'Use ← → arrow keys to navigate';

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

        ${bodyHtml}

        <!-- Footer Navigation -->
        <div class="lightbox-footer">
          <button class="lightbox-nav-btn" id="lightbox-nav-prev" ${total <= 1 ? 'disabled' : ''} aria-label="Previous certificate">
            ← Previous
          </button>
          <span style="font-family:var(--font-mono); font-size:0.84rem; color:var(--text-muted);">
            ${footerHint}
          </span>
          <button class="lightbox-nav-btn" id="lightbox-nav-next" ${total <= 1 ? 'disabled' : ''} aria-label="Next certificate">
            Next →
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
