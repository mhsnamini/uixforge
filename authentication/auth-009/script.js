(function() {
  'use strict';

  const cursor = document.getElementById('cursor'), cursorDot = document.getElementById('cursorDot');
  let mx = -1000, my = -1000, cx = -1000, cy = -1000, vx = 0, vy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function u() { const dx = mx - cx, dy = my - cy; vx += dx * 0.14; vy += dy * 0.14; vx *= 0.72; vy *= 0.72; cx += vx; cy += vy; if (cursor && cursorDot) { cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; cursorDot.style.left = cx + 'px'; cursorDot.style.top = cy + 'px'; } requestAnimationFrame(u); })();
  document.addEventListener('mousedown', () => { cursor.classList.add('click'); setTimeout(() => cursor.classList.remove('click'), 350); });
  document.querySelectorAll('input, button, a, .checkbox-wrapper, .toggle-password, .country-select, .country-option').forEach(el => { el.addEventListener('mouseenter', () => cursor.classList.add('hover')); el.addEventListener('mouseleave', () => cursor.classList.remove('hover')); });

  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', e => { const x = (e.clientX - innerWidth/2)/innerWidth, y = (e.clientY - innerHeight/2)/innerHeight; orbs.forEach((o, i) => { const s = (i+1)*14; o.style.transform = `translate(${x*s}px, ${y*s}px)`; }); });

  const card = document.getElementById('loginCard'), glare = document.getElementById('cardGlare');
  card.addEventListener('mousemove', e => { const r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top; card.style.transform = `perspective(1200px) rotateX(${(y-r.height/2)/(r.height/2)*-5}deg) rotateY(${(x-r.width/2)/(r.width/2)*5}deg) scale(1.01)`; glare.style.opacity = '0.5'; glare.style.background = `radial-gradient(circle at ${(x/r.width)*100}% ${(y/r.height)*100}%, rgba(255,255,255,0.1) 0%, transparent 60%)`; });
  card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'; glare.style.opacity = '0'; });

  const canvas = document.getElementById('particleCanvas'), ctx = canvas.getContext('2d');
  let particles = [], pMouse = { x: -1000, y: -1000 };
  document.addEventListener('mousemove', e => { pMouse.x = e.clientX; pMouse.y = e.clientY; });
  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
  window.addEventListener('resize', resize); resize();
  class Particle { constructor() { this.reset(); } reset() { this.x = Math.random()*canvas.width; this.y = Math.random()*canvas.height; this.size = Math.random()*2.2+0.5; this.speedX = (Math.random()-0.5)*0.35; this.speedY = (Math.random()-0.5)*0.35; this.opacity = Math.random()*0.45+0.08; this.life = 1; this.decay = Math.random()*0.0022+0.0008; } update() { const dx = pMouse.x-this.x, dy = pMouse.y-this.y, dist = Math.sqrt(dx*dx+dy*dy); if(dist<150){const f=(150-dist)/150;this.speedX-=(dx/dist)*f*0.45;this.speedY-=(dy/dist)*f*0.45;} this.x+=this.speedX;this.y+=this.speedY;this.speedX*=0.985;this.speedY*=0.985;this.life-=this.decay;if(this.life<=0||this.x<-50||this.x>canvas.width+50||this.y<-50||this.y>canvas.height+50)this.reset(); } draw(ctx) { const g = ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.size*2); g.addColorStop(0,`rgba(108,92,231,${this.opacity*this.life})`);g.addColorStop(1,'rgba(108,92,231,0)');ctx.beginPath();ctx.arc(this.x,this.y,this.size*2,0,Math.PI*2);ctx.fillStyle=g;ctx.fill(); } }
  for(let i=0;i<75;i++)particles.push(new Particle());
  (function a(){ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>{p.update();p.draw(ctx);});for(let i=0;i<particles.length;i++){for(let j=i+1;j<particles.length;j++){const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<130){const op=(1-dist/130)*0.075*particles[i].life*particles[j].life;ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(108,92,231,${op})`;ctx.lineWidth=0.5;ctx.stroke();}}}requestAnimationFrame(a);})();

  document.querySelectorAll('.form-field').forEach(i => { i.addEventListener('input', () => i.classList.toggle('filled', i.value.length > 0)); i.addEventListener('blur', () => i.classList.toggle('filled', i.value.length > 0)); });

  // =============================================
  // TOGGLE TABS
  // =============================================
  const toggleTabs = document.querySelectorAll('.toggle-tab');
  const toggleIndicator = document.getElementById('toggleIndicator');
  const formEmail = document.getElementById('form-email');
  const formPhone = document.getElementById('form-phone');

  toggleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      toggleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      if (target === 'phone') {
        toggleIndicator.classList.add('right');
        formEmail.classList.remove('active');
        formPhone.classList.add('active');
        setTimeout(() => document.getElementById('phoneInput').focus(), 400);
      } else {
        toggleIndicator.classList.remove('right');
        formPhone.classList.remove('active');
        formEmail.classList.add('active');
        setTimeout(() => document.getElementById('emailInput').focus(), 400);
      }
    });
  });

  // =============================================
  // COUNTRY DROPDOWN
  // =============================================
  const countrySelect = document.getElementById('countrySelect');
  const countryDropdown = document.getElementById('countryDropdown');
  const countryFlag = document.getElementById('countryFlag');
  const countryCode = document.getElementById('countryCode');
  const countryOptions = document.querySelectorAll('.country-option');

  countrySelect.addEventListener('click', (e) => {
    e.stopPropagation();
    countryDropdown.classList.toggle('show');
  });

  countryOptions.forEach(option => {
    option.addEventListener('click', () => {
      countryOptions.forEach(o => o.classList.remove('active'));
      option.classList.add('active');
      countryFlag.textContent = option.dataset.flag;
      countryCode.textContent = option.dataset.code;
      countryDropdown.classList.remove('show');
    });
  });

  document.addEventListener('click', () => countryDropdown.classList.remove('show'));

  // =============================================
  // EMAIL LOGIN
  // =============================================
  document.getElementById('emailLoginBtn').addEventListener('click', () => {
    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('emailPassword').value.trim();
    const errorEl = document.getElementById('emailError');

    if (!email) { errorEl.textContent = 'Please enter your email'; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errorEl.textContent = 'Invalid email format'; return; }
    if (!password) { errorEl.textContent = 'Please enter your password'; return; }
    errorEl.textContent = '';

    document.getElementById('emailLoginBtn').classList.add('loading');
    setTimeout(() => {
      document.getElementById('emailLoginBtn').classList.remove('loading');
      showSuccess();
    }, 1800);
  });

  // =============================================
  // PHONE LOGIN
  // =============================================
  document.getElementById('phoneLoginBtn').addEventListener('click', () => {
    const phone = document.getElementById('phoneInput').value.trim();
    const password = document.getElementById('phonePassword').value.trim();
    const errorEl = document.getElementById('phoneError');

    if (!phone) { errorEl.textContent = 'Please enter your phone number'; return; }
    if (phone.replace(/\D/g, '').length < 10) { errorEl.textContent = 'Phone number too short'; return; }
    if (!password) { errorEl.textContent = 'Please enter your password'; return; }
    errorEl.textContent = '';

    document.getElementById('phoneLoginBtn').classList.add('loading');
    setTimeout(() => {
      document.getElementById('phoneLoginBtn').classList.remove('loading');
      showSuccess();
    }, 1800);
  });

  // =============================================
  // SUCCESS
  // =============================================
  function showSuccess() {
    const so = document.getElementById('successOverlay'), sw = document.getElementById('successIconWrap');
    so.classList.add('show');
    for (let i = 0; i < 14; i++) { const sp = document.createElement('div'); sp.className = 'success-spark'; const a = Math.random()*Math.PI*2, d = 30+Math.random()*60; sp.style.setProperty('--sx',Math.cos(a)*d+'px'); sp.style.setProperty('--sy',Math.sin(a)*d+'px'); sp.style.left='36px';sp.style.top='36px'; sw.appendChild(sp); setTimeout(()=>sp.remove(),1000); }
    setTimeout(() => { so.classList.remove('show'); showToast('Logged in successfully! ✨', 'success'); }, 3000);
  }

  // =============================================
  // PASSWORD TOGGLE
  // =============================================
  document.querySelectorAll('.toggle-password').forEach(btn => { btn.addEventListener('click', () => { const t = document.getElementById(btn.dataset.target), is = t.type === 'password'; t.type = is ? 'text' : 'password'; const svg = btn.querySelector('svg'); svg.innerHTML = is ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>' : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'; }); });

  // Social Buttons
  document.querySelectorAll('.social-btn').forEach(btn => { btn.addEventListener('click', () => showToast(`Connecting to ${btn.dataset.provider}...`, 'success')); });
  document.querySelector('.signup-link').addEventListener('click', e => { e.preventDefault(); showToast('Redirecting to sign up...', 'success'); });
  document.querySelectorAll('.forgot-link').forEach(link => { link.addEventListener('click', e => { e.preventDefault(); showToast('Redirecting to password reset...', 'success'); }); });

  function showToast(msg, type) { const c = document.getElementById('toastContainer'), t = document.createElement('div'); t.className = `toast ${type}`; t.innerHTML = `<span style="font-weight:700;color:${type==='success'?'var(--success)':'var(--danger)'}">${type==='success'?'✓':'✕'}</span><span>${msg}</span><div class="toast-progress"></div>`; c.appendChild(t); setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(120px)';t.style.transition='all 0.35s ease';setTimeout(()=>t.remove(),350);},3200); }

  console.log('🔷 UIXForge — AUTH-009 Login Phone/Email Toggle Ready');
  console.log('📦 Part of 200+ Production-Ready Components');
  console.log('📱📧 Toggle between Phone & Email login');
})();