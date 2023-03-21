# Vue3-Admin 搭建过程

## 1. 搭建第一个Vite + Vue + Ts 项目

Vite 可以通过附加的命令行选项直接指定项目名称和你想要使用的模板。例如，要构建一个 Vite + Vue + Ts 项目，运行:

```sh
# npm 6.x
npm init vite@latest Vue3-Admin --template vue-ts

# npm 7+, 需要额外的双横线：
npm init vite@latest Vue3-Admin -- --template vue-ts

# yarn
yarn create vite Vue3-Admin --template vue-ts

# pnpm
pnpm create vite Vue3-Admin -- --template vue-ts
```

**注意：Vite 需要 Node.js 版本 >= 12.0.0。**

## 2. 项目规范

### 2.1 集成editorconfig

editorconfig是用于跨不同的编辑器和IDE为多个开发人员维护一致的编码风格的配置文件。

根目录下创建文件`.editorconfig`

```javascript
# @see: http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
end_of_line = lf # 控制换行类型(lf | cr | crlf)
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
max_line_length = 100 # 最大行长度
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅对 md 文件适用以下规则
max_line_length = off # 关闭最大行长度限制
trim_trailing_whitespace = false # 关闭末尾空格修剪
```

**注意：**使用`VScode`开发的话，需要下载插件 [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

### 2.2 集成Eslint + prettier

#### 2.2.1 安装EsLint

```javascript
# 1. 安装EsLint
yarn add -D eslint
```

#### 2.2.2 初始化配置EsLint

```javascript
# 2. 初始化配置EsLint
npm init @eslint/config
```

`npm init @eslint/config`后出现以下选项：

```javascript
# 2.1 选择模式(选择To check syntax and find problems)
? How would you like to use ESLint? … 
  To check syntax only
❯ To check syntax and find problems
  To check syntax, find problems, and enforce code style

# 2.2 选择语言(选择JavaScript modules (import/export))
? What type of modules does your project use? … 
❯ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

# 2.3 选择框架(选择Vue.js)
? Which framework does your project use? … 
  React
❯ Vue.js
  None of these

# 2.4 是否使用ts(选择Yes)
? Does your project use TypeScript? › Yes
  
# 2.5 代码在哪运行(用空格选中 Browser+Node)
? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
✔ Browser
✔ Node

# 2.6 您希望配置文件是什么格式(选择JavaScript)
? What format do you want your config file to be in? … 
❯ JavaScript
  YAML
  JSON

# 2.7 您想现在安装吗？ (选择Yes)
? Would you like to install them now? › Yes

# 2.8 您要使用哪个软件包管理器？ (选择yarn)
? Which package manager do you want to use? … 
  npm
❯ yarn
  pnpm
```

安装完成后，根目录出现`.eslintrc.js`文件

```javascript
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
    }
}
```

#### 2.2.3 安装`vite-plugin-eslint`

```
// 说明: 该包是用于配置vite运行的时候自动检测eslint规范
// 问题: 不装这个包可以吗? 答案是“可以的”,使用yarn dev时并不会主动检查代码

yarn add -D vite-plugin-eslint
```

修改`vite.config.ts`

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin()
  ],
})
```

#### 2.2.4 安装`parser`

```javascript
yarn add -D typescript-eslint/eslint-plugin
yarn add -D typescript-eslint/parser
```

#### 2.2.5 安装`prettier`

```javascript
# 利用`prettier`进行代码格式化，支持 `JavaScript`、`TypeScript`、`CSS`、`SCSS`、`Less`、`JSX`、`Angular`、`Vue`、`GraphQL`、`JSON`、`Markdown` 等语言。

yarn add -D prettier
yarn add -D eslint-config-prettier // eslint兼容的插件
yarn add -D eslint-plugin-prettier // eslint的prettier
```

#### 2.2.6 配置`.prettierrc.cjs`文件

根目录下创建`.prettierrc.cjs`文件，

```javascript
// @see: https://www.prettier.cn

module.exports = {
	// 超过最大值换行
	printWidth: 130,
	// 缩进字节数
	tabWidth: 2,
	// 使用制表符而不是空格缩进行
	useTabs: true,
	// 结尾不用分号(true有，false没有)
	semi: true,
	// 使用单引号(true单双引号，false双引号)
	singleQuote: false,
	// 更改引用对象属性的时间 可选值 "<as-needed|consistent|preserve>"
	quoteProps: "as-needed",
	// 在对象，数组括号与文字之间加空格 "{ foo: bar }"
	bracketSpacing: true,
	// 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
	trailingComma: "none",
	// 在JSX中使用单引号而不是双引号
	jsxSingleQuote: false,
	//  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号 ,always：不省略括号
	arrowParens: "avoid",
	// 如果文件顶部已经有一个 DocLock，这个选项将新建一行注释，并打上@format标记。
	insertPragma: false,
	// 指定要使用的解析器，不需要写文件开头的 @prettier
	requirePragma: false,
	// 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
	proseWrap: "preserve",
	// 在html中空格是否是敏感的 "css" - 遵守 CSS 显示属性的默认值， "strict" - 空格被认为是敏感的 ，"ignore" - 空格被认为是不敏感的
	htmlWhitespaceSensitivity: "css",
	// 换行符使用 lf 结尾是 可选值 "<auto|lf|crlf|cr>"
	endOfLine: "auto",
	// 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
	rangeStart: 0,
	rangeEnd: Infinity,
	// Vue文件脚本和样式标签缩进
	vueIndentScriptAndStyle: false
};
```

#### 2.2.7 `.prettierignore`忽略文件

根目录下创建`.prettierrc.cjs`文件，`prettier`会忽略这些文件格式

```javascript
/dist/*
/html/*
.local
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

#### 2.2.8 `VScode`插件

`VSCode`用户需要安装`prettier`的插件: `Prettier - Code formatter`

#### 2.2.9 `package.json`

在 `package.json`的`scripts`添加一个命令行

```javascript
"lint:prettier": "prettier --write --loglevel warn \"src/**/*.{js,ts,json,tsx,css,less,scss,vue,html,md}\""
```

使用此命令，可以对全部文件进行格式化，而不用每个文件都保存一次了。

其他：

```javascript
"lint:eslint": "eslint --fix --ext .js,.ts,.vue ./src",
```

### 2.3 集成`stylelint`和`scss`

```javascript
yarn add -D stylelint sass stylelint-config-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-recommended-vue stylelint-config-standard stylelint-config-standard-scss postcss postcss-html
```

#### 2.3.1 添加`postcss.config.cjs`文件

```javascript
module.exports = {
	plugins: {
		autoprefixer: {}
	}
};
```

#### 2.3.2 添加`.stylelintrc.cjs`文件

```javascript
// @see: https://stylelint.io

module.exports = {
	/* 继承某些已有的规则 */
	extends: [
		"stylelint-config-standard", // 配置stylelint拓展插件
		"stylelint-config-html/vue", // 配置 vue 中 template 样式格式化
		"stylelint-config-standard-scss", // 配置stylelint scss插件
		"stylelint-config-recommended-vue/scss", // 配置 vue 中 scss 样式格式化
		"stylelint-config-recess-order", // 配置stylelint css属性书写顺序插件,
		"stylelint-config-prettier" // 配置stylelint和prettier兼容
	],
	overrides: [
		// 扫描 .vue/html 文件中的<style>标签内的样式
		{
			files: ["**/*.{vue,html}"],
			customSyntax: "postcss-html"
		}
	],
	/**
	 * null  => 关闭该规则
	 */
	rules: {
		"value-keyword-case": null, // 在 css 中使用 v-bind，不报错
		"no-descending-specificity": null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
		"function-url-quotes": "always", // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
		"string-quotes": "double", // 指定字符串使用单引号或双引号
		"unit-case": null, // 指定单位的大小写 "lower(全小写)"|"upper(全大写)"
		"color-hex-case": "lower", // 指定 16 进制颜色的大小写 "lower(全小写)"|"upper(全大写)"
		"color-hex-length": "long", // 指定 16 进制颜色的简写或扩写 "short(16进制简写)"|"long(16进制扩写)"
		"rule-empty-line-before": "never", // 要求或禁止在规则之前的空行 "always(规则之前必须始终有一个空行)"|"never(规则前绝不能有空行)"|"always-multi-line(多行规则之前必须始终有一个空行)"|"never-multi-line(多行规则之前绝不能有空行。)"
		"font-family-no-missing-generic-family-keyword": null, // 禁止在字体族名称列表中缺少通用字体族关键字
		"block-opening-brace-space-before": "always", // 要求在块的开大括号之前必须有一个空格或不能有空白符 "always(大括号前必须始终有一个空格)"|"never(左大括号之前绝不能有空格)"|"always-single-line(在单行块中的左大括号之前必须始终有一个空格)"|"never-single-line(在单行块中的左大括号之前绝不能有空格)"|"always-multi-line(在多行块中，左大括号之前必须始终有一个空格)"|"never-multi-line(多行块中的左大括号之前绝不能有空格)"
		"property-no-unknown": null, // 禁止未知的属性(true 为不允许)
		"no-empty-source": null, // 禁止空源码
		"declaration-block-trailing-semicolon": null, // 要求或不允许在声明块中使用尾随分号 string："always(必须始终有一个尾随分号)"|"never(不得有尾随分号)"
		"selector-class-pattern": null, // 强制选择器类名的格式
		"scss/at-import-partial-extension": null, // 解决不能引入scss文件
		"value-no-vendor-prefix": null, // 关闭 vendor-prefix(为了解决多行省略 -webkit-box)
		"selector-pseudo-class-no-unknown": [
			true,
			{
				ignorePseudoClasses: ["global", "v-deep", "deep"]
			}
		]
	}
};
```

#### 2.3.3 添加`.stylelintignore`

```javascript
/dist/*
/html/*
/public/*
public/*
```

#### 2.3.4 `package.json`中加入指令

```javascript
"lint:stylelint": "stylelint --cache --fix \"**/*.{vue,less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/"
```
