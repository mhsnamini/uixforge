# 📱 AUTH-009 — Phone & Email Login Toggle

A modern authentication component that allows users to switch between **Email Login** and **Phone Login** with a smooth animated toggle.

Built with **HTML**, **CSS**, and **Vanilla JavaScript** — no external dependencies required.

---

## ✨ Features

### Authentication

* Email login with password
* Phone login with country code selector
* Animated toggle between Email and Phone modes
* Password visibility toggle
* Remember Me option
* Forgot Password link
* Basic form validation

### UI & UX

* Glassmorphism card design
* Smooth transitions and animations
* 3D tilt interaction
* Particle background effect
* Toast notifications
* Success overlay animation
* Fully responsive layout

### Social Authentication

* Google Login
* GitHub Login
* Apple Login

---

## 🎮 Available Components

| Component        | Description                               |
| ---------------- | ----------------------------------------- |
| Login Toggle     | Switch between Email and Phone login      |
| Email Form       | Email + Password                          |
| Phone Form       | Country Code + Phone + Password           |
| Country Selector | Dropdown with international dialing codes |
| Password Toggle  | Show / Hide password                      |
| Social Buttons   | Google, GitHub, Apple                     |
| Success Modal    | Login success animation                   |

---

## 🌍 Supported Countries

| Country        | Dial Code |
| -------------- | --------- |
| United States  | +1        |
| United Kingdom | +44       |
| Germany        | +49       |
| France         | +33       |
| India          | +91       |
| Iran           | +98       |
| Japan          | +81       |
| China          | +86       |

---

## 📂 Project Structure

```text
uixforge-auth-009/
├── index.html
├── style.css
├── script.js
└── README.md
```

| File       | Description                            |
| ---------- | -------------------------------------- |
| index.html | Main layout and authentication forms   |
| style.css  | Component styling and animations       |
| script.js  | Toggle logic, validation, interactions |
| README.md  | Documentation                          |

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/uixforge-auth-009.git
cd uixforge-auth-009
```

### Run Locally

Simply open:

```bash
index.html
```

Or use VS Code Live Server.

---

## ⚙️ Customization

### Add New Country

```html
<div
  class="country-option"
  data-code="+61"
  data-flag="🇦🇺"
  data-iso="au">
  🇦🇺 Australia +61
</div>
```

### Modify Phone Validation

```javascript
if (phone.replace(/\D/g, '').length < 10) {
  return;
}
```

### Connect to Backend API

```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    phone,
    password
  })
});
```

---

## 🎨 Color Palette

```css
--primary:       #6c5ce7;
--primary-light: #a855f7;
--secondary:     #00cec9;
--accent:        #fdcb6e;
--success:       #10b981;
--danger:        #ef4444;
```

---

## 🔧 Toggle Logic

```javascript
toggleTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    toggleIndicator.classList.toggle(
      'right',
      target === 'phone'
    );

    formEmail.classList.toggle(
      'active',
      target === 'email'
    );

    formPhone.classList.toggle(
      'active',
      target === 'phone'
    );
  });
});
```

---

## 🌐 Browser Support

| Browser | Version |
| ------- | ------- |
| Chrome  | 90+     |
| Firefox | 88+     |
| Safari  | 14+     |
| Edge    | 90+     |
| Opera   | 76+     |

---

## 📊 Performance

| Metric           | Value    |
| ---------------- | -------- |
| Lighthouse Score | 98+      |
| Bundle Size      | ~20 KB   |
| Load Time        | < 200 ms |
| Dependencies     | 0        |

---

## 🎯 Use Cases

* SaaS Platforms
* E-commerce Applications
* Mobile Authentication
* International Products
* Gaming Platforms
* Membership Systems

---

## 🤝 Contributing

```bash
git checkout -b feature/new-feature

git commit -m "feat: add new feature"

git push origin feature/new-feature
```

Then create a Pull Request.

---

## 📄 License

MIT License

Copyright © UIXForge

---

## 🔗 Resources

* Telegram Community
* GitHub Repository
* Official Documentation

---

<div align="center">

**UIXForge Component Library**

Production-ready UI components built with modern web technologies.

</div>
