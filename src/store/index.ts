import { connectRouter } from 'connected-react-router';
import { createHashHistory } from 'history';
import { combineReducers } from 'redux';
import { mainReducer } from './main/reducers';
import { dictReducer } from './dict/reducers';
import { userReducer } from './user/reducers';




export const rootReducer = combineReducers({
  router: connectRouter(createHashHistory()),
  main: mainReducer,
  dict: dictReducer,
  user: userReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
