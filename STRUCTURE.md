# React 项目结构规范

## 目录

1. [项目结构概述](#项目结构概述)
2. [目录命名规范](#目录命名规范)
3. [文件命名规范](#文件命名规范)
4. [代码组织原则](#代码组织原则)
5. [最佳实践](#最佳实践)

## 项目结构概述

我们采用模块化的项目结构，根据项目规模和复杂度，分为以下三个层级：

### Level 1: 基础结构（适用于小型项目）

```
src/
├── assets/          # 静态资源文件
├── components/      # React 组件
├── hooks/           # 自定义 Hooks
├── pages/          # 页面组件
├── styles/         # 样式文件
└── utils/          # 工具函数
```

### Level 2: 功能分组结构（适用于中型项目）

```
src/
├── assets/
│   ├── images/
│   └── icons/
├── components/
│   ├── common/     # 通用组件
│   ├── layout/     # 布局组件
│   └── features/   # 功能相关组件
├── hooks/
│   ├── common/     # 通用 hooks
│   └── features/   # 功能相关 hooks
├── pages/
├── services/       # API 服务
├── styles/
└── utils/
```

### Level 3: 模块化结构（适用于大型项目）

```
src/
├── assets/
├── modules/           # 功能模块
│   ├── core/         # 核心模块
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   ├── auth/         # 认证模块
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── features/     # 其他功能模块
│       ├── components/
│       ├── hooks/
│       └── services/
├── pages/
└── styles/
```

## 目录命名规范

### 核心目录

- `assets/`: 静态资源文件
  - 图片、图标、字体等静态资源
  - 建议按资源类型分子目录

- `components/`: React 组件
  - 每个组件一个目录
  - 包含组件相关的样式、测试、类型定义

- `hooks/`: 自定义 React Hooks
  - 遵循 `use` 前缀命名规范
  - 按功能模块分组

- `pages/`: 页面组件
  - 对应路由结构
  - 尽量保持简洁，主要负责组装组件

- `services/`: API 服务
  - 封装后端 API 调用
  - 按功能模块分组

- `styles/`: 样式文件
  - 全局样式
  - 主题配置
  - 样式变量

- `utils/`: 工具函数
  - 通用工具函数
  - 类型定义
  - 常量

### 功能模块目录

功能模块目录应该是自包含的，包括：
- 组件
- Hooks
- 服务
- 工具函数
- 类型定义

## 文件命名规范

1. **组件文件**
   - 使用 PascalCase
   - 例如：`Button.tsx`, `UserProfile.tsx`

2. **Hook 文件**
   - 使用 camelCase
   - 以 `use` 开头
   - 例如：`useAuth.ts`, `useLocalStorage.ts`

3. **工具函数文件**
   - 使用 camelCase
   - 例如：`formatDate.ts`, `validation.ts`

4. **类型定义文件**
   - 使用 PascalCase
   - 后缀 `.types.ts`
   - 例如：`User.types.ts`, `Api.types.ts`

5. **样式文件**
   - 与组件同名
   - 使用 `.module.css` 或 `.module.scss`
   - 例如：`Button.module.css`

> NextJS 项目中，始终使用 `kebab-case(连字符)` 命名文件,符合 URL 路由规范和跨平台兼容性。

## 代码组织原则

1. **组件结构**
   ```typescript
   /components/Button/
   ├── Button.tsx        # 组件主文件
   ├── Button.test.tsx   # 测试文件
   ├── Button.module.css # 样式文件
   ├── Button.types.ts   # 类型定义
   └── index.ts         # 导出文件
   ```

2. **模块结构**
   ```typescript
   /modules/auth/
   ├── components/     # 模块相关组件
   ├── hooks/         # 模块相关 hooks
   ├── services/      # 模块相关服务
   ├── types/        # 类型定义
   └── index.ts      # 模块导出
   ```

## 最佳实践

1. **组件设计原则**
   - 保持组件的单一职责
   - 将复杂组件拆分为小型、可复用的组件
   - 使用 TypeScript 类型定义

2. **状态管理**
   - 使用 React Context 管理局部状态
   - 考虑使用 Zustand 等轻量级状态管理方案
   - 避免过度使用全局状态

3. **代码复用**
   - 抽取通用逻辑到 hooks
   - 使用组合而非继承
   - 保持工具函数的纯函数特性

4. **性能优化**
   - 合理使用 React.memo
   - 优化 hooks 依赖项
   - 实现代码分割

5. **测试规范**
   - 组件测试覆盖关键交互
   - Hook 测试覆盖主要用例
   - 工具函数需要完整测试覆盖

## 注意事项

1. 根据项目规模选择适当的结构层级
2. 保持目录结构的一致性和可预测性
3. 定期重构和优化项目结构
4. 遵循团队约定的命名规范
5. 及时更新文档

## 工具推荐

1. **代码格式化**
   - ESLint
   - Prettier
   - EditorConfig

2. **类型检查**
   - TypeScript
   - TSLint

3. **样式工具**
   - Tailwind CSS
   - CSS Modules
   - Styled Components

4. **测试工具**
   - Jest
   - React Testing Library
   - Cypress

---

本规范将根据项目需求和团队反馈持续更新。如有建议，请提交 Issue 或 PR。 