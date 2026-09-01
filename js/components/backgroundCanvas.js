/**
 * AMBIENT BACKGROUND PARTICLE & CONSTELLATION MESH CANVAS
 * High-performance, lightweight ambient node background.
 * Theme-aware: clearly visible yet non-distracting in both Dark and Light modes.
 */

function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let animationFrameId = null;

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
      this.colorType = Math.random() > 0.35 ? 1 : 2; // 1 = Cyan/Sky, 2 = Indigo/Purple
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 1.2 + 1.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }

    draw() {
      const light = isLightMode();
      let color;
      
      if (light) {
        // Light Mode: clearly visible cool slate-blue/cyan tones
        color = this.colorType === 1 
          ? 'rgba(2, 132, 199, 0.65)' 
          : 'rgba(79, 70, 229, 0.55)';
      } else {
        // Dark Mode: refined cyber cyan & indigo constellation nodes
        color = this.colorType === 1 
          ? 'rgba(0, 240, 255, 0.70)' 
          : 'rgba(129, 140, 248, 0.60)';
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  const particleCount = Math.min(Math.floor((width * height) / 16000), 55);
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connect() {
    const maxDist = 125;
    const maxDistSq = maxDist * maxDist;
    const light = isLightMode();

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const factor = (1 - distSq / maxDistSq);
          
          let strokeColor;
          if (light) {
            // Light mode connecting lines
            const alpha = factor * 0.24;
            strokeColor = `rgba(3, 105, 161, ${alpha})`;
          } else {
            // Dark mode connecting lines
            const alpha = factor * 0.28;
            strokeColor = `rgba(56, 189, 248, ${alpha})`;
          }

          ctx.beginPath();
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = light ? 0.95 : 0.85;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connect();
    animationFrameId = requestAnimationFrame(animate);
  }

  // Handle document visibility to preserve battery/CPU
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
