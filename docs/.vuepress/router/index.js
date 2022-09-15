module.exports.nav = [
	{ text: "首页", link: "/" },
	{ text: "方法函数", link: "/methods/" },
	{ text: "通用组件", link: "/components/" },
];
module.exports.sidebar = {
	"/methods/": [
		{
			title: "简介",
			path: "/methods/",
		},
		{
			title: "数组",
			children: [{ title: "findByKV", path: "/methods/array/findByKV" }],
		},
		{
			title: "数字",
			children: [
				{ title: "ceilNum", path: "/methods/number/ceilNum" },
				{
					title: "conversionUnit",
					path: "/methods/number/conversionUnit",
				},
				{
					title: "formatNumber",
					path: "/methods/number/formatNumber",
				},
			],
		},
		{
			title: "异步",
			children: [{ title: "sleep", path: "/methods/async/sleep" }],
		},
		{
			title: "时间",
			children: [
				{ title: "formatDate", path: "/methods/date/formatDate" },
			],
		},
	],
	"/components/": [
		{
			title: "简介",
			path: "/components/",
		},
		{
			title: "EChart",
			children: [{ title: "基础", path: "/components/e-chart/base.md" }],
		},
	],
};
