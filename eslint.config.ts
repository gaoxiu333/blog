import eslintPlugin from "@eslint/js";
import tseslint, { configs as tseslintConfigs } from "typescript-eslint";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
// @ts-expect-error this package has no types
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
// @ts-expect-error this package has no types
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
// @ts-expect-error this package has no types
import nextPlugin from "@next/eslint-plugin-next";
import * as mdxPlugin from "eslint-plugin-mdx";

const eslintConfig = [
  {
    name: "custom/eslint/recommended",
    files: ["**/*.mjs", "**/*.ts?(x)"],
    ...eslintPlugin.configs.recommended,
  },
];

const ignoresConfig = [
  {
    name: "custom/eslint/ignores",
    // the ignores option needs to be in a separate configuration object
    // replaces the .eslintignore file
    ignores: [".next/", ".vscode/", "public/"],
  },
] as FlatConfig.Config[];

const tseslintConfig = tseslint.config(
  {
    name: "custom/typescript-eslint/recommended",
    files: ["**/*.mjs", "**/*.ts?(x)"],
    extends: [
      ...tseslintConfigs.recommended,

      ...tseslintConfigs.stylistic,
    ] as FlatConfig.ConfigArray,
    languageOptions: {
      parserOptions: {
        // https://typescript-eslint.io/getting-started/typed-linting
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
  },
  {
    files: ["**/*.mjs"],
    ...tseslintConfigs.disableTypeChecked,
    name: "custom/typescript-eslint/disable-type-checked",
  }
);
const nextConfig = [
  {
    name: "custom/next/config",
    // no files (option) for this config as we want to apply it to all files
    plugins: {
      react: reactPlugin,
      "jsx-a11y": jsxA11yPlugin,
      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      "react-hooks": reactHooksPlugin,
      "@next/next": nextPlugin,
      import: importPlugin,
      /* eslint-enable @typescript-eslint/no-unsafe-assignment */
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      ...reactHooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      // this is the nextjs strict mode
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...importPlugin.configs.recommended.rules,
      /* eslint-enable @typescript-eslint/no-unsafe-member-access */
      //...jsxA11yPlugin.configs.recommended.rules,
      // OR more strict a11y rules
      ...jsxA11yPlugin.configs.strict.rules,
      // rules from eslint-config-next
      "import/no-anonymous-default-export": "warn",
      "react/no-unknown-property": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-no-target-blank": "off",
      "jsx-a11y/alt-text": ["warn", { elements: ["img"], img: ["Image"] }],
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
      // only needed if you use (eslint-import-resolver-)typescript
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
] as FlatConfig.Config[];

const mdxConfig = [
  // https://github.com/mdx-js/eslint-mdx/blob/d6fc093fb32ab58fb226e8cf42ac77399b8a4758/README.md#flat-config
  {
    name: "custom/mdx/recommended",
    files: ["**/*.mdx"],
    ...mdxPlugin.flat,
    processor: mdxPlugin.createRemarkProcessor({
      // I disabled linting code blocks
      // as I was having performance issues
      lintCodeBlocks: false,
      languageMapper: {},
    }),
  },
  {
    name: "custom/mdx/code-blocks",
    files: ["**/*.mdx"],
    ...mdxPlugin.flatCodeBlocks,
    rules: {
      ...mdxPlugin.flatCodeBlocks.rules,
      "no-var": "error",
      "prefer-const": "error",
    },
  },
] as FlatConfig.Config[];

export default [
  // ...compat.extends("next/core-web-vitals"),
  ...eslintConfig,
  ...ignoresConfig,
  ...tseslintConfig,
  ...nextConfig,
  ...mdxConfig,
] satisfies FlatConfig.Config[];

// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";
// import js from "@eslint/js";

// import type { Linter } from "eslint";
// import { includeIgnoreFile } from "@eslint/compat";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   recommendedConfig: js.configs.recommended,
//   allConfig: js.configs.all,
// });

// const gitignorePath = path.resolve(__dirname, ".gitignore");

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   includeIgnoreFile(gitignorePath),
// ];

// export default eslintConfig satisfies Linter.Config[];
