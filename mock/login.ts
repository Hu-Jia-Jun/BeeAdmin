import { MockMethod } from "vite-plugin-mock";

export default [
	{
		url: "/login",
		method: "post",
		response: ({ body }) => {
			// 此处不校验密码
			if (body.data.username === "admin") {
				return {
					code: 200,
					msg: "请求成功",
					data: {
						username: "admin",
						roles: ["admin"],
						accessToken: "Bee_OIzhjt4r2JO5LJgKXfp1rEE.admin",
						refreshToken: "Bee_OIzhjt4r2JO5LJgKXfp1rEE.adminRefresh",
						expires: "2023/8/30 00:00:00"
					}
				};
			} else if (body.data.username === "user") {
				return {
					code: 200,
					msg: "请求成功",
					data: {
						username: "user",
						roles: ["user"],
						accessToken: "Bee_OIzhjt4r2JO5LJgKXfp1rEE.common",
						refreshToken: "Bee_OIzhjt4r2JO5LJgKXfp1rEE.commonRefresh",
						expires: "2023/10/30 00:00:00"
					}
				};
			} else {
				return {
					code: 500,
					msg: "用户名或密码错误"
				};
			}
		}
	}
] as MockMethod[];
