import front from "./front";
import component from "./component";

const nav = [
	{ text: "组件", link: "/components/" },
	{
		text: "前端",
		link: "/front/js/闭包/",
	},
	{
		text: "help",
		link: "https://vuepress-theme-hope.github.io/v2/zh/",
	},
];
export default { nav, sidebar: Object.assign({}, front.sidebar, component.sidebar) };
