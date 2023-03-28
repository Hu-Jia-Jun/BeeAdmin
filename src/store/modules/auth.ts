import { defineStore } from "pinia";
import type { AuthState } from "@/store/interface";
import { getAuthButtonListApi, getAuthMenuListApi } from "@/api/module/login";
import { getFlatArr } from "@/utils/util";
// 用户权限 AuthStore
export const AuthStore = defineStore({
	id: "AuthStore",
	state: (): AuthState => ({
		routerName: "",
		// 按钮权限
		authButtonList: {},
		// 菜单权限
		authMenuList: []
	}),
	getters: {
		// 按钮权限列表
		authButtonListGetter: state => state.authButtonList,
		// 后端返回的菜单列表
		authMenuListGetter: state => state.authMenuList,
		// 扁平化后的一维数组路由，主要用来添加动态路由
		flatMenuListGetter: state => getFlatArr(state.authMenuList)
	},
	actions: {
		// 获取按钮权限列表
		async getAuthButtonList() {
			const { data } = await getAuthButtonListApi();
			this.authButtonList = data;
		},
		// 获取菜单权限列表
		async getAuthMenuList() {
			const { data } = await getAuthMenuListApi();
			this.authMenuList = data;
		},
		// 设置路由名称
		async setRouteName(name: string) {
			this.routerName = name;
		}
	}
});
