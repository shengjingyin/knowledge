const { nav, sidebar } = require("./router/index");

module.exports = {
	title: "文档",
	description: "这里是...",
	base: "/",
	port: "8080",
	themeConfig: {
		nav,
		sidebar,
		sidebarDepth: 3,
	},
	head: [],
	plugins: ["demo-container"],
	markdown: {},
	configureWebpack: (config) => {
		config.module.rules.push({
			test: /.(less)$/,
			use: ["vue-style-loader", "css-loader", "less-loader"],
		});
	},
};
