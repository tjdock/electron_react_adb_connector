export const GET_USERS = 'USER/GET_USERS';
export const SET_USERS = 'USER/SET_USERS';
export const ADD_USER = 'USER/ADD_USER';
export const DELETE_USER = 'USER/DELETE_USER';
export const UPDATE_USER = 'USER/UPDATE_USER';

interface GetUsersAction {
  type: typeof GET_USERS;
}

interface SetUsersAction {
  type: typeof SET_USERS;
  payload: User[];
}

export interface AddUserAction {
  type: typeof ADD_USER;
  payload: User;
}

export interface DeleteUserAction {
  type: typeof DELETE_USER;
  id: number;
}

export interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: User;
  id: number;
}


export interface User {
  id?: number;
  userName: string;
  role: string;
  name: string;
  password: string;
}

export interface UserState {
  users: User[];
}

export type UserActionTypes =
  | GetUsersAction
  | SetUsersAction
  | AddUserAction
  | DeleteUserAction
  | UpdateUserAction