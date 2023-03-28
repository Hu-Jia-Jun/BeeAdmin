import { PersistedStateOptions } from "pinia-plugin-persistedstate";

/**
 * @description pinia持久化参数的配置
 * @param key 存储的name
 * @param paths 要持久化存储的 state name
 * @returns persist
 */
const piniaPersisteConfig = (key: string, paths?: string[]) => {
	const persist: PersistedStateOptions = {
		key,
		storage: localStorage,
		paths
	};
	return persist;
};

export default piniaPersisteConfig;
