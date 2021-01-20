export const GET_DICTS = 'DICT/GET_DICTS';
export const SET_DICTS = 'DICT/SET_DICTS';
export const ADD_DICT = 'DICT/ADD_DICT';
export const DELETE_DICT = 'DICT/DELETE_DICT';
export const UPDATE_DICT = 'DICT/UPDATE_DICT';

interface GetDictsAction {
  type: typeof GET_DICTS;
}

interface SetDictsAction {
  type: typeof SET_DICTS;
  payload: Dict[];
}

export interface Dict {
  ID?: string;
  Title: string;
  DictType?: string | null;
}

export interface MenuBar {
  Title: string;
  ID: string;
  DictType?: string | null;
  role?: string | null;
  children: Dict[];
  icon: any;
}

export interface DictState {
  /* 左侧菜单 */
  menus: MenuBar[];
}

export type DictActionTypes = GetDictsAction | SetDictsAction;
