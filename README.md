# Responsive Collection Gallery

> 一款基于原生 HTML、CSS 和 JavaScript 的轻量级响应式图片合集组件。采用「左侧大图 + 右侧两张小图」的拼接形式，支持多列响应式网格和横向标签导航，适合前端布局学习、视觉演示与项目复用。

[查看项目源码](https://github.com/coowinit/responsive-collection-gallery) · [在线预览（启用 GitHub Pages 后可用）](https://coowinit.github.io/responsive-collection-gallery/)

## 一、项目简介

本项目起源于对图片合集列表页面的拆解与学习，重点研究以下几种原生前端技术如何组合：

- **CSS Grid**：控制图片合集卡片的整体排列。
- **Flexbox**：控制单张卡片内部的三图拼接。
- **`aspect-ratio` 与 `object-fit`**：统一图片展示比例与裁切方式。
- **CSS Media Queries**：实现桌面、平板和手机端布局切换。
- **原生 JavaScript**：管理横向标签导航的左右滚动与按钮状态。

项目坚持**结构简单、职责明确、低依赖、易维护**的原则。不使用 jQuery、Bootstrap、Swiper 或前端构建工具；下载后即可直接在浏览器打开。

> 当前仓库是一个独立的静态组件演示项目，并非 WordPress 插件，也不包含后台管理或数据接口。

## 二、当前功能

| 功能 | 实现方式 | 说明 |
| --- | --- | --- |
| 三图拼接卡片 | Flexbox | 左侧主图约 70%，右侧两张小图上下排列 |
| 响应式卡片列表 | CSS Grid | 桌面三列、平板两列、手机单列 |
| 固定图片比例 | `aspect-ratio: 10 / 7` | 不同屏幕下保持统一的卡片展示比例 |
| 图片自适应裁切 | `object-fit: cover` | 保持图片比例并填充展示区域 |
| 横向标签导航 | Flexbox + JavaScript | 支持左右按钮和触屏横向滑动 |
| 导航边界检测 | JavaScript | 根据滚动位置控制箭头显示状态 |
| 组件样式隔离 | `#s01` | 所有组件 CSS 选择器限定在指定 section 内 |
| 演示资源 | 本地 SVG | 12 张统一风格的风景插画，不依赖远程图片 |
| 演示内容 | 静态 HTML | 12 张合集卡片、17 个英文导航标签 |

**功能边界：** 目前所有标签均指向图片合集所在区域，只用于展示横向导航与滚动交互；它们**不会筛选卡片**。点击卡片会在新标签页打开对应的本地主图，并非进入合集详情页。

## 三、快速使用

1. 下载或克隆本仓库。
2. 保持 `index.html` 与 `assets/` 的相对目录结构不变。
3. 在 Chrome、Edge 或其他现代浏览器中打开 `index.html`。
4. 缩放浏览器窗口，检查不同宽度下的网格布局。
5. 使用导航两侧的箭头或触屏滑动测试横向导航。

无需安装依赖，也无需执行 `npm install`、构建或打包命令。所有演示图片均保存在本地，可离线访问。

## 四、目录结构

```text
responsive-collection-gallery/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── scene-01.svg
│       ├── scene-02.svg
│       ├── ...
│       └── scene-12.svg
└── README.md
```

| 文件 | 职责 |
| --- | --- |
| `index.html` | 页面结构、导航标签、合集卡片及演示数据 |
| `assets/css/style.css` | 组件样式、三图布局和响应式规则 |
| `assets/js/main.js` | 导航滚动控制及左右按钮状态 |
| `assets/images/` | 本地 SVG 图片素材 |

## 五、布局原理

### 5.1 外层卡片使用 CSS Grid

```css
#s01 .grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 56px 24px;
}

@media (max-width: 991px) {
  #s01 .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 619px) {
  #s01 .grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

外层负责卡片的排列，不参与单张卡片内部的三图布局。桌面端显示三列；宽度缩小时改为两列、单列，HTML 无需改变。

### 5.2 单张卡片内部使用 Flexbox

```html
<div class="images">
  <div class="image-main">
    <img src="assets/images/scene-01.svg" alt="Coastal landscape">
  </div>
  <div class="image-side">
    <img src="assets/images/scene-02.svg" alt="Mountain landscape">
    <img src="assets/images/scene-03.svg" alt="Valley landscape">
  </div>
</div>
```

```css
#s01 .images {
  display: flex;
  gap: 2px;
  aspect-ratio: 10 / 7;
  overflow: hidden;
  border-radius: 8px;
}

#s01 .image-main {
  flex: 7 1 0;
  min-width: 0;
}

#s01 .image-side {
  flex: 3 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

#s01 .images img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

左侧主图与右侧容器的宽度分配约为 7:3；右侧两张小图纵向排列。两处布局相互独立，因此手机端无需重新设计内部图片结构。

上面的代码只展示关键规则，实际的高度约束和交互样式请以仓库中的 `style.css` 为准。

### 5.3 横向导航

顶部标签是一个可横向滚动的容器。JavaScript 负责：

- 点击左右按钮时滚动标签区域。
- 判断是否已经到达首端或末端。
- 根据滚动位置调整箭头的显示状态。
- 在窗口尺寸变化时重新计算可滚动范围。

**注意：** 导航使用浏览器原生滚动，不是 Swiper 轮播，也没有实现筛选逻辑。

## 六、CSS 命名与作用域规范

本项目采用我们在开发中确定的组件隔离方式：

```html
<section id="s01" class="collection-section">
  <div class="container">
    <h1 class="section-title">Image Collections</h1>
    <div class="tags-wrap">...</div>
    <div class="grid">...</div>
  </div>
</section>
```

**约定：**

1. 最外层使用 `section`，赋予唯一 ID，例如 `s01`。
2. CSS 选择器统一以 `#s01` 开头，例如 `#s01 .grid`、`#s01 .item`、`#s01 .images`。
3. 内部 Class 使用短小、语义清楚的名称，避免无意义的自动生成类名。
4. JavaScript 先获取组件根节点，再在根节点内查询子元素。
5. 同一页面的 ID 必须唯一；如果复制组件为 `s02`，需同步调整对应的 CSS 和 JavaScript，或者后续抽象出公共组件类。

**使用边界：** `#s01` 可以约束本组件编写的选择器作用范围，但并不能完全阻断外部全局样式。集成 Bootstrap 或 WordPress 主题时，仍要检查 `.container` 等通用类是否受到第三方样式影响。

## 七、如何自定义

### 修改图片

将新的图片存入 `assets/images/`，然后更新 `index.html` 中对应的 `src`。支持现代浏览器可识别的常见图片格式，例如 SVG、WebP、AVIF、JPG 和 PNG。

建议保持三图的视觉风格一致；重要内容尽量位于画面中央，因为 `object-fit: cover` 可能裁切边缘区域。

### 修改标题、描述与链接

每张卡片的标题、描述、图片地址及链接均直接写在 `index.html` 中。可以替换为摄影合集、产品分类、作品集或其他展示内容。

当前点击卡片打开主图。如需跳转到独立页面，修改对应 `a` 标签的 `href` 即可。

### 调整布局

主要参数集中在 `assets/css/style.css`：

| 参数 | 当前含义 |
| --- | --- |
| `grid-template-columns` | 不同屏幕的列数 |
| `gap` | 卡片之间的行距与列距 |
| `aspect-ratio` | 三图拼接区域的宽高比 |
| `flex: 7` / `flex: 3` | 主图与侧图区域比例 |
| `border-radius` | 拼图外层圆角 |
| 媒体查询断点 | 控制桌面、平板、手机布局 |

建议优先调整已有参数，不要为了单一视觉需求额外引入新的布局库。

## 八、适用场景

- 摄影作品集、图片合集列表
- 企业网站产品系列或分类入口
- 设计案例、项目作品展示
- WordPress 经典主题中的静态展示区块
- CSS Grid、Flexbox、响应式布局和原生 JS 的学习示例

## 九、后续研究方向

当前版本以独立静态组件为基础，后续仅在真实项目需要时扩展：

| 阶段 | 方向 | 原则 |
| --- | --- | --- |
| 1 | 数据驱动渲染 | 可选地使用 JSON 或 JavaScript 数据组织卡片，避免大量重复 HTML |
| 2 | 标签筛选与分类关联 | 在真实需求明确后再实现，避免把滚动导航误当作筛选器 |
| 3 | WordPress 模板集成 | 通过文章、分类或自定义内容类型动态输出卡片 |
| 4 | Gutenberg 集成 | 探索区块或 Pattern 的复用方式，优先保持编辑体验简单 |
| 5 | 多组件实例 | 将公共样式与实例配置分离，支持同页多个合集而不复制整套 CSS |

**维护原则：** 优先修复真实问题和提升可复用性，不为增加功能而增加复杂度。纯 HTML 演示版本可以长期保持轻量、稳定，WordPress 动态化也可以作为独立扩展实现。

## 十、版本说明

当前演示源码基于 **v0.1.4** 迭代成果，包含 12 张卡片、12 张本地 SVG 插画和 17 个英文导航标签。

后续版本记录以仓库中的 [Releases](https://github.com/coowinit/responsive-collection-gallery/releases) 为准；README 的文档更新不代表前端功能发生变化。

---

本项目适合用于学习、研究与改造。若用于生产网站，请根据实际内容补充合适的图片说明、目的链接，并测试目标主题环境及各类终端浏览器的表现。
