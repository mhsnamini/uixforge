(function() {
  'use strict';

  // =============================================
  // PARALLAX ORBS (Follow Mouse)
  // =============================================
  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', e => {
    const x = (e.clientX - innerWidth / 2) / innerWidth;
    const y = (e.clientY - innerHeight / 2) / innerHeight;
    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 16;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // =============================================
  // PARTICLE SYSTEM (120 particles, 5 colors)
  // =============================================
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let pMouse = { x: -1000, y: -1000 };

  document.addEventListener('mousemove', e => {
    pMouse.x = e.clientX;
    pMouse.y = e.clientY;
  });

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.6 + 0.15;
      this.life = 1;
      this.decay = Math.random() * 0.0015 + 0.0004;
      const colors = ['108,92,231', '0,206,201', '168,85,247', '253,203,110', '16,185,129'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.twinkleSpeed = Math.random() * 0.03 + 0.01;
      this.twinkleOffset = Math.random() * Math.PI * 2;
    }
    update() {
      // Mouse interaction
      const dx = pMouse.x - this.x;
      const dy = pMouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const force = (200 - dist) / 200;
        this.speedX -= (dx / dist) * force * 0.6;
        this.speedY -= (dy / dist) * force * 0.6;
      }
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedX *= 0.992;
      this.speedY *= 0.992;
      this.life -= this.decay;
      // Reset if dead or off-screen
      if (this.life <= 0 || this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
        this.reset();
      }
    }
    draw(ctx) {
      const twinkle = Math.sin(Date.now() * this.twinkleSpeed + this.twinkleOffset) * 0.3 + 0.7;
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2.5);
      gradient.addColorStop(0, `rgba(${this.color},${this.opacity * this.life * twinkle})`);
      gradient.addColorStop(0.5, `rgba(${this.color},${this.opacity * this.life * twinkle * 0.5})`);
      gradient.addColorStop(1, `rgba(${this.color},0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  // Create particles
  for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
  }

  // Animation loop
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw(ctx);
    });
    
    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const opacity = (1 - dist / 160) * 0.08 * particles[i].life * particles[j].life;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108,92,231,${opacity})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // =============================================
  // BODY SPIN EVERY 5 SECONDS
  // =============================================
  const body = document.body;
  setInterval(() => {
    body.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    body.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      body.style.transition = 'none';
      body.style.transform = 'rotate(0deg)';
    }, 800);
  }, 5000);

  // =============================================
  // FLOATING SHAPES PARALLAX (Subtle)
  // =============================================
  const shapes = document.querySelectorAll('.shape');
  document.addEventListener('mousemove', e => {
    const x = (e.clientX - innerWidth / 2) / innerWidth;
    const y = (e.clientY - innerHeight / 2) / innerHeight;
    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 4;
      shape.style.marginLeft = `${x * speed}px`;
      shape.style.marginTop = `${y * speed}px`;
    });
  });

  console.log('🔷 UIXForge — AUTH-012 Animated Background Ready');
  console.log('📦 Part of 200+ Production-Ready Components');
  console.log('🌊 8 Layers: Waves(4) + Shapes(7) + Particles(120) + Orbs(4) + Grid + Orbit(3) + Glow(4)');
  console.log('🔄 Body spins 360° every 5 seconds');
})();