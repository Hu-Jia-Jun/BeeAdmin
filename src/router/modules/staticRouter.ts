import { RouteRecordRaw } from "vue-router";

/**
 * 静态路由
 */
export const staticRouter: RouteRecordRaw[] = [
	{
		path: "/",
		meta: {
			tittle: "登录"
		},
		// component: () => import("../../views/login/index.vue")
		component: () => import("@/views/login/index.vue")
	}
];
