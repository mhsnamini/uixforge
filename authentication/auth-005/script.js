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
  document.querySelectorAll('input, button, .forgot-trigger, .text-btn, .modal-close').forEach(el => {
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
    orbs.forEach((orb, i) => { const speed = (i + 1) * 14; orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`; });
  });

  // =============================================
  // 3D CARD TILT
  // =============================================
  const modalCard = document.getElementById('modalCard');
  const cardGlare = document.getElementById('cardGlare');
  if (modalCard) {
    modalCard.addEventListener('mousemove', (e) => {
      const rect = modalCard.getBoundingClientRect(), x = e.clientX - rect.left, y = e.clientY - rect.top;
      modalCard.style.transform = `perspective(1200px) rotateX(${(y - rect.height/2) / (rect.height/2) * -7}deg) rotateY(${(x - rect.width/2) / (rect.width/2) * 7}deg) scale(1.01)`;
      cardGlare.style.opacity = '0.5';
      cardGlare.style.background = `radial-gradient(circle at ${(x/rect.width)*100}% ${(y/rect.height)*100}%, rgba(255,255,255,0.1) 0%, transparent 60%)`;
    });
    modalCard.addEventListener('mouseleave', () => { modalCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'; cardGlare.style.opacity = '0'; });
  }

  // =============================================
  // PARTICLE SYSTEM
  // =============================================
  const canvas = document.getElementById('particleCanvas'), ctx = canvas.getContext('2d');
  let particles = [], pMouse = { x: -1000, y: -1000 };
  document.addEventListener('mousemove', (e) => { pMouse.x = e.clientX; pMouse.y = e.clientY; });
  function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener('resize', resizeCanvas); resizeCanvas();
  class Particle {
    constructor() { this.reset(); }
    reset() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 2.2 + 0.5; this.speedX = (Math.random() - 0.5) * 0.35; this.speedY = (Math.random() - 0.5) * 0.35; this.opacity = Math.random() * 0.45 + 0.08; this.life = 1; this.decay = Math.random() * 0.0022 + 0.0008; }
    update() { const dx = pMouse.x - this.x, dy = pMouse.y - this.y, dist = Math.sqrt(dx*dx+dy*dy); if (dist < 150) { const f = (150-dist)/150; this.speedX -= (dx/dist)*f*0.45; this.speedY -= (dy/dist)*f*0.45; } this.x += this.speedX; this.y += this.speedY; this.speedX *= 0.985; this.speedY *= 0.985; this.life -= this.decay; if (this.life <= 0 || this.x < -50 || this.x > canvas.width+50 || this.y < -50 || this.y > canvas.height+50) this.reset(); }
    draw(ctx) { const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size*2); g.addColorStop(0, `rgba(108,92,231,${this.opacity*this.life})`); g.addColorStop(1, 'rgba(108,92,231,0)'); ctx.beginPath(); ctx.arc(this.x, this.y, this.size*2, 0, Math.PI*2); ctx.fillStyle = g; ctx.fill(); }
  }
  for (let i = 0; i < 75; i++) particles.push(new Particle());
  (function animate() { ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p => { p.update(); p.draw(ctx); }); for (let i=0;i<particles.length;i++) { for (let j=i+1;j<particles.length;j++) { const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,dist=Math.sqrt(dx*dx+dy*dy); if(dist<130){const op=(1-dist/130)*0.075*particles[i].life*particles[j].life;ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(108,92,231,${op})`;ctx.lineWidth=0.5;ctx.stroke();}}} requestAnimationFrame(animate); })();

  // =============================================
  // FLOATING LABELS
  // =============================================
  document.querySelectorAll('.form-field').forEach(input => {
    input.addEventListener('input', () => input.classList.toggle('filled', input.value.length > 0));
    input.addEventListener('blur', () => input.classList.toggle('filled', input.value.length > 0));
  });

  // =============================================
  // MODAL OPEN/CLOSE
  // =============================================
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const successOverlay = document.getElementById('successOverlay');
  const forgotTrigger = document.getElementById('forgotTrigger');
  const modalClose = document.getElementById('modalClose');
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');

  function openModal() {
    modalOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    goToStep(1);
    successOverlay.classList.remove('show');
    modalContent.style.display = 'block';
    setTimeout(() => document.getElementById('resetEmail').focus(), 400);
  }

  function closeModal() {
    modalOverlay.classList.remove('show');
    document.body.style.overflow = '';
    document.getElementById('resetEmail').value = '';
    document.getElementById('resetEmail').classList.remove('filled');
    document.getElementById('emailError').textContent = '';
    successOverlay.classList.remove('show');
    modalContent.style.display = 'block';
  }

  forgotTrigger.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modalOverlay.classList.contains('show')) closeModal(); });

  // =============================================
  // STEP NAVIGATION
  // =============================================
  function goToStep(n) {
    [step1, step2].forEach(s => s.classList.remove('active'));
    document.getElementById('step' + n).classList.add('active');
  }

  // =============================================
  // STEP 1: Send Email
  // =============================================
  document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value.trim();
    const errorEl = document.getElementById('emailError');

    if (!email) { errorEl.textContent = 'Please enter your email address'; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errorEl.textContent = 'Please enter a valid email'; return; }
    errorEl.textContent = '';

    document.getElementById('sendBtn').classList.add('loading');
    setTimeout(() => {
      document.getElementById('sendBtn').classList.remove('loading');
      document.getElementById('sentEmailDisplay').textContent = email;
      goToStep(2);
      showToast('Reset link sent!', 'success');
    }, 1500);
  });

  // =============================================
  // STEP 2: Open Email / Back
  // =============================================
  document.getElementById('openEmailBtn').addEventListener('click', () => showToast('Opening email client...', 'success'));
  document.getElementById('backToEditBtn').addEventListener('click', () => {
    goToStep(1);
    document.getElementById('resetEmail').value = '';
    document.getElementById('resetEmail').classList.remove('filled');
    document.getElementById('emailError').textContent = '';
    setTimeout(() => document.getElementById('resetEmail').focus(), 300);
  });

  // =============================================
  // SUCCESS DONE
  // =============================================
  document.getElementById('successDoneBtn').addEventListener('click', () => {
    successOverlay.classList.remove('show');
    modalContent.style.display = 'block';
    goToStep(1);
    document.getElementById('resetEmail').value = '';
    closeModal();
    showToast('Check your inbox!', 'success');
  });

  // =============================================
  // TOAST SYSTEM
  // =============================================
  function showToast(msg, type) {
    const container = document.getElementById('toastContainer'), toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span style="font-weight:700;color:${type==='success'?'var(--success)':'var(--danger)'}">${type==='success'?'✓':'✕'}</span><span>${msg}</span><div class="toast-progress"></div>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity='0'; toast.style.transform='translateX(120px)'; toast.style.transition='all 0.35s ease'; setTimeout(() => toast.remove(), 350); }, 3200);
  }

  console.log('🔷 UIXForge — AUTH-005 Forgot Password Modal Ready');
  console.log('📦 Part of 200+ Production-Ready Components');
  console.log('🪟 Modal with blur backdrop + 2-step flow');
})();