# React ESLint 配置文档

## 依赖包说明

### 核心依赖

- `eslint` - JavaScript/TypeScript 代码检查工具
- `typescript` - TypeScript 语言支持
- `@typescript-eslint/parser` - ESLint 的 TypeScript 解析器
- `@typescript-eslint/eslint-plugin` - TypeScript 相关的 lint 规则

### React 相关

- `eslint-plugin-react` - React 语法规则检查
- `eslint-plugin-react-hooks` - React Hooks 规则检查
- `eslint-plugin-jsx-a11y` - React 可访问性检查

### 代码风格

- `prettier` - 代码格式化工具
- `eslint-config-prettier` - 关闭与 Prettier 冲突的 ESLint 规则
- `eslint-plugin-prettier` - 将 Prettier 规则集成到 ESLint 中

### 导入导出

- `eslint-plugin-import` - ES6+ import/export 语法检查
- ` eslint-plugin-import-x` - ES6+ import/export 语法检查的扩展 

## 安装命令

```bash
# 安装 ESLint 核心依赖
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# 安装 React 相关插件
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y

# 安装 Prettier 相关依赖
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

# 安装其他工具
npm install --save-dev eslint-plugin-import
```

## 配置文件说明

### ESLint 配置文件 (eslint.config.ts)

- 使用新的 Flat Config 格式
- 支持 TypeScript 类型检查
- 集成 React 和 Next.js 规则
- 包含代码风格规范

### Prettier 配置文件 (.prettierrc.js)

```js
module.exports = {
  semi: true, // 使用分号
  singleQuote: true, // 使用单引号
  tabWidth: 2, // 缩进宽度
  printWidth: 100, // 每行最大长度
  trailingComma: "all", // 尾随逗号
};
```

## VS Code 集成

### 必要插件

- ESLint
- Prettier
- TypeScript + Javascript

### 工作区设置

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 常用命令

```bash
# 检查代码
npm run lint

# 自动修复
npm run lint:fix

# 格式化代码
npm run format
```

## 注意事项

1. **类型检查**

   - 确保 `tsconfig.json` 配置正确
   - 项目根目录需要有 `tsconfig.json`

2. **规则冲突**

   - Prettier 配置需要放在 ESLint extends 的最后
   - 使用 `eslint-config-prettier` 解决冲突

3. **性能优化**
   - 使用 `.eslintignore` 排除不需要检查的文件
   - 配置适当的 `parserOptions.project`

## Git Hooks 配置

### 安装依赖

```bash
# 安装 husky 和 lint-staged
npm install --save-dev husky lint-staged
# 初始化 husky
npx husky install
# 添加 pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

### 配置 lint-staged

在 `package.json` 中添加：

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### 工作流程

1. 当执行 `git commit` 时，会触发 pre-commit hook
2. lint-staged 会对暂存区的文件进行检查
3. 只有通过检查的文件才能提交
4. 可以使用 `git commit --no-verify` 跳过检查

## 最佳实践

- 在 CI/CD 中集成 ESLint 检查
- 使用 Git Hooks 在提交前检查代码
- 定期更新 ESLint 和相关插件
- 团队统一代码风格配置
- 记录特殊规则的禁用原因

## 兼容旧

- @eslint/compat
- @eslint/eslintrc

## debug

npx eslint --print-config eslint.config.ts
npx eslint --debug eslint.config.ts
npx eslint --inspect-config eslint.config.ts

```json
"lint-debug-config": "eslint --debug eslint.config.ts",
    "lint-print-config": "eslint --print-config eslint.config.ts",
    "lint-inspect-config": "eslint --inspect-config eslint.config.ts"
```
注意：使用 .ts 后缀的配置文件，需要 pnpm add --save-dev jiti
