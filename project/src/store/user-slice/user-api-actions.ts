import {createAsyncThunk} from '@reduxjs/toolkit';

import {ApiRoute, authData, AuthorizationStatus} from '../../const';
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
      const response = await api.post(ApiRoute.Login, {email, password});
      setToken(response?.data?.token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUserData(response?.data));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUserData(null));
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
