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
  document.querySelectorAll('button, .bio-tab, .alt-btn').forEach(el => { el.addEventListener('mouseenter', () => cursor.classList.add('hover')); el.addEventListener('mouseleave', () => cursor.classList.remove('hover')); });

  // =============================================
  // PARALLAX ORBS
  // =============================================
  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', e => { const x = (e.clientX - innerWidth/2)/innerWidth, y = (e.clientY - innerHeight/2)/innerHeight; orbs.forEach((o, i) => { const s = (i+1)*14; o.style.transform = `translate(${x*s}px, ${y*s}px)`; }); });

  // =============================================
  // 3D CARD TILT
  // =============================================
  const card = document.getElementById('biometricCard'), glare = document.getElementById('cardGlare');
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

  // =============================================
  // BIOMETRIC TABS
  // =============================================
  const bioTabs = document.querySelectorAll('.bio-tab');
  const bioContents = document.querySelectorAll('.bio-content');
  bioTabs.forEach(tab => { tab.addEventListener('click', () => { bioTabs.forEach(t => t.classList.remove('active')); bioContents.forEach(c => c.classList.remove('active')); tab.classList.add('active'); document.getElementById('content-' + tab.dataset.method).classList.add('active'); }); });

  // =============================================
  // FINGERPRINT SCAN
  // =============================================
  const fingerprintScan = document.getElementById('fingerprintScan');
  const scanFingerprintBtn = document.getElementById('scanFingerprintBtn');
  const fingerprintHint = document.getElementById('fingerprintHint');
  let fingerprintAttempts = 0;

  scanFingerprintBtn.addEventListener('click', () => {
    fingerprintScan.classList.add('scanning');
    scanFingerprintBtn.classList.add('loading');
    fingerprintHint.textContent = 'Scanning...';
    
    setTimeout(() => {
      fingerprintAttempts++;
      fingerprintScan.classList.remove('scanning');
      scanFingerprintBtn.classList.remove('loading');
      
      // Simulate: first attempt fails, second succeeds
      if (fingerprintAttempts === 1) {
        fingerprintScan.classList.add('error');
        fingerprintHint.textContent = 'Fingerprint not recognized. Try again.';
        showToast('Fingerprint not recognized', 'error');
        setTimeout(() => fingerprintScan.classList.remove('error'), 500);
      } else {
        fingerprintScan.classList.add('success');
        fingerprintHint.textContent = 'Fingerprint recognized!';
        showToast('Fingerprint recognized!', 'success');
        setTimeout(showSuccess, 800);
        fingerprintAttempts = 0;
      }
    }, 2000);
  });

  // =============================================
  // FACE ID SCAN
  // =============================================
  const faceOutline = document.querySelector('.face-outline');
  const scanFaceBtn = document.getElementById('scanFaceBtn');
  const faceHint = document.getElementById('faceHint');
  let faceAttempts = 0;

  scanFaceBtn.addEventListener('click', () => {
    faceOutline.classList.add('scanning');
    scanFaceBtn.classList.add('loading');
    faceHint.textContent = 'Scanning...';
    
    setTimeout(() => {
      faceAttempts++;
      faceOutline.classList.remove('scanning');
      scanFaceBtn.classList.remove('loading');
      
      if (faceAttempts === 1) {
        faceOutline.classList.add('error');
        faceHint.textContent = 'Face not recognized. Try again.';
        showToast('Face not recognized', 'error');
        setTimeout(() => faceOutline.classList.remove('error'), 500);
      } else {
        faceOutline.classList.add('success');
        faceHint.textContent = 'Face recognized!';
        showToast('Face recognized!', 'success');
        setTimeout(showSuccess, 800);
        faceAttempts = 0;
      }
    }, 2200);
  });

  // =============================================
  // SUCCESS OVERLAY
  // =============================================
  function showSuccess() {
    const so = document.getElementById('successOverlay'), sw = document.getElementById('successIconWrap');
    so.classList.add('show');
    for (let i = 0; i < 14; i++) { const sp = document.createElement('div'); sp.className = 'success-spark'; const a = Math.random()*Math.PI*2, d = 30+Math.random()*60; sp.style.setProperty('--sx',Math.cos(a)*d+'px'); sp.style.setProperty('--sy',Math.sin(a)*d+'px'); sp.style.left='36px';sp.style.top='36px'; sw.appendChild(sp); setTimeout(()=>sp.remove(),1000); }
  }
  document.getElementById('successDoneBtn').addEventListener('click', () => { document.getElementById('successOverlay').classList.remove('show'); showToast('Welcome back! 🔐', 'success'); });

  // =============================================
  // USE PASSWORD
  // =============================================
  document.getElementById('usePasswordBtn').addEventListener('click', () => { showToast('Switching to password login...', 'success'); });

  // =============================================
  // TOAST
  // =============================================
  function showToast(msg, type) { const c = document.getElementById('toastContainer'), t = document.createElement('div'); t.className = `toast ${type}`; t.innerHTML = `<span style="font-weight:700;color:${type==='success'?'var(--success)':'var(--danger)'}">${type==='success'?'✓':'✕'}</span><span>${msg}</span><div class="toast-progress"></div>`; c.appendChild(t); setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(120px)';t.style.transition='all 0.35s ease';setTimeout(()=>t.remove(),350);},3200); }

  console.log('🔷 UIXForge — AUTH-013 Biometric Auth UI Ready');
  console.log('📦 Part of 200+ Production-Ready Components');
  console.log('👆🔍 Fingerprint + Face ID with scan animations');
})();