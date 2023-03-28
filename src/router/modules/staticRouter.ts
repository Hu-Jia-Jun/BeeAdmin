import { RouteRecordRaw } from "vue-router";
import { HOME_URL, LOGIN_URL } from "@/config/config";

/** 静态路由 */
export const staticRouter: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: HOME_URL
	},
	{
		path: HOME_URL,
		meta: {
			title: "首页"
		},
		component: () => import("@/views/home/index.vue")
	},
	{
		path: LOGIN_URL,
		meta: {
			title: "登录"
		},
		component: () => import("@/views/login/index.vue")
	}
];

/** 错误页面路由 */
export const errorRouter = [
	{
		path: "/500",
		meta: {
			title: "500页面"
		},
		component: () => import("@/components/ErrorPage/500.vue")
	}
];
