import {
  MainActionTypes,
  SET_ROOT_MENU,
  START_LOADING,
  STOP_LOADING,
  LOGIN,
  LOGIN_SUCCESS,
  SEND_EMAIL,
  LOGOUT,
  LoginAction,
} from './types';
import { filter, mergeMap } from 'rxjs/operators';
import { message } from 'antd';
import { combineEpics } from 'redux-observable';
import { IpcService } from '../../service/IpcService';
import { IIpcResponse } from '../../electron/shared/IIpcResponse';

const { ipcRenderer } = window.require('electron')
const ipc = new IpcService();


export function startLoading(): MainActionTypes {
  return { type: START_LOADING };
}

export function stopLoading(): MainActionTypes {
  return { type: STOP_LOADING };
}

export function setRootMenu(rootMenu: string): MainActionTypes {
  return { type: SET_ROOT_MENU, rootMenu };
}

// export function login(username: string, password: string): MainActionTypes {
//   return { type: LOGIN, username, password };
// }

const login = (action$: any) => action$.pipe(
  filter((action: MainActionTypes) => action.type === LOGIN),
  mergeMap(async (action: LoginAction) => {
    //let data = await ipcRenderer.invoke('login', action.username, action.password);
    const data = await ipc.send<IIpcResponse>('login');
    console.log(data);


    if (data) {
      message.success('登录成功');
      localStorage.setItem('user', JSON.stringify(data));
      return { type: LOGIN_SUCCESS, loginName: 11, displayName: 11, roles: [11] };
    } else {
      message.error('登录失败');
    }
  })
)


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


export const mainEpic = combineEpics(login);