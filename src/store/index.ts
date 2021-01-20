import { connectRouter } from 'connected-react-router';
import { takeEvery } from 'redux-saga/effects';
import { createHashHistory } from 'history';
import { combineReducers } from 'redux';
import { mainReducer } from './main/reducers';
import { dictReducer } from './dict/reducers';
import { userReducer } from './user/reducers';
import { ADD_USERS, DELETE_USERS, GET_USERS, UPDATE_USERS } from './user/types';
import { addUsersSaga, deleteUsersSaga, getUsersSaga, updateUsersSaga } from './user/sagas';
import { loginSaga } from './main/sagas';
import { LOGIN } from './main/types';




export const rootReducer = combineReducers({
  router: connectRouter(createHashHistory()),
  main: mainReducer,
  dict: dictReducer,
  user: userReducer,
});
export type RootState = ReturnType<typeof rootReducer>;



export function* watchUser() {
  yield takeEvery(ADD_USERS, addUsersSaga);
  yield takeEvery(GET_USERS, getUsersSaga);
  yield takeEvery(DELETE_USERS, deleteUsersSaga);
  yield takeEvery(UPDATE_USERS, updateUsersSaga);
}

//watch main login
export function* watchMain() {
  yield takeEvery(LOGIN, loginSaga);
}
