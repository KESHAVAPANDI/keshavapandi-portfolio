/**
 * DUAL-THEME AMBIENT BACKGROUND CANVAS
 * - Dark Mode: Technical Cyber Constellation & Particle Mesh Network
 * - Light Mode: Soft Technical Aurora, Fluid Gradient Orbs & Subtle Flowing Mesh
 * High-performance, zero dependencies, battery-conscious.
 */

function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationFrameId = null;

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  function isLightMode() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  // ==========================================
  // 1. DARK MODE: CONSTELLATION NETWORK
  // ==========================================
  class DarkParticle {
    constructor() {
      this.reset();
      this.colorType = Math.random() > 0.35 ? 1 : 2;
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
      const color = this.colorType === 1 
        ? 'rgba(0, 240, 255, 0.70)' 
        : 'rgba(129, 140, 248, 0.60)';

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  const darkParticleCount = Math.min(Math.floor((width * height) / 16000), 55);
  const darkParticles = [];
  for (let i = 0; i < darkParticleCount; i++) {
    darkParticles.push(new DarkParticle());
  }

  function renderDarkMode() {
    for (let p of darkParticles) {
      if (!prefersReducedMotion) p.update();
      p.draw();
    }

    const maxDist = 125;
    const maxDistSq = maxDist * maxDist;

    for (let i = 0; i < darkParticles.length; i++) {
      for (let j = i + 1; j < darkParticles.length; j++) {
        const dx = darkParticles[i].x - darkParticles[j].x;
        const dy = darkParticles[i].y - darkParticles[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const factor = (1 - distSq / maxDistSq);
          const alpha = factor * 0.28;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.moveTo(darkParticles[i].x, darkParticles[i].y);
          ctx.lineTo(darkParticles[j].x, darkParticles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // ==========================================
  // 2. LIGHT MODE: SOFT TECHNICAL AURORA & FLUID ORBS
  // ==========================================
  class LightAuroraOrb {
    constructor(xRatio, yRatio, radiusRatio, colorStart, colorEnd, speedX, speedY) {
      this.xRatio = xRatio;
      this.yRatio = yRatio;
      this.radiusRatio = radiusRatio;
      this.colorStart = colorStart;
      this.colorEnd = colorEnd;
      this.speedX = speedX;
      this.speedY = speedY;
      this.angle = Math.random() * Math.PI * 2;
    }

    update(time) {
      this.angle += 0.003;
      this.currentX = (this.xRatio + Math.sin(this.angle * this.speedX) * 0.08) * width;
      this.currentY = (this.yRatio + Math.cos(this.angle * this.speedY) * 0.08) * height;
      this.currentRadius = (this.radiusRatio + Math.sin(this.angle * 0.8) * 0.04) * Math.min(width, height);
    }

    draw() {
      const gradient = ctx.createRadialGradient(
        this.currentX, this.currentY, 0,
        this.currentX, this.currentY, Math.max(this.currentRadius, 80)
      );
      gradient.addColorStop(0, this.colorStart);
      gradient.addColorStop(0.6, this.colorEnd);
      gradient.addColorStop(1, 'rgba(248, 250, 252, 0)');

      ctx.beginPath();
      ctx.arc(this.currentX, this.currentY, Math.max(this.currentRadius, 80), 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  const lightOrbs = [
    new LightAuroraOrb(0.20, 0.25, 0.42, 'rgba(2, 132, 199, 0.075)', 'rgba(56, 189, 248, 0.035)', 0.7, 0.9),
    new LightAuroraOrb(0.82, 0.35, 0.46, 'rgba(99, 102, 241, 0.065)', 'rgba(129, 140, 248, 0.025)', 0.6, 0.8),
    new LightAuroraOrb(0.45, 0.78, 0.44, 'rgba(6, 182, 212, 0.065)', 'rgba(14, 165, 233, 0.025)', 0.8, 0.6),
    new LightAuroraOrb(0.85, 0.85, 0.38, 'rgba(168, 85, 247, 0.045)', 'rgba(99, 102, 241, 0.015)', 0.5, 0.7)
  ];

  // Subtle delicate flowing grid lines for Light Mode
  let waveTime = 0;
  function renderLightFlowLines() {
    ctx.lineWidth = 0.65;
    ctx.strokeStyle = 'rgba(2, 132, 199, 0.045)';

    const step = 85;
    const cols = Math.ceil(width / step);

    for (let c = 0; c < cols; c++) {
      const x = c * step;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      for (let y = 0; y < height; y += 40) {
        const xOffset = Math.sin((y * 0.005) + waveTime + (c * 0.2)) * 8;
        ctx.lineTo(x + xOffset, y);
      }
      ctx.stroke();
    }
  }

  function renderLightMode(time) {
    // 1. Draw subtle floating aurora gradient orbs
    for (let orb of lightOrbs) {
      if (!prefersReducedMotion) orb.update(time);
      orb.draw();
    }

    // 2. Draw subtle delicate flowing background mesh lines
    if (!prefersReducedMotion) waveTime += 0.004;
    renderLightFlowLines();
  }

  // ==========================================
  // 3. MAIN ANIMATION LOOP
  // ==========================================
  function animate(timestamp) {
    ctx.clearRect(0, 0, width, height);

    if (isLightMode()) {
      renderLightMode(timestamp);
    } else {
      renderDarkMode();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Handle document visibility to preserve CPU/battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else {
      animate(performance.now());
    }
  });

  animate(performance.now());
}

window.initBackgroundCanvas = initBackgroundCanvas;
