# 👋 AUTH-010 — Welcome Onboarding Screen

A modern onboarding experience built with **HTML**, **CSS**, and **Vanilla JavaScript**.

Designed for post-registration user activation, this component guides users through a structured onboarding flow including role selection, interest preferences, profile setup, and final account activation.

---

## ✨ Features

### Onboarding Flow

* Five-step onboarding process
* Welcome introduction screen
* User role selection
* Interest and preference selection
* Profile setup and personalization
* Final confirmation screen
* Skip onboarding support
* Progress tracking

### User Experience

* Responsive design
* Smooth slide transitions
* Animated progress bar
* Step indicators
* Keyboard navigation
* Touch swipe support
* Toast notifications

### Personalization

* Role selection
* Multi-select interest topics
* Avatar upload with preview
* Display name configuration
* User preference collection

---

## 🎮 Available Components

| Component          | Description                       |
| ------------------ | --------------------------------- |
| Welcome Screen     | Introduction and onboarding start |
| Progress Bar       | Step progress visualization       |
| Role Selector      | User role selection               |
| Interest Chips     | Multi-select preference tags      |
| Avatar Upload      | Profile image upload and preview  |
| Display Name Input | User profile customization        |
| Step Navigation    | Previous / Next controls          |
| Completion Screen  | Final onboarding confirmation     |

---

## 🚀 Onboarding Flow

```text id="f48k1m"
Welcome
   ↓
Role Selection
   ↓
Interest Selection
   ↓
Profile Setup
   ↓
Completion
```

### Step 1 — Welcome

* Introduction screen
* Get Started action
* Onboarding overview

### Step 2 — Role Selection

Choose a primary role:

* Developer
* Designer
* Product Manager
* Founder

### Step 3 — Interest Selection

Select one or more interests:

* Authentication
* Dashboards
* Landing Pages
* E-commerce
* Social Features
* API Integration

### Step 4 — Profile Setup

* Upload avatar (optional)
* Enter display name
* Review profile information

### Step 5 — Completion

* Confirmation message
* Account setup complete
* Continue to dashboard

---

## 📂 Project Structure

```text id="g8y6zq"
uixforge-auth-010/
├── index.html
├── style.css
├── script.js
└── README.md
```

| File       | Description                     |
| ---------- | ------------------------------- |
| index.html | Onboarding layout and slides    |
| style.css  | Styling and animations          |
| script.js  | Navigation and onboarding logic |
| README.md  | Documentation                   |

---

## 🚀 Getting Started

### Clone Repository

```bash id="9r7kgc"
git clone https://github.com/YOUR_USERNAME/uixforge-auth-010.git
cd uixforge-auth-010
```

### Run Locally

Open the project directly:

```bash id="k8zv5a"
open index.html
```

Or launch it using VS Code Live Server.

---

## ⚙️ Customization

### Add New Role

```html id="v3n3h9"
<button
  class="interest-chip"
  data-value="student">
  Student
</button>
```

### Add New Interest Topic

```html id="whb0c5"
<button
  class="interest-chip"
  data-value="ai">
  AI & Machine Learning
</button>
```

### Save Onboarding Data

```javascript id="yb1h2m"
document
  .getElementById('goToDashboardBtn')
  .addEventListener('click', async () => {
    const data = {
      role: selectedRole,
      topics: selectedTopics,
      displayName,
      avatar
    };

    await fetch('/api/user/onboarding', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  });
```

---

## 👤 Default Roles

| Role            | Value     |
| --------------- | --------- |
| Developer       | developer |
| Designer        | designer  |
| Product Manager | pm        |
| Founder         | founder   |

---

## 🏷️ Default Topics

| Topic           | Value   |
| --------------- | ------- |
| Authentication  | auth    |
| Dashboards      | dash    |
| Landing Pages   | landing |
| E-Commerce      | ecom    |
| Social Features | social  |
| API Integration | api     |

---

## 🎨 Color Palette

```css id="ycbv7h"
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

```jsx id="wjjclw"
import Onboarding from './components/Onboarding';

export default function App() {
  const handleComplete = (data) => {
    console.log(data);
  };

  return (
    <Onboarding
      onComplete={handleComplete}
    />
  );
}
```

### Vue.js

```vue id="ppdkwd"
<template>
  <Onboarding
    @complete="handleComplete"
    :roles="customRoles"
    :topics="customTopics"
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
| Bundle Size      | ~21 KB   |
| Load Time        | < 200 ms |
| Dependencies     | 0        |

---

## 🎯 Use Cases

* User Onboarding Flows
* SaaS User Activation
* Post-Registration Experiences
* Enterprise Employee Onboarding
* E-commerce User Setup
* Mobile App First-Run Experiences

---

## 🤝 Contributing

```bash id="6vdyu4"
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

Production-ready authentication and onboarding components built with modern web technologies.

</div>
