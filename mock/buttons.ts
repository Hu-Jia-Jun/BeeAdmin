import { MockMethod } from "vite-plugin-mock";

export default [
	// 请求按钮权限
	{
		url: "/auth/buttons",
		method: "get",
		response: () => {
			return {
				code: 200,
				msg: "请求成功",
				data: {
					authButtons: ["add", "edit", "delete", "import", "export"]
				}
			};
		}
	}
] as MockMethod[];
