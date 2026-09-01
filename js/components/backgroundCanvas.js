/**
 * DUAL-THEME AMBIENT CONSTELLATION & PARTICLE NETWORK CANVAS
 * Authoritative, high-performance background animation for Keshava Pandi's portfolio.
 * Active, visibly moving nodes and dynamic connecting lines in BOTH Dark and Light modes.
 *
 * - Dark Mode: Deep cyber cyan & indigo glowing constellation network.
 * - Light Mode: Crisp technical slate-blue & indigo network with soft ambient aurora glow.
 *
 * Handles High-DPI (Retina), dynamic resizing, visibility throttling, and prefers-reduced-motion.
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
      this.colorType = Math.random() > 0.4 ? 1 : 2; // 1 = Cyan/Sky, 2 = Indigo/Violet
      this.pulseSpeed = 0.02 + Math.random() * 0.02;
      this.pulseAngle = Math.random() * Math.PI * 2;
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : (Math.random() > 0.5 ? -10 : height + 10);
      
      // Steady, elegant floating velocity
      const speed = 0.25 + Math.random() * 0.35;
      const angle = Math.random() * Math.PI * 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      this.baseRadius = 1.4 + Math.random() * 1.5;
      this.radius = this.baseRadius;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Subtle breathing radius
      this.pulseAngle += this.pulseSpeed;
      this.radius = this.baseRadius + Math.sin(this.pulseAngle) * 0.3;

      // Wrap around edges smoothly
      const margin = 20;
      if (this.x < -margin) this.x = width + margin;
      if (this.x > width + margin) this.x = -margin;
      if (this.y < -margin) this.y = height + margin;
      if (this.y > height + margin) this.y = -margin;
    }

    draw() {
      const light = isLightMode();
      let fillColor, glowColor;

      if (light) {
        // Light Mode: clearly visible rich sky-blue and indigo nodes
        if (this.colorType === 1) {
          fillColor = 'rgba(2, 132, 199, 0.85)'; // Sky Blue
          glowColor = 'rgba(2, 132, 199, 0.25)';
        } else {
          fillColor = 'rgba(79, 70, 229, 0.80)'; // Indigo
          glowColor = 'rgba(79, 70, 229, 0.20)';
        }
      } else {
        // Dark Mode: glowing cyber cyan and radiant indigo nodes
        if (this.colorType === 1) {
          fillColor = 'rgba(0, 240, 255, 0.90)'; // Cyber Cyan
          glowColor = 'rgba(0, 240, 255, 0.35)';
        } else {
          fillColor = 'rgba(129, 140, 248, 0.85)'; // Luminous Indigo
          glowColor = 'rgba(99, 102, 241, 0.30)';
        }
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = fillColor;
      ctx.fill();

      // Subtle halo around larger nodes
      if (this.baseRadius > 2.0) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = glowColor;
        ctx.fill();
      }
    }
  }

  function initParticles() {
    // Density calculation: guaranteed visibility across all viewports
    const baseCount = Math.floor((width * height) / 15000);
    const particleCount = Math.max(28, Math.min(baseCount, 65));

    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Soft Ambient Aurora for Light Mode
  let auroraAngle = 0;
  function drawLightAuroraBackground() {
    auroraAngle += 0.002;
    const cx1 = width * 0.25 + Math.sin(auroraAngle) * 60;
    const cy1 = height * 0.30 + Math.cos(auroraAngle * 0.8) * 50;
    const r1 = Math.max(width, height) * 0.45;

    const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, r1);
    g1.addColorStop(0, 'rgba(2, 132, 199, 0.06)');
    g1.addColorStop(0.7, 'rgba(56, 189, 248, 0.02)');
    g1.addColorStop(1, 'rgba(248, 250, 252, 0)');

    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, width, height);

    const cx2 = width * 0.80 + Math.cos(auroraAngle * 0.7) * 70;
    const cy2 = height * 0.75 + Math.sin(auroraAngle * 0.9) * 60;
    const r2 = Math.max(width, height) * 0.40;

    const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, r2);
    g2.addColorStop(0, 'rgba(99, 102, 241, 0.05)');
    g2.addColorStop(0.7, 'rgba(129, 140, 248, 0.015)');
    g2.addColorStop(1, 'rgba(248, 250, 252, 0)');

    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, width, height);
  }

  function connectParticles() {
    const maxDist = width < 768 ? 105 : 135;
    const maxDistSq = maxDist * maxDist;
    const light = isLightMode();

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const factor = 1 - distSq / maxDistSq;

          let strokeColor, lineWidth;
          if (light) {
            // Light Mode: clean slate/sky connecting lines with solid visibility
            const alpha = factor * 0.32;
            strokeColor = `rgba(3, 105, 161, ${alpha})`;
            lineWidth = 0.95;
          } else {
            // Dark Mode: glowing cyan/sky connecting lines
            const alpha = factor * 0.35;
            strokeColor = `rgba(56, 189, 248, ${alpha})`;
            lineWidth = 0.85;
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

    if (isLightMode()) {
      drawLightAuroraBackground();
    }

    for (let p of particles) {
      if (!prefersReducedMotion) p.update();
      p.draw();
    }

    connectParticles();

    animationFrameId = requestAnimationFrame(animate);
  }

  // Handle resize and screen changes
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
