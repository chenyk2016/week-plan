# 周计划表应用

这是一个使用React和TypeScript构建的周计划表应用，UI设计模仿了传统的纸质周计划表。

## 功能特点

- 左侧面板显示角色和目标
- 右侧面板显示一周的时间安排
- 美观的UI设计，使用柔和的颜色
- 响应式布局

## 技术栈

- React
- TypeScript
- CSS

## 如何运行

1. 克隆仓库
```bash
git clone <仓库地址>
cd plan-manager
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 在浏览器中打开 [http://localhost:5173](http://localhost:5173)

## 构建生产版本

```bash
npm run build
```

构建后的文件将位于 `dist` 目录中。

## 自定义

你可以通过修改 `src/components/WeeklyPlanner.tsx` 和 `src/components/WeeklyPlanner.css` 文件来自定义周计划表的外观和功能。
