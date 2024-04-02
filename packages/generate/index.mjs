import dayjs from "dayjs";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

import prompts from "prompts";
import { cyan, lightMagenta } from "kolorist";

const rootDir = "../n-blog/app/_articles";

const { name, tag } = await prompts([
  {
    type: "text",
    name: "name",
    initial: "hello",
    message: "这篇文章的标题是?",
  }, 
  // TODO: 添加文章标签，目前还没有实现
]);

const fileDir = path.join(rootDir, name);
const filePath = path.join(fileDir, "index.md");
const createdAt = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");
const matter = `---
title: ${name}
createdAt: ${createdAt}
updatedAt: ${createdAt}
---
`;

await mkdir(fileDir, { recursive: true });
await writeFile(filePath, matter, { encoding: "utf-8" });

const log = `${lightMagenta("🎉 MDX模版已创建：")} ${cyan(
  name + "/index.mdx"
)}`;

console.log(log,createdAt);
