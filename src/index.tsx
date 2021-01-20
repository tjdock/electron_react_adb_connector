import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

import App from './App';

/*router import (BrowserRouter 或者 HashRouter) createHashHistory*/
import { createHashHistory } from 'history';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
/*****************************************************************/

/*antd-ui , local import*/
import 'antd/dist/antd.min.css';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { ConfigProvider } from 'antd';
/*antd-ui , local import****************************************************************/

/*redux import*/
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer, watchMain, watchUser } from './store';
/*redux import****************************************************************/

/*redux settings*/
const sagaMiddleware = createSagaMiddleware();
const history = createHashHistory();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, sagaMiddleware, routerMiddleware(history))
);
sagaMiddleware.run(watchMain);
sagaMiddleware.run(watchUser);


/*antd settings*/
moment.locale('cn');

NProgress.configure({ showSpinner: true });

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);
