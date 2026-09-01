/**
 * MAIN JAVASCRIPT APPLICATION CONTROLLER
 * Portfolio of Keshava Pandi A S
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Ambient Canvas
  if (window.initBackgroundCanvas) {
    window.initBackgroundCanvas();
  }

  // 2. Initialize Modals & Viewers
  const caseStudyViewer = new window.CaseStudyViewer();
  const mediaLightboxViewer = new window.MediaLightboxViewer();

  // 3. Render Dynamic Content from Data Stores
  if (window.renderProjectCards) {
    window.renderProjectCards(caseStudyViewer);
  }

  if (window.renderCertificates) {
    window.renderCertificates(mediaLightboxViewer);
  }

  if (window.renderAchievements) {
    window.renderAchievements(mediaLightboxViewer);
  }

  // 4. Render Skills Section
  initSkillsSection();

  // 5. Initialize Contact Form
  if (window.initContactForm) {
    window.initContactForm();
  }

  // 6. Navigation & Scroll Spy
  initNavigation();

  // 7. Typewriter Hero Animation
  initTypewriter();

  // 8. Scroll Reveal Observer
  initScrollReveal();
});

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
    if (window.scrollY > 40) {
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
    rootMargin: '-20% 0px -70% 0px',
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
  let typingSpeed = 100;

  function type() {
    const current = roles[roleIdx];

    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 100;
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
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}
