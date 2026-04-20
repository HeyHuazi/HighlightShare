<div align="center">

# ✨ HighlightShare

**一个简单优雅的 Chrome 扩展，将网页中的文字和图片生成精美的分享卡片**

[English](./README_EN.md) | 中文

![License](https://img.shields.io/github/license/HeyHuazi/HighlightShare?color=blue)
![Stars](https://img.shields.io/github/stars/HeyHuazi/HighlightShare?style=social)
![Version](https://img.shields.io/badge/version-1.0-brightgreen)
![Manifest](https://img.shields.io/badge/Manifest-V3-orange)

![Demo](https://huazispace.s3.bitiful.net/HightlightShare%2Fintroduce.png?no-wait=on)

</div>

---

## 🌟 功能特色

- 🎯 **一键选择** — 选中网页文字或右键点击图片即可生成卡片
- 🎨 **双主题切换** — 提供明 / 暗两种精美主题风格
- 📱 **二维码分享** — 自动生成当前页面二维码，支持显示/隐藏
- 💾 **便捷导出** — 一键复制到剪贴板或下载为 PNG 图片
- 🎭 **优雅界面** — 简洁美观的卡片设计，信息层次清晰
- ⚡ **轻量高效** — 原生 JavaScript 开发，无需额外框架

## 📸 预览

| 明亮主题 | 暗色主题 |
|:---:|:---:|
| Light | Dark |

## 📦 安装

### 方式一：本地安装（开发者模式）

1. 克隆或下载本仓库到本地
   ```bash
   git clone https://github.com/HeyHuazi/HighlightShare.git
   ```
2. 打开 Chrome 浏览器，访问 `chrome://extensions/`
3. 开启右上角 **「开发者模式」**
4. 点击 **「加载已解压的扩展程序」**，选择项目目录

## 🎮 使用方法

1. **选择内容**
   - 在网页中选中文字，或右键点击图片
2. **生成卡片**
   - 点击右键菜单中的 **「生成分享卡片」**
3. **自定义卡片**
   - 点击 **「切换」** 按钮更换明/暗主题风格
   - 点击 **「二维码」** 按钮显示或隐藏页面二维码
4. **分享卡片**
   - 点击 **「复制」** 按钮复制到剪贴板
   - 点击 **「下载」** 按钮保存为图片

## 🏗️ 项目结构

```
HighlightShare/
├── manifest.json          # Chrome 扩展配置 (Manifest V3)
├── background.js          # Service Worker 后台脚本
├── content.js             # 内容脚本（卡片生成核心逻辑）
├── content.css            # 卡片样式
├── html2canvas.min.js     # html2canvas 库
├── qrcode.min.js          # QRCode.js 库
└── icons/                 # 扩展图标
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| 原生 JavaScript | 核心开发，零依赖框架 |
| Chrome Extension Manifest V3 | 扩展标准 |
| [html2canvas](https://html2canvas.hertzen.com/) | DOM 转图片导出 |
| [QRCode.js](https://github.com/davidshimjs/qrcodejs) | 二维码生成 |

## 📋 更新日志

### V1.0
- ✨ 基础卡片生成功能
- ✨ 支持文字和图片选择
- ✨ 明暗双主题切换
- ✨ 二维码生成与显示控制
- ✨ 复制到剪贴板和下载为图片

## 🤝 贡献

欢迎各种形式的贡献！请阅读 [贡献指南](./CONTRIBUTING.md) 了解详情。

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 📄 许可证

本项目基于 [MIT License](./LICENSE) 开源。

## 🙏 致谢

- [html2canvas](https://html2canvas.hertzen.com/) — 截图库
- [QRCode.js](https://github.com/davidshimjs/qrcodejs) — 二维码生成库

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐ Star 支持一下！**

Made with ❤️ by [Huazi](https://github.com/HeyHuazi)

</div>
