
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { defineConfig } from "vite";

// 支持单文件组件
import vue from "@vitejs/plugin-vue";
// jsx支持
import vueJsx from "@vitejs/plugin-vue-jsx";
// 原子样式 uno-css 支持
import UnoCss from "./config/unocss";

const __unconfig_default =  defineConfig({
	plugins: [vue(), vueJsx({}), UnoCss()],

	build: {
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
		minify: "terser", // boolean | 'terser' | 'esbuild'
		sourcemap: true, // 输出单独 source文件
		// brotliSize: true, // 生成压缩大小报告
		lib: {
			entry: "./src/entry.ts",
			name: "SmartyUI",
			fileName: "smarty-ui",
			// 导出的模块格式，供不同环境使用
			formats: ["es", "umd", "iife"],
		},
		cssCodeSplit: true, // 独立输出 css
	},
	resolve: {
		alias: {
			// 更改运行时引入的vue（因为要使用template 选项）
			vue: "vue/dist/vue.esm-bundler.js",
		},
	},
});

if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;