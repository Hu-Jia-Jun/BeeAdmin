import Axios, { AxiosRequestConfig, AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { ResultData } from "@/api/interface";
import { ElMessage } from "element-plus";
import router from "@/router";
import { HttpResultEnum } from "@/config/enums";
import { checkStatus } from "@/api/helper/checkStatus";
import { UserStore } from "@/store/modules/user";
import { LOGIN_URL } from "@/config/config";
// 请求配置 https://axios-http.com/zh/docs/req_config
const defaultConfig: AxiosRequestConfig = {
	// 设置超时时间10s
	timeout: 10000
};

class RequestHttp {
	/** 保存当前Axios的实例对象 */
	service: AxiosInstance;

	constructor(config: AxiosRequestConfig) {
		/** 请求拦截 */
		this.service = Axios.create(config);
		this.service.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				return config;
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);

		/** 响应拦截 */
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data } = response;
				// 401
				if (data.code === HttpResultEnum.OVERDUE) {
					const userStore = UserStore();
					ElMessage.error(data.msg);
					userStore.SET_TOKEN("");
					router.replace(LOGIN_URL);
					return Promise.reject(data);
				}
				// 全局错误信息拦截
				if (data.code && data.code !== HttpResultEnum.SUCCESS) {
					ElMessage.error(data.msg);
					return Promise.reject(data);
				}
				return data;
			},
			async (error: AxiosError) => {
				const { response } = error;
				// 请求超时
				if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
				// 网络问题
				if (error.message.indexOf("Network Error") !== -1) ElMessage.error("网络错误！请您稍后重试");
				// 根据响应的错误状态码，做不同的处理
				if (response) checkStatus(response.status);
				// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
				if (!window.navigator.onLine) router.replace("/500");
				return Promise.reject(error);
			}
		);
	}
	/** 单独抽离的工具函数 */
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
	}
}

export default new RequestHttp(defaultConfig);
