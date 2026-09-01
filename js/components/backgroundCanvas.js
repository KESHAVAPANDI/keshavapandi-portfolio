/**
 * AMBIENT BACKGROUND PARTICLE & MESH CANVAS
 * High-performance, lightweight ambient node background.
 * Theme-aware: dynamically adapts particle hues for Dark & Light modes.
 */

function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  function isLightMode() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.radius = Math.random() * 1.5 + 0.6;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }

    draw() {
      const light = isLightMode();
      const color = light 
        ? 'rgba(2, 132, 199, 0.35)' 
        : 'rgba(56, 189, 248, 0.4)';

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  const count = Math.min(Math.floor((width * height) / 20000), 45);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function connect() {
    const maxDist = 100;
    const maxDistSq = maxDist * maxDist;
    const light = isLightMode();

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const factor = (1 - distSq / maxDistSq);
          const opacity = light ? factor * 0.12 : factor * 0.18;
          const strokeColor = light ? `rgba(2, 132, 199, ${opacity})` : `rgba(56, 189, 248, ${opacity})`;

          ctx.beginPath();
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 0.75;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    connect();
    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}

window.initBackgroundCanvas = initBackgroundCanvas;
