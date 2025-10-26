# NodePass 文档中心

这是 [NodePass](https://github.com/yosebyte/nodepass) 的官方文档网站，一个开源、轻量的企业级 TCP/UDP 网络隧道解决方案。

本项目基于现代化技术栈构建，旨在提供一个快速、美观且易于导航的文档体验。

## ✨ 技术栈

- **框架**: [Next.js](https://nextjs.org/) (App Router)
- **UI 组件**: [Shadcn UI](https://ui.shadcn.com/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **内容**: [Markdoc](https://markdoc.dev/)
- **主题**: 明暗模式切换，由 `next-themes` 支持

## 🚀 本地开发

1.  **安装依赖**:
    ```bash
    npm install
    ```

2.  **启动开发服务器**:
    ```bash
    npm run dev
    ```

    现在，在浏览器中打开 `http://localhost:9002` 即可查看文档网站。

## ✍️ 如何贡献

文档内容位于 `docs/` 目录下，使用 Markdoc 格式（`.md` 文件）编写。

- **修改内容**: 直接编辑 `docs/` 目录下的相应文件。
- **新增页面**: 在合适的分类目录下创建新的 `.md` 文件，并参考现有文件格式添加 `frontmatter` (例如 `title`, `order`, `description`)。

您的更改将在本地开发环境中实时刷新。

## 部署

该项目已针对 Vercel、Netlify 或 Firebase App Hosting 等现代化托管平台进行了优化，可以轻松实现持续部署。
