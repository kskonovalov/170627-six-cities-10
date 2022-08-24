import {combineReducers} from '@reduxjs/toolkit';

import {NameSpace} from '../const';
import {userSlice} from './user-slice/user-slice';
import {offersSlice} from './offers-slice/offers-slice';
import {appSlice} from './app-slice/app-slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.App]: appSlice.reducer
});
