---
title: shiki 代码高亮特殊语法
createdAt: 2024-04-21T16:29:37.000Z
updatedAt: '2024-04-21T14:54:59.365Z'
description: 代码高亮换了实现方式，记录一下shiki的特殊语法。
published: false
---

简单记录下`shiki`代码高亮的语法。

使用 [!code ++] 和 [!code --] 来标记增删的行。

```ts
console.log("hewwo"); // [!code --]
console.log("hello"); // [!code ++]
console.log("goodbye");
```

使用 [!code highlight] 来高亮显示行：

```ts
console.log("Not highlighted");
console.log("Highlighted"); // [!code highlight]
console.log("Not highlighted");
```

使用 [!code word:Hello] 在接下来的代码高亮所有的 Hello。

```ts
// [!code word:Hello]
const message = "Hello World";
console.log(message); // prints Hello World
```

使用 [!code focus] 来聚焦显示行：

```ts
console.log("Not focused");
console.log("Focused"); // [!code focus]
console.log("Not focused");
```

纯文本

```txt
import { codeToHtml } from 'shiki'

const html = codeToHtml('console.log("Hello World")', {
  lang: 'text', // [!code hl]
  theme: 'vitesse-light',
})
```

ANSI

```ansi
[0;90m┌[0m  [0;36;1mWelcome to VitePress![0m[0m
[0;90m│[0m[0m
[0;32m◇[0m  Where should VitePress initialize the config?[0m
[0;90m│[0m  [0;2m./docs[0m[0m
[0;90m│[0m[0m
[0;32m◇[0m  Site title:[0m
[0;90m│[0m  [0;2mMy Awesome Project[0m[0m
[0;90m│[0m[0m
[0;32m◇[0m  Site description:[0m
[0;90m│[0m  [0;2mA VitePress Site[0m[0m
[0;90m│[0m[0m
[0;36m◆[0m  Theme:[0m
[0;36m│[0m  [0;32m●[0m Default Theme [0;2m(Out of the box, good-looking docs)[0m[0m
[0;36m│[0m  [0;2m○[0m [0;2mDefault Theme + Customization[0m[0m
[0;36m│[0m  [0;2m○[0m [0;2mCustom Theme[0m[0m
[0;36m└[0m
```

带标题/文件名字的代码块

```js:index.tsx
111;
```
