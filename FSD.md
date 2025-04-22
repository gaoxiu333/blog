# Feature Sliced Design 开发规范文档

## 目录

1. [简介](#1-简介)
2. [项目结构](#2-项目结构)
3. [开发规范](#3-开发规范)
4. [最佳实践](#4-最佳实践)
5. [质量保证](#5-质量保证)
6. [工具和配置](#6-工具和配置)

## 1. 简介

### 1.1 文档目的

本文档旨在规范基于 Feature Sliced Design (FSD) 架构的前端项目开发流程，确保代码质量和项目可维护性。

### 1.2 适用范围

- 新建前端项目
- 现有项目重构
- 团队协作开发

### 1.3 架构概述

FSD 是一种面向前端的架构方法论，通过分层和切片的方式组织代码，提高代码的可维护性和可扩展性。

## 2. 项目结构

### 2.1 基础目录结构

```
src/
  ├── app/                    # 应用程序入口
  │   ├── providers/         # 全局 Providers
  │   │   ├── with-store.tsx
  │   │   └── with-router.tsx
  │   ├── styles/           # 全局样式
  │   │   ├── globals.css
  │   │   └── variables.css
  │   ├── types/           # 全局类型定义
  │   └── index.tsx        # 入口文件
  │
  ├── views/                 # 页面
  │   ├── home/
  │   ├── profile/
  │   └── [id]/            # 动态路由页面
  │
  ├── widgets/               # 组件块
  │   ├── header/
  │   │   ├── ui/         # UI组件
  │   │   ├── model/      # 业务逻辑
  │   │   └── index.ts    # 入口文件
  │   └── footer/
  │
  ├── features/              # 功能模块
  │   ├── auth/
  │   │   ├── ui/         # UI组件
  │   │   ├── model/      # 业务逻辑
  │   │   ├── api/        # API请求
  │   │   ├── lib/        # 工具函数
  │   │   └── index.ts    # 入口文件
  │   └── theme-switcher/
  │
  ├── entities/              # 业务实体
  │   ├── user/
  │   │   ├── ui/         # UI组件
  │   │   ├── model/      # 业务逻辑
  │   │   ├── api/        # API请求
  │   │   └── index.ts    # 入口文件
  │   └── product/
  │
  └── shared/               # 共享资源
      ├── ui/              # UI组件库
      │   ├── button/
      │   └── input/
      ├── api/             # API 客户端
      ├── lib/             # 工具函数
      └── config/          # 配置文件
```

### 3.3 层级依赖规范

#### 3.3.1 允许的依赖方向

```typescript
// ✅ 正确的依赖方向
// pages -> widgets -> features -> entities -> shared

// widgets/header/ui/header.tsx
import { AuthButton } from '@/features/auth'
import { UserAvatar } from '@/entities/user'
import { Button } from '@/shared/ui'

// ❌ 错误的依赖方向
// 不允许下层引用上层
// entities/user/ui/user-card.tsx
import { AuthFeature } from '@/features/auth' // ❌ 错误
```

### 组件编写规范

- 禁止循环依赖
- 禁止跨层向上依赖


```typescript
// 1. 组件基本结构
import { FC } from 'react'
import styles from './component.module.css'

interface ComponentProps {
  // props 类型定义
}

export const Component: FC<ComponentProps> = (props) => {
  // hooks 声明
  
  // 业务逻辑
  
  // 渲染
  return (...)
}

// 2. 状态管理
// model/store.ts
export const useStore = create<Store>((set) => ({
  // store 定义
}))

// 3. API 调用
// api/index.ts
export const api = {
  getUser: () => axios.get('/api/user'),
  // ...其他 API
}
}
```

#### 文档规范

```typescript
// 1. 组件文档
/**
 * @description 用户信息卡片组件
 * @param {string} userId - 用户ID
 * @param {boolean} showAvatar - 是否显示头像
 */

// 2. API 文档
/**
 * @api {get} /api/user Get User Info
 * @apiName GetUser
 * @apiGroup User
 */
```

### 性能优化规范

```typescript
// 1. 组件优化
import { memo } from 'react'

export const Component = memo(() => {
  // ...
})

// 2. Hooks 优化
import { useMemo, useCallback } from 'react'

const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b])
```

### 错误处理规范

```typescript
// 1. API 错误处理
try {
  const response = await api.getUser()
} catch (error) {
  if (error instanceof ApiError) {
    // 处理 API 错误
  } else {
    // 处理其他错误
  }
}

// 2. 全局错误边界
// app/providers/with-error-boundary.tsx
export const ErrorBoundary = ({ children }) => {
  // 错误边界实现
}
```

## 5. 质量保证

### 5.1 测试规范

#### 5.1.1 单元测试

```typescript
import { render, screen } from "@testing-library/react";

describe("Component", () => {
  it("should render correctly", () => {
    render(<Component />);
    // 断言
  });
});
```


### 5.2 代码审查清单

- [ ] 遵循项目结构规范
- [ ] 符合命名规范
- [ ] 正确的依赖方向
- [ ] 适当的组件拆分
- [ ] 完整的测试覆盖
- [ ] 文档更新

## 6. 工具和配置

### 6.1 推荐的开发工具

- ESLint: 代码质量检查
- Prettier: 代码格式化
- TypeScript: 类型检查
- Jest: 单元测试
- React Testing Library: 组件测试

### 6.2 配置示例

#### 6.2.1 ESLint 配置

```json
{
  "extends": [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    // 自定义规则
  }
}
```

#### 6.2.2 TypeScript 配置

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 附录

### A. 常见问题解答

1. Q: 如何处理跨层级的数据共享？
   A: 使用共享状态管理或通过 shared 层提供公共服务。

2. Q: 新功能应该放在哪一层？
   A: 根据功能的复杂度和复用性决定：
   - 简单 UI 组件 → shared/ui
   - 业务实体 → entities
   - 用户功能 → features
   - 页面组合 → views

### B. 更新记录

| 版本 | 日期       | 更新内容 |
| ---- | ---------- | -------- |
| 1.0  | 2024-03-xx | 初始版本 |
