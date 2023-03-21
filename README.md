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
