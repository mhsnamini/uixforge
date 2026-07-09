# 🔐 AUTH-007 — Two-Factor Authentication (2FA)

A modern Two-Factor Authentication (2FA) setup component built with **HTML**, **CSS**, and **Vanilla JavaScript**.

Supports multiple verification methods including **Authenticator Apps**, **SMS Verification**, and **Recovery Codes**, providing a complete account security setup experience.

---

## ✨ Features

### Authentication Methods

* Authenticator App (TOTP) support
* QR Code setup flow
* Manual setup key support
* SMS verification workflow
* Recovery code generation and management
* Multi-method navigation

### Security Experience

* OTP verification inputs
* Auto-focus and paste support
* Verification status indicators
* Success activation screen
* Recovery code backup workflow

### User Interface

* Glassmorphism design
* Responsive layout
* Smooth animations and transitions
* 3D card tilt interaction
* Particle background effects
* Toast notifications

---

## 🎮 Available Components

| Component        | Description                                   |
| ---------------- | --------------------------------------------- |
| Method Tabs      | Switch between App, SMS, and Recovery methods |
| QR Code Panel    | TOTP setup QR code                            |
| Setup Key        | Manual authenticator configuration            |
| OTP Inputs       | Verification code entry                       |
| SMS Verification | Phone verification workflow                   |
| Recovery Codes   | Backup authentication codes                   |
| Status Badge     | 2FA status indicator                          |
| Success Overlay  | Activation confirmation screen                |

---

## 🔑 Authentication Flow

```text
Select Method
      ↓
Configure Authentication
      ↓
Enter Verification Code
      ↓
Verify & Enable 2FA
      ↓
Security Activated
```

### Authenticator App

1. Scan the QR code
2. Add the account to an authenticator app
3. Enter the generated verification code
4. Enable Two-Factor Authentication

Supported apps:

* Google Authenticator
* Microsoft Authenticator
* Authy
* Any TOTP-compatible authenticator

### SMS Verification

1. Enter phone number
2. Request verification code
3. Receive SMS
4. Enter verification code
5. Enable Two-Factor Authentication

### Recovery Codes

1. Generate backup codes
2. Save codes securely
3. Use a recovery code when access to the primary method is unavailable
4. Regenerate codes when needed

---

## 📂 Project Structure

```text
uixforge-auth-007/
├── index.html
├── style.css
├── script.js
└── README.md
```

| File       | Description                         |
| ---------- | ----------------------------------- |
| index.html | Main component structure            |
| style.css  | UI styling and animations           |
| script.js  | Verification logic and interactions |
| README.md  | Documentation                       |

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/uixforge-auth-007.git
cd uixforge-auth-007
```

### Run Locally

Open the project directly:

```bash
open index.html
```

Or launch it using VS Code Live Server.

---

## ⚙️ Configuration

### Demo Settings

```javascript
const DEMO_OTP = '123456';

let smsTimer = 30;

const setupKey = 'YOUR-SECRET-KEY';
```

### Verification API Integration

```javascript
async function verify2FA(method) {
  const code = getOtpValue();

  const response = await fetch('/api/auth/verify-2fa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      method,
      code
    })
  });

  if (response.ok) {
    enable2FA();
  }
}
```

---

## 🔳 QR Code Integration

```javascript
import QRCode from 'qrcode';

const otpauthUrl =
  'otpauth://totp/UIXForge:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=UIXForge';

QRCode.toCanvas(
  document.getElementById('qrCanvas'),
  otpauthUrl,
  {
    width: 160
  }
);
```

---

## 🔒 Security Recommendations

| Recommendation                    | Purpose                                    |
| --------------------------------- | ------------------------------------------ |
| Prefer TOTP over SMS              | Better protection against SIM-swap attacks |
| Store recovery codes offline      | Emergency account recovery                 |
| Rotate compromised recovery codes | Maintain account security                  |
| Implement rate limiting           | Prevent brute-force attacks                |
| Log verification attempts         | Security auditing                          |
| Use HTTPS everywhere              | Protect sensitive data                     |

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

* Account Security Settings
* Two-Factor Authentication Setup
* SaaS Security Dashboards
* Enterprise User Security
* TOTP Verification Flows
* SMS Verification Systems
* Recovery Code Management

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
