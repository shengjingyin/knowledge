// 暴露sidebar

const sidebar = {
	"/components/": [
		{ text: "起步", link: "/components/" },
		{
			text: "基础",
			collapsible: true,
			children: [{ text: "Button 按钮", link: "/components/button/" }],
		},
	],
};

export default {
	sidebar,
};
