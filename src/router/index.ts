import { createRouter, createWebHistory } from "vue-router";
import { staticRouter } from "@/router/modules/staticRouter";
import { UserStore } from "@/store/modules/user";
import { AuthStore } from "@/store/modules/auth";
import NProgress from "@/utils/NProgress";
import { LOGIN_URL, ROUTER_WHITE_LIST } from "@/config/config";

export const router = createRouter({
	history: createWebHistory(),
	routes: [...staticRouter],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 })
});

router.beforeEach(async (to, from, next) => {
	const userStore = UserStore();

	// 1. 开始 NProgress
	NProgress.start();

	// 2. 动态设置标题
	const title = import.meta.env.VITE_GLOB_APP_TITLE;
	document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;
	// 3. 如果是白名单，放行访问
	if (ROUTER_WHITE_LIST.includes(to.path)) return next();

	/**
	 * 4. 判断是不是访问登录页
	 * 如果登录过（有token）继续留在当前页面
	 * 没有token重置路由，放行到登录页面
	 */
	if (to.path.toLocaleLowerCase() === LOGIN_URL) {
		if (userStore.token) return next(from.fullPath);
		resetRouter();
		return next();
	}

	// 5. 判断是否过期，过期重定向到登录页面
	if (!userStore.token) return next({ path: LOGIN_URL, replace: true });

	// 6. 如果没有菜单列表，就重新请求菜单并添加动态路由
	AuthStore().setRouteName(to.name as string);

	next();
});

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
	const authStore = AuthStore();
	authStore.flatMenuListGetter.forEach(route => {
		const { name } = route;
		if (name && router.hasRoute(name)) router.removeRoute(name);
	});
};

/**
 * @description 路由跳转结束
 */
router.afterEach(() => {
	// 结束进度条动画
	NProgress.done();
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
	NProgress.done();
	console.warn("路由错误", error.message);
});

export default router;
