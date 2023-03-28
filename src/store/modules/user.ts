import { defineStore } from "pinia";
import { UserState } from "@/store/interface";
import piniaPersistConfig from "@/config/piniaPersist";

// UserStore
export const UserStore = defineStore({
	id: "UserState",
	state: (): UserState => ({
		token: "",
		username: "",
		roles: []
	}),
	getters: {},
	actions: {
		/** 存储用户名 */
		SET_USERNAME(name: string) {
			this.username = name;
		},
		/** 存储角色 */
		SET_ROLES(roles: Array<string>) {
			this.roles = roles;
		},
		/** 存储Token */
		SET_TOKEN(token: string) {
			this.token = token;
		}
	},
	persist: piniaPersistConfig("UserState")
});
