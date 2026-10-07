/**
 * UNIFIED CONSTELLATION & PARTICLE NETWORK BACKGROUND CANVAS
 * Single, authoritative technical network animation used in both Dark Mode and Light Mode.
 *
 * - Dark Mode: Subtle cyan/indigo glowing constellation network.
 * - Light Mode: EXACT SAME constellation network, rendered with tailored contrast so it is clearly visible and gently moving against the light background.
 *
 * High-performance, zero dependencies, High-DPI (Retina) support, battery-friendly.
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
      this.colorType = Math.random() > 0.4 ? 1 : 2; // 1 = Cyan/Sky Blue, 2 = Indigo
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : (Math.random() > 0.5 ? -10 : height + 10);

      // Steady, elegant floating velocity
      const speed = 0.22 + Math.random() * 0.28;
      const angle = Math.random() * Math.PI * 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      this.radius = 1.4 + Math.random() * 1.3;
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
        // Light Mode: Same constellation structure with clean visible contrast
        fillColor = this.colorType === 1
          ? 'rgba(2, 132, 199, 0.70)'   // Sky Blue
          : 'rgba(79, 70, 229, 0.65)';  // Indigo
      } else {
        // Dark Mode: Subtle glowing cyan & indigo
        fillColor = this.colorType === 1
          ? 'rgba(0, 240, 255, 0.75)'   // Cyber Cyan
          : 'rgba(129, 140, 248, 0.65)'; // Luminous Indigo
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
  }

  function initParticles() {
    // Balanced density: guaranteed clean coverage across all viewports
    const baseCount = Math.floor((width * height) / 18000);
    const particleCount = Math.max(26, Math.min(baseCount, 50));

    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const maxDist = width < 768 ? 105 : 130;
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
          const lineWidth = 0.85;

          if (light) {
            // Light Mode: clearly visible yet subtle connecting lines
            const alpha = factor * 0.28;
            strokeColor = `rgba(3, 105, 161, ${alpha})`;
          } else {
            // Dark Mode: subtle cyber connecting lines
            const alpha = factor * 0.28;
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
