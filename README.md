# 孔德曦的个人网站

中文个人主页，使用原生 HTML、CSS 和 JavaScript，无需安装依赖或构建。

## 当前网站

- GitHub Pages：https://larry2075.github.io/kongdexi-personal-website/
- Sites：https://kongdexi.happypixie20.chatgpt.site

## 本地运行

在仓库根目录执行：

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

打开 http://127.0.0.1:8765 。按 Ctrl+C 停止服务。

也可直接打开 `dist/index.html` 查看；复制号码功能建议通过本地服务器使用。

## 文件结构

- `dist/index.html`：当前精致动效版页面及个人信息。
- `dist/style.css`：响应式布局、视觉样式、动画和减少动态效果支持。
- `dist/motion.js`：鼠标跟随、按钮吸附、滚动入场、卡片弹层和电话复制。
- `dist/world.js`：此前小车互动版脚本，保留备份。
- `local-archive/motion-v3/`：上一版完整精致动效网页。
- `local-archive/namecard-v1.html`：最初的个人名片版。
- `local-archive/playground-v2/`：完整小车互动版，可单独运行。
- `.openai/hosting.json`：现有 Sites 发布配置。

## 查看小车旧版

```sh
python3 -m http.server 8766 --bind 127.0.0.1 --directory local-archive/playground-v2
```

打开 http://127.0.0.1:8766 。

## 修改与发布

修改姓名、电话和文案主要编辑 `dist/index.html`；复制号码中的号码还需要同步修改 `dist/motion.js`。当前静态网站的完整文件位于 `dist/`，可以部署到支持静态网站的服务。推送 `main` 分支中 `dist/` 的修改后，GitHub Actions 会自动部署到 GitHub Pages；也可在 Actions 页面手动运行部署。Sites 地址需要通过原发布流程单独更新。

## 版本与备份

此仓库保存所有网站源码与历史版本，Git 提交历史记录后续更改。旧版中的外部字体依赖网络；当前动效版无需外部依赖。仓库已按所有者要求公开，其中包含网站上的姓名和联系电话。

## 当前设计

以 Dennis Snellenberg 的页面组织为参考重建：灰色全屏首屏、原创金属 K 字形、循环横移姓名、多语言开场和弧形退场、白底介绍与悬停作品列表、横向滚动图集、深色联系区及蓝色磁性按钮。所有展示内容为孔德曦的个人信息及实际网站历史版本，不包含虚构职业或项目。

开场可按 Esc 或点击跳过；页脚可以重播。系统启用减少动态效果时会直接显示页面。当前主页资源均为本地文件，无第三方字体或图片依赖。

- `dist/experiments/archive/`：上一版黑白红个人档案。
- `dist/experiments/playground/`：小车互动版。
- `dist/experiments/namecard/`：最初名片版。
- `local-archive/personal-archive-v5/`：此次改版前的源码备份。
