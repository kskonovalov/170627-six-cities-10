import {configureStore} from '@reduxjs/toolkit';

import reducer from './reducer';
import {saveUserSettingsToLocalStorage} from './middleware';

const store = configureStore({
  reducer,
  middleware: [saveUserSettingsToLocalStorage]
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
