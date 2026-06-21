// script.js – interactive behavior for the login form

(function() {
  'use strict';

  // ---------- PASSWORD TOGGLE VISIBILITY ----------
  const passwordInput = document.getElementById('password');
  const passwordWrapper = passwordInput?.closest('.input-wrapper');

  if (passwordInput && passwordWrapper) {
    // create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'password-toggle';
    toggleBtn.setAttribute('aria-label', 'Show password');
    toggleBtn.innerHTML = '👁️'; // open eye (will be changed)

    passwordWrapper.appendChild(toggleBtn);

    // toggle logic
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const isPassword = passwordInput.type === 'password';
      
      if (isPassword) {
        passwordInput.type = 'text';
        toggleBtn.innerHTML = '🙈'; // hide icon
        toggleBtn.setAttribute('aria-label', 'Hide password');
      } else {
        passwordInput.type = 'password';
        toggleBtn.innerHTML = '👁️';
        toggleBtn.setAttribute('aria-label', 'Show password');
      }
    });
  }

  // ---------- FORM SUBMIT HANDLING (demo) ----------
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // stop real submission

      const emailInput = document.getElementById('email');
      const passwordField = document.getElementById('password');
      const rememberCheck = document.getElementById('remember');

      // simple validation demo
      if (!emailInput.value.trim() || !passwordField.value.trim()) {
        alert('Please fill in both email and password.');
        return;
      }

      // simulate login action (visual feedback)
      const submitBtn = loginForm.querySelector('.login-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Signing in…</span>';
      submitBtn.disabled = true;

      // Mock async request
      setTimeout(() => {
        alert(`✨ Demo login successful!\nEmail: ${emailInput.value}\nRemember me: ${rememberCheck.checked}`);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        // optionally clear sensitive fields? we keep for demo.
      }, 800);
    });
  }

  // ---------- SOCIAL BUTTONS (demo alerts) ----------
  const socialContainer = document.getElementById('socialButtons');
  if (socialContainer) {
    socialContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.social-btn');
      if (!btn) return;
      
      const provider = btn.getAttribute('data-provider') || 'Provider';
      e.preventDefault();
      alert(`🔹 Continue with ${provider} (demo integration)`);
    });
  }

  // ---------- OPTIONAL: REMEMBER ME CHECKBOX visual sync ----------
  const rememberCheckbox = document.getElementById('remember');
  if (rememberCheckbox) {
    // ensure custom check shows correctly on load (already checked by default)
    // just in case dynamic change: we keep CSS handling via :checked.
    // Additionally, we could listen for changes if needed.
    rememberCheckbox.addEventListener('change', function() {
      // This is just for demo; CSS handles visual.
      console.log('Remember me:', rememberCheckbox.checked);
    });
  }

  // Prevent default link actions on "#" to avoid page jumps
  const dummyLinks = document.querySelectorAll('a[href="#"]');
  dummyLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // For forgot password and sign up, we can show a message
      if (link.classList.contains('forgot-link')) {
        alert('🔐 Password reset link would be sent (demo).');
      } else if (link.closest('.signup-link')) {
        alert('📝 Redirect to registration (demo).');
      }
    });
  });

})();