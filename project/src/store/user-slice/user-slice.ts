import {createSlice} from '@reduxjs/toolkit';

import {NameSpace, AuthorizationStatus} from '../../const';
import {UserSlice} from '../../types/state';
import {checkAuthAction} from './user-api-actions';

const initialState: UserSlice = {
  authorizationStatus: AuthorizationStatus.Unknown,
  favorites: []
};

/*
* Нужно ли переносить экшны прямо в reducers в slice,
* или оставить их в extraReducers? Не очень понимаю, какие
* критерии выбора
* */
export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state: UserSlice) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state: UserSlice) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
