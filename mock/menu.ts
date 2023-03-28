import { MockMethod } from "vite-plugin-mock";

export default [
	// 请求菜单权限
	{
		url: "/auth/menu",
		method: "get",
		response: () => {
			return {
				code: 200,
				msg: "请求成功",
				data: [
					{
						path: "/home/index",
						name: "home",
						component: "/home/index",
						meta: {
							title: "首页"
						}
					}
				]
			};
		}
	}
] as MockMethod[];
