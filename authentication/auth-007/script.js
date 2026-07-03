(function() {
  'use strict';

  const cursor = document.getElementById('cursor'), cursorDot = document.getElementById('cursorDot');
  let mx = -1000, my = -1000, cx = -1000, cy = -1000, vx = 0, vy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function u() { const dx = mx - cx, dy = my - cy; vx += dx * 0.14; vy += dy * 0.14; vx *= 0.72; vy *= 0.72; cx += vx; cy += vy; if (cursor && cursorDot) { cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; cursorDot.style.left = cx + 'px'; cursorDot.style.top = cy + 'px'; } requestAnimationFrame(u); })();
  document.addEventListener('mousedown', () => { cursor.classList.add('click'); setTimeout(() => cursor.classList.remove('click'), 350); });
  document.querySelectorAll('input, button, .copy-btn, .text-btn, .method-tab').forEach(el => { el.addEventListener('mouseenter', () => cursor.classList.add('hover')); el.addEventListener('mouseleave', () => cursor.classList.remove('hover')); });

  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', e => { const x = (e.clientX - innerWidth/2)/innerWidth, y = (e.clientY - innerHeight/2)/innerHeight; orbs.forEach((o, i) => { const s = (i+1)*14; o.style.transform = `translate(${x*s}px, ${y*s}px)`; }); });

  const card = document.getElementById('tfaCard'), glare = document.getElementById('cardGlare');
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

  document.querySelectorAll('.form-field').forEach(i => { i.addEventListener('input', () => i.classList.toggle('filled', i.value.length > 0)); });

  // Method Tabs
  const methodTabs = document.querySelectorAll('.method-tab');
  const methodContents = document.querySelectorAll('.method-content');
  methodTabs.forEach(tab => { tab.addEventListener('click', () => { methodTabs.forEach(t => t.classList.remove('active')); methodContents.forEach(c => c.classList.remove('active')); tab.classList.add('active'); document.getElementById('method-' + tab.dataset.method).classList.add('active'); if(tab.dataset.method==='app')document.getElementById('otpInputs').querySelector('.otp-field').focus(); if(tab.dataset.method==='sms')document.getElementById('smsOtpInputs').querySelector('.otp-field').focus(); }); });

  // OTP Logic (App)
  setupOtpInputs(document.getElementById('otpInputs').querySelectorAll('.otp-field'), 'verifyAppBtn', 'errorMessage', 'errorText');
  document.getElementById('verifyAppBtn').addEventListener('click', () => verify2FA('app'));
  // OTP Logic (SMS)
  setupOtpInputs(document.getElementById('smsOtpInputs').querySelectorAll('.sms-otp'), 'verifySmsBtn', null, null);
  document.getElementById('verifySmsBtn').addEventListener('click', () => verify2FA('sms'));

  function setupOtpInputs(inputs, btnId, errId, errTextId) {
    inputs.forEach((input, index) => {
      input.addEventListener('input', e => { if(!/^\d$/.test(e.target.value)){e.target.value='';return;} input.classList.add('filled'); if(e.target.value&&index<inputs.length-1)inputs[index+1].focus(); if(btnId)document.getElementById(btnId).disabled=!Array.from(inputs).every(i=>i.value.length===1); });
      input.addEventListener('keydown', e => { if(e.key==='Backspace'&&!e.target.value&&index>0){inputs[index-1].focus();inputs[index-1].classList.remove('filled');} if(e.key==='ArrowLeft'&&index>0)inputs[index-1].focus(); if(e.key==='ArrowRight'&&index<inputs.length-1)inputs[index+1].focus(); });
      input.addEventListener('paste', e => { e.preventDefault(); const digits=(e.clipboardData||window.clipboardData).getData('text').replace(/\D/g,'').slice(0,6); digits.split('').forEach((d,i)=>{if(inputs[i]){inputs[i].value=d;inputs[i].classList.add('filled');}}); inputs[Math.min(digits.length,inputs.length-1)].focus(); });
    });
  }

  function verify2FA(method) {
    const inputs = method === 'app' ? document.getElementById('otpInputs').querySelectorAll('.otp-field') : document.getElementById('smsOtpInputs').querySelectorAll('.sms-otp');
    const val = Array.from(inputs).map(i => i.value).join('');
    if (val.length !== 6) return;
    if (val !== '123456') { if (method === 'app') { document.getElementById('errorMessage').classList.add('show'); document.getElementById('errorText').textContent = 'Invalid code. Please try again.'; inputs.forEach(i => i.classList.add('error')); setTimeout(() => { inputs.forEach(i => i.classList.remove('error')); }, 500); } else { showToast('Invalid code', 'error'); } return; }
    if (method === 'app') document.getElementById('errorMessage').classList.remove('show');
    const btn = document.getElementById(method === 'app' ? 'verifyAppBtn' : 'verifySmsBtn');
    btn.classList.add('loading');
    setTimeout(() => { btn.classList.remove('loading'); enable2FA(); }, 1500);
  }

  function enable2FA() {
    document.getElementById('statusBadge').classList.remove('disabled'); document.getElementById('statusBadge').classList.add('enabled');
    document.getElementById('statusText').textContent = '2FA is Enabled';
    const so = document.getElementById('successOverlay'), sw = document.getElementById('successIconWrap');
    so.classList.add('show');
    for (let i = 0; i < 14; i++) { const sp = document.createElement('div'); sp.className = 'success-spark'; const a = Math.random()*Math.PI*2, d = 30+Math.random()*60; sp.style.setProperty('--sx',Math.cos(a)*d+'px'); sp.style.setProperty('--sy',Math.sin(a)*d+'px'); sp.style.left='35px';sp.style.top='35px'; sw.appendChild(sp); setTimeout(()=>sp.remove(),1000); }
  }
  document.getElementById('successDoneBtn').addEventListener('click', () => { document.getElementById('successOverlay').classList.remove('show'); showToast('2FA enabled successfully! 🔐', 'success'); });

  // SMS
  let smsTimer = 30, smsInterval;
  document.getElementById('sendSmsBtn').addEventListener('click', function() { this.disabled = true; document.getElementById('resendSmsBtn').disabled = true; smsTimer = 30; updateSmsTimer(); smsInterval = setInterval(() => { smsTimer--; updateSmsTimer(); if(smsTimer<=0){clearInterval(smsInterval);document.getElementById('resendSmsBtn').disabled=false;document.getElementById('sendSmsBtn').disabled=false;} }, 1000); showToast('Code sent!', 'success'); });
  document.getElementById('resendSmsBtn').addEventListener('click', function() { if(!this.disabled){ smsTimer=30;updateSmsTimer();this.disabled=true; smsInterval=setInterval(()=>{smsTimer--;updateSmsTimer();if(smsTimer<=0){clearInterval(smsInterval);this.disabled=false;}},1000); showToast('Code resent!','success'); } });
  function updateSmsTimer() { document.getElementById('smsTimer').textContent = '0:' + String(smsTimer).padStart(2,'0'); }

  // Recovery
  document.getElementById('copyCodesBtn').addEventListener('click', () => { const codes = Array.from(document.querySelectorAll('.recovery-code span:first-child')).map(s=>s.textContent).join('\n'); navigator.clipboard.writeText(codes).then(()=>showToast('Codes copied!','success')); });
  document.getElementById('downloadCodesBtn').addEventListener('click', () => { const codes = Array.from(document.querySelectorAll('.recovery-code span:first-child')).map(s=>s.textContent).join('\n'); const blob = new Blob([codes],{type:'text/plain'}); const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='recovery-codes.txt';a.click(); showToast('Downloaded!','success'); });
  document.getElementById('regenerateCodesBtn').addEventListener('click', () => { const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; document.querySelectorAll('.recovery-code span:first-child').forEach(s=>{ let code='UIFX-'; for(let i=0;i<3;i++){for(let j=0;j<4;j++)code+=chars[Math.floor(Math.random()*chars.length)];if(i<2)code+='-';} s.textContent=code; }); showToast('Codes regenerated!','success'); });
  document.getElementById('copyKeyBtn').addEventListener('click', () => { navigator.clipboard.writeText('UIFX-XXXX-XXXX-XXXX').then(()=>showToast('Setup key copied!','success')); });

  function showToast(msg, type) { const c = document.getElementById('toastContainer'), t = document.createElement('div'); t.className = `toast ${type}`; t.innerHTML = `<span style="font-weight:700;color:${type==='success'?'var(--success)':'var(--danger)'}">${type==='success'?'✓':'✕'}</span><span>${msg}</span><div class="toast-progress"></div>`; c.appendChild(t); setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(120px)';t.style.transition='all 0.35s ease';setTimeout(()=>t.remove(),350);},3200); }

  console.log('🔷 UIXForge — AUTH-007 Two-Factor Authentication Ready');
  console.log('📦 Part of 200+ Production-Ready Components');
  console.log('🔑 Test OTP: 123456');
})();