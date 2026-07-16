````markdown
# 👤 AUTH-014 — Role Selection Screen

Select a role and personalize the onboarding experience with interactive role cards, dynamic theming, and smooth micro-interactions.

---

## ✨ Features

### 👤 Role Selection System
- ✅ 4 predefined roles
- ✅ Distinct color theme for each role
- ✅ Active selection state with animated checkmark
- ✅ Dynamic CTA button based on selected role
- ✅ Skip option for later configuration
- ✅ Success confirmation overlay

### 🎨 User Experience
- ✨ Modern glassmorphism interface
- 🔄 Interactive card hover animations
- 🖱️ Custom cursor effects
- 🌌 Animated particle background
- 🎯 Dynamic visual feedback
- 📱 Fully responsive layout
- 💡 Toast notifications

---

## 🎮 Interactive Elements

| Element | Description |
|----------|-------------|
| Role Cards | Select between available user roles |
| Active State | Border, glow, and checkmark animation |
| Dynamic CTA | Updates role name and theme color |
| Hover Animation | Subtle movement and icon scaling |
| Skip Option | Continue onboarding without selection |
| Success Overlay | Confirmation after role selection |

---

## 👥 Available Roles

| Role | Theme Color | Purpose |
|--------|------------|----------|
| Developer | Purple | Software engineers and developers |
| Designer | Cyan | UI/UX and product designers |
| Product Manager | Gold | Product and project leadership |
| Founder | Violet | Startup founders and executives |

---

## 🎨 Role Theme Mapping

```text
Developer       → #6c5ce7
Designer        → #00cec9
Product Manager → #fdcb6e
Founder         → #a855f7
```

---

## 🔄 Selection Flow

```text
┌─────────────┐
│ Select Role │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Active Card │
│ Highlighted │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ CTA Updates │
│ Theme Color │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Continue    │
│ Onboarding  │
└─────────────┘
```

---

## 📁 Project Structure

```text
uixforge-auth-014/
├── index.html          # Role selection layout
├── style.css           # Card styles & animations
├── script.js           # Selection logic & button updates
└── README.md           # Documentation
```

**Zero dependencies — Pure Vanilla JS** ⚡

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/uixforge-auth-014.git
cd uixforge-auth-014
```

### 2. Launch Project

```bash
# Open directly
open index.html

# Or use Live Server
code .
```

### 3. Add Custom Roles

```javascript
const roles = [
  {
    id: 'student',
    label: 'Student',
    color: '#10b981'
  },
  {
    id: 'teacher',
    label: 'Teacher',
    color: '#3b82f6'
  }
];
```

### Save Selected Role

```javascript
continueBtn.addEventListener('click', async () => {
  await fetch('/api/user/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      role: selectedRole
    })
  });
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

## 🔧 Dynamic Button Logic

```javascript
roleCards.forEach(card => {
  card.addEventListener('click', () => {
    selectedRole = card.dataset.role;
    selectedColor = card.dataset.color;

    continueBtn.textContent =
      `Continue as ${selectedRole}`;

    continueBtn.style.background =
      `linear-gradient(
        135deg,
        ${selectedColor},
        ${selectedColor}cc
      )`;
  });
});
```

---

## 🧩 Integration Guide

### React / Next.js

```jsx
import RoleSelection from './components/RoleSelection';

export default function OnboardingPage() {
  const handleSelect = role => {
    console.log(role);
  };

  return (
    <RoleSelection
      onSelect={handleSelect}
      onSkip={() => {}}
    />
  );
}
```

### Vue.js

```vue
<template>
  <RoleSelection
    @select="handleRoleSelect"
    @skip="handleSkip"
  />
</template>
```

> ⚠️ Full framework integrations coming soon!

---

## 🌐 Browser Support

| Browser | Support |
|----------|----------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Opera 76+ | ✅ Full |

---

## 📊 Performance

| Metric | Score |
|----------|----------|
| Lighthouse | 98+ |
| Page Size | ~15KB |
| Load Time | <200ms |
| Dependencies | 0 |

---

## 🎯 Use Cases

- 👤 User Onboarding
- 🚀 SaaS Setup Flow
- 💼 Team Configuration
- 🏢 Enterprise Provisioning
- 🎮 Character / Class Selection
- 📱 First-Time User Experience

---

## 📦 UIXForge Component Library

| Component | ID | Description |
|------------|-----|-------------|
| Login Form | AUTH-001 | Ethereal Login Form |
| Register Form | AUTH-002 | Multi-Step Registration |
| OTP Verification | AUTH-003 | Verification Screen |
| Password Reset | AUTH-004 | Password Recovery Flow |
| Forgot Password Modal | AUTH-005 | Recovery Modal |
| Social Login Buttons | AUTH-006 | Provider Login Buttons |
| 2FA Authentication | AUTH-007 | App / SMS / Recovery |
| Multi-Step Sign Up | AUTH-008 | Registration Wizard |
| Phone/Email Toggle | AUTH-009 | Toggle Authentication |
| Welcome Onboarding | AUTH-010 | Post-Registration Flow |
| Password Strength | AUTH-011 | Security Strength Meter |
| Animated Background | AUTH-012 | Authentication Backdrop |
| Biometric Auth UI | AUTH-013 | Face ID & Fingerprint |
| **Role Selection** | **AUTH-014** | **This Component** ✨ |

---

## 🤝 Contributing

```bash
# Fork repository
git checkout -b feature/add-more-roles

# Commit changes
git commit -m "✨ Add new onboarding roles"

# Push branch
git push origin feature/add-more-roles
```

Then create a Pull Request 🎉

---

## 📄 License

MIT © UIXForge

---

## 🔗 Links

- Telegram: https://t.me/uixforge
- GitHub: https://github.com/uixforge
- Website: https://uixforge.dev

---

**UIXForge Component Library**

⚡ 200+ Components • Zero Dependencies • Production Ready
````
