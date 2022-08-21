import {createSlice} from '@reduxjs/toolkit';

import {NameSpace, AuthorizationStatus} from '../../const';
import {UserSlice} from '../../types/state';
import {setAuthorizationStatus, setUserData} from '../actions';

const initialState: UserSlice = {
  authorizationStatus: AuthorizationStatus.Unknown,
  favorites: [],
  user: null
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setAuthorizationStatus, (state: UserSlice, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(setUserData, (state: UserSlice, action) => {
        state.user = action.payload;
      });
  }
});
