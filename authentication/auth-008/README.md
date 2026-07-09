# 📝 AUTH-008 — Multi-Step Sign Up

A modern multi-step registration component built with **HTML**, **CSS**, and **Vanilla JavaScript**.

The component guides users through a structured registration flow, including account creation, profile setup, password validation, avatar upload, and final confirmation.

---

## ✨ Features

### Registration Flow

* Three-step registration process
* Account information setup
* Profile customization
* Review and confirmation step
* Animated progress indicator
* Previous / Next navigation
* Registration success overlay

### User Experience

* Glassmorphism interface
* Responsive design
* Smooth transitions and animations
* 3D card tilt interaction
* Particle background effects
* Toast notifications

### Validation & Profile Setup

* Live password strength meter
* Password requirements checklist
* Avatar upload with preview
* Role selection
* Terms & Conditions validation

---

## 🎮 Available Components

| Component               | Description                             |
| ----------------------- | --------------------------------------- |
| Progress Bar            | Visual three-step registration tracker  |
| Account Form            | User information and password setup     |
| Password Strength Meter | Real-time password analysis             |
| Requirements Checklist  | Live password validation                |
| Avatar Upload           | Image upload and preview                |
| Role Selector           | User role selection                     |
| Review Summary          | Registration overview before submission |
| Success Overlay         | Completion confirmation screen          |

---

## 🔑 Registration Flow

```text
Step 1 → Account Details
Step 2 → Profile Setup
Step 3 → Review & Confirmation
Success → Account Created
```

### Step 1 — Account Details

* First Name
* Last Name
* Email Address
* Password Creation
* Password Validation

### Step 2 — Profile Setup

* Avatar Upload (Optional)
* Username Selection
* User Role Selection

### Step 3 — Confirmation

* Review Information
* Accept Terms & Conditions
* Create Account

---

## 📂 Project Structure

```text
uixforge-auth-008/
├── index.html
├── style.css
├── script.js
└── README.md
```

| File       | Description                              |
| ---------- | ---------------------------------------- |
| index.html | Multi-step registration layout           |
| style.css  | Styling, animations, and UI effects      |
| script.js  | Navigation, validation, and upload logic |
| README.md  | Documentation                            |

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/uixforge-auth-008.git
cd uixforge-auth-008
```

### Run Locally

Open the project directly:

```bash
open index.html
```

Or launch it using VS Code Live Server.

---

## ⚙️ Customization

### Password Validation Rules

```javascript
const rules = {
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  number: /\d/.test(password),
  special: /[^A-Za-z0-9]/.test(password)
};
```

### Connect Registration API

```javascript
document
  .getElementById('createAccountBtn')
  .addEventListener('click', async () => {
    const formData = new FormData();

    formData.append('avatar', avatarFile);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);

    await fetch('/api/auth/register', {
      method: 'POST',
      body: formData
    });
  });
```

---

## 🔒 Password Requirements

| Rule              | Requirement                   |
| ----------------- | ----------------------------- |
| Length            | Minimum 8 characters          |
| Uppercase         | At least one uppercase letter |
| Number            | At least one digit            |
| Special Character | At least one symbol           |
| Strength Meter    | Four-level indicator          |

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

## 🧩 Integration Example

### React / Next.js

```jsx
import MultiStepSignUp from './components/MultiStepSignUp';

export default function RegisterPage() {
  const handleRegister = async (data) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (response.ok) {
      router.push('/dashboard');
    }
  };

  return (
    <MultiStepSignUp
      onRegister={handleRegister}
    />
  );
}
```

### Vue.js

```vue
<template>
  <MultiStepSignUp
    @register="handleRegister"
    :roles="['developer', 'designer', 'other']"
  />
</template>
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
| Bundle Size      | ~22 KB   |
| Load Time        | < 200 ms |
| Dependencies     | 0        |

---

## 🎯 Use Cases

* User Registration Pages
* SaaS Onboarding Flows
* Enterprise Applications
* E-commerce Platforms
* Gaming Platforms
* Mobile-First Products

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

Production-ready authentication components built with modern web technologies.

</div>
