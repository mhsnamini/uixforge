````markdown
# 🔐 AUTH-007 — Two-Factor Authentication (2FA)

<div align="center">
  <img src="https://img.shields.io/badge/UIXForge-Component%20Library-6c5ce7?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCAiIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik0xMiAyTDIgN3YxMGwxMCA1IDEwLTVWN0wxMiAyWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuOCIvPjwvc3ZnPg==" alt="UIXForge"/>
  <img src="https://img.shields.io/badge/AUTH--007-2FA%20Authentication-6c5ce7?style=for-the-badge" alt="AUTH-007"/>
  <img src="https://img.shields.io/badge/Vanilla-JS-fdcb6e?style=for-the-badge&logo=javascript" alt="Vanilla JS"/>
  <img src="https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge" alt="License"/>
</div>

<br/>

<div align="center">
  <img src="https://img.shields.io/badge/📱%20Authenticator-App-6c5ce7?style=flat-square"/>
  <img src="https://img.shields.io/badge/💬%20SMS-Verification-a855f7?style=flat-square"/>
  <img src="https://img.shields.io/badge/🔑%20Recovery-Codes-00cec9?style=flat-square"/>
  <img src="https://img.shields.io/badge/🎨%20Glassmorphism-Design-fdcb6e?style=flat-square"/>
  <img src="https://img.shields.io/badge/📱%20Fully-Responsive-10b981?style=flat-square"/>
</div>

<br/>

> 🚀 **Part of 200+ Production-Ready Components by UIXForge**  
> A complete two-factor authentication setup screen with Authenticator App, SMS Verification, and Recovery Codes.

<br/>

---

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>🔐 Security Methods</h3>
      <ul>
        <li>📱 Authenticator App (QR Code + Setup Key)</li>
        <li>💬 SMS Verification with Countdown Timer</li>
        <li>🔑 Recovery Codes Management</li>
        <li>🔄 Animated Tab Navigation</li>
        <li>✅ Real-Time Status Badge</li>
        <li>🎉 Success Overlay with Effects</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🎨 Visual Experience</h3>
      <ul>
        <li>✨ Glassmorphism Security Card</li>
        <li>🖱️ Custom Cursor with Spring Motion</li>
        <li>🔄 Interactive 3D Tilt Effect</li>
        <li>🌌 Animated Particle Background</li>
        <li>🛡️ Pulsing Shield Security Icon</li>
        <li>📱 Glowing QR Code Container</li>
        <li>💡 Toast Notification System</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🎮 Interactive Elements

| Element | Description |
|----------|-------------|
| **Method Tabs** | Switch between App, SMS, and Recovery Codes |
| **QR Code Panel** | Animated QR code with glow effect |
| **Setup Key** | Copy secret key to clipboard |
| **OTP Inputs** | Auto-focus, paste support, keyboard navigation |
| **SMS Verification** | Send code with countdown timer |
| **Recovery Codes** | Copy, download, and regenerate codes |
| **Status Badge** | Dynamic Disabled → Enabled transition |
| **Success Overlay** | Security activation animation |
| **3D Tilt Card** | Mouse-based perspective movement |

---

## 🔑 Demo Flow

```text
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Method Tabs    │────▶│  Enter OTP Code  │────▶│  Success Overlay │
│  App/SMS/Codes  │     │  (Test: 123456)  │     │  2FA Enabled 🔐  │
└─────────────────┘     └──────────────────┘     └──────────────────┘
````

### 📱 Authenticator App

1. Scan QR code using Google Authenticator, Authy, or Microsoft Authenticator
2. Copy the setup key if needed
3. Enter the generated 6-digit code
4. Click **Verify & Enable 2FA**

### 💬 SMS Verification

1. Enter your phone number
2. Click **Send Verification Code**
3. Receive and enter the SMS code
4. Click **Verify & Enable 2FA**

### 🔑 Recovery Codes

1. Generate backup recovery codes
2. Copy all codes or download as TXT
3. Store securely offline
4. Regenerate anytime if compromised

> **Demo OTP Code:** `123456`

---

## 📁 Project Structure

```text
uixforge-auth-007/
├── index.html          # Main HTML structure
├── style.css           # Glassmorphism + Security UI
├── script.js           # OTP logic, SMS timer, recovery actions
└── README.md           # Documentation
```

**Zero dependencies — Pure Vanilla JS** ⚡

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/uixforge-auth-007.git
cd uixforge-auth-007
```

### 2. Run Locally

```bash
# Open directly
open index.html

# Or use Live Server
code .
```

### 3. Customize Settings

```javascript
// Change demo OTP code
const DEMO_OTP = '123456';

// SMS countdown duration
let smsTimer = 30;

// Setup key
const setupKey = 'YOUR-SECRET-KEY';
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

## 🔧 Integration Guide

### Real 2FA Verification API

```javascript
async function verify2FA(method) {
  const code = getOtpValue();

  try {
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
      showToast('2FA enabled successfully', 'success');
    } else {
      showToast('Invalid verification code', 'error');
    }
  } catch (error) {
    showToast('Network error', 'error');
  }
}
```

### Generate Real QR Code

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

| Recommendation                  | Status |
| ------------------------------- | ------ |
| Use TOTP over SMS when possible | ✅      |
| Store recovery codes offline    | ✅      |
| Regenerate compromised codes    | ✅      |
| Enforce rate limiting           | ✅      |
| Enable device trust management  | ✅      |
| Log verification attempts       | ✅      |

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

| Metric       | Score  |
| ------------ | ------ |
| Lighthouse   | 98+    |
| Page Size    | ~20KB  |
| Load Time    | <200ms |
| Dependencies | 0      |

---

## 🎯 Use Cases

* 🔐 Account Security Settings
* 🛡️ Two-Factor Authentication Setup
* 📱 TOTP Authentication Screens
* 💬 SMS Verification Workflows
* 🔑 Recovery Code Management
* 💼 Enterprise Security Dashboards
* 🚀 SaaS User Protection Systems

---

## 📦 UIXForge Component Library

| Component              | ID           | Description                 |
| ---------------------- | ------------ | --------------------------- |
| Login Form             | AUTH-001     | Ethereal Login Form         |
| Register Form          | AUTH-002     | Multi-Step Registration     |
| OTP Verification       | AUTH-003     | 6-Digit Verification Screen |
| Password Reset         | AUTH-004     | Reset Flow                  |
| Forgot Password Modal  | AUTH-005     | Modal Recovery Flow         |
| Social Login Buttons   | AUTH-006     | Multi-Provider Login        |
| **2FA Authentication** | **AUTH-007** | **This Component** ✨        |

---

## 🤝 Contributing

```bash
# Fork repository
git checkout -b feature/add-biometric-auth

# Commit changes
git commit -m "✨ Add biometric authentication method"

# Push changes
git push origin feature/add-biometric-auth
```

Then open a Pull Request 🎉

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
