(function() {
    'use strict';

    // =============================================
    // CUSTOM CURSOR
    // =============================================
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
        setTimeout(() => cursor.classList.remove('click'), 400);
    });

    const hoverTargets = document.querySelectorAll('input, button, .social-btn, .checkbox-wrapper, .forgot-btn, .signup-link, .toggle-password');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // =============================================
    // PARALLAX ORBS
    // =============================================
    const orbs = document.querySelectorAll('.orb');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth/2) / window.innerWidth;
        const y = (e.clientY - window.innerHeight/2) / window.innerHeight;
        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 15;
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // =============================================
    // 3D CARD TILT + GLARE
    // =============================================
    const card = document.getElementById('loginCard');
    const glare = document.getElementById('cardGlare');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = (y - cy) / cy * -8;
        const ry = (x - cx) / cx * 8;
        
        card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`;
        
        const gx = (x / rect.width) * 100;
        const gy = (y / rect.height) * 100;
        glare.style.opacity = '0.6';
        glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
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
    let mouse = { x: -1000, y: -1000 };

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.life = 1;
            this.decay = Math.random() * 0.003 + 0.001;
        }
        update() {
            // Mouse interaction
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const force = (150 - dist) / 150;
                this.speedX -= (dx / dist) * force * 0.5;
                this.speedY -= (dy / dist) * force * 0.5;
            }
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedX *= 0.99;
            this.speedY *= 0.99;
            this.life -= this.decay;
            if (this.life <= 0 || this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
                this.reset();
            }
        }
        draw(ctx) {
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
            gradient.addColorStop(0, `rgba(108,92,231,${this.opacity * this.life})`);
            gradient.addColorStop(1, 'rgba(108,92,231,0)');
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }

    for (let i = 0; i < 70; i++) particles.push(new Particle());

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(ctx); });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    const op = (1 - dist / 130) * 0.08 * particles[i].life * particles[j].life;
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
    // KEYSTROKE PARTICLES
    // =============================================
    document.querySelectorAll('.form-field').forEach(input => {
        input.addEventListener('keydown', (e) => {
            const wrapper = input.closest('.input-field-wrapper');
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.className = 'keystroke-particle';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                const angle = Math.random() * Math.PI * 2;
                const distance = 20 + Math.random() * 40;
                particle.style.setProperty('--kx', Math.cos(angle) * distance + 'px');
                particle.style.setProperty('--ky', Math.sin(angle) * distance + 'px');
                wrapper.appendChild(particle);
                setTimeout(() => particle.remove(), 600);
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
        if (val.length === 0) {
            strengthMeter.classList.remove('visible');
            strengthBars.forEach(b => { b.className = 'strength-bar'; });
            return;
        }
        strengthMeter.classList.add('visible');
        let score = 0;
        if (val.length >= 6) score++;
        if (val.length >= 10) score++;
        if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        const levels = ['weak', 'weak', 'medium', 'medium', 'strong'];
        strengthBars.forEach((bar, i) => {
            bar.className = 'strength-bar';
            if (i < score) bar.classList.add('active', levels[score - 1] || 'strong');
        });
    });

    // =============================================
    // PASSWORD TOGGLE
    // =============================================
    document.getElementById('togglePassword').addEventListener('click', function() {
        const isPass = passwordInput.type === 'password';
        passwordInput.type = isPass ? 'text' : 'password';
        const eye = document.getElementById('eyeIcon');
        if (isPass) {
            eye.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
        } else {
            eye.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
        }
    });

    // =============================================
    // FORM SUBMIT + SUCCESS OVERLAY
    // =============================================
    const form = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const successOverlay = document.getElementById('successOverlay');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const pass = passwordInput.value.trim();
        if (!email || !pass) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        if (pass.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return;
        }
        submitBtn.classList.add('loading');
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            successOverlay.classList.add('show');
            setTimeout(() => {
                successOverlay.classList.remove('show');
                form.reset();
                strengthMeter.classList.remove('visible');
                strengthBars.forEach(b => b.className = 'strength-bar');
            }, 3000);
        }, 1800);
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
        ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
        showToast(`Connecting to ${provider}...`, 'success');
    });

    // =============================================
    // FORGOT PASSWORD + SIGNUP
    // =============================================
    document.getElementById('forgotPassword').addEventListener('click', () => {
        showToast('Recovery link sent to your email 📧', 'success');
    });
    document.querySelector('.signup-link').addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Redirecting to registration...', 'success');
    });

    // =============================================
    // TOAST SYSTEM
    // =============================================
    function showToast(msg, type) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span style="font-weight:700;color:${type==='success'?'var(--success)':'#ef4444'}">${type==='success'?'✓':'✕'}</span><span>${msg}</span>`;
        container.appendChild(toast);
        setTimeout(() => { toast.style.opacity='0'; toast.style.transform='translateX(100px)'; toast.style.transition='all 0.3s'; setTimeout(()=>toast.remove(),300); }, 3000);
    }

})();