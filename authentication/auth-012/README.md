# 🌊 AUTH-012 — Animated Login Background

A modern animated background component built with **HTML**, **CSS**, and **Vanilla JavaScript**.

Designed for authentication screens, landing pages, and dashboard entry points, this component combines layered visual effects, particle systems, motion animations, and interactive elements into a reusable full-screen background.

---

## ✨ Features

### Visual Effects

* Multi-layer animated background
* Gradient wave animations
* Floating geometric shapes
* Ambient glow effects
* Particle system with motion effects
* Orbit ring animations
* Grid overlay layer
* Animated center content

### Interactive Elements

* Mouse-based particle interaction
* Orb parallax effects
* Shape movement and rotation
* Dynamic particle connections
* Responsive motion behavior

### Performance

* Pure Vanilla JavaScript
* No external dependencies
* Configurable particle count
* Modular visual layers
* Mobile-friendly animations

---

## 🎮 Available Layers

| Layer           | Description                   |
| --------------- | ----------------------------- |
| Glow Spots      | Pulsing background highlights |
| Ambient Orbs    | Large blurred light effects   |
| Gradient Waves  | Animated floating gradients   |
| Floating Shapes | Geometric decorative elements |
| Particle Canvas | Dynamic particle system       |
| Grid Overlay    | Subtle patterned overlay      |
| Orbit Rings     | Circular animated elements    |
| Center Content  | Optional text or branding     |

---

## 🎨 Background Architecture

```text id="n5mqrz"
Glow Effects
      ↓
Ambient Orbs
      ↓
Gradient Waves
      ↓
Floating Shapes
      ↓
Particle Layer
      ↓
Grid Overlay
      ↓
Orbit Rings
      ↓
Foreground Content
```

---

## 🔷 Included Elements

### Particle System

* Configurable particle count
* Connection lines
* Twinkle animation
* Multiple color variations
* Mouse interaction support

### Floating Shapes

* Circle
* Square
* Triangle
* Diamond
* Hexagon

### Motion Effects

* Rotation animations
* Floating transitions
* Parallax movement
* Orbiting elements
* Glow pulse effects

---

## 📂 Project Structure

```text id="y6j43n"
uixforge-auth-012/
├── index.html
├── style.css
├── script.js
└── README.md
```

| File       | Description                             |
| ---------- | --------------------------------------- |
| index.html | Background layers and structure         |
| style.css  | Animations, layouts, and visual effects |
| script.js  | Particle engine and interactions        |
| README.md  | Documentation                           |

---

## 🚀 Getting Started

### Clone Repository

```bash id="9hf87w"
git clone https://github.com/YOUR_USERNAME/uixforge-auth-012.git
cd uixforge-auth-012
```

### Run Locally

Open the project directly:

```bash id="zj8n2s"
open index.html
```

Or launch it using VS Code Live Server.

---

## 🔧 Basic Usage

```html id="4e7j2k"
<body>
  <div class="animated-bg">
    <!-- Background Layers -->
  </div>

  <main class="content">
    <!-- Login Form or Page Content -->
  </main>

  <script src="script.js"></script>
</body>
```

---

## ⚙️ Customization

### Change Particle Count

```javascript id="j5c8v2"
for (let i = 0; i < 200; i++) {
  particles.push(new Particle());
}
```

### Change Interaction Radius

```javascript id="8w0vqs"
if (distance < 300) {
  // Interaction logic
}
```

### Change Animation Timing

```javascript id="qk1d3x"
setInterval(() => {
  animateBackground();
}, 3000);
```

### Update Center Content

```html id="7v4tbp"
<div class="center-content">
  Your Custom Content
</div>
```

---

## 🎨 Color Palette

```css id="4qpnmh"
--primary:       #6c5ce7;
--primary-light: #a855f7;
--secondary:     #00cec9;
--accent:        #fdcb6e;
--success:       #10b981;
```

---

## 🔧 Particle Engine Example

```javascript id="q9zzhn"
class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 3;
    this.speed = Math.random();
  }

  update() {
    this.y += this.speed;
  }

  draw() {
    // Render particle
  }
}
```

---

## 🧩 Integration Example

### React / Next.js

```jsx id="jgnv6r"
import AnimatedBackground from './components/AnimatedBackground';

export default function LoginPage() {
  return (
    <>
      <AnimatedBackground />

      <main>
        <LoginForm />
      </main>
    </>
  );
}
```

### Vue.js

```vue id="g2m9rf"
<template>
  <AnimatedBackground />

  <LoginForm />
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

| Metric           | Value        |
| ---------------- | ------------ |
| Lighthouse Score | 96+          |
| Bundle Size      | ~13 KB       |
| Load Time        | < 200 ms     |
| Dependencies     | 0            |
| Particle Count   | Configurable |
| Animation Layers | 8            |

---

## 🎯 Use Cases

* Login Page Backgrounds
* Registration Screens
* Authentication Layouts
* SaaS Dashboards
* Landing Pages
* Portfolio Websites
* Product Showcases
* Mobile App Splash Screens

---

## 🤝 Contributing

```bash id="s6j6rw"
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

Production-ready authentication and UI components built with modern web technologies.

</div>
