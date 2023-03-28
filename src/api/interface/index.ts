// * 请求响应参数(不包含data)
export interface Result {
	code: number;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T;
}

// 登录模块
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		/** 用户名 */
		username: string;
		/** 当前登陆用户的角色 */
		roles: string[];
		/** `token` */
		accessToken: string;
		/** 用于调用刷新`accessToken`的接口时所需的`token` */
		refreshToken: string;
		/** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
		expires: Date;
	}
	export interface ResAuthButtons {
		// ts的索引签名，表示返回内容都需要遵循 string[] 的结构
		[key: string]: string[];
	}
}
