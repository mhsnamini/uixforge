# 🔐 AUTH-003 — OTP Verification Screen

<div align="center">
  <img src="https://img.shields.io/badge/AUTH--003-OTP%20Verification-00cec9?style=for-the-badge" alt="AUTH-003"/>
  <img src="https://img.shields.io/badge/Vanilla-JS-fdcb6e?style=for-the-badge&logo=javascript" alt="Vanilla JS"/>
  <img src="https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge" alt="License"/>
</div>

<br/>

> 🚀 A stunning, interactive 6-digit OTP verification screen with real-time validation, countdown timer, particle effects, and modern glassmorphism UI.

---

## ✨ Features

* ✅ 6-Digit OTP Verification
* ✅ Real-time Validation
* ✅ Countdown Timer
* ✅ Resend Code Support
* ✅ Paste OTP Support
* ✅ Keyboard Navigation
* ✅ Responsive Design
* ✅ Glassmorphism UI
* ✅ Animated Background
* ✅ Custom Cursor Effects
* ✅ 3D Tilt Interaction
* ✅ Success & Error States

---

## 🎮 Interactive Elements

| Element             | Description                    |
| ------------------- | ------------------------------ |
| OTP Fields          | Auto focus & paste support     |
| Countdown Timer     | Visual urgency indicators      |
| Resend Button       | Available after expiration     |
| Error State         | Shake animation                |
| Success State       | Animated verification feedback |
| Toast Notifications | User feedback system           |

---

## 🔑 Demo Credentials

```text
OTP Code: 123456
Email: user@uixforge.dev
```

---

## 📁 Project Structure

```text
uixforge-auth-003/
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🚀 Quick Start

### Clone

```bash
git clone https://github.com/YOUR_USERNAME/uixforge-auth-003.git
cd uixforge-auth-003
```

### Run

```bash
open index.html
```

Or use VS Code Live Server.

---

## 🎨 Color Palette

```css
--primary: #6c5ce7;
--primary-light: #a855f7;
--secondary: #00cec9;
--accent: #fdcb6e;
--success: #10b981;
--danger: #ef4444;
```

---

## 🌐 Browser Support

| Browser | Support |
| ------- | ------- |
| Chrome  | ✅       |
| Firefox | ✅       |
| Safari  | ✅       |
| Edge    | ✅       |
| Opera   | ✅       |

---

## 🎯 Use Cases

* Two-Factor Authentication
* Email Verification
* Phone Verification
* Payment Confirmation
* Banking Applications
* Gaming Platforms

---

## 📸 Screenshots

```text
screenshots/
├── default.png
├── error.png
├── success.png
└── expired.png
```

---

## 🔧 Customization

### Change OTP Code

```javascript
if (otpValue !== '123456') {
```

### Change Timer

```javascript
let timeLeft = 120;
```

### Change Theme

```css
:root{
  --primary:#6c5ce7;
  --secondary:#00cec9;
}
```

---

## 🤝 Contributing

```bash
git checkout -b feature/new-feature
git commit -m "Add new feature"
git push origin feature/new-feature
```

---

## 📄 License

MIT License

---

<div align="center">

Made with ❤️

</div>
