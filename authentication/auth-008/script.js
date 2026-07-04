(function() {
  'use strict';

  const cursor = document.getElementById('cursor'), cursorDot = document.getElementById('cursorDot');
  let mx = -1000, my = -1000, cx = -1000, cy = -1000, vx = 0, vy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function u() { const dx = mx - cx, dy = my - cy; vx += dx * 0.14; vy += dy * 0.14; vx *= 0.72; vy *= 0.72; cx += vx; cy += vy; if (cursor && cursorDot) { cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; cursorDot.style.left = cx + 'px'; cursorDot.style.top = cy + 'px'; } requestAnimationFrame(u); })();
  document.addEventListener('mousedown', () => { cursor.classList.add('click'); setTimeout(() => cursor.classList.remove('click'), 350); });
  document.querySelectorAll('input, button, a, .checkbox-wrapper, .role-card, .toggle-password, .avatar-upload-btn').forEach(el => { el.addEventListener('mouseenter', () => cursor.classList.add('hover')); el.addEventListener('mouseleave', () => cursor.classList.remove('hover')); });

  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', e => { const x = (e.clientX - innerWidth/2)/innerWidth, y = (e.clientY - innerHeight/2)/innerHeight; orbs.forEach((o, i) => { const s = (i+1)*14; o.style.transform = `translate(${x*s}px, ${y*s}px)`; }); });

  const card = document.getElementById('signupCard'), glare = document.getElementById('cardGlare');
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

  // Step Navigation
  const s1 = document.getElementById('step1'), s2 = document.getElementById('step2'), s3 = document.getElementById('step3');
  const allSteps = [s1, s2, s3];
  const progressSteps = document.querySelectorAll('.step');
  const stepLines = document.querySelectorAll('.step-line');

  function goToStep(n) {
    allSteps.forEach(s => s.classList.remove('active'));
    document.getElementById('step' + n).classList.add('active');
    progressSteps.forEach(s => { const v = parseInt(s.dataset.step); s.classList.remove('active', 'done'); if (v === n) s.classList.add('active'); if (v < n) s.classList.add('done'); });
    stepLines.forEach((l, i) => { l.classList.toggle('done', i < n - 1); });
  }

  // Step 1 → 2
  document.getElementById('formStep1').addEventListener('submit', function(e) {
    e.preventDefault();
    const fn = document.getElementById('firstName').value.trim();
    const ln = document.getElementById('lastName').value.trim();
    const em = document.getElementById('signupEmail').value.trim();
    const pw = document.getElementById('signupPassword').value.trim();
    if (!fn || !ln || !em || !pw) { showToast('Please fill in all fields', 'error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { showToast('Invalid email address', 'error'); return; }
    if (pw.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }
    if (!/[A-Z]/.test(pw) || !/\d/.test(pw) || !/[^A-Za-z0-9]/.test(pw)) { showToast('Password must include uppercase, number, and special character', 'error'); return; }
    goToStep(2);
  });

  // Step 2 → 3
  document.getElementById('backToStep1').addEventListener('click', () => goToStep(1));
  document.getElementById('formStep2').addEventListener('submit', function(e) {
    e.preventDefault();
    const un = document.getElementById('username').value.trim();
    if (!un) { showToast('Please enter a username', 'error'); return; }
    if (un.length < 3) { showToast('Username must be at least 3 characters', 'error'); return; }
    // Fill summary
    document.getElementById('summaryName').textContent = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value;
    document.getElementById('summaryEmail').textContent = document.getElementById('signupEmail').value;
    document.getElementById('summaryUsername').textContent = '@' + un;
    document.getElementById('summaryRole').textContent = document.querySelector('input[name="role"]:checked').value;
    goToStep(3);
  });

  // Step 3 → Success
  document.getElementById('backToStep2').addEventListener('click', () => goToStep(2));
  document.getElementById('createAccountBtn').addEventListener('click', function() {
    if (!document.getElementById('agreeTerms').checked) { showToast('Please agree to Terms of Service', 'error'); return; }
    this.classList.add('loading');
    setTimeout(() => {
      this.classList.remove('loading');
      const so = document.getElementById('successOverlay'), sw = document.getElementById('successIconWrap');
      so.classList.add('show');
      for (let i = 0; i < 16; i++) { const sp = document.createElement('div'); sp.className = 'success-spark'; const a = Math.random()*Math.PI*2, d = 30+Math.random()*70; sp.style.setProperty('--sx',Math.cos(a)*d+'px'); sp.style.setProperty('--sy',Math.sin(a)*d+'px'); sp.style.left='36px';sp.style.top='36px'; sw.appendChild(sp); setTimeout(()=>sp.remove(),1000); }
    }, 2000);
  });
  document.getElementById('successDoneBtn').addEventListener('click', () => { document.getElementById('successOverlay').classList.remove('show'); showToast('Welcome to UIXForge! 🚀', 'success'); });

  // Password Strength
  const pwInput = document.getElementById('signupPassword');
  const strengthMeter = document.getElementById('passwordStrength');
  const strengthBars = strengthMeter.querySelectorAll('.strength-bar');
  const hints = document.querySelectorAll('.hint');
  pwInput.addEventListener('input', () => {
    const v = pwInput.value;
    if (!v) { strengthMeter.classList.remove('visible'); strengthBars.forEach(b => b.className = 'strength-bar'); hints.forEach(h => h.classList.remove('valid', 'invalid')); return; }
    strengthMeter.classList.add('visible');
    const rules = { length: v.length >= 8, uppercase: /[A-Z]/.test(v), number: /\d/.test(v), special: /[^A-Za-z0-9]/.test(v) };
    let score = Object.values(rules).filter(Boolean).length;
    hints.forEach(h => { const r = h.dataset.rule; h.classList.toggle('valid', rules[r]); h.classList.toggle('invalid', !rules[r]); h.textContent = (rules[r] ? '✓' : '✕') + ' ' + h.textContent.slice(2); });
    const levels = ['weak', 'weak', 'medium', 'strong'];
    strengthBars.forEach((b, i) => { b.className = 'strength-bar'; if (i < score) b.classList.add('active', levels[Math.min(score-1,3)] || 'strong'); });
  });

  // Avatar Upload
  document.getElementById('avatarUploadBtn').addEventListener('click', () => document.getElementById('avatarInput').click());
  document.getElementById('avatarInput').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => { document.getElementById('avatarPreview').innerHTML = `<img src="${e.target.result}" alt="Avatar">`; };
      reader.readAsDataURL(file);
    }
  });

  // Password Toggle
  document.querySelectorAll('.toggle-password').forEach(btn => { btn.addEventListener('click', () => { const t = document.getElementById(btn.dataset.target), is = t.type === 'password'; t.type = is ? 'text' : 'password'; const svg = btn.querySelector('svg'); svg.innerHTML = is ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>' : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'; }); });

  function showToast(msg, type) { const c = document.getElementById('toastContainer'), t = document.createElement('div'); t.className = `toast ${type}`; t.innerHTML = `<span style="font-weight:700;color:${type==='success'?'var(--success)':'var(--danger)'}">${type==='success'?'✓':'✕'}</span><span>${msg}</span><div class="toast-progress"></div>`; c.appendChild(t); setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(120px)';t.style.transition='all 0.35s ease';setTimeout(()=>t.remove(),350);},3200); }

  console.log('🔷 UIXForge — AUTH-008 Multi-Step Sign Up Ready');
  console.log('📦 Part of 200+ Production-Ready Components');
  console.log('📝 3-Step Flow: Account → Profile → Done');
})();