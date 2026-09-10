# Genmeet

> TODO: 一句话说明这个项目解决什么问题。

Repository initialized on 2026-09-10.

## 技术栈

全栈 Web 项目，具体选型待定（TODO）：

- 前端：待定
- 后端：待定
- 数据库：待定

## 目录结构

结构待定（TODO），建议按前后端分离组织：

```
Genmeet/
├── client/    # 前端
├── server/    # 后端
└── docs/      # 文档
```

## 快速开始

前置要求：Node.js、包管理器（npm / pnpm / yarn）。

```bash
git clone git@github.com:PMM878/Genmeet.git
cd Genmeet
cp .env.example .env   # 按实际情况修改
# 安装依赖并启动，命令待项目脚手架确定后补充
```

## 环境变量

复制 `.env.example` 为 `.env` 后填写。`.env` 已被 Git 忽略，请勿提交真实密钥。

## 开发约定

- 分支：`main` 为稳定分支，日常开发使用特性分支（如 `feat/xxx`、`fix/xxx`），通过 Pull Request 合入。
- 提交信息：建议遵循 Conventional Commits，如 `feat: 新增登录接口`、`fix: 修复分页越界`。

## 许可证

[MIT](./LICENSE) © 2026 PMM878
