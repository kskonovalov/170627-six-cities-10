import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import App from './components/app/app';
import store from './store/store';
import {checkAuthAction} from './store/user-slice/user-api-actions';

/* load user state */
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
);
