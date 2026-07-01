````markdown
# 🔗 AUTH-006 — Social Login Buttons

<div align="center">
  <img src="https://img.shields.io/badge/UIXForge-Component%20Library-6c5ce7?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTEyIDJMJTIgN3YxMGwxMCA1IDEwLTVWN0wxMiAyWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuOCIvPjwvc3ZnPg==" alt="UIXForge"/>
  <img src="https://img.shields.io/badge/AUTH--006-Social%20Login%20Buttons-6c5ce7?style=for-the-badge" alt="AUTH-006"/>
  <img src="https://img.shields.io/badge/Vanilla-JS-fdcb6e?style=for-the-badge&logo=javascript" alt="Vanilla JS"/>
  <img src="https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge" alt="License"/>
</div>

<br/>

<div align="center">
  <img src="https://img.shields.io/badge/🔗%206-Providers-6c5ce7?style=flat-square"/>
  <img src="https://img.shields.io/badge/🎨%20Glassmorphism-Design-a855f7?style=flat-square"/>
  <img src="https://img.shields.io/badge/💧%20Ripple-Effect-00cec9?style=flat-square"/>
  <img src="https://img.shields.io/badge/✨%20Shimmer-Hover-fdcb6e?style=flat-square"/>
  <img src="https://img.shields.io/badge/📱%20Fully-Responsive-10b981?style=flat-square"/>
</div>

<br/>

> 🚀 **Part of 200+ Production-Ready Components by UIXForge**  
> A stunning collection of social login buttons with provider-specific colors, ripple effects, and smooth animations.

<br/>

---

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>🔗 Providers</h3>
      <ul>
        <li>✅ Google — #4285F4</li>
        <li>✅ GitHub — #6e5494</li>
        <li>✅ Apple — #000000</li>
        <li>✅ Microsoft — #00A4EF</li>
        <li>✅ X (Twitter) — #1DA1F2</li>
        <li>✅ Discord — #5865F2</li>
        <li>✅ "Sign in with Email" link</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🎨 Visual</h3>
      <ul>
        <li>✨ Glassmorphism Card Design</li>
        <li>🖱️ Custom Cursor with Spring Physics</li>
        <li>🔄 3D Card Tilt on Mouse Move</li>
        <li>🌌 Particle System Background</li>
        <li>💧 Ripple Effect on Click</li>
        <li>✨ Shimmer Animation on Hover</li>
        <li>🎯 Provider-Specific Color Accents</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🎮 Interactive Elements

| Element | Description |
|---|---|
| **Social Buttons** | 6 provider buttons with icons + labels + arrows |
| **Hover Effect** | Slide right + shimmer + icon scale + provider color border |
| **Ripple Effect** | Colored ripple expands from click point |
| **Arrow Animation** | Arrow slides right on hover |
| **Provider Colors** | Each button gets its brand color on hover |
| **Email Link** | "Sign in with Email" with animated arrow |
| **3D Tilt** | Entire card follows mouse movement |
| **Toast Notifications** | Success/error messages with progress bar |

---

## 🔑 Provider Color Map

| Provider | Color | Hover Border |
|---|---|---|
| **Google** | `#4285F4` | Blue border + blue icon bg |
| **GitHub** | `#6e5494` | Purple border + purple icon bg |
| **Apple** | `#000000` | White border + white icon bg |
| **Microsoft** | `#00A4EF` | Cyan border + cyan icon bg |
| **X (Twitter)** | `#1DA1F2` | Sky blue border + sky blue icon bg |
| **Discord** | `#5865F2` | Indigo border + indigo icon bg |

---

## 📁 Project Structure

```text
uixforge-auth-006/
├── index.html          # Main HTML with 6 social buttons
├── style.css           # All styles (Glassmorphism + Provider Colors)
├── script.js           # Click handlers, ripple, particles
└── README.md           # Documentation
````

**Zero dependencies — Pure Vanilla JS** ⚡

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/uixforge-auth-006.git
cd uixforge-auth-006
```

### 2. Open in Browser

```bash
# Just open index.html
open index.html

# Or use Live Server (VS Code)
code .
# Right-click index.html → "Open with Live Server"
```

### 3. Add Real OAuth

```javascript
// Replace click handler with real OAuth
document.querySelectorAll('.social-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const provider = this.dataset.provider;

    // Redirect to OAuth endpoint
    window.location.href = `/api/auth/${provider.toLowerCase()}`;

    // Or use Firebase Auth
    // const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider);
  });
});
```

---

## 🎨 Color Palette

```css
--primary:       #6c5ce7   /* Royal Purple */
--primary-light: #a855f7   /* Soft Violet */
--secondary:     #00cec9   /* Cyan Teal */
--accent:        #fdcb6e   /* Golden Yellow */
--success:       #10b981   /* Emerald Green */
--danger:        #ef4444   /* Cherry Red */
```

---

## 🔧 Customization Examples

### Add a New Provider

```html
<button class="social-btn" data-provider="LinkedIn" data-color="#0A66C2">
  <div class="social-icon-wrapper">
    <!-- LinkedIn SVG icon -->
  </div>
  <span class="social-label">Continue with LinkedIn</span>
  <span class="social-arrow">→</span>
  <div class="social-shimmer"></div>
</button>
```

```css
.social-btn[data-provider="LinkedIn"]:hover {
  border-color: rgba(10,102,194,0.5);
}

.social-btn[data-provider="LinkedIn"]:hover .social-icon-wrapper {
  background: rgba(10,102,194,0.15);
  color: #0A66C2;
}
```

### Remove a Provider

```html
<!-- <button class="social-btn" data-provider="Discord">...</button> -->
```

### Change Button Order

```html
<div class="social-grid">
  <button class="social-btn" data-provider="Google">...</button>
  <button class="social-btn" data-provider="Apple">...</button>
</div>
```

---

## 🧩 Integration Guide

### React / Next.js

```jsx
import SocialLogin from './components/SocialLogin';

function LoginPage() {
  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <SocialLogin
      providers={['google', 'github', 'apple']}
      onLogin={handleSocialLogin}
    />
  );
}
```

### Vue.js

```vue
<template>
  <SocialLogin
    :providers="['google', 'github', 'microsoft']"
    @login="handleSocialLogin"
  />
</template>
```

> ⚠️ Full framework integrations coming soon!

---

## 🌐 Browser Support

| Browser     | Support |
| ----------- | ------- |
| Chrome 90+  | ✅ Full  |
| Firefox 88+ | ✅ Full  |
| Safari 14+  | ✅ Full  |
| Edge 90+    | ✅ Full  |
| Opera 76+   | ✅ Full  |

---

## 📊 Performance

| Metric           | Score           |
| ---------------- | --------------- |
| **Lighthouse**   | 98+             |
| **Page Size**    | ~18KB (gzipped) |
| **Load Time**    | < 200ms         |
| **Dependencies** | 0 (Zero!)       |

---

## 🎯 Use Cases

* 🔐 Social Authentication Pages
* 🚀 Quick Login/Signup Flows
* 💼 SaaS Onboarding
* 🛒 E-commerce Login
* 📱 Mobile-First Web Apps
* 🎮 Gaming Platforms

---

## 📦 UIXForge Component Library

| Component                | ID           | Description             |
| ------------------------ | ------------ | ----------------------- |
| Login Form               | AUTH-001     | Ethereal Login Form     |
| Register Form            | AUTH-002     | Multi-step Registration |
| OTP Verification         | AUTH-003     | 6-Digit Code Screen     |
| Password Reset           | AUTH-004     | 3-Step Reset Flow       |
| Forgot Password Modal    | AUTH-005     | Modal with 2-Step Flow  |
| **Social Login Buttons** | **AUTH-006** | **This component** ✨    |

---

## 🤝 Contributing

```bash
# 1. Fork the repo
# 2. Create feature branch
git checkout -b feature/add-spotify-provider

# 3. Commit changes
git commit -m "✨ Add Spotify social login button"

# 4. Push to branch
git push origin feature/add-spotify-provider

# 5. Open Pull Request 🎉
```

---

## 📄 License

MIT © UIXForge

---

## 🔗 Links

<div align="center">

[![Telegram](https://img.shields.io/badge/Source%20Code-Telegram-26A5E4?style=for-the-badge\&logo=telegram)](https://t.me/uixforge)

[![GitHub](https://img.shields.io/badge/Components-GitHub-181717?style=for-the-badge\&logo=github)](https://github.com/uixforge)

[![Website](https://img.shields.io/badge/Docs-Website-6c5ce7?style=for-the-badge\&logo=google-chrome)](https://uixforge.dev)

</div>

---

<div align="center">
  <br/>
  <img src="https://img.shields.io/badge/Made%20with-❤️%20by%20UIXForge-6c5ce7?style=for-the-badge"/>
  <br/><br/>
  <sub>⚡ 200+ Components • Zero Dependencies • Production Ready</sub>
</div>
```
