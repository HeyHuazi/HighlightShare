# HighlightShare Chrome Extension

一个简单优雅的 Chrome 扩展，用于将网页中选中的文字和图片生成精美的分享卡片。

## 功能特点

- 支持选中文字生成卡片
- 支持选中图片生成卡片
- 支持同时选中文字和图片
- 支持切换卡片风格（明亮/暗黑）
- 支持下载生成的卡片
- 包含网页标题、URL 和图标信息

## 安装方法

1. 下载或克隆本仓库到本地
2. 打开 Chrome 浏览器，进入扩展程序页面（chrome://extensions/）
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择本仓库所在的文件夹

## 使用方法

1. 在网页中选中文字或图片
2. 右键点击，选择"生成分享卡片"
3. 在弹出的窗口中可以：
   - 查看生成的卡片
   - 切换卡片风格
   - 下载卡片
   - 关闭窗口

## 技术栈

- HTML/CSS/JavaScript
- Chrome Extension API
- html2canvas（用于卡片导出）

## 注意事项

- 确保允许扩展程序访问网页内容
- 下载功能需要允许浏览器下载权限
- 部分网站可能会限制内容选择或图片下载

## 更新记录

- V0.1 预览版