import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import reducer from './reducer';
import createAPI from '../api/api';
import {saveUserSettingsToLocalStorage} from './middleware';

export const api = createAPI();

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  }).concat(saveUserSettingsToLocalStorage)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
