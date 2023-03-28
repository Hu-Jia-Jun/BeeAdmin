// app description
export const VITE_GLOB_APP_APP_DESCRIPTION: string[] = [
	"简化操作流程，提高管理效率",
	"快速数据处理，提供实时预警",
	"保证信息安全，系统可靠性高"
];

// * 请求枚举配置
/**
 * @description：请求配置
 */
export enum HttpResultEnum {
	SUCCESS = 200,
	ERROR = 500,
	OVERDUE = 401,
	TIMEOUT = 30000,
	TYPE = "success"
}

/**
 * @description：请求方法
 */
export enum HttpRequestEnum {
	GET = "GET",
	POST = "POST",
	PATCH = "PATCH",
	PUT = "PUT",
	DELETE = "DELETE"
}

/**
 * @description：常用的contentTyp类型
 */
export enum HttpContentTypeEnum {
	// json
	JSON = "application/json;charset=UTF-8",
	// text
	TEXT = "text/plain;charset=UTF-8",
	// form-data 一般配合qs
	FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
	// form-data 上传
	FORM_DATA = "multipart/form-data;charset=UTF-8"
}
