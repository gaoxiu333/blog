import _, { join } from "lodash";

// 前端框架
const frontEnds = [
  {
    name: "React",
    repo: "facebook/react",
    npm: "react",
    tags: ["react"],
  },
  {
    name: "Vue",
    repo: "vuejs/core",
    npm: "vue",
    tags: ["vue"],
  },
  {
    name: "Angular",
    repo: "angular/angular",
    npm: "@angular/core",
    tags: ["angular"],
  },
  {
    name: "Svelte",
    repo: "sveltejs/svelte",
    npm: "svelte",
    tags: ["svelte"],
  },
];

// 构建平台
const platforms = [
  {
    name: "Vite",
    repo: "vitejs/vite",
    npm: "vite",
    tags: ["vue", "react"],
  },
  {
    name: "Nextjs",
    repo: "vercel/next.js",
    npm: "next",
    tags: ["react"],
  },
  {
    name: "Refine",
    repo: "refinedev/refine",
    npm: "@refinedev/core",
    tags: ["react"],
  },
  {
    name: "Nuxt",
    repo: "nuxt/nuxt",
    npm: "nuxt",
    tags: ["vue"],
  },
  {
    name: "UniJS",
    repo: "umijs/umi",
    npm: "umi",
    tags: ["react"],
  },
];
// UI 框架
const uiFrameworks = [
  {
    name: "Ant Design",
    repo: "ant-design/ant-design",
    npm: "antd",
    tags: ["react"],
  },
  {
    name: "Shadcn UI",
    repo: "shadcn-ui/ui",
    npm: "shadcn-ui",
    tags: ["react"],
  },
  {
    name: "NextUI",
    repo: "nextui-org/nextui",
    npm: "@nextui-org/react",
    tags: ["react"],
  },
  {
    name: "Radix",
    repo: "radix-ui/primitives",
    npm: "@radix-ui/primitive",
    tags: ["react"],
  },
  {
    name: "Headless UI",
    repo: "tailwindlabs/headlessui",
    npm: "@headlessui/react",
    tags: ["react"],
  },
  {
    name: "Theme UI",
    repo: "system-ui/theme-ui",
    npm: "theme-ui",
    tags: ["react"],
  },
  {
    name: "DaisyUI",
    repo: "saadeghi/daisyui",
    npm: "daisyui",
    tags: ["react"],
  },
  {
    name: "Element Plus",
    repo: "element-plus/element-plus",
    npm: "element-plus",
    tags: ["vue"],
  },
  {
    name: "Element Plus",
    repo: "ElemeFE/element",
    npm: "element-ui",
    tags: ["vue"],
  },
  {
    name: "Ant Design Vue",
    repo: "vueComponent/ant-design-vue",
    npm: "ant-design-vue",
    tags: ["vue"],
  },
  {
    name: "ngx-admin",
    repo: "akveo/ngx-admin",
    npm: "ngx-admin",
    tags: ["angular"],
  },
  {
    name: "NG-ZORRO",
    repo: "NG-ZORRO/ng-zorro-antd",
    npm: "ng-zorro-antd",
    tags: ["angular"],
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
    tags: ["react"],
  },
  {
    name: "Drizzle ORM",
    repo: "drizzle-team/drizzle-orm",
    npm: "drizzle-orm",
    tags: ["react"],
  },
  {
    name: "tRPC",
    repo: "trpc/trpc",
    npm: "@trpc/server",
    tags: ["react"],
  },
  {
    name: "Prisma",
    repo: "prisma/prisma",
    npm: "@prisma/client",
    tags: ["react"],
  },
  {
    name: "TypeORM",
    repo: "typeorm/typeorm",
    npm: "typeorm",
    tags: ["react"],
  },
];
// 工具/集成
const libraries = [
  {
    name: "Zustand",
    repo: "pmndrs/zustand",
    npm: "zustand",
    tags: ["react"],
  },
  {
    name: "Lodash",
    repo: "lodash/lodash",
    npm: "lodash",
    tags: ["react", "vue", "nodejs", "angular", "svelte"],
  },
  {
    name: "Recoil",
    repo: "facebookexperimental/Recoil",
    npm: "recoil",
    tags: ["react"],
  },
  {
    name: "dayjs",
    repo: "iamkun/dayjs",
    npm: "dayjs",
    tags: ["react", "vue", "nodejs", "angular", "svelte"],
  },
  {
    name: "Immer",
    repo: "immerjs/immer",
    npm: "immer",
    tags: ["react"],
  },
  {
    name: "Zod",
    repo: "colinhacks/zod",
    npm: "zod",
    tags: ["react"],
  },
  {
    name: "React use",
    repo: "streamich/react-use",
    npm: "react-use",
    tags: ["react"],
  },
  {
    name: "ahooks",
    repo: "alibaba/hooks",
    npm: "ahooks",
  },
  {
    name: "SWT",
    repo: "vercel/swr",
    npm: "swr",
    tags: ["react"],
  },
  {
    name: "Pinia",
    repo: "vuejs/pinia",
    npm: "pinia",
    tags: ["vue"],
  },
  {
    name: "Axios",
    repo: "axios/axios",
    npm: "axios",
    tags: ["react", "vue", "nodejs"],
  },
  {
    name: "TanStack Query",
    repo: "TanStack/query",
    npm: "@tanstack/react-query",
    tags: ["react"],
  },
  {
    name: "VueUse",
    repo: "vueuse/vueuse",
    npm: "@vueuse/core",
    tags: ["vue"],
  },
  {
    name: "RxJS",
    repo: "ReactiveX/rxjs",
    npm: "rx",
    tags: ["angular"],
  },
  {
    name: "Tempo",
    repo: "formkit/tempo",
    npm: "@formkit/tempo",
    tags: ["vue", "react"],
  },
  {
    name: "date-fns",
    repo: "date-fns/date-fns",
    npm: "date-fns",
    tags: ["angular"],
  },
];
// 样式
const styles = [
  {
    name: "TailwindCSS",
    repo: "tailwindlabs/tailwindcss",
    npm: "tailwindcss",
    tags: ["react"],
  },
  {
    name: "Styled Components",
    repo: "styled-components/styled-components",
    npm: "styled-components",
    tags: ["react"],
  },
  {
    name: "Stylex",
    repo: "facebook/stylex",
    npm: "@stylexjs/stylex",
    tags: ["react"],
  },
];
// 移动端
const mobiles = [
  {
    name: "React native",
    repo: "facebook/react-native",
    npm: "react-native",
    tags: ["react"],
  },
  {
    name: "Taro",
    repo: "NervJS/taro",
    npm: "taro",
    tags: ["react"],
  },
  {
    name: "Uni APP",
    repo: "dcloudio/uni-app",
    npm: "@dcloudio/uni-app",
    tags: ["vue"],
  },
];
// 动画
const animations = [
  {
    name: "Framer Motion",
    repo: "framer/motion",
    npm: "framer-motion",
    tags: ["react"],
  },
];
// 微前端
const microFrontEnds = [
  {
    name: "Qiankun",
    repo: "umijs/qiankun",
    npm: "qiankun",
    tags: ["react"],
  },
  {
    name: "Micro app",
    repo: "micro-zoe/micro-app",
    npm: "@micro-zoe/micro-app",
    tags: ["react"],
  },
];
// nodejs
const nodejs = [
  {
    name: "Express",
    repo: "expressjs/express",
    npm: "express",
    tags: [],
  },
  {
    name: "Nest",
    repo: "nestjs/nest",
    npm: "@nestjs/core",
    tags: [],
  },
];
// 杂项
const others = [
  {
    name: "Lucide",
    repo: "lucide-icons/lucide",
    npm: "lucide-react",
    tags: ["react", "vue"],
  },
  {
    name: "Three.js",
    repo: "mrdoob/three.js",
    npm: "three",
    tag: ["react", "vue"],
  },
  {
    name: "React Router",
    repo: "remix-run/react-router",
    npm: "react-router",
    tag: ["react"],
  },
];
// 代码格式化
const formatters = [
  {
    name: "Prettier",
    repo: "prettier/prettier",
    npm: "prettier",
    tags: ["react", "vue", "nodejs"],
  },
  {
    name: "Eslint",
    repo: "eslint/eslint",
    npm: "eslint",
    tags: ["react", "vue", "nodejs"],
  },
];

export const projects = [
  ...frontEnds.map((item) => ({
    ...item,
    tag: `frontEnd,${join(item.tags, ",")}`,
  })),
  ...platforms.map((item) => ({
    ...item,
    tag: `platform,${join(item.tags, ",")}`,
  })),
  ...uiFrameworks.map((item) => ({
    ...item,
    tag: `ui,${join(item.tags, ",")}`,
  })),
  ...databases.map((item) => ({
    ...item,
    tag: `database,${join(item.tags, ",")}`,
  })),
  ...libraries.map((item) => ({
    ...item,
    tag: `library,${join(item.tags, ",")}`,
  })),
  ...styles.map((item) => ({ ...item, tag: `style,${join(item.tags, ",")}` })),
  ...mobiles.map((item) => ({
    ...item,
    tag: `mobile,${join(item.tags, ",")}`,
  })),
  ...animations.map((item) => ({
    ...item,
    tag: `animation,${join(item.tags, ",")}`,
  })),
  ...microFrontEnds.map((item) => ({
    ...item,
    tag: `micro,${join(item.tags, ",")}`,
  })),
  ...others.map((item) => ({ ...item, tag: `other,${join(item.tags, ",")}` })),
  ...nodejs.map((item) => ({ ...item, tag: `nodejs,${join(item.tags, ",")}` })),
  ...formatters.map((item) => ({
    ...item,
    tag: `format,${join(item.tags, ",")}`,
  })),
].map((item) => _.omit(item, "tags"));

export const ALL_TAG = _.chain(projects)
  .map("tag")
  .join(",")
  .split(",")
  .compact()
  .union()
  .value();

const _DOC = ["react", "vue", "angular", "svelte"];
export const DOC = [
  {
    name: "全部",
    href: "",
  },
  ..._DOC.map((item) => ({ name: item, href: item })),
];

export const FRONTEND_TAP_MAP = [
  { key: "frontEnd", name: "前端框架" },
  { key: "platform", name: "构建平台" },
  { key: "ui", name: "UI" },
  { key: "database", name: "数据库" },
  { key: "library", name: "工具库" },
  { key: "mobile", name: "移动端&跨端" },
  { key: "animation", name: "动画库" },
  { key: "style", name: "样式库" },
  { key: "micro", name: "微前端" },
  { key: "other", name: "杂项" },
  { key: "format", name: "代码格式化" },
];
