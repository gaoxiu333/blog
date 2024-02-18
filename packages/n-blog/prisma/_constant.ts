import { join } from "lodash";

export const _projects = [
  {
    packageName: "qiankun",
    tag: "微前端",
  },
  {
    packageName: "@micro-zoe/micro-app",
    tag: "微前端",
  },
  {
    packageName: "lucide-react",
    tag: "icon",
  },
  {
    packageName: "@tanstack/react-query",
    tag: "React 生态",
  },

  {
    packageName: "next",
    tag: "Vue 生态",
  },
  {
    packageName: "@nestjs/core",
    tag: "nodejs",
  },
  {
    packageName: "three",
    tag: "3D",
  },
  {
    packageName: "primevue",
    tag: "Vue 生态",
  },
  {
    packageName: "react-router",
    tag: "React 生态",
  },
  {
    packageName: "@prisma/client",
    tag: "数据库",
  },
  {
    packageName: "typeorm/typeorm",
    tag: "数据库",
  },
];
// 前端框架
const frontEnds = [
  {
    name: "react",
    repo: "facebook/react",
    npm: "react",
    types: ["react"],
  },
  {
    name: "vue",
    repo: "vuejs/core",
    npm: "vue",
    types: ["vue"],
  },
  {
    name: "angular",
    repo: "angular/angular",
    npm: "@angular/core",
    types: ["angular"],
  },
  {
    name: "svelte",
    repo: "sveltejs/svelte",
    npm: "svelte",
    types: ["svelte"],
  },
];

// 构建平台
const platforms = [
  {
    name: "Vite",
    repo: "vitejs/vite",
    npm: "vite",
    types: ["vue", "react"],
  },
  {
    name: "Nextjs",
    repo: "vercel/next.js",
    npm: "next",
    types: ["react"],
  },
  {
    name: "Refine",
    repo: "refinedev/refine",
    npm: "@refinedev/core",
    types: ["react"],
  },
];
// UI 框架
const uiFrameworks = [
  {
    name: "Ant Design",
    repo: "ant-design/ant-design",
    npm: "antd",
    types: ["react"],
  },
  {
    name: "Shadcn UI",
    repo: "shadcn-ui/ui",
    npm: "shadcn-ui",
    types: ["react"],
  },
  {
    name: "NextUI",
    repo: "nextui-org/nextui",
    npm: "@nextui-org/react",
    types: ["react"],
  },
  {
    name: "Radix",
    repo: "radix-ui/primitives",
    npm: "@radix-ui/primitive",
    types: ["react"],
  },
  {
    name: "Headless UI",
    repo: "tailwindlabs/headlessui",
    npm: "@headlessui/react",
    types: ["react"],
  },
  {
    name: "Theme UI",
    repo: "system-ui/theme-ui",
    npm: "theme-ui",
    types: ["react"],
  },
  {
    name: "DaisyUI",
    repo: "saadeghi/daisyui",
    npm: "daisyui",
    types: ["react"],
  },
];
// 鉴权
const auth = [
  {
    name: "JWT",
  },
];
// 数据集成
const databases = [
  {
    name: "Prisma",
    repo: "prisma/prisma",
    npm: "@prisma/client",
    types: ["react"],
  },
  {
    name: "Drizzle ORM",
    repo: "drizzle-team/drizzle-orm",
    npm: "drizzle-orm",
    types: ["react"],
  },
  {
    name: "tRPC",
    repo: "trpc/trpc",
    npm: "@trpc/server",
    types: ["react"],
  },
  {
    name: "Prisma",
    repo: "prisma/prisma",
    npm: "@prisma/client",
    types: ["react"],
  },
];
// 工具/集成
const libraries = [
  {
    name: "Zustand",
    repo: "pmndrs/zustand",
    npm: "zustand",
    types: ["react"],
  },
  {
    name: "Lodash",
    repo: "lodash/lodash",
    npm: "lodash",
    types: ["react", "vue", "nodejs", "angular", "svelte"],
  },
  {
    name: "Recoil",
    repo: "facebookexperimental/Recoil",
    npm: "recoil",
    types: ["react"],
  },
  {
    name: "dayjs",
    repo: "iamkun/dayjs",
    npm: "dayjs",
    types: ["react", "vue", "nodejs", "angular", "svelte"],
  },
  {
    name: "Immer",
    repo: "immerjs/immer",
    npm: "immer",
    types: ["react"],
  },
  {
    name: "Zod",
    repo: "colinhacks/zod",
    npm: "zod",
    types: ["react"],
  },
  {
    name: "React use",
    repo: "streamich/react-use",
    npm: "react-use",
    types: ["react"],
  },
  {
    name: "SWT",
    repo: "vercel/swr",
    npm: "swr",
    types: ["react"],
  },
  {
    name: "Pinia",
    repo: "vuejs/pinia",
    npm: "pinia",
    types: ["vue"],
  },
];
// 样式
const styles = [
  {
    name: "TailwindCSS",
    repo: "tailwindlabs/tailwindcss",
    npm: "tailwindcss",
    types: ["react"],
  },
  {
    name: "Styled Components",
    repo: "styled-components/styled-components",
    npm: "styled-components",
    types: ["react"],
  },
  {
    name: "Stylex",
    repo: "facebook/stylex",
    npm: "@stylexjs/stylex",
    types: ["react"],
  },
];
// 移动端
const mobiles = [
  {
    name: "React native",
    repo: "facebook/react-native",
    npm: "react-native",
    types: ["react"],
  },
  {
    name: "Taro",
    repo: "NervJS/taro",
    npm: "taro",
    types: ["react"],
  },
];
// 动画
const animations = [
  {
    name: "Framer Motion",
    repo: "framer/motion",
    npm: "framer-motion",
    types: ["react"],
  },
];
// 微前端
const microFrontEnds = [
  {
    name: "Qiankun",
    repo: "umijs/qiankun",
    npm: "qiankun",
    types: ["react"],
  },
  {
    name: "Micro app",
    repo: "micro-zoe/micro-app",
    npm: "@micro-zoe/micro-app",
    types: ["react"],
  },
];
export const projects = [
  ...frontEnds.map((item) => ({
    ...item,
    tag: `前端框架,${join(item.types, ",")}`,
  })),
  ...platforms.map((item) => ({
    ...item,
    tag: `platform,${join(item.types, ",")}`,
  })),
  ...uiFrameworks.map((item) => ({
    ...item,
    tag: `ui,${join(item.types, ",")}`,
  })),
  ...databases.map((item) => ({
    ...item,
    tag: `database,${join(item.types, ",")}`,
  })),
  ...libraries.map((item) => ({
    ...item,
    tag: `library,${join(item.types, ",")}`,
  })),
  ...styles.map((item) => ({ ...item, tag: `style,${join(item.types, ",")}` })),
  ...mobiles.map((item) => ({
    ...item,
    tag: `mobile,${join(item.types, ",")}`,
  })),
  ...animations.map((item) => ({
    ...item,
    tag: `animation,${join(item.types, ",")}`,
  })),
  ...microFrontEnds.map((item) => ({
    ...item,
    tag: `micro,${join(item.types, ",")}`,
  })),
];

export const TAG_MAP = [
  { key: "前端框架", name: "前端框架" },
  { key: "platform", name: "构建平台" },
  { key: "ui", name: "UI" },
  { key: "database", name: "数据库" },
  { key: "library", name: "工具库" },
  { key: "mobile", name: "移动端" },
  { key: "animation", name: "动画库" },
  { key: "style", name: "样式库" },
  { key: "micro", name: "微前端" },
];
