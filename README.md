# Pixel Island UI 🏝️✨

一套**像素海岛治愈风 React + TypeScript UI 组件库**，内置官网风格的**全量组件总览与交互演示站**，并集成 **Storybook 10 (CSF 3.0)** 进行组件文档管理与实时参数预览。

## 🧠 生成模型

本项目（包括组件代码、展示站与 Storybook 文档）由 **gemini-4-argon** 模型生成。

## ✨ 核心亮点

1. **像素海岛设计系统（`src/pixel-ui/`）**
   - 暖奶油羊皮纸色系 + 薄荷青主色 + 12 色海岛波点色卡 + 掌机级 3D 阶梯阴影物理按压反馈。
   - **28 枚原创 16×16 整数网格 SVG 像素图标**、**6 位动物村民像素精灵头像**与 **32×32 浮空海岛主视觉插画**，零外部位图依赖。
   - 涵盖通用、数据录入、数据展示、反馈导航与海岛装饰动效五大类组件（`PixelButton`、`PixelTitle`、`PixelDivider`、`PixelInput`、`PixelSelect`、`PixelSwitch`、`PixelCheckbox`、`PixelRadioGroup`、`PixelRate`、`PixelSlider`、`PixelCard`、`PixelTag`、`PixelBadge`、`PixelAvatar`、`PixelTabs`、`PixelCollapse`、`PixelTable`、`PixelProgress`、`PixelModal`、`PixelDrawer`、`pixelNotify`、`PixelPagination`、`PixelLoading`、`PixelSkeleton`、`PixelBackground`、`PixelTypewriter`、`PixelCodeBlock`、`PixelCursor` 等）。
2. **总览与组件文档官网（`src/showcase/`）**
   - 布局：左侧固定分类菜单栏 + 漂浮像素图标草地 Hero Banner + 特性卡片 + 带实时微缩预览的组件总览矩阵 + 安装与快速上手演练场 + 运行时 CSS 变量实时换肤器。
3. **Storybook 10 组件文档管理与交互预览（`.storybook/` & `src/stories/`）**
   - 全部 17 组核心组件均按标准 **CSF 3.0 (`Meta` / `StoryObj`)** 编写于 `src/stories/*.stories.tsx`。
   - 同时支持命令行启动独立 Storybook 6006 服务与站内一键切换 **Storybook 10 交互工作台**（支持 `Canvas` / `Docs` 自动文档、实时 `Controls` 参数面板、`Actions` 事件捕获、`# 8px 像素网格`、多视口缩放及查看真实 `.stories.tsx` 源码）。

## 🚀 本地开发与构建

```bash
# 启动总览官网与内置交互式 Storybook 工作台
npm run dev

# 构建生产单页包
npm run build

# 启动原生 Storybook 10 独立预览服务 (http://localhost:6006)
npx storybook dev -p 6006

# 构建静态 Storybook 文档站点
npx storybook build -o dist-storybook
```
