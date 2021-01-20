export const START_LOADING = "MAIN/START_LOADING";
export const STOP_LOADING = "MAIN/STOP_LOADING";
export const SET_ROOT_MENU = "MAIN/SET_ROOT_MENU";
export const LOGIN = "MAIN/LOGIN";
export const LOGOUT = "MAIN/LOGOUT";
export const LOGIN_SUCCESS = "MAIN/LOGIN_SUCCESS";
export const SEND_EMAIL = "MAIN/SEND_EMAIL";

interface StartLoadingAction {
  type: typeof START_LOADING;
}

interface StopLoadingAction {
  type: typeof STOP_LOADING;
}

interface SetRootMenuAction {
  type: typeof SET_ROOT_MENU;
  rootMenu: string;
}

export interface LoginAction {
  type: typeof LOGIN;
  username: string;
  password: string;
}

export interface Logout {
  type: typeof LOGOUT;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  loginName: string;
  displayName: string;
  roles: string[];
}

export interface SendEmailAction {
  type: typeof SEND_EMAIL;
  formData: FormData;
}

export interface MainState {
  /* 进度条 */
  loading: boolean;
  /* 菜单 */
  rootMenu: string | null;
  /* 登陆账号 */
  loginName: string | null;
  /* 显示姓名 */
  displayName: string | null;
  /* 角色 */
  roles: string[];

  /* 根路由 */
  rootPath: string | null;
}

export type MainActionTypes =
  | StartLoadingAction
  | StopLoadingAction
  | SetRootMenuAction
  | LoginAction
  | LoginSuccessAction
  | SendEmailAction
  | Logout;
