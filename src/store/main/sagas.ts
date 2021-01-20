import { message } from 'antd';
import NProgress from 'nprogress';
import { put } from 'redux-saga/effects';
import { loginSuccess } from './actions';
import { LoginAction } from './types';

const { ipcRenderer } = window.require('electron')
export function* loginSaga(action: LoginAction) {
    NProgress.start();
    let data = yield ipcRenderer.invoke('login', action.username,action.password);
    console.log(data)
    if (data.length === 1) {
        message.success('登录成功');
        yield put(loginSuccess(data[0].username, data[0].name, [data[0].role]));
        localStorage.setItem('user',JSON.stringify(data));
        
        

    } else {
        message.error('登录失败');

    }

    NProgress.done();
}