import {
    ADD_USERS,
    DELETE_USERS,
    GET_USERS,
    SET_USERS,
    User,
    UserActionTypes,
    UPDATE_USERS,
} from './types';

export function getUsers(): UserActionTypes  {
    return { type: GET_USERS };
}

export function setUsers(payload: User[]): UserActionTypes {
    return { type: SET_USERS, payload: payload };
}

export function addUser(payload: User): UserActionTypes {
    return { type: ADD_USERS, payload: payload };
}

export function deleteUser(id: number): UserActionTypes {
    return { type: DELETE_USERS, id };
}

export function updateUser(
    payload: User,
    id: number
): UserActionTypes {
    return { type: UPDATE_USERS, payload, id };
}