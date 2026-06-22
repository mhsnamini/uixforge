    (function() {
      'use strict';

      // =============================================
      // CUSTOM CURSOR WITH SPRING PHYSICS
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

      const hoverTargets = document.querySelectorAll('input, button, .social-btn, .checkbox-wrapper, .signin-link, .toggle-password');
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
      const card = document.getElementById('registerCard');
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
      // PARTICLE SYSTEM WITH MOUSE INTERACTION
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
      // FLOATING LABELS
      // =============================================
      document.querySelectorAll('.form-field').forEach(input => {
        input.addEventListener('input', () => {
          input.classList.toggle('filled', input.value.length > 0);
        });
        input.addEventListener('blur', () => {
          input.classList.toggle('filled', input.value.length > 0);
        });
      });

      // =============================================
      // KEYSTROKE PARTICLES
      // =============================================
      document.querySelectorAll('.form-field').forEach(input => {
        input.addEventListener('keydown', (e) => {
          const wrapper = input.closest('.input-field-wrapper');
          const rect = wrapper.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'keystroke-particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            const angle = Math.random() * Math.PI * 2;
            const distance = 18 + Math.random() * 45;
            particle.style.setProperty('--kx', Math.cos(angle) * distance + 'px');
            particle.style.setProperty('--ky', Math.sin(angle) * distance + 'px');
            wrapper.appendChild(particle);
            setTimeout(() => particle.remove(), 650);
          }
        });
      });

      // =============================================
      // PASSWORD STRENGTH
      // =============================================
      const passwordInput = document.getElementById('password');
      const strengthMeter = document.getElementById('passwordStrength');
      const strengthBars = strengthMeter.querySelectorAll('.strength-bar');

      passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        if (!val) {
          strengthMeter.classList.remove('visible');
          strengthBars.forEach(b => b.className = 'strength-bar');
          return;
        }
        strengthMeter.classList.add('visible');
        let score = 0;
        if (val.length >= 6) score++;
        if (val.length >= 10) score++;
        if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
        if (/\d/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;
        const levels = ['weak', 'weak', 'medium', 'medium', 'strong'];
        strengthBars.forEach((bar, i) => {
          bar.className = 'strength-bar';
          if (i < score) bar.classList.add('active', levels[Math.min(score - 1, 4)] || 'strong');
        });
      });

      // =============================================
      // CONFIRM PASSWORD MATCH
      // =============================================
      const confirmInput = document.getElementById('confirmPassword');
      const confirmIndicator = document.getElementById('confirmIndicator');

      function checkConfirmMatch() {
        if (!confirmInput.value) {
          confirmIndicator.classList.remove('show', 'match', 'mismatch');
          confirmIndicator.textContent = '';
          return;
        }
        confirmIndicator.classList.add('show');
        if (confirmInput.value === passwordInput.value) {
          confirmIndicator.classList.add('match');
          confirmIndicator.classList.remove('mismatch');
          confirmIndicator.textContent = '✓';
        } else {
          confirmIndicator.classList.add('mismatch');
          confirmIndicator.classList.remove('match');
          confirmIndicator.textContent = '✕';
        }
      }

      confirmInput.addEventListener('input', checkConfirmMatch);
      passwordInput.addEventListener('input', () => {
        if (confirmInput.value) checkConfirmMatch();
      });

      // =============================================
      // PASSWORD TOGGLE
      // =============================================
      document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.dataset.target;
          const input = document.getElementById(targetId);
          const isPass = input.type === 'password';
          input.type = isPass ? 'text' : 'password';
          const svg = btn.querySelector('svg');
          if (isPass) {
            svg.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
          } else {
            svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
          }
        });
      });

      // =============================================
      // FORM SUBMIT + SUCCESS
      // =============================================
      const form = document.getElementById('registerForm');
      const submitBtn = document.getElementById('submitBtn');
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
          spark.style.left = '45px';
          spark.style.top = '45px';
          successIconWrap.appendChild(spark);
          setTimeout(() => spark.remove(), 1000);
        }
      }

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value.trim();
        const confirm = confirmInput.value.trim();
        const agreeTerms = document.getElementById('agreeTerms').checked;

        if (!fullName || !email || !password || !confirm) {
          showToast('Please fill in all fields', 'error');
          return;
        }
        if (password.length < 6) {
          showToast('Password must be at least 6 characters', 'error');
          return;
        }
        if (password !== confirm) {
          showToast('Passwords do not match', 'error');
          return;
        }
        if (!agreeTerms) {
          showToast('Please agree to Terms & Privacy', 'error');
          return;
        }

        submitBtn.classList.add('loading');
        setTimeout(() => {
          submitBtn.classList.remove('loading');
          successOverlay.classList.add('show');
          spawnSuccessSparks();
          setTimeout(() => {
            successOverlay.classList.remove('show');
            form.reset();
            document.querySelectorAll('.form-field').forEach(f => f.classList.remove('filled'));
            strengthMeter.classList.remove('visible');
            strengthBars.forEach(b => b.className = 'strength-bar');
            confirmIndicator.classList.remove('show', 'match', 'mismatch');
            confirmIndicator.textContent = '';
          }, 3200);
        }, 1900);
      });

      // =============================================
      // SOCIAL BUTTONS + RIPPLE
      // =============================================
      document.getElementById('socialSection').addEventListener('click', function(e) {
        const btn = e.target.closest('.social-btn');
        if (!btn) return;
        const provider = btn.dataset.provider;
        const ripple = document.createElement('div');
        ripple.className = 'social-ripple';
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 750);
        showToast(`Connecting to ${provider}...`, 'success');
      });

      // =============================================
      // SIGN IN LINK
      // =============================================
      document.querySelector('.signin-link').addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Redirecting to sign in...', 'success');
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

      console.log('🔷 UIXForge — AUTH-002 Ethereal Register Form Ready');
      console.log('📦 Part of 200+ Production-Ready Components');
    })();