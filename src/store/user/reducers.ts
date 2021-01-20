import { SET_USERS, UserActionTypes, UserState } from './types';

const initialState: UserState = {
    users: [],
};

export function userReducer(
    state=initialState, action:UserActionTypes
): UserState {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        default: return state;
    }
}