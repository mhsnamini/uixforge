# AUTH-002 — Ethereal Register Form

A premium glassmorphism registration form built with pure HTML, CSS, and JavaScript.

Designed for modern authentication flows with immersive visuals, smooth micro-interactions, real-time validation, and zero external dependencies.

![AUTH-002 Preview](preview.png)

---

## ✨ Highlights

* Glassmorphism UI with Midnight theme
* Real-time password strength indicator
* Live password confirmation validation
* Animated floating labels
* Show / Hide password toggles
* Interactive particle background
* 3D card tilt and dynamic glare
* Custom animated cursor
* Keystroke particle effects
* Success state animations
* Social registration buttons
* Toast notification system
* Fully responsive layout
* Accessibility-friendly markup
* Zero dependencies

---

## 🚀 Demo

Preview the component locally by opening `index.html` in your browser.

---

## 📂 Project Structure

```text
AUTH-002/
│
├── index.html
├── style.css
├── script.js
├── preview.png
└── README.md
```

| File          | Purpose                                |
| ------------- | -------------------------------------- |
| `index.html`  | Semantic form structure                |
| `style.css`   | Styling, animations, responsive design |
| `script.js`   | Validation and interactive effects     |
| `preview.png` | Component preview image                |
| `README.md`   | Documentation                          |

---

## 🛠 Features

### Authentication

* Full Name field
* Email validation
* Password strength meter
* Confirm password matching
* Terms & Conditions agreement

### User Experience

* Floating labels
* Interactive hover states
* Ripple effects
* Magnetic social buttons
* Loading state animations
* Success feedback animation
* Toast notifications

### Visual Effects

* Glassmorphism card
* Animated gradient border
* Orbit rings
* Particle system
* Parallax background orbs
* Custom cursor
* 3D perspective tilt
* Dynamic light reflections

---

## 📋 Form Validation

| Field            | Rules                           |
| ---------------- | ------------------------------- |
| Full Name        | Required                        |
| Email Address    | Required + valid email          |
| Password         | Required + minimum 6 characters |
| Confirm Password | Must match password             |
| Terms Agreement  | Required                        |

---

## 🎨 Color Palette

| Token        | Value     |
| ------------ | --------- |
| Background   | `#020617` |
| Card Surface | `#0f1535` |
| Primary      | `#6c5ce7` |
| Secondary    | `#00cec9` |
| Highlight    | `#a855f7` |
| Accent       | `#fdcb6e` |
| Success      | `#10b981` |
| Error        | `#ef4444` |
| Text         | `#f1f5f9` |
| Muted Text   | `#94a3b8` |

---

## 📱 Responsive Behavior

| Screen Size | Layout                                   |
| ----------- | ---------------------------------------- |
| Desktop     | Full visual experience                   |
| Tablet      | Optimized spacing                        |
| Mobile      | Compact layout, hidden orbit decorations |

---

## ⚙️ Customization

### Theme Colors

```css
:root {
  --primary: #6c5ce7;
  --secondary: #00cec9;
  --accent: #fdcb6e;
  --bg-deep: #020617;
}
```

### Glass Effect

```css
.register-card {
  background: rgba(15, 21, 53, 0.5);
  backdrop-filter: blur(45px);
}
```

### Particle Density

```javascript
for (let i = 0; i < 75; i++) {
  particles.push(new Particle());
}
```

---

## 🎬 Animations

| Element        | Animation           |
| -------------- | ------------------- |
| Logo           | Floating Pulse      |
| Card           | Border Glow         |
| Labels         | Float Up            |
| Password Meter | Dynamic Fill        |
| Toast          | Slide In            |
| Success State  | Checkmark Pop       |
| Orbit Rings    | Continuous Rotation |
| Buttons        | Hover Lift          |
| Cursor         | Spring Motion       |

---

## ♿ Accessibility

* Semantic HTML structure
* Keyboard navigation support
* Focus-visible states
* ARIA labels
* Screen-reader friendly form controls
* Sufficient contrast ratios

---

## ⚡ Performance

* No frameworks
* No build tools
* No package managers
* No external dependencies
* Optimized animations using `transform` and `opacity`
* Lightweight SVG icon system

---

## 🔧 Installation

### Option 1 — Direct Use

```html
<link rel="stylesheet" href="style.css">

<!-- Component Markup -->

<script src="script.js"></script>
```

### Option 2 — Clone Repository

```bash
git clone https://github.com/mohsenamini/uixforge.git
```

---

## 📦 UIXForge Collection

AUTH-002 is part of the **UIXForge** component library.

Available Authentication Components:

| Component | Description               |
| --------- | ------------------------- |
| AUTH-001  | Minimal Login Form        |
| AUTH-002  | Ethereal Register Form    |
| AUTH-003  | Password Reset Flow       |
| AUTH-004  | Two-Factor Authentication |
| AUTH-005  | Magic Link Authentication |

---

## 🗺 Roadmap

* [ ] Dark / Light theme switcher
* [ ] Password generator
* [ ] OAuth integration
* [ ] React version
* [ ] Vue version
* [ ] Automated testing
* [ ] Figma source file

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push your branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

## 🐛 Issues

Found a bug or have a feature request?

Please open an issue in the repository.

---

## 📄 License

Licensed under the MIT License.

---

## 👨‍💻 Author

**Mohsen Amini**

GitHub: https://github.com/mohsenamini

---

<div align="center">

### UIXForge

Crafting premium UI experiences for modern web applications.

</div>
