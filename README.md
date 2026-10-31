# 匠游华夏 · 宋代非遗街区 Demo

> 以 3D 历史地图为载体的非遗传播平台。本仓库当前实现「宋代非遗街区 + 汝瓷工坊」单区域 Demo。
> 完整产品构想与调研见知识库：`F:\filiex\知识库\1-项目\大创-匠游华夏非遗平台\`
> （方案一二三、竞品与差异化分析、日常开发循环）。

## 技术栈

- 前端：Vite + Babylon.js（低多边形 3D，Web 端运行；后续可套小程序 web-view 或移植微信小游戏）
- 语言：原生 JavaScript（ES Module）
- 暂无独立后端；数据先用前端 mock，后续接 Supabase / Firebase

## 目录结构

```
Genmeet/
├── index.html          # 入口页面（canvas + 摇杆）
├── package.json
├── vite.config.js
└── src/
    ├── main.js         # 引擎启动、主循环、相机跟随
    ├── input.js        # 输入抽象层：键盘 + 虚拟摇杆 → 统一 inputState
    ├── scene.js        # 宋代城池场景（low-poly 占位）
    ├── player.js       # 角色控制器（读取 inputState 移动）
    ├── interaction.js  # 靠近检测 / 拾取 / 交互
    ├── hud.js          # 右侧操作面板（拾取/交互）+ 提示/toast
    └── style.css
```

## 快速开始

前置：Node.js 18+（仓库当前环境 22）。

```bash
git clone git@github.com:PMM878/Genmeet.git
cd Genmeet
npm install        # 安装依赖
npm run dev        # 启动开发服务器，浏览器打开 http://localhost:5173
```

构建与预览：

```bash
npm run build      # 产出到 dist/
npm run preview    # 本地预览构建产物
```

## 操作方式

- 移动：电脑用 `↑↓←→` 或 `WASD`；手机 / 触屏用左下角虚拟摇杆。
- 拾取 / 交互：靠近特殊物品（如汝窑天青釉瓶）会出现提示，按 `E` 或点右侧按钮。
- 相机：鼠标拖拽环绕、滚轮缩放。

## 架构要点（为什么网页和小程序功能一致）

角色移动只读取 `src/input.js` 暴露的 `inputState`（方向向量 + 动作标志），**不直接监听键盘**。
键盘和虚拟摇杆都只是往 `inputState` 里写值，所以换平台只是换「谁写输入」，游戏逻辑不变。
后续进小程序时，把键盘监听换成原生摇杆组件即可，详见知识库「日常开发循环.md」。

## 开发约定（详见知识库「日常开发循环.md」）

- `main` 为保护分支，不直接提交；改东西走「开功能分支 → 提交 → 提 PR → 两人 review → 合并」。
- 分支按功能命名：`feat/场景-宋代城池`、`feat/角色控制-键盘与摇杆` 等。
- 提交信息建议 `feat:` / `fix:` 开头。

## 许可证

[MIT](./LICENSE) © 2026 PMM878
