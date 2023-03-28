import http from "@/api";
import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
/**
 * @name 登录模块
 */

/** 用户登录 */
export const loginApi = (data: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(PORT1 + `/login`, { data });
};

/** 获取用户按钮列表 */
export const getAuthButtonListApi = () => {
	return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`, {});
};

/** 获取用户菜单列表 */
export const getAuthMenuListApi = () => {
	return http.get<Menu.MenuOptions[]>(PORT1 + `/auth/menu`, {});
};
