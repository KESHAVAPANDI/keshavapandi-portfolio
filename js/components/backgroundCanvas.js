/**
 * UNIFIED CONSTELLATION & PARTICLE NETWORK BACKGROUND CANVAS
 * Single, elegant technical network animation used in both Dark Mode and Light Mode.
 *
 * - Dark Mode: Subtle cyan/indigo glowing constellation network.
 * - Light Mode: Same constellation network rendered with lower opacity/intensity for a clean, faint aesthetic.
 *
 * Lightweight, high-performance, battery-friendly, High-DPI support, zero dependencies.
 */

function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;
  let particles = [];
  let animationFrameId = null;

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    initParticles();
  }

  function isLightMode() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  class Particle {
    constructor() {
      this.reset(true);
      this.colorType = Math.random() > 0.4 ? 1 : 2; // 1 = Cyan/Sky, 2 = Indigo
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : (Math.random() > 0.5 ? -10 : height + 10);

      // Slow, subtle, graceful drifting velocity
      const speed = 0.18 + Math.random() * 0.22;
      const angle = Math.random() * Math.PI * 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      this.radius = 1.2 + Math.random() * 1.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Smooth wrap-around edges
      const margin = 15;
      if (this.x < -margin) this.x = width + margin;
      if (this.x > width + margin) this.x = -margin;
      if (this.y < -margin) this.y = height + margin;
      if (this.y > height + margin) this.y = -margin;
    }

    draw() {
      const light = isLightMode();
      let fillColor;

      if (light) {
        // Light Mode: Same constellation, transparent & faint
        fillColor = this.colorType === 1
          ? 'rgba(2, 132, 199, 0.40)'   // Faint Sky Blue
          : 'rgba(99, 102, 241, 0.35)';  // Faint Indigo
      } else {
        // Dark Mode: Subtle technical glowing cyan & indigo
        fillColor = this.colorType === 1
          ? 'rgba(0, 240, 255, 0.70)'   // Cyber Cyan
          : 'rgba(129, 140, 248, 0.60)'; // Luminous Indigo
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
  }

  function initParticles() {
    // Elegant density: not crowded, not empty
    const baseCount = Math.floor((width * height) / 20000);
    const particleCount = Math.max(22, Math.min(baseCount, 45));

    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const maxDist = width < 768 ? 100 : 125;
    const maxDistSq = maxDist * maxDist;
    const light = isLightMode();

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const factor = 1 - distSq / maxDistSq;

          let strokeColor;
          let lineWidth = 0.75;

          if (light) {
            // Light Mode: faint transparent connecting lines
            const alpha = factor * 0.16;
            strokeColor = `rgba(3, 105, 161, ${alpha})`;
          } else {
            // Dark Mode: subtle cyber connecting lines
            const alpha = factor * 0.24;
            strokeColor = `rgba(56, 189, 248, ${alpha})`;
          }

          ctx.beginPath();
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = lineWidth;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      if (!prefersReducedMotion) p.update();
      p.draw();
    }

    connectParticles();

    animationFrameId = requestAnimationFrame(animate);
  }

  // Handle window resizing
  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Battery & Tab-visibility preservation
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  });

  animate();
}

window.initBackgroundCanvas = initBackgroundCanvas;
