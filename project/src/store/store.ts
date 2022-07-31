import {configureStore} from '@reduxjs/toolkit';

import reducer from './reducer';
import {saveSortByToLocalStorage} from './middleware';

const store = configureStore({
  reducer,
  middleware: [saveSortByToLocalStorage]
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
