import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import { resolve } from "path";
import svgLoader from "vite-svg-loader";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		// 设置alias别名 https://cn.vitejs.dev/config/shared-options.html#resolve-alias
		alias: {
			"@": resolve(__dirname, "./src")
		}
	},
	plugins: [
		vue(),
		// svg组件化 https://www.npmjs.com/package/vite-svg-loader
		svgLoader({
			svgoConfig: {
				multipass: true
			}
		}),
		// mock支持
		viteMockServe({
			mockPath: "mock"
		}),
		// EsLint 报错信息显示在浏览器界面上
		eslintPlugin()
	]
});
