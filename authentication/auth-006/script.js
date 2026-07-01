(function() {
  'use strict';

  // =============================================
  // CUSTOM CURSOR
  // =============================================
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mouseX = -1000, mouseY = -1000, curX = -1000, curY = -1000, velX = 0, velY = 0;
  document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
  (function updateCursor() {
    const dx = mouseX - curX, dy = mouseY - curY;
    velX += dx * 0.14; velY += dy * 0.14; velX *= 0.72; velY *= 0.72;
    curX += velX; curY += velY;
    if (cursor && cursorDot) {
      cursor.style.left = curX + 'px'; cursor.style.top = curY + 'px';
      cursorDot.style.left = curX + 'px'; cursorDot.style.top = curY + 'px';
    }
    requestAnimationFrame(updateCursor);
  })();
  document.addEventListener('mousedown', () => { cursor.classList.add('click'); setTimeout(() => cursor.classList.remove('click'), 350); });
  document.querySelectorAll('button, a, .signin-link').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // =============================================
  // PARALLAX ORBS
  // =============================================
  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    orbs.forEach((o, i) => { const s = (i + 1) * 14; o.style.transform = `translate(${x * s}px, ${y * s}px)`; });
  });

  // =============================================
  // 3D CARD TILT
  // =============================================
  const card = document.getElementById('socialCard');
  const glare = document.getElementById('cardGlare');
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    card.style.transform = `perspective(1200px) rotateX(${(y - r.height/2) / (r.height/2) * -5}deg) rotateY(${(x - r.width/2) / (r.width/2) * 5}deg) scale(1.01)`;
    glare.style.opacity = '0.5';
    glare.style.background = `radial-gradient(circle at ${(x/r.width)*100}% ${(y/r.height)*100}%, rgba(255,255,255,0.1) 0%, transparent 60%)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'; glare.style.opacity = '0'; });

  // =============================================
  // PARTICLE SYSTEM
  // =============================================
  const canvas = document.getElementById('particleCanvas'), ctx = canvas.getContext('2d');
  let particles = [], pMouse = { x: -1000, y: -1000 };
  document.addEventListener('mousemove', e => { pMouse.x = e.clientX; pMouse.y = e.clientY; });
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize); resize();
  class Particle {
    constructor() { this.reset(); }
    reset() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 2.2 + 0.5; this.speedX = (Math.random() - 0.5) * 0.35; this.speedY = (Math.random() - 0.5) * 0.35; this.opacity = Math.random() * 0.45 + 0.08; this.life = 1; this.decay = Math.random() * 0.0022 + 0.0008; }
    update() { const dx = pMouse.x - this.x, dy = pMouse.y - this.y, dist = Math.sqrt(dx*dx+dy*dy); if (dist < 150) { const f = (150-dist)/150; this.speedX -= (dx/dist)*f*0.45; this.speedY -= (dy/dist)*f*0.45; } this.x += this.speedX; this.y += this.speedY; this.speedX *= 0.985; this.speedY *= 0.985; this.life -= this.decay; if (this.life <= 0 || this.x < -50 || this.x > canvas.width+50 || this.y < -50 || this.y > canvas.height+50) this.reset(); }
    draw(ctx) { const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size*2); g.addColorStop(0, `rgba(108,92,231,${this.opacity*this.life})`); g.addColorStop(1, 'rgba(108,92,231,0)'); ctx.beginPath(); ctx.arc(this.x, this.y, this.size*2, 0, Math.PI*2); ctx.fillStyle = g; ctx.fill(); }
  }
  for (let i = 0; i < 75; i++) particles.push(new Particle());
  (function animate() { ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p => { p.update(); p.draw(ctx); }); for (let i=0;i<particles.length;i++) { for (let j=i+1;j<particles.length;j++) { const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,dist=Math.sqrt(dx*dx+dy*dy); if(dist<130){const op=(1-dist/130)*0.075*particles[i].life*particles[j].life;ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(108,92,231,${op})`;ctx.lineWidth=0.5;ctx.stroke();}}} requestAnimationFrame(animate); })();

  // =============================================
  // SOCIAL BUTTON CLICKS + RIPPLE
  // =============================================
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const provider = this.dataset.provider;
      const color = this.dataset.color;
      
      // Ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'social-ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      ripple.style.background = color;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 800);
      
      // Show toast
      showToast(`Connecting to ${provider}...`, 'success');
      
      // Simulate redirect
      setTimeout(() => {
        showToast(`Redirecting to ${provider} login...`, 'success');
      }, 1500);
    });
  });

  // =============================================
  // SIGN IN WITH EMAIL
  // =============================================
  document.querySelector('.signin-link').addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Redirecting to email login...', 'success');
  });

  // =============================================
  // TOAST SYSTEM
  // =============================================
  function showToast(msg, type) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span style="font-weight:700;color:${type==='success'?'var(--success)':'var(--danger)'}">${type==='success'?'✓':'✕'}</span><span>${msg}</span><div class="toast-progress"></div>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity='0'; toast.style.transform='translateX(120px)'; toast.style.transition='all 0.35s ease'; setTimeout(() => toast.remove(), 350); }, 3200);
  }

  console.log('🔷 UIXForge — AUTH-006 Social Login Buttons Ready');
  console.log('📦 Part of 200+ Production-Ready Components');
  console.log('🔗 6 Providers: Google, GitHub, Apple, Microsoft, X, Discord');
})();