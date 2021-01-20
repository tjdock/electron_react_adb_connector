import { Dict, DictActionTypes, GET_DICTS, SET_DICTS } from './types';

export function getDicts(): DictActionTypes {
  return { type: GET_DICTS };
}

export function setDicts(payload: Dict[]): DictActionTypes {
  return { type: SET_DICTS, payload };
}
