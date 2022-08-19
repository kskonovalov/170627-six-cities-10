import {createAsyncThunk} from '@reduxjs/toolkit';

import {ApiRoute, authData, AuthorizationStatus, userData} from '../../const';
import {setAuthorizationStatus, setUserData} from '../actions';
import {setToken, unsetToken} from '../../api/token';
import {AsyncThunkConfigType} from '../../types/state';

export const checkAuthAction = createAsyncThunk<void, undefined, AsyncThunkConfigType>(
  'user-slice/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const response = await api.get(ApiRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUserData(response?.data));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUserData(null));
    }
  }
);

export const loginAction = createAsyncThunk<void, authData, AsyncThunkConfigType>(
  'user-slice/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<userData>(ApiRoute.Login, {email, password});
      setToken(token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, AsyncThunkConfigType>(
  'user-slice/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    unsetToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
);
