import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import App from './components/app/app';
import store from './store/store';
import {checkAuthAction} from './store/user-slice/user-api-actions';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import ScrollTop from './components/ux/scroll-top';

/* load user state */
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ScrollTop/>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
