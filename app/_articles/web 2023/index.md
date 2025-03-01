---
title: web 2023
createdAt: 2024-04-02 11:42:35
updatedAt: 2024-04-02 11:42:35
description: CSS 2023趋势以及新特性，以及React、Vue和JavaScript生态系统的更新， 2023年 Baseline 标准的推出，他让开发者更容易了解到，新特性能不能用于生产。
published: true
---
## Web 2023

2023年已经过去，记录下过去一年web前端开发的变化，主要是参考[Rising Stars](https://wpt.fyi/interop-2023)的 CSS 2023 ；此时我最关注的React 2023和JavaScript 2023还没更新，暂时先记录一下2023前端相关的新特性或者趋势

## Baseline

了解了一个新标准Baseline。

**Baseline**在2023年Google开发者大会上推出，帮助开发者一目了然地了解某个功能或 API 在您的网站或 Web 应用程序中使用是否安全。

**但是有了 Can I Use 为什么还需要 Baseline？**

根据Baseline的描述：当一个新特性被Baseline收录时，你可以告诉你的同事或者你的客户，这个功能已经被现代浏览器支持了～ 大概就是这个意思。

**Baseline 是如何定义的？**

- 分为两个阶段
  - **Newly available** - 所有主流浏览器在最近两个版本支持的时候 
  - **Widely available** - 被设置为 Newly available 30个月之后

**哪些浏览器被称为主流浏览器？**

- Safari（macOS 和 iOS）
- Firefox（桌面版和安卓版）
- Chrome（桌面版和安卓版）
- Edge（桌面）

**Baseline 在哪儿看？**

- [Can I Use](https://caniuse.com/feed/166)
- [MDN](https://developer.mozilla.org/en-US/blog/baseline-unified-view-stable-web-features/)
- [web-features](https://github.com/web-platform-dx/web-features/tree/main)

Interop以及Baseline的出现，是为了解决不同浏览器的兼容性问题。

## CSS 2023

随着新 CSS 功能的使用呈上升趋势，CSS 框架的使用却呈下降趋势。

以下是趋势中提到的，并且使用率都不错的css特性，它们可能还没有纳入baseline，也有可能

### `:has()`

用于选择包含特定子元素的**所有父元素**，优先级同`:is`、`:not`计算的相同

```css
parent:has(child){
  /* .. */
}
```

> 延伸：**`:is`、`:where`的区别**
>
> - `:is` - 只要匹配`:is`内的其中一个元素就算匹配上了，配上嵌套可以节省很多选择器。比如：一级嵌套`:is(article,  nav) h1`，二级嵌套`:is(article,nav) h1`...
> - `:where` - 和上面的`:is`作用相同，优先级计算方式不同，`:where`表现形式更像是**css占位**，出现相同权重的`:where`匹配的样式总会被忽略。

### `@container ()`

容器查询选择器，类似于媒体查询，但是更灵活，可以指定自己的父容器，而不用局限于查询设备

```css
.container{ /* 定义容器 */
  container-type:size | inline-size | normal
}
/* 查询容器 */
@container (min-width: 700px) {
  ...
}
```

... 其他一些个人觉得比较有用的CSS新特性

### aspect-ratio

元素宽高比，实现自适应的正方形更简单了...

```css
.square{
  width:100%;
  height:auto;
  aspect-ratio:1/1;
}
```

### gap

 栅格之间的间隙，`column-gap`和`row-gap`的简写，又简单啦～

```css
/* flex 容器、grid 容器 */
.container{
  display: flex | grid;
  gap: 2%
}
```

### CSS 滤镜

**filter **

主要是给图片添加滤镜，使用不同的滤镜效果，需要不同的内置函数，比如：

- `blur()` - 实现高斯模糊
- `brightness()` - 全黑图像
- `contrast()` - 调整对比对，全彩变灰色
- `opacity()` - 图片也可以透明
- ... 以及其他[函数](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter#%E5%87%BD%E6%95%B0)

```css
/* 使图片模糊 */
filter:bulr(5px)
```

**backdrop-filter**

主要是给元素背后的元素添加滤镜效果，用法和上面`filter`类似，但效果是保留一部分可以是清晰的，用`filter`就全糊啦～

```css
.container{
	backdrap-filter:blur(2px)
}
```

> 除了内置的函数，还可以通过SVG自制滤镜效果，然后通过`url`引入

以及其他一些CSS特性

- [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- [The Large, Small, And Dynamic Viewport Units](https://web.dev/viewport-units/)
- [Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid)  - 网格布局中的子网格
- [CSS 嵌套](https://developer.chrome.com/docs/css-ui/css-nesting?hl=zh-cn)
- `min-content` - 尺寸关键词，比如指定`width:min-content`宽度为内容的固有最小宽度；`max-content`、`fit-content`也类似。

- `text-wrap: balance` - 排版改进，更好看的换行（似乎对英文比较好）
- [Blend Modes](https://developer.mozilla.org/en-US/docs/Web/CSS/blend-mode) - 使用率蛮高的。。
- `accent-color` - 修改表单元素（`checkbox`、`radio`等）控件的颜色
- `currentColor` - 已经经常使用了。
- 滚动条相关
  - CSS scroll snap 提供分页和滚动定位，比如实现一个轮播图
  - `overscroll-behavior` - 控制滚动条滚动到临界值时的操作

- `line-clamp` - 文本溢出，多行省略号
- `:focus-visible` - 同样是聚焦，和`:focus`不同的是，`:focus-visible`可以匹配到通过键盘控制的表单聚焦，比如：`Tab`切换表单聚焦
- [CSS 自定义属性](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables) - 已经经常使用了
- `::marker` - 列表元素项目符号的样式

### CSS 框架

**Tailwind CSS 和 PureCSS** - 使用增长相对平稳，其他CSS类的框架都在下跌，但是TailWind CSS使用后再下一个项目中继续使用的人数更多～

**Open Props** - 一套规范化的开源的CSS自定义变量（在调查中被很多人推荐），我觉得它在我纠结如何实现某个样式时中应该很有用～

**Panda CSS** - 一个CSS in JS 框架支持静态分析，像是`styled-components`和`emotion`运行时CSS in JS没有及时支持Server Components的产物

## react 生态

2023 年，随着 React Server Components 的出现，我们看到 React 进入了第三个时代

- React 核心团队和 Vercel 合作发布了第一个稳定的实现：[Next.js 13.4 App Router](https://nextjs.org/blog/next-13-4)。
- [我们还看到了Server Actions](https://react.dev/reference/react-dom/components/form#handle-form-submission-with-a-server-action)的出现，这是一项新的 React 核心功能，首先在[Next.js 14](https://nextjs.org/blog/next-14)中稳定实现
- 我们热切地等待 React 19，它应该[很快就会发布](https://twitter.com/acdlite/status/1719474730363662473)。

## Vue 生态

Vue 2 在 2023 年 12 月 31 日停止了支持，不再会有新增功能、更新或问题修复

- [Nuxt 3](https://nuxt.com/)现在的下载量比 Nuxt 2 更多。
- UI 框架（如[Vuetify](https://vuetifyjs.com/en/)和[PrimeVue](https://primevue.org/)）比以往任何时候都更容易帮助构建大型（和较小的！）应用程序。
- [VueUse](https://vueuse.org/)、[Pinia](https://pinia.vuejs.org/)甚至[TresJS 等](https://tresjs.org/)库不断发展和增强自身，以更好地为我们所有人提供支持。

## JavaScript

ECMAScript 2023 新增JS特性

- [Array findLast()](https://www.w3schools.com/js/js_2023.asp#mark_array_findlast)
- [Array findLastIndex()](https://www.w3schools.com/js/js_2023.asp#mark_array_findlastindex)
- [Array toReversed()](https://www.w3schools.com/js/js_2023.asp#mark_array_toreversed)
- [Array toSorted()](https://www.w3schools.com/js/js_2023.asp#mark_array_tosorted)
- [Array toSpliced()](https://www.w3schools.com/js/js_2023.asp#mark_array_tospliced)
- [Array with()](https://www.w3schools.com/js/js_2023.asp#mark_array_with)
- [#! (Shebang)](https://www.w3schools.com/js/js_2023.asp#mark_shebang)

以及更早但是常用的新特性

- [Array at()](https://www.w3schools.com/js/js_2022.asp#mark_array_at)
- [String at()](https://www.w3schools.com/js/js_2022.asp#mark_string_at)
- [Object.hasOwn()](https://www.w3schools.com/js/js_2022.asp#mark_hasown)
- [await import](https://www.w3schools.com/js/js_2022.asp#mark_await_import)
- [Promise.any()](https://www.w3schools.com/js/js_2021.asp#mark_promise_any)
- [String replaceAll()](https://www.w3schools.com/js/js_2021.asp#mark_string_replaceall)

## 参考

- [A definition update for Baseline](https://web.dev/blog/baseline-definition-update?hl=en) 
- [Baseline badges now on Can I use](https://caniuse.com/feed/166)
- [web-features](https://github.com/web-platform-dx/web-features/tree/main)
- [2023 JavaScript Rising Stars](https://risingstars.js.org/2023/en)
- [Interop 2023](https://wpt.fyi/interop-2023)
- [ECMAScript 2023](https://www.w3schools.com/js/js_2023.asp)