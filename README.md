# 周计划表应用

这是一个使用React和TypeScript构建的周计划表应用，UI设计模仿了传统的纸质周计划表。

<img width="1071" alt="image" src="https://github.com/user-attachments/assets/167fd2ab-925d-456a-8fc0-7a930bcbf479" />


## 功能特点

- 左侧面板显示角色和目标
- 右侧面板显示一周的时间安排
- 美观的UI设计，使用柔和的颜色
- 响应式布局
- **所有单元格均可编辑**，支持输入和修改文字
- **数据自动保存**到浏览器的localStorage，刷新页面后数据不会丢失
- 提供"清除所有数据"按钮，可以重置计划表

## 技术栈

- React
- TypeScript
- CSS
- React Hooks (useState, useEffect)
- 浏览器 localStorage API

## 如何使用

1. 在角色和目标区域输入您的角色和相应目标
2. 在"不断更新"区域记录您的进展
3. 在右侧面板中输入周数
4. 在任务区域添加每周和每日任务
5. 在时间表中安排您的约会和任务
6. 所有单元格都可以点击并编辑
7. 您的数据会自动保存到浏览器的localStorage中
8. 如果需要重置所有数据，可以点击左上角的"清除所有数据"按钮

## 数据存储

- 所有输入的数据会自动保存到浏览器的localStorage中
- 即使关闭页面或刷新浏览器，数据也不会丢失
- 数据仅存储在您的本地浏览器中，不会上传到任何服务器
- 清除浏览器缓存或使用"清除所有数据"按钮会导致数据丢失

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

## 未来计划

- 添加导出为PDF或打印功能
- 添加多个周计划表切换功能
- 添加主题切换功能
- 添加数据导入/导出功能
