/** UserState */
export interface UserState {
	token: string;
	username: string;
	roles: string[];
}

/** AuthState */
export interface AuthState {
	routerName: string;
	authButtonList: {
		[key: string]: string[];
	};
	authMenuList: Menu.MenuOptions[];
}
