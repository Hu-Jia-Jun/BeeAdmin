# Vue3-Admin 搭建过程

## 1. 搭建一个 Vite + Vue + Ts 项目

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

### 2.1 集成 editorconfig

editorconfig 是用于跨不同的编辑器和 IDE 为多个开发人员维护一致的编码风格的配置文件。

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

### 2.2 集成 Eslint + prettier

#### 2.2.1 安装 EsLint

```javascript
# 1. 安装EsLint
yarn add -D eslint
```

#### 2.2.2 初始化配置 EsLint

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
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: ["eslint:recommended", "plugin:vue/vue3-essential", "plugin:@typescript-eslint/recommended"],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: ["vue", "@typescript-eslint"],
	rules: {}
};
```

#### 2.2.3 安装`vite-plugin-eslint`

```
// 说明: 该包是用于配置vite运行的时候自动检测eslint规范
// 问题: 不装这个包可以吗? 答案是“可以的”,使用yarn dev时并不会主动检查代码

yarn add -D vite-plugin-eslint
```

修改`vite.config.ts`

```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), eslintPlugin()]
});
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
yarn add -D stylelint sass stylelint-config-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-recommended-vue stylelint-config-standard stylelint-config-standard-scss postcss postcss-html autoprefixer
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

### 2.4 集成`husky` + `lint-staged` + `commitlint` +`commitizen` + `cz-git`

#### 2.4.1 安装`lint-staged`

```javascript
yarn add -D lint-staged
```

在 `package.json` 文件中添加相关配置

```javascript
"lint:lint-staged": "lint-staged"
```

根目下创建`.lintstagedrc.json`

```json
module.exports = {
	"*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
	"{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write--parser json"],
	"package.json": ["prettier --write"],
	"*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
	"*.{scss,less,styl,html}": ["stylelint --fix", "prettier --write"],
	"*.md": ["prettier --write"]
};
```

#### 2.4.2 安装`husky`

```javascript
yarn add -D husky
```

在`package.json`中添加命令

```javascript
"prepare": "husky install"
```

控制台执行命令

```javascript
yarn run prepare
```

会在项目根目录下生成一个`.husky`文件夹，在其下添加一个文件，名称为相关 `git hooks` 的名称。这里我们配置：`pre-commit`

命令生成 pre-commit

```shell
npx husky add .husky/pre-commit "npm run lint:lint-staged"
```

文件内容如下：

```javascript
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint:lint-staged
```

这样就与 `lint-staged` 关联起来了，在提交代码的时候就会按 `lint-staged` 配置去检测文件。

#### 2.4.3 安装`commitizen`和`cz-git`

```javascript
yarn add -D commitizen
```

`commitizen`可以帮助我们编写规范 `commit message `

```javascript
yarn add -D @commitlint/cli @commitlint/config-conventional
# config-conventional 是自定义校验风格
```

安装`cz-git`

```javascript
yarn add -D cz-git
```

修改 `package.json` 添加 `config` 指定使用的适配器

```javascript
{
  "scripts": {

  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

`cz-git` 与 [commitlint](https://github.com/conventional-changelog/commitlint) 进行联动给予校验信息，所以可以编写于 [commitlint](https://github.com/conventional-changelog/commitlint#config) 配置文件之中。

```js
// commitlint.config.js
// .commitlintrc.cjs
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rule: {
    ...
  },
  prompt: {
    useEmoji: true
    //option...
  }
}
```

#### 2.4.4 安装`commitlint`

如果我们按照 cz 来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？我们可以通过 commitlint 来限制提交

```javascript
yarn add -D @commitlint/config-conventional @commitlint/cli
```

在根目录下创建：`.commitlintrc.cjs`

```javascript
// @see: https://cz-git.qbenben.com/zh/guide
/** @type {import('cz-git').UserConfig} */

module.exports = {
	ignores: [commit => commit === "init"],
	extends: ["@commitlint/config-conventional"],
	rules: {
		// @see: https://commitlint.js.org/#/reference-rules
		"body-leading-blank": [2, "always"],
		"footer-leading-blank": [1, "always"],
		"header-max-length": [2, "always", 108],
		"subject-empty": [2, "never"],
		"type-empty": [2, "never"],
		"subject-case": [0],
		"type-enum": [
			2,
			"always",
			[
				"feat",
				"fix",
				"docs",
				"style",
				"refactor",
				"perf",
				"test",
				"build",
				"ci",
				"chore",
				"revert",
				"wip",
				"workflow",
				"types",
				"release"
			]
		]
	},
	prompt: {
		messages: {
			type: "Select the type of change that you're committing:",
			scope: "Denote the SCOPE of this change (optional):",
			customScope: "Denote the SCOPE of this change:",
			subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
			body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
			breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
			footerPrefixsSelect: "Select the ISSUES type of changeList by this change (optional):",
			customFooterPrefixs: "Input ISSUES prefix:",
			footer: "List any ISSUES by this change. E.g.: #31, #34:\n",
			confirmCommit: "Are you sure you want to proceed with the commit above?"
			// 中文版
			// type: "选择你要提交的类型 :",
			// scope: "选择一个提交范围（可选）:",
			// customScope: "请输入自定义的提交范围 :",
			// subject: "填写简短精炼的变更描述 :\n",
			// body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
			// breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
			// footerPrefixsSelect: "选择关联issue前缀（可选）:",
			// customFooterPrefixs: "输入自定义issue前缀 :",
			// footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
			// confirmCommit: "是否提交或修改commit ?"
		},
		types: [
			{
				value: "feat",
				name: "feat:     🚀  A new feature",
				emoji: "🚀"
			},
			{
				value: "fix",
				name: "fix:      🧩  A bug fix",
				emoji: "🧩"
			},
			{
				value: "docs",
				name: "docs:     📚  Documentation only changes",
				emoji: "📚"
			},
			{
				value: "style",
				name: "style:    🎨  Changes that do not affect the meaning of the code",
				emoji: "🎨"
			},
			{
				value: "refactor",
				name: "refactor: ♻️   A code change that neither fixes a bug nor adds a feature",
				emoji: "♻️"
			},
			{
				value: "perf",
				name: "perf:     ⚡️  A code change that improves performance",
				emoji: "⚡️"
			},
			{
				value: "test",
				name: "test:     ✅  Adding missing tests or correcting existing tests",
				emoji: "✅"
			},
			{
				value: "build",
				name: "build:    📦️   Changes that affect the build system or external dependencies",
				emoji: "📦️"
			},
			{
				value: "ci",
				name: "ci:       🎡  Changes to our CI configuration files and scripts",
				emoji: "🎡"
			},
			{
				value: "chore",
				name: "chore:    🔨  Other changes that don't modify src or test files",
				emoji: "🔨"
			},
			{
				value: "revert",
				name: "revert:   ⏪️  Reverts a previous commit",
				emoji: "⏪️"
			}
			// 中文版
			// { value: "特性", name: "特性:   🚀  新增功能", emoji: "🚀" },
			// { value: "修复", name: "修复:   🧩  修复缺陷", emoji: "🧩" },
			// { value: "文档", name: "文档:   📚  文档变更", emoji: "📚" },
			// { value: "格式", name: "格式:   🎨  代码格式（不影响功能，例如空格、分号等格式修正）", emoji: "🎨" },
			// { value: "重构", name: "重构:   ♻️  代码重构（不包括 bug 修复、功能新增）", emoji: "♻️" },
			// { value: "性能", name: "性能:   ⚡️  性能优化", emoji: "⚡️" },
			// { value: "测试", name: "测试:   ✅  添加疏漏测试或已有测试改动", emoji: "✅" },
			// { value: "构建", name: "构建:   📦️  构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）", emoji: "📦️" },
			// { value: "集成", name: "集成:   🎡  修改 CI 配置、脚本", emoji: "🎡" },
			// { value: "回退", name: "回退:   ⏪️  回滚 commit", emoji: "⏪️" },
			// { value: "其他", name: "其他:   🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）", emoji: "🔨" }
		],
		useEmoji: true,
		themeColorCode: "",
		scopes: [],
		allowCustomScopes: true,
		allowEmptyScopes: true,
		customScopesAlign: "bottom",
		customScopesAlias: "custom",
		emptyScopesAlias: "empty",
		upperCaseSubject: false,
		allowBreakingChanges: ["feat", "fix"],
		breaklineNumber: 100,
		breaklineChar: "|",
		skipQuestions: [],
		issuePrefixs: [{ value: "closed", name: "closed:   ISSUES has been processed" }],
		customIssuePrefixsAlign: "top",
		emptyIssuePrefixsAlias: "skip",
		customIssuePrefixsAlias: "custom",
		allowCustomIssuePrefixs: true,
		allowEmptyIssuePrefixs: true,
		confirmColorize: true,
		maxHeaderLength: Infinity,
		maxSubjectLength: Infinity,
		minSubjectLength: 0,
		scopeOverrides: undefined,
		defaultBody: "",
		defaultIssues: "",
		defaultScope: "",
		defaultSubject: ""
	}
};
```

`.husky`目录下创建`commit-msg`文件

命令生成

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

文件如下：

```javascript
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```

如果最后没有`$1`，手动添加一下

`package.json`加入命令：

```javascript
"commit": "git pull && git add -A && git-cz && git push"
```

之后提交使用`yarn commit`
