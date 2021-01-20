import { MainActionTypes, MainState, START_LOADING, STOP_LOADING, SET_ROOT_MENU, LOGIN_SUCCESS, LOGOUT } from "./types";

const initialState: MainState = {
  loading: false,
  rootMenu: null,
  loginName: null,
  roles: [],
  displayName: null,
  rootPath: null,
}

export function mainReducer(
  state = initialState,
  action: MainActionTypes
): MainState {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true
      }
    case STOP_LOADING:
      return {
        ...state,
        loading: false
      }
    case SET_ROOT_MENU:
      return {
        ...state,
        rootMenu: action.rootMenu
      }
    case LOGOUT:
      return {
        ...state,
        loginName: null,
        displayName: null,
        roles: [],
        rootPath: null
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginName: action.loginName,
        displayName: action.displayName,
        roles: action.roles,
        rootPath: '/sys/intro'
      }
    default:
      return state;
  }
}