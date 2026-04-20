# 贡献指南 | Contributing Guide

感谢你对 HighlightShare 项目的关注！欢迎通过以下方式参与贡献。

## 🐛 报告 Bug

如果你发现了 Bug，请 [提交 Issue](https://github.com/HeyHuazi/HighlightShare/issues/new?template=bug_report.md)，并包含以下信息：

- 问题的详细描述
- 复现步骤
- 期望行为与实际行为
- 浏览器版本和操作系统信息
- 相关截图（如有）

## 💡 功能建议

如果你有功能建议，请 [提交 Issue](https://github.com/HeyHuazi/HighlightShare/issues/new?template=feature_request.md)，描述：

- 功能的详细描述
- 使用场景和需求
- 期望的效果（可附带参考截图或设计稿）

## 🔧 提交代码

### 开发流程

1. **Fork** 本仓库到你的 GitHub 账户
2. **克隆** Fork 后的仓库到本地
   ```bash
   git clone https://github.com/<your-username>/HighlightShare.git
   ```
3. **创建** 功能分支
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **开发** 并测试你的功能
5. **提交** 你的更改
   ```bash
   git add .
   git commit -m "feat: add some feature"
   ```
6. **推送** 到你的 Fork
   ```bash
   git push origin feature/your-feature-name
   ```
7. **提交** Pull Request 到本仓库的 `main` 分支

### Commit 规范

请使用语义化的提交信息：

| 类型 | 说明 |
|------|------|
| `feat:` | 新功能 |
| `fix:` | 修复 Bug |
| `docs:` | 文档更新 |
| `style:` | 代码格式调整（不影响功能） |
| `refactor:` | 代码重构 |
| `perf:` | 性能优化 |
| `chore:` | 构建/工具变更 |

### 代码规范

- 使用 2 个空格缩进
- 保持代码简洁，添加必要的注释
- 确保不影响现有功能的正常运行

## 📜 License

提交代码即表示你同意将贡献以 [MIT License](./LICENSE) 授权。
