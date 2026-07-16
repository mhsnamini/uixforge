(function() {
  'use strict';

  // =============================================
  // CUSTOM CURSOR
  // =============================================
  const cursor = document.getElementById('cursor'), cursorDot = document.getElementById('cursorDot');
  let mx = -1000, my = -1000, cx = -1000, cy = -1000, vx = 0, vy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function u() { const dx = mx - cx, dy = my - cy; vx += dx * 0.14; vy += dy * 0.14; vx *= 0.72; vy *= 0.72; cx += vx; cy += vy; if (cursor && cursorDot) { cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; cursorDot.style.left = cx + 'px'; cursorDot.style.top = cy + 'px'; } requestAnimationFrame(u); })();
  document.addEventListener('mousedown', () => { cursor.classList.add('click'); setTimeout(() => cursor.classList.remove('click'), 350); });
  document.querySelectorAll('button, a, .checkbox-wrapper, .demo-btn, .toggle-password').forEach(el => { el.addEventListener('mouseenter', () => cursor.classList.add('hover')); el.addEventListener('mouseleave', () => cursor.classList.remove('hover')); });

  // =============================================
  // PARALLAX ORBS
  // =============================================
  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', e => { const x = (e.clientX - innerWidth/2)/innerWidth, y = (e.clientY - innerHeight/2)/innerHeight; orbs.forEach((o, i) => { const s = (i+1)*14; o.style.transform = `translate(${x*s}px, ${y*s}px)`; }); });

  // =============================================
  // 3D CARD TILT
  // =============================================
  const card = document.getElementById('loginCard'), glare = document.getElementById('cardGlare');
  card.addEventListener('mousemove', e => { const r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top; card.style.transform = `perspective(1200px) rotateX(${(y-r.height/2)/(r.height/2)*-5}deg) rotateY(${(x-r.width/2)/(r.width/2)*5}deg) scale(1.01)`; glare.style.opacity = '0.5'; glare.style.background = `radial-gradient(circle at ${(x/r.width)*100}% ${(y/r.height)*100}%, rgba(255,255,255,0.1) 0%, transparent 60%)`; });
  card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'; glare.style.opacity = '0'; });

  // =============================================
  // PARTICLE SYSTEM
  // =============================================
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
  // ERROR STATES
  // =============================================
  const errorDisplay = document.getElementById('errorDisplay');
  const errorTitle = document.getElementById('errorTitle');
  const errorDesc = document.getElementById('errorDesc');
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const emailStatus = document.getElementById('emailStatus');
  const passwordStatus = document.getElementById('passwordStatus');

  const errorStates = {
    credentials: { title: 'Invalid Credentials', desc: 'The email or password you entered is incorrect. Please try again.', fields: ['email', 'password'], shake: true },
    empty: { title: 'Empty Fields', desc: 'Please fill in both email and password to continue.', fields: ['email', 'password'] },
    locked: { title: 'Account Locked', desc: 'Your account has been temporarily locked due to multiple failed attempts. Try again in 15 minutes.', fields: [], shake: true },
    network: { title: 'Network Error', desc: 'Unable to connect to the server. Please check your internet connection and try again.', fields: [] },
    'rate-limit': { title: 'Too Many Attempts', desc: 'You\'ve made too many login attempts. Please wait 60 seconds before trying again.', fields: [], shake: true }
  };

  function showError(type) {
    const err = errorStates[type];
    if (!err) return;
    
    // Update error display
    errorTitle.textContent = err.title;
    errorDesc.textContent = err.desc;
    errorDisplay.classList.add('show');
    
    // Clear previous field errors
    [emailInput, passwordInput].forEach(f => f.classList.remove('error'));
    [emailError, passwordError].forEach(e => e.textContent = '');
    [emailStatus, passwordStatus].forEach(s => s.classList.remove('error'));
    
    // Highlight fields
    err.fields?.forEach(f => {
      if (f === 'email') { emailInput.classList.add('error'); emailStatus.classList.add('error'); }
      if (f === 'password') { passwordInput.classList.add('error'); passwordStatus.classList.add('error'); }
    });
    
    // Shake card
    if (err.shake) { card.classList.add('shake'); setTimeout(() => card.classList.remove('shake'), 500); }
  }

  function hideError() {
    errorDisplay.classList.remove('show');
    [emailInput, passwordInput].forEach(f => f.classList.remove('error'));
    [emailError, passwordError].forEach(e => e.textContent = '');
    [emailStatus, passwordStatus].forEach(s => s.classList.remove('error'));
  }

  // =============================================
  // FORM SUBMIT
  // =============================================
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!email && !password) { showError('empty'); emailError.textContent = 'Required'; passwordError.textContent = 'Required'; return; }
    if (!email) { showError('empty'); emailError.textContent = 'Required'; return; }
    if (!password) { showError('empty'); passwordError.textContent = 'Required'; return; }
    
    // Simulate login
    const btn = document.getElementById('loginBtn');
    btn.classList.add('loading');
    setTimeout(() => {
      btn.classList.remove('loading');
      if (email !== 'user@uixforge.dev' || password !== 'password') {
        showError('credentials');
      } else {
        hideError();
        showToast('Logged in successfully! ✨', 'success');
      }
    }, 1500);
  });

  // Clear error on input
  [emailInput, passwordInput].forEach(input => {
    input.addEventListener('input', () => { if (errorDisplay.classList.contains('show')) hideError(); });
  });

  // =============================================
  // DEMO BUTTONS
  // =============================================
  document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', () => showError(btn.dataset.error));
  });

  // =============================================
  // PASSWORD TOGGLE
  // =============================================
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      const isPass = target.type === 'password';
      target.type = isPass ? 'text' : 'password';
      const svg = btn.querySelector('svg');
      svg.innerHTML = isPass ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>' : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
    });
  });

  // =============================================
  // TOAST
  // =============================================
  function showToast(msg, type) { const c = document.getElementById('toastContainer'), t = document.createElement('div'); t.className = `toast ${type}`; t.innerHTML = `<span style="font-weight:700;color:${type==='success'?'var(--success)':'var(--danger)'}">${type==='success'?'✓':'✕'}</span><span>${msg}</span><div class="toast-progress"></div>`; c.appendChild(t); setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(120px)';t.style.transition='all 0.35s ease';setTimeout(()=>t.remove(),350);},3200); }

  console.log('🔷 UIXForge — AUTH-015 Login Error States Ready');
  console.log('📦 Part of 200+ Production-Ready Components');
  console.log('❌ 5 Error Types: Credentials, Empty, Locked, Network, Rate Limit');
  console.log('✅ Test login: user@uixforge.dev / password');
})();