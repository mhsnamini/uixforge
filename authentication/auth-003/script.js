(function() {
  'use strict';

  // =============================================
  // CUSTOM CURSOR
  // =============================================
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mouseX = -1000, mouseY = -1000;
  let curX = -1000, curY = -1000;
  let velX = 0, velY = 0;
  const spring = 0.14, damping = 0.72;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateCursor() {
    const dx = mouseX - curX;
    const dy = mouseY - curY;
    velX += dx * spring;
    velY += dy * spring;
    velX *= damping;
    velY *= damping;
    curX += velX;
    curY += velY;
    cursor.style.left = curX + 'px';
    cursor.style.top = curY + 'px';
    cursorDot.style.left = curX + 'px';
    cursorDot.style.top = curY + 'px';
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  document.addEventListener('mousedown', () => {
    cursor.classList.add('click');
    setTimeout(() => cursor.classList.remove('click'), 350);
  });

  const hoverTargets = document.querySelectorAll('input, button, .back-link, .resend-btn, .alt-method-btn');
  hoverTargets.forEach(el => {
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
    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 14;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // =============================================
  // 3D CARD TILT + GLARE
  // =============================================
  const card = document.getElementById('otpCard');
  const glare = document.getElementById('cardGlare');
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = (y - cy) / cy * -7;
    const ry = (x - cx) / cx * 7;
    card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`;
    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;
    glare.style.opacity = '0.5';
    glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.1) 0%, transparent 60%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
    glare.style.opacity = '0';
  });

  // =============================================
  // PARTICLE SYSTEM
  // =============================================
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let pMouse = { x: -1000, y: -1000 };

  document.addEventListener('mousemove', (e) => {
    pMouse.x = e.clientX;
    pMouse.y = e.clientY;
  });

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.speedY = (Math.random() - 0.5) * 0.35;
      this.opacity = Math.random() * 0.45 + 0.08;
      this.life = 1;
      this.decay = Math.random() * 0.0022 + 0.0008;
    }
    update() {
      const dx = pMouse.x - this.x;
      const dy = pMouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const force = (150 - dist) / 150;
        this.speedX -= (dx / dist) * force * 0.45;
        this.speedY -= (dy / dist) * force * 0.45;
      }
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedX *= 0.985;
      this.speedY *= 0.985;
      this.life -= this.decay;
      if (this.life <= 0 || this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
        this.reset();
      }
    }
    draw(ctx) {
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
      g.addColorStop(0, `rgba(108,92,231,${this.opacity * this.life})`);
      g.addColorStop(1, 'rgba(108,92,231,0)');
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }
  }

  for (let i = 0; i < 75; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(ctx); });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const op = (1 - dist / 130) * 0.075 * particles[i].life * particles[j].life;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108,92,231,${op})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // =============================================
  // DISPLAY EMAIL (Simulated)
  // =============================================
  const displayEmail = document.getElementById('displayEmail');
  displayEmail.textContent = localStorage.getItem('otp_email') || 'user@uixforge.dev';

  // =============================================
  // OTP INPUT LOGIC
  // =============================================
  const otpInputs = document.querySelectorAll('.otp-field');
  const otpForm = document.getElementById('otpForm');
  const verifyBtn = document.getElementById('verifyBtn');
  const errorMessage = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');

  otpInputs.forEach((input, index) => {
    // Auto-focus next input
    input.addEventListener('input', (e) => {
      const value = e.target.value;
      
      // Only allow digits
      if (!/^\d$/.test(value)) {
        e.target.value = '';
        return;
      }
      
      input.classList.add('filled');
      
      // Move to next input
      if (value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
      
      // Check if all filled
      checkAllFilled();
    });

    // Handle backspace
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        otpInputs[index - 1].focus();
        otpInputs[index - 1].classList.remove('filled');
      }
      
      // Handle left/right arrows
      if (e.key === 'ArrowLeft' && index > 0) {
        otpInputs[index - 1].focus();
      }
      if (e.key === 'ArrowRight' && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    // Paste handler
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData).getData('text');
      const digits = pasteData.replace(/\D/g, '').slice(0, 6);
      
      if (digits.length > 0) {
        digits.split('').forEach((digit, i) => {
          if (otpInputs[i]) {
            otpInputs[i].value = digit;
            otpInputs[i].classList.add('filled');
          }
        });
        
        // Focus last filled or next empty
        const nextEmpty = Math.min(digits.length, otpInputs.length - 1);
        otpInputs[nextEmpty].focus();
        checkAllFilled();
      }
    });
  });

  function checkAllFilled() {
    const allFilled = Array.from(otpInputs).every(input => input.value.length === 1);
    verifyBtn.disabled = !allFilled;
    return allFilled;
  }

  function getOtpValue() {
    return Array.from(otpInputs).map(input => input.value).join('');
  }

  function showError(msg) {
    errorText.textContent = msg;
    errorMessage.classList.add('show');
    otpInputs.forEach(input => input.classList.add('error'));
    setTimeout(() => {
      otpInputs.forEach(input => input.classList.remove('error'));
    }, 600);
  }

  function clearError() {
    errorMessage.classList.remove('show');
  }

  // =============================================
  // TIMER LOGIC
  // =============================================
  const timerDisplay = document.getElementById('timerDisplay');
  const timerText = document.getElementById('timerText');
  const resendBtn = document.getElementById('resendBtn');
  let timeLeft = 120; // 2 minutes
  let timerInterval;

  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerText.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Color changes
    timerDisplay.classList.remove('warning', 'danger');
    if (timeLeft <= 30) timerDisplay.classList.add('danger');
    else if (timeLeft <= 60) timerDisplay.classList.add('warning');
  }

  function startTimer() {
    timeLeft = 120;
    resendBtn.disabled = true;
    updateTimerDisplay();
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        resendBtn.disabled = false;
        timerText.textContent = '00:00';
        timerDisplay.classList.remove('danger');
      }
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    startTimer();
    clearError();
    otpInputs.forEach(input => {
      input.value = '';
      input.classList.remove('filled', 'error');
    });
    otpInputs[0].focus();
    verifyBtn.disabled = true;
  }

  resendBtn.addEventListener('click', () => {
    if (!resendBtn.disabled) {
      showToast('New code sent!', 'success');
      resetTimer();
    }
  });

  // Start timer on load
  startTimer();
  otpInputs[0].focus();

  // =============================================
  // FORM SUBMIT + SUCCESS
  // =============================================
  const successOverlay = document.getElementById('successOverlay');
  const successIconWrap = document.getElementById('successIconWrap');

  function spawnSuccessSparks() {
    for (let i = 0; i < 16; i++) {
      const spark = document.createElement('div');
      spark.className = 'success-spark';
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 80;
      spark.style.setProperty('--sx', Math.cos(angle) * distance + 'px');
      spark.style.setProperty('--sy', Math.sin(angle) * distance + 'px');
      spark.style.left = '42px';
      spark.style.top = '42px';
      successIconWrap.appendChild(spark);
      setTimeout(() => spark.remove(), 1000);
    }
  }

  otpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    clearError();
    
    const otpValue = getOtpValue();
    
    if (otpValue.length !== 6) {
      showError('Please enter all 6 digits.');
      return;
    }
    
    // Simulate verification (correct code: 123456)
    if (otpValue !== '123456') {
      showError('Invalid code. Please try again.');
      return;
    }
    
    verifyBtn.classList.add('loading');
    clearInterval(timerInterval);
    
    setTimeout(() => {
      verifyBtn.classList.remove('loading');
      successOverlay.classList.add('show');
      spawnSuccessSparks();
      
      setTimeout(() => {
        successOverlay.classList.remove('show');
        resetTimer();
      }, 3000);
    }, 1500);
  });

  // =============================================
  // ALTERNATIVE METHOD
  // =============================================
  document.getElementById('altMethodBtn').addEventListener('click', () => {
    showToast('New email sent! Check your inbox.', 'success');
    resetTimer();
  });

  // =============================================
  // BACK LINK
  // =============================================
  document.querySelector('.back-link').addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Redirecting to login...', 'success');
  });

  // =============================================
  // TOAST SYSTEM
  // =============================================
  function showToast(msg, type) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span style="font-weight:700;color:${type === 'success' ? 'var(--success)' : 'var(--danger)'}">${type === 'success' ? '✓' : '✕'}</span>
      <span>${msg}</span>
      <div class="toast-progress"></div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(120px)';
      toast.style.transition = 'all 0.35s ease';
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }

  console.log('🔷 UIXForge — AUTH-003 OTP Verification Ready');
  console.log('📦 Part of 200+ Production-Ready Components');
  console.log('🔑 Test Code: 123456');
})();