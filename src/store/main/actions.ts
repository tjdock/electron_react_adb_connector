import {
  MainActionTypes,
  SET_ROOT_MENU,
  START_LOADING,
  STOP_LOADING,
  LOGIN,
  LOGIN_SUCCESS,
  SEND_EMAIL,
  LOGOUT,
} from './types';

export function startLoading(): MainActionTypes {
  return { type: START_LOADING };
}

export function stopLoading(): MainActionTypes {
  return { type: STOP_LOADING };
}

export function setRootMenu(rootMenu: string): MainActionTypes {
  return { type: SET_ROOT_MENU, rootMenu };
}

export function login(username: string, password: string): MainActionTypes {
  return { type: LOGIN, username, password };
}
export function logout() {
  return { type: LOGOUT };
}

export function loginSuccess(
  loginName: string,
  displayName: string,
  roles: string[]
): MainActionTypes {
  return { type: LOGIN_SUCCESS, loginName, displayName, roles };
}

export function sendEmail(formData: FormData): MainActionTypes {
  return { type: SEND_EMAIL, formData };
}
