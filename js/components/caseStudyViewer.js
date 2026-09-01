/**
 * INTERACTIVE CASE STUDY VIEWER (CENTERPIECE COMPONENT)
 * Handles animated modal display, user-controlled video playback,
 * responsive screenshot carousel, and architecture diagrams.
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

    // Keyboard ESC key and Left/Right Arrow listeners
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
    this.renderContent();

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    this.modalBackdrop.classList.add('is-open');
    this.modalBackdrop.setAttribute('aria-hidden', 'false');

    // Focus close button for accessibility
    setTimeout(() => {
      const closeBtn = this.modalContainer.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.focus();
    }, 100);
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

    // Video Area HTML
    let videoHtml = '';
    if (p.video) {
      videoHtml = `
        <div class="video-frame-container">
          <video controls preload="metadata" playsinline>
            <source src="${p.video}" type="video/mp4">
            Your browser does not support HTML5 video playback.
          </video>
        </div>
      `;
    } else {
      videoHtml = `
        <div class="video-frame-container">
          <div class="video-placeholder">
            <div class="video-play-mock" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <div class="video-placeholder-text">
              <h4>Demo Video Demonstration</h4>
              <p>Demo walk-through will be uploaded soon for ${p.title}.</p>
            </div>
          </div>
        </div>
      `;
    }

    // Screenshots Gallery HTML
    let galleryHtml = '';
    const hasScreenshots = p.screenshots && p.screenshots.length > 0;
    if (hasScreenshots) {
      const slides = p.screenshots.map(src => `
        <div class="gallery-slide">
          <img src="${src}" alt="${p.title} screenshot" loading="lazy">
        </div>
      `).join('');

      galleryHtml = `
        <div class="modal-gallery-section">
          <div class="gallery-header-row">
            <h4 class="gallery-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              Project Screenshots
            </h4>
            <div class="gallery-controls">
              <span class="gallery-counter" id="modal-gallery-counter">1 / ${p.screenshots.length}</span>
              <button class="gallery-nav-btn" id="modal-gallery-prev" aria-label="Previous screenshot">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button class="gallery-nav-btn" id="modal-gallery-next" aria-label="Next screenshot">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
          <div class="gallery-viewport">
            <div class="gallery-slider" id="modal-gallery-slider">
              ${slides}
            </div>
          </div>
        </div>
      `;
    } else {
      galleryHtml = `
        <div class="modal-gallery-section">
          <div class="gallery-header-row">
            <h4 class="gallery-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              Project Screenshots
            </h4>
          </div>
          <div class="gallery-viewport">
            <div class="gallery-placeholder">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <p>Screenshots gallery ready for future asset uploads.</p>
            </div>
          </div>
        </div>
      `;
    }

    // Tech Badges HTML
    const techBadges = p.technologies.map(t => `<span class="tag-badge">${t}</span>`).join('');

    // Features List HTML
    const featuresList = p.features.map(f => `<li>${f}</li>`).join('');

    // Architecture Workflow HTML
    const workflowHtml = window.renderWorkflowDiagram ? window.renderWorkflowDiagram(p.workflow) : '';

    // Links HTML
    let linksHtml = '';
    if (p.github) {
      linksHtml += `
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          Source Code
        </a>
      `;
    }
    if (p.demo) {
      linksHtml += `
        <a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          Live Demo
        </a>
      `;
    }

    this.modalContainer.innerHTML = `
      <div class="modal-header">
        <div class="modal-title-group">
          <div class="modal-category-row">
            <span class="tag-badge ${p.type === 'ai' ? 'tag-ai' : 'tag-web'}">${p.category}</span>
          </div>
          <h2 class="modal-title">${p.title}</h2>
        </div>
        <div class="modal-actions">
          ${linksHtml}
          <button class="modal-close-btn" id="modal-header-close" aria-label="Close modal">✕</button>
        </div>
      </div>
      <div class="modal-body">
        <!-- 1. Video Section -->
        <div class="modal-video-section">
          ${videoHtml}
        </div>

        <!-- 2. Screenshots Gallery -->
        ${galleryHtml}

        <!-- 3. Overview & Problem/Solution -->
        <div class="case-study-details-grid">
          <div class="case-study-card full-width">
            <h4 class="case-study-card-title">
              <span class="dot"></span> Project Overview
            </h4>
            <p class="case-study-card-content">${p.overview}</p>
          </div>

          <div class="case-study-card">
            <h4 class="case-study-card-title">
              <span class="dot"></span> The Problem
            </h4>
            <p class="case-study-card-content">${p.problem}</p>
          </div>

          <div class="case-study-card">
            <h4 class="case-study-card-title">
              <span class="dot"></span> The Solution
            </h4>
            <p class="case-study-card-content">${p.solution}</p>
          </div>

          <div class="case-study-card full-width">
            <h4 class="case-study-card-title">
              <span class="dot"></span> How It Works
            </h4>
            <p class="case-study-card-content">${p.howItWorks}</p>
          </div>
        </div>

        <!-- 4. Architecture / Workflow -->
        <div class="workflow-section">
          ${workflowHtml}
        </div>

        <!-- 5. Key Features & Technologies -->
        <div class="case-study-details-grid">
          <div class="case-study-card">
            <h4 class="case-study-card-title">
              <span class="dot"></span> Key Features
            </h4>
            <ul class="features-list">
              ${featuresList}
            </ul>
          </div>

          <div class="case-study-card">
            <h4 class="case-study-card-title">
              <span class="dot"></span> Technology Stack
            </h4>
            <div class="card-tech-stack" style="margin-top: 0.5rem;">
              ${techBadges}
            </div>

            ${p.outcome ? `
              <h4 class="case-study-card-title" style="margin-top: 1.5rem;">
                <span class="dot"></span> Verified Outcome
              </h4>
              <p class="case-study-card-content">${p.outcome}</p>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    // Hook Close Button
    const closeBtn = document.getElementById('modal-header-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    // Hook Gallery controls if screenshots exist
    if (hasScreenshots) {
      const prevBtn = document.getElementById('modal-gallery-prev');
      const nextBtn = document.getElementById('modal-gallery-next');
      if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
      if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
      this.updateGalleryView();
    }
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
