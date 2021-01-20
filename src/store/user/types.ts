export const GET_USERS = 'USER/GET_USERS';
export const SET_USERS = 'USER/SET_USERS';
export const ADD_USERS = 'USER/ADD_USERS';
export const DELETE_USERS = 'USER/DELETE_USERS';
export const UPDATE_USERS = 'USER/UPDATE_USERS';

interface GetUsersAction {
    type: typeof GET_USERS;
}

interface SetUsersAction {
    type: typeof SET_USERS;
    payload: User[];
}

export interface AddUserAction{
    type: typeof ADD_USERS;
    payload: User;
}

export interface DeleteUserAction{
    type: typeof DELETE_USERS;
    id: number;
}

export interface UpdateUserAction{
    type: typeof UPDATE_USERS;
    payload: User;
    id:number;
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