import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import createAPI from '../api/api';
import {saveUserSettingsToLocalStorage, dropUserTokenAfterLogout} from './middleware';
import {rootReducer} from './root-reducer';

export const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  }).concat([saveUserSettingsToLocalStorage, dropUserTokenAfterLogout])
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
