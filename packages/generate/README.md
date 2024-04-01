## 生成博客模版的脚本

- [x] `npm run g` 自动生成一个博客MDX文件模版
- [ ] 将`notes`中的笔记作为模块发布
- [ ] 同步`notes`中的比较到博客

## 依赖

- `minimist` - 解析参数
- `prompts` - 轻量、美观、人性化的交互提示
- `kolorist` - 一个为标准输入/标准输出着色的小实用程序

## 运行

```bash
npm run g
```

执行后在`n-blog/app/_article`文件内生成一个MDX模版，用来发布博客内容。