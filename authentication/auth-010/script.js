(function() {
  'use strict';

  const cursor = document.getElementById('cursor'), cursorDot = document.getElementById('cursorDot');
  let mx = -1000, my = -1000, cx = -1000, cy = -1000, vx = 0, vy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function u() { const dx = mx - cx, dy = my - cy; vx += dx * 0.14; vy += dy * 0.14; vx *= 0.72; vy *= 0.72; cx += vx; cy += vy; if (cursor && cursorDot) { cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; cursorDot.style.left = cx + 'px'; cursorDot.style.top = cy + 'px'; } requestAnimationFrame(u); })();
  document.addEventListener('mousedown', () => { cursor.classList.add('click'); setTimeout(() => cursor.classList.remove('click'), 350); });
  document.querySelectorAll('button, a, .nav-dot, .interest-chip').forEach(el => { el.addEventListener('mouseenter', () => cursor.classList.add('hover')); el.addEventListener('mouseleave', () => cursor.classList.remove('hover')); });

  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', e => { const x = (e.clientX - innerWidth/2)/innerWidth, y = (e.clientY - innerHeight/2)/innerHeight; orbs.forEach((o, i) => { const s = (i+1)*14; o.style.transform = `translate(${x*s}px, ${y*s}px)`; }); });

  const card = document.getElementById('onboardCard'), glare = document.getElementById('cardGlare');
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

  // Onboarding Logic
  const slides = document.querySelectorAll('.slide');
  const navDots = document.querySelectorAll('.nav-dot');
  const progressBar = document.getElementById('progressBar');
  const skipBtn = document.getElementById('skipBtn');
  const totalSlides = slides.length;
  let currentSlide = 0;

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentSlide = index;
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    navDots.forEach((d, i) => { d.classList.remove('active', 'done'); if (i === index) d.classList.add('active'); if (i < index) d.classList.add('done'); });
    progressBar.style.width = ((index + 1) / totalSlides * 100) + '%';
    skipBtn.style.display = index === totalSlides - 1 ? 'none' : 'block';
  }

  skipBtn.addEventListener('click', () => goToSlide(totalSlides - 1));
  navDots.forEach(dot => dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index))));

  // Slide 1: Get Started
  document.getElementById('getStartedBtn1').addEventListener('click', () => goToSlide(1));

  // Slide 2: Interest Chips (Role)
  let selectedRole = 'Developer';
  document.querySelectorAll('#interestChips .interest-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#interestChips .interest-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      selectedRole = chip.dataset.value;
      document.getElementById('selectedRole').textContent = 'Selected: ' + chip.textContent.trim();
    });
  });
  document.getElementById('nextFromRoleBtn').addEventListener('click', () => goToSlide(2));

  // Slide 3: Topic Chips
  document.querySelectorAll('#topicChips .interest-chip').forEach(chip => {
    chip.addEventListener('click', () => chip.classList.toggle('selected'));
  });
  document.getElementById('nextFromTopicBtn').addEventListener('click', () => goToSlide(3));

  // Slide 4: Profile
  document.getElementById('avatarUploadBtn').addEventListener('click', () => document.getElementById('avatarInput').click());
  document.getElementById('avatarInput').addEventListener('change', function() {
    const f = this.files[0];
    if (f) { const r = new FileReader(); r.onload = e => { document.getElementById('avatarPreview').innerHTML = `<img src="${e.target.result}" alt="Avatar">`; }; r.readAsDataURL(f); }
  });
  document.getElementById('completeSetupBtn').addEventListener('click', () => {
    const name = document.getElementById('displayName').value.trim();
    if (!name) { showToast('Please enter your display name', 'error'); return; }
    goToSlide(4);
  });

  // Slide 5: Dashboard
  document.getElementById('goToDashboardBtn').addEventListener('click', () => showToast('Redirecting to dashboard... 🚀', 'success'));

  // Swipe
  let touchStartX = 0;
  const slidesContainer = document.getElementById('slidesContainer');
  slidesContainer.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  slidesContainer.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { if (diff > 0) goToSlide(currentSlide + 1); else goToSlide(currentSlide - 1); }
  });

  // Keyboard
  document.addEventListener('keydown', e => { if (e.key === 'ArrowRight') goToSlide(currentSlide + 1); if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1); });

  function showToast(msg, type) { const c = document.getElementById('toastContainer'), t = document.createElement('div'); t.className = `toast ${type}`; t.innerHTML = `<span style="font-weight:700;color:${type==='success'?'var(--success)':'var(--danger)'}">${type==='success'?'✓':'✕'}</span><span>${msg}</span><div class="toast-progress"></div>`; c.appendChild(t); setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(120px)';t.style.transition='all 0.35s ease';setTimeout(()=>t.remove(),350);},3200); }

  console.log('🔷 UIXForge — AUTH-010 Onboarding Ready');
  console.log('📦 Part of 200+ Production-Ready Components');
  console.log('📱 5 Slides: Welcome → Role → Topics → Profile → Done');
})();