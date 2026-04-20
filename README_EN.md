<div align="center">

# ✨ HighlightShare

**A simple and elegant Chrome extension that generates beautiful share cards from selected text and images on web pages.**

English | [中文](./README.md)

![License](https://img.shields.io/github/license/HeyHuazi/HighlightShare?color=blue)
![Stars](https://img.shields.io/github/stars/HeyHuazi/HighlightShare?style=social)
![Version](https://img.shields.io/badge/version-1.0-brightgreen)
![Manifest](https://img.shields.io/badge/Manifest-V3-orange)

![Demo](https://huazispace.s3.bitiful.net/HightlightShare%2Fintroduce.png?no-wait=on)

</div>

---

## 🌟 Features

- 🎯 **One-Click Selection** — Select text or right-click images on any webpage
- 🎨 **Dual Themes** — Light and dark theme styles with one-click switching
- 📱 **QR Code Sharing** — Auto-generate QR code for the current page, toggle visibility
- 💾 **Easy Export** — Copy to clipboard or download as PNG image
- 🎭 **Elegant UI** — Clean and beautiful card design with clear information hierarchy
- ⚡ **Lightweight** — Built with vanilla JavaScript, no frameworks required

## 📸 Preview

| Light Theme | Dark Theme |
|:---:|:---:|
| Light | Dark |

## 📦 Installation

### Local Install (Developer Mode)

1. Clone or download this repository
   ```bash
   git clone https://github.com/HeyHuazi/HighlightShare.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** in the top right corner
4. Click **Load unpacked** and select the project directory

## 🎮 Usage

1. **Select Content**
   - Select text on a webpage, or right-click an image
2. **Generate Card**
   - Click **"生成分享卡片"** in the context menu
3. **Customize Card**
   - Click **"切换"** button to switch between light/dark themes
   - Click **"二维码"** button to show/hide the QR code
4. **Share Card**
   - Click **"复制"** button to copy to clipboard
   - Click **"下载"** button to save as image

## 🏗️ Project Structure

```
HighlightShare/
├── manifest.json          # Chrome extension config (Manifest V3)
├── background.js          # Service worker background script
├── content.js             # Content script (core card generation logic)
├── content.css            # Card styles
├── html2canvas.min.js     # html2canvas library
├── qrcode.min.js          # QRCode.js library
└── icons/                 # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 🛠️ Tech Stack

| Tech | Purpose |
|------|----------|
| Vanilla JavaScript | Core development, zero framework dependency |
| Chrome Extension Manifest V3 | Extension standard |
| [html2canvas](https://html2canvas.hertzen.com/) | DOM-to-image export |
| [QRCode.js](https://github.com/davidshimjs/qrcodejs) | QR code generation |

## 📋 Changelog

### V1.0
- ✨ Basic card generation
- ✨ Text and image selection support
- ✨ Light/Dark theme switching
- ✨ QR code generation and visibility control
- ✨ Copy to clipboard and download as image

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](./CONTRIBUTING.md) for details.

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

## 🙏 Acknowledgements

- [html2canvas](https://html2canvas.hertzen.com/) — Screenshot library
- [QRCode.js](https://github.com/davidshimjs/qrcodejs) — QR code generation library

---

<div align="center">

**If this project helps you, please consider giving it a ⭐ Star!**

Made with ❤️ by [Huazi](https://github.com/HeyHuazi)

</div>
