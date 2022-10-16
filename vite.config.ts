import { defineConfig } from "vite";

// 支持单文件组件
import vue from "@vitejs/plugin-vue";
// jsx支持
import vueJsx from "@vitejs/plugin-vue-jsx";
// 原子样式 uno-css 支持
import UnoCss from "./config/unocss";

export default defineConfig({
	plugins: [vue(), vueJsx({}), UnoCss()],

	build: {
		minify: false,
		lib: {
			entry: "./src/entry.ts",
			name: "SmartyUI",
			fileName: "smarty-ui",
			// 导出的模块格式
			formats: ["es", "umd", "iife"],
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
		cssCodeSplit: true,
	},
	resolve: {
		alias: {
			// 更改运行时引入的vue（因为要使用template 选项）
			vue: "vue/dist/vue.esm-bundler.js",
		},
	},
});
