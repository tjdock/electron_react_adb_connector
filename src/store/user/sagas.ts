import { message } from 'antd';
import NProgress from 'nprogress';
import { put } from 'redux-saga/effects';
import { getUsers, setUsers } from './actions';
import { AddUserAction, DeleteUserAction, UpdateUserAction } from './types';

const { ipcRenderer } = window.require('electron')

export function* getUsersSaga() {
    NProgress.start();
    let data = yield ipcRenderer.invoke('getUsers');
    yield put(setUsers(data));
    NProgress.done();
}

export function* addUsersSaga(action: AddUserAction) {
    
    NProgress.start();
    let data = yield ipcRenderer.invoke('addUser', action.payload);
    if (data) {
        message.success("添加成功！");
        yield put(getUsers());
    }
    NProgress.done();
}

export function* updateUsersSaga(action: UpdateUserAction) {
    NProgress.start();
    let data = yield ipcRenderer.invoke('updateUser', action.payload,action.id);
    if (data) {
        message.success("修改成功！");
        yield put(getUsers());
    }
    NProgress.done();
}

export function* deleteUsersSaga(action: DeleteUserAction) {
    NProgress.start();
    let data = yield ipcRenderer.invoke('deleteUser',action.id);
    if (data) {
        message.success("删除成功！");
        yield put(getUsers());
    }
    NProgress.done();
}