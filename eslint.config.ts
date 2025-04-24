import eslintPlugin from "@eslint/js";
import tseslint, { configs as tseslintConfigs } from "typescript-eslint";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import pluginImportX from "eslint-plugin-import-x";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
// @ts-expect-error 此包没有类型定义
import nextPlugin from "@next/eslint-plugin-next";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

/**
 * ESLint 配置文件
 * @description 集成了 TypeScript、React、Next.js 等相关配置
 * @see https://chris.lu/web_development/tutorials/next-js-static-first-mdx-starterkit/linting-in-vscode-using-extensions
 */

// =========================================
// 基础 ESLint 配置
// =========================================
const eslintConfig = [
  {
    name: "custom/eslint/recommended",
    files: ["**/*.mjs", "**/*.ts?(x)"],
    ...eslintPlugin.configs.recommended,
  },
];

// =========================================
// 忽略文件配置
// =========================================
const ignoresConfig = [
  {
    name: "custom/eslint/ignores",
    // ignores 选项需要在单独的配置对象中 替代 .eslintignore 文件
    ignores: [
      ".next/", // Next.js 构建输出
      ".vscode/", // VS Code 配置
      "public/", // 静态资源
      ".remarkrc.mjs", // Remark 配置
    ],
  },
] as FlatConfig.Config[];

// =========================================
// TypeScript ESLint 配置
// =========================================
const tseslintConfig = tseslint.config(
  {
    name: "custom/typescript-eslint/recommended",
    files: ["**/*.mjs", "**/*.ts?(x)"],
    extends: [
      ...tseslintConfigs.recommended,
      ...tseslintConfigs.stylistic, // 存疑：是否和 prettier 冲突
    ] as FlatConfig.ConfigArray,
    languageOptions: {
      parserOptions: {
        // 启用类型检查功能
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        // it is recommended to keep version warnings turned on
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
  },
  {
    // 对 .mjs 文件禁用类型检查
    files: ["**/*.mjs"],
    ...tseslintConfigs.disableTypeChecked,
    name: "custom/typescript-eslint/disable-type-checked",
  },
);

// =========================================
// Next.js 相关配置
// =========================================
const nextConfig = [
  {
    name: "custom/next/config",
    // 此配置不设置 files 选项，因为我们想将其应用于所有文件

    // 插件配置
    plugins: {
      react: reactPlugin, // React 核心插件
      "jsx-a11y": jsxA11yPlugin, // 可访问性检查
      "react-hooks": reactHooksPlugin, // React Hooks 规则
      "@next/next": nextPlugin, // Next.js 特定规则
      import: pluginImportX, // import 语句检查
    },

    // 规则配置
    rules: {
      // React 相关规则
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,

      // React Hooks 规则
      ...reactHooksPlugin.configs.recommended.rules,

      // Next.js 规则
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules, // Next.js 严格模式

      // Import 规则
      ...pluginImportX.configs.recommended.rules,

      // 可访问性规则 (使用严格模式)
      ...jsxA11yPlugin.configs.strict.rules,

      // 自定义规则调整
      "import/no-anonymous-default-export": "warn", // 警告匿名默认导出
      "react/no-unknown-property": "off", // 禁用未知属性检查
      "react/react-in-jsx-scope": "off", // 无需导入 React
      "react/prop-types": "off", // 禁用 PropTypes 检查
      "react/jsx-no-target-blank": "off", // 允许 target="_blank"

      // 可访问性警告
      "jsx-a11y/alt-text": [
        "warn",
        {
          elements: ["img"],
          img: ["Image"],
        },
      ],
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
    },

    // 全局设置
    settings: {
      react: {
        version: "detect", // 自动检测 React 版本
      },
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "type",
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
          warnOnUnassignedImports: false,
        },
      ],
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true, // 总是尝试解析类型定义
        },
      },
    },
  },
] as FlatConfig.Config[];

// =========================================
// 导出最终配置
// =========================================
export default [
  ...compat.extends("next/core-web-vitals"), // Next.js 核心配置 TODO:需要保留么
  ...eslintConfig, // 基础配置
  ...ignoresConfig, // 忽略文件配置
  ...tseslintConfig, // TypeScript 配置
  ...nextConfig, // Next.js 配置
  eslintPluginPrettier, // Prettier 配置
] satisfies FlatConfig.Config[];
