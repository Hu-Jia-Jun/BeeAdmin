import { defineStore, createPinia } from "pinia";
import piniaPersisteConfig from "@/utils/piniaPersist/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// GlobalStore实体
export const GlobalStore = defineStore("GlobalStore", {
	state: () => ({}),
	getters: {},
	actions: {},
	persist: piniaPersisteConfig("GlobalState")
});

// 持久化存储
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
