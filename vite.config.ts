import { defineConfig } from "vite";

// 支持单文件组件
import vue from "@vitejs/plugin-vue";
// jsx支持
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
	plugins: [vue(), vueJsx({})],

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
	},
});
