# GitHub 自动部署指南

本项目已配置为使用 GitHub Actions 自动部署到 GitHub Pages。

## 设置步骤

1. **创建 GitHub 仓库**

   如果尚未创建，请在 GitHub 上创建一个新仓库。

2. **关联本地仓库与远程仓库**

   ```bash
   git remote add origin https://github.com/你的用户名/plan-manager.git
   ```

3. **提交代码并推送到 GitHub**

   ```bash
   git add .
   git commit -m "初始提交"
   git push -u origin master  # 或者 main，取决于你的默认分支名称
   ```

4. **在 GitHub 仓库设置中启用 GitHub Pages**

   - 进入仓库设置 (Settings)
   - 找到 Pages 选项
   - 在 Source 部分，选择 "GitHub Actions"

5. **验证部署**

   推送到 main 或 master 分支后，GitHub Actions 将自动运行并部署你的应用。部署完成后，你可以通过以下地址访问你的应用：
   
   ```
   https://你的用户名.github.io/plan-manager/
   ```

## 注意事项

- 在 `vite.config.ts` 中，base 路径设置为 `/plan-manager/`，如果你的仓库名称不同，请相应修改此路径。
- GitHub Actions 工作流配置在 `.github/workflows/deploy.yml` 文件中，你可以根据需要进行修改。
- 如果遇到部署问题，可以查看 GitHub 仓库的 Actions 标签页，查看工作流的运行情况和详细日志。

## 本地预览构建

在推送到 GitHub 之前，你可以使用以下命令在本地预览构建：

```bash
npm run preview-build
```

这将构建项目并启动一个本地服务器来预览构建结果。 