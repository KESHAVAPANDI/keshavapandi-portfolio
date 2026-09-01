/**
 * MAIN JAVASCRIPT APPLICATION CONTROLLER
 * Portfolio of Keshava Pandi A S
 * Handles Theme Management (Dark/Light), Navigation & Scroll Spy,
 * Modal Viewers, Skills Filter, and Animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme Engine (Dark/Light)
  initThemeEngine();

  // 2. Initialize Ambient Canvas
  if (window.initBackgroundCanvas) {
    window.initBackgroundCanvas();
  }

  // 3. Initialize Modals & Viewers
  const caseStudyViewer = new window.CaseStudyViewer();
  const mediaLightboxViewer = new window.MediaLightboxViewer();

  // 4. Render Dynamic Content from Data Stores
  if (window.renderProjectCards) {
    window.renderProjectCards(caseStudyViewer);
  }

  if (window.renderCertificates) {
    window.renderCertificates(mediaLightboxViewer);
  }

  if (window.renderAchievements) {
    window.renderAchievements(mediaLightboxViewer);
  }

  // 5. Render Skills Section
  initSkillsSection();

  // 6. Initialize Contact Form
  if (window.initContactForm) {
    window.initContactForm();
  }

  // 7. Navigation & Scroll Spy
  initNavigation();

  // 8. Typewriter Hero Animation
  initTypewriter();

  // 9. Scroll Reveal Observer
  initScrollReveal();
});

/* ==========================================================================
   THEME ENGINE (DARK / LIGHT MODE & LOCALSTORAGE PERSISTENCE)
   ========================================================================== */
function initThemeEngine() {
  const THEME_KEY = 'portfolio-theme';
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');

  // Sun & Moon SVG Icons
  const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    themeToggleBtns.forEach(btn => {
      btn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
      btn.setAttribute('title', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
    });
  }

  // Initial theme application
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // Toggle button clicks
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  });

  // Listen to OS theme changes if user hasn't explicitly set preference
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });
}

/* ==========================================================================
   NAVIGATION & SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header scroll shadow effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Drawer Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('is-open');
      mobileToggle.classList.toggle('is-active', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll Spy Active Link Indicator
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   TYPEWRITER HERO ANIMATION
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('hero-typewriter');
  if (!target) return;

  const roles = [
    "AI & Machine Learning Developer",
    "Computer Vision Specialist",
    "Model Deployment Engineer",
    "Full-Stack Software Engineer"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const current = roles[roleIdx];

    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 45;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      typingSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   SKILLS SECTION RENDERER & TAB FILTER
   ========================================================================== */
function initSkillsSection() {
  const container = document.getElementById('skills-categories-container');
  const tabsContainer = document.getElementById('skills-tabs');
  if (!container || !skillsData) return;

  // Render Category Tabs
  if (tabsContainer) {
    tabsContainer.innerHTML = `
      <button class="skill-tab-btn is-active" data-filter="all">All Domains</button>
      ${skillsData.map((cat, i) => `
        <button class="skill-tab-btn" data-filter="cat-${i}">${cat.category}</button>
      `).join('')}
    `;

    tabsContainer.querySelectorAll('.skill-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tabsContainer.querySelectorAll('.skill-tab-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filter = btn.getAttribute('data-filter');
        const cards = container.querySelectorAll('.skill-category-card');

        cards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category-id') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Render Skill Category Cards
  container.innerHTML = skillsData.map((cat, i) => {
    const chipsHtml = cat.items.map(item => `
      <span class="skill-chip">
        <span class="skill-chip-dot"></span>
        ${item.name}
      </span>
    `).join('');

    return `
      <div class="skill-category-card" data-category-id="cat-${i}">
        <div class="skill-category-header">
          <div class="category-icon" aria-hidden="true">
            ${cat.icon}
          </div>
          <h3 class="skill-category-title">${cat.category}</h3>
        </div>
        <div class="skill-chips-cloud">
          ${chipsHtml}
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}
