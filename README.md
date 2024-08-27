这是一个通过 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 创建的 [Next.js](https://nextjs.org/) 项目，并集成了 [Clerk.com](https://clerk.com) 来实现 Google 登录功能。

## 开始使用

首先，启动开发服务器：

```bash
npm run dev
# 或者
yarn dev
# 或者
pnpm dev
# 或者
bun dev
```

使用浏览器打开 [http://localhost:3000](http://localhost:3000) 查看效果。

你可以通过修改 `app/page.tsx` 文件开始编辑页面。页面会在编辑时自动更新。

这个项目使用 [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) 来自动优化并加载 Inter 字体，这是一款定制的 Google 字体。

另外，项目使用了 [Clerk.com](https://clerk.com) 来处理身份验证和用户管理，包括通过 Google 登录的功能。Clerk 提供了无缝集成的用户认证方案，使得实现社交登录变得简单。

## 了解更多

要了解更多关于 Next.js 和 Clerk 的内容，请查看以下资源：

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 的功能和 API。
- [学习 Next.js](https://nextjs.org/learn) - 一个互动的 Next.js 教程。
- [Clerk 文档](https://clerk.com/docs) - 了解如何配置和使用 Clerk 进行身份验证。

你还可以访问 [Next.js 的 GitHub 仓库](https://github.com/vercel/next.js/) - 欢迎提供反馈和贡献！

