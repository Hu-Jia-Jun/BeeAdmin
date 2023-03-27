# 遇到的问题及解决方法

## 1. 使用`vite-svg-loader`报错

### 1.1 安装

```bash
// 安装 https://www.npmjs.com/package/vite-svg-loader
pnpm install vite-svg-loader --save-dev
```

### 1.2 配置

```javascript
// vite.config.js
import svgLoader from "vite-svg-loader";

export default defineConfig({
	plugins: [vue(), svgLoader()]
});
```

### 1.3 使用

```javascript
<script setup lang="ts">
import LogoIcon from "@/assets/svg/logo.svg?component";
</script>

<template>
 <LogoIcon />
</template>
```

### 1.4 报错

```javascript
找不到模块“@/assets/svg/logo.svg?component”或其相应的类型声明。ts(2307)
```

### 1.5 解决方法

```json
// tsconfig.json
{
	"compilerOptions": {
		// 添加类型声明
		"types": ["vite-svg-loader"]
	}
}
```
