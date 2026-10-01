/**
 * INTERACTIVE CASE STUDY VIEWER — "Watch page" style
 * YouTube-inspired layout: 16:9 media player pinned at the top (demo video /
 * screenshot gallery with tabs), title + badges + pill actions below, then a
 * description box, detail cards, workflow, and an "Up next" rail.
 */

class CaseStudyViewer {
  constructor() {
    this.modalBackdrop = document.getElementById('case-study-modal-backdrop');
    this.modalContainer = document.getElementById('case-study-modal-container');
    this.currentProject = null;
    this.currentSlideIndex = 0;
    this.initEventListeners();
  }

  initEventListeners() {
    if (!this.modalBackdrop) return;

    // Click backdrop to dismiss
    this.modalBackdrop.addEventListener('click', (e) => {
      if (e.target === this.modalBackdrop) {
        this.close();
      }
    });

    // Keyboard ESC and Arrow keys
    document.addEventListener('keydown', (e) => {
      if (!this.modalBackdrop.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        this.close();
      } else if (e.key === 'ArrowLeft') {
        this.prevSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    });
  }

  open(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    this.currentProject = project;
    this.currentSlideIndex = 0;

    // Prev / Next neighbours in the data order for modal browsing
    const idx = projectsData.indexOf(project);
    this.prevProject = idx > 0 ? projectsData[idx - 1] : null;
    this.nextProject = idx < projectsData.length - 1 ? projectsData[idx + 1] : null;

    this.renderContent();

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    this.modalBackdrop.classList.add('is-open');
    this.modalBackdrop.setAttribute('aria-hidden', 'false');

    // Always start at the top of the watch page
    const scroller = this.modalContainer.querySelector('.watch-scroll');
    if (scroller) scroller.scrollTop = 0;
    if (this.modalBackdrop) this.modalBackdrop.scrollTop = 0;

    // Accessibility focus
    setTimeout(() => {
      const closeBtn = this.modalContainer.querySelector('.watch-close-btn');
      if (closeBtn) closeBtn.focus();
    }, 80);
  }

  close() {
    if (!this.modalBackdrop) return;

    // Pause video if playing
    const video = this.modalContainer.querySelector('video');
    if (video) video.pause();

    this.modalBackdrop.classList.remove('is-open');
    this.modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  renderContent() {
    const p = this.currentProject;
    if (!p) return;

    const hasVideo = !!p.video;
    const hasScreenshots = p.screenshots && p.screenshots.length > 0;

    // ---------- Watch-style media player ----------
    const videoPane = `
      <div class="watch-media watch-media-video${hasVideo ? '' : ' is-hidden'}" data-pane="video">
        ${hasVideo ? `
          <video controls preload="metadata" playsinline>
            <source src="${p.video}" type="video/mp4">
            Your browser does not support HTML5 video playback.
          </video>` : `
          <div class="video-placeholder">
            <div class="video-play-mock" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <div class="video-placeholder-text">
              <h4>Demo Video Demonstration</h4>
              <p>Demo walk-through will be uploaded soon for ${p.title}.</p>
            </div>
          </div>`}
      </div>`;

    let galleryPane = '';
    if (hasScreenshots) {
      const slides = p.screenshots.map((src, i) => `
        <div class="gallery-slide">
          <img src="${src}" alt="${p.title} screenshot ${i + 1}" loading="lazy">
        </div>`).join('');

      galleryPane = `
        <div class="watch-media watch-media-gallery gallery-viewport${hasVideo ? ' is-hidden' : ''}" data-pane="gallery">
          <div class="gallery-slider" id="modal-gallery-slider">
            ${slides}
          </div>
          <div class="watch-gallery-ui">
            <span class="gallery-counter" id="modal-gallery-counter">1 / ${p.screenshots.length}</span>
            <button class="gallery-nav-btn" id="modal-gallery-prev" aria-label="Previous screenshot">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button class="gallery-nav-btn" id="modal-gallery-next" aria-label="Next screenshot">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>`;
    }

    const showTabs = hasVideo && hasScreenshots;
    const tabsHtml = showTabs ? `
      <div class="watch-player-tabs" role="tablist" aria-label="Project media">
        <button class="watch-tab is-active" data-tab="video" role="tab" aria-selected="true">Demo video</button>
        <button class="watch-tab" data-tab="gallery" role="tab" aria-selected="false">Screenshots · ${p.screenshots.length}</button>
      </div>` : '';

    // ---------- Action links (YouTube-style pill actions) ----------
    let linksHtml = '';
    if (p.github) {
      linksHtml += `
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="watch-action-btn" aria-label="View source code on GitHub">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <span>Source Code</span>
        </a>`;
    } else if (p.sourceUrl) {
      linksHtml += `
        <a href="${p.sourceUrl}" target="_blank" rel="noopener noreferrer" class="watch-action-btn" aria-label="Visit source site ${p.sourceLabel || ''}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          <span>Source (${p.sourceLabel || 'Website'})</span>
        </a>`;
    }
    if (p.demo) {
      linksHtml += `
        <a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="watch-action-btn watch-action-primary" aria-label="Open live application demo">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          <span>Live Demo</span>
        </a>`;
    }

    // ---------- Tech badges / features / workflow ----------
    const techBadges = p.technologies.map(t => `<span class="tag-badge">${t}</span>`).join('');
    const featuresList = p.features.map(f => `<li>${f}</li>`).join('');
    const workflowHtml = window.renderWorkflowDiagram ? window.renderWorkflowDiagram(p.workflow) : '';

    // ---------- Up next rail ----------
    const upnextItem = (proj, label) => `
      <button class="upnext-item" data-open-project="${proj.id}" aria-label="Open ${proj.title}">
        <span class="upnext-thumb" aria-hidden="true">${proj.category.charAt(0)}</span>
        <span class="upnext-meta">
          <small>${label}</small>
          <strong>${proj.title}</strong>
          <span class="upnext-sub">${proj.category}</span>
        </span>
        <svg class="upnext-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>`;

    this.modalContainer.innerHTML = `
      <div class="watch-scroll">
        <div class="watch-topbar">
          <button class="watch-close-btn" id="modal-watch-close" aria-label="Close case study">✕</button>
        </div>
        <div class="watch-player">
          ${videoPane}
          ${galleryPane}
          ${tabsHtml}
        </div>
        <!-- Title block: title left, actions right -->
        <div class="watch-title-block">
          <div class="watch-title-group">
            <h2 class="watch-title">${p.title}</h2>
            <div class="watch-badges">
              <span class="tag-badge ${p.type === 'ai' ? 'tag-ai' : 'tag-web'}">${p.category}</span>
              ${p.isInternship ? `<span class="tag-badge tag-internship">INTERNSHIP PROJECT${p.organization ? ` · ${p.organization}` : ''}</span>` : ''}
            </div>
          </div>
          ${linksHtml ? `<div class="watch-actions">${linksHtml}</div>` : ''}
        </div>

        <!-- Description box -->
        <div class="watch-desc-box">
          <p class="watch-desc-text">${p.overview}</p>
          ${p.isInternship && p.organization ? `
            <div class="watch-org-box">
              <span class="watch-org-label">Affiliated Organization</span>
              <p class="watch-org-name">${p.organization} (${p.period || 'Verified Internship'})</p>
            </div>` : ''}
        </div>

        <!-- Minimal details -->
        <div class="watch-details">
          <div class="detail-row">
            <section class="detail-sec">
              <h4 class="detail-heading">The Problem</h4>
              <p class="detail-text">${p.problem}</p>
            </section>
            <section class="detail-sec">
              <h4 class="detail-heading">The Solution</h4>
              <p class="detail-text">${p.solution}</p>
            </section>
          </div>

          <section class="detail-sec">
            <h4 class="detail-heading">How It Works</h4>
            <p class="detail-text">${p.howItWorks}</p>
          </section>

          <div class="detail-row">
            <section class="detail-sec">
              <h4 class="detail-heading">Key Features</h4>
              <ul class="features-list features-compact">
                ${featuresList}
              </ul>
            </section>
            <section class="detail-sec">
              <h4 class="detail-heading">Tech Stack</h4>
              <div class="watch-tech-row">
                ${techBadges}
              </div>
              ${p.outcome ? `
                <p class="detail-outcome"><span>Outcome</span>${p.outcome}</p>` : ''}
            </section>
          </div>
        </div>

        <!-- Architecture / Workflow -->
        <div class="workflow-section">
          ${workflowHtml}
        </div>

        <!-- Up next -->
        <div class="watch-upnext">
          <h4 class="upnext-heading">Up next</h4>
          <div class="upnext-list">
            ${this.prevProject ? upnextItem(this.prevProject, 'Previous project') : ''}
            ${this.nextProject ? upnextItem(this.nextProject, 'Next project') : ''}
          </div>
        </div>
      </div>
    `;

    // Hook Close Button
    const closeBtn = document.getElementById('modal-watch-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    // Hook player tabs (Demo video / Screenshots)
    const tabs = this.modalContainer.querySelectorAll('.watch-tab');
    tabs.forEach(tab => tab.addEventListener('click', () => {
      tabs.forEach(t => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      const target = tab.dataset.tab;
      this.modalContainer.querySelectorAll('.watch-media').forEach(m => {
        m.classList.toggle('is-hidden', m.dataset.pane !== target);
      });
      // Pause the demo video when switching away from it
      if (target !== 'video') {
        const video = this.modalContainer.querySelector('.watch-media-video video');
        if (video) video.pause();
      }
    }));

    // Hook Up-next items
    this.modalContainer.querySelectorAll('[data-open-project]').forEach(btn => {
      btn.addEventListener('click', () => this.open(btn.dataset.openProject));
    });

    // Hook Gallery controls if screenshots exist
    if (hasScreenshots) {
      const prevBtn = document.getElementById('modal-gallery-prev');
      const nextBtn = document.getElementById('modal-gallery-next');
      if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
      if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
      this.updateGalleryView();
      this.initGallerySwipe();
    }
  }

  /**
   * Touch swipe support for the screenshot gallery (mobile).
   */
  initGallerySwipe() {
    const viewport = this.modalContainer.querySelector('.gallery-viewport');
    if (!viewport) return;
    let startX = null;
    viewport.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    viewport.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) < 40) return;
      if (dx < 0) this.nextSlide(); else this.prevSlide();
    }, { passive: true });
  }

  prevSlide() {
    if (!this.currentProject || !this.currentProject.screenshots || this.currentProject.screenshots.length <= 1) return;
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.currentProject.screenshots.length) % this.currentProject.screenshots.length;
    this.updateGalleryView();
  }

  nextSlide() {
    if (!this.currentProject || !this.currentProject.screenshots || this.currentProject.screenshots.length <= 1) return;
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.currentProject.screenshots.length;
    this.updateGalleryView();
  }

  updateGalleryView() {
    const slider = document.getElementById('modal-gallery-slider');
    const counter = document.getElementById('modal-gallery-counter');
    if (!slider || !counter) return;

    slider.style.transform = `translateX(-${this.currentSlideIndex * 100}%)`;
    counter.textContent = `${this.currentSlideIndex + 1} / ${this.currentProject.screenshots.length}`;
  }
}

window.CaseStudyViewer = CaseStudyViewer;
