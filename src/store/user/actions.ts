import {
  ADD_USER,
  DELETE_USER,
  GET_USERS,
  SET_USERS,
  UserActionTypes,
  UPDATE_USER,
  AddUserAction,
  DeleteUserAction,
  UpdateUserAction,
} from './types';
import { filter, mergeMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { message } from 'antd';

const { ipcRenderer } = window.require('electron')


const getUsers = (action$: any) => action$.pipe(
  filter((action: UserActionTypes) => action.type === GET_USERS),
  mergeMap(async () => {
    let data = await ipcRenderer.invoke('getUsers');

    return { type: SET_USERS, payload: data }
  })
)



const addUser = (action$: any) => action$.pipe(
  filter((action: UserActionTypes) => action.type === ADD_USER),
  mergeMap(async (action: AddUserAction) => {
    let data = await ipcRenderer.invoke('addUser', action.payload);
    if (data) {
      message.success("添加成功！");
      return { type: GET_USERS };
    }
  })
)

const deleteUser = (action$: any) => action$.pipe(
  filter((action: UserActionTypes) => action.type === DELETE_USER),
  mergeMap(async (action: DeleteUserAction) => {
    let data = await ipcRenderer.invoke('deleteUser', action.id);
    if (data) {
      message.success("删除成功！");
      return { type: GET_USERS };
    }
  })
)


const updateUser = (action$: any) => action$.pipe(
  filter((action: UserActionTypes) => action.type === UPDATE_USER),
  mergeMap(async (action: UpdateUserAction) => {
    let data = await ipcRenderer.invoke('updateUser', action.payload, action.id);
    if (data) {
      message.success("修改成功！");
      return { type: GET_USERS };
    }
  })
)

export const userEpic = combineEpics(getUsers, addUser, deleteUser, updateUser);