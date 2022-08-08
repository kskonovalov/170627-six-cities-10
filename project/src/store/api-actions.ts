import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {AppDispatch} from './store';
import {Store} from './reducer';
import {Offer} from '../types/types';
import {loadOffers, offersLoading, setAuthorizationStatus} from './actions';
import {ApiRoute, AuthorizationStatus, authData, userData} from '../const';
import {setToken, unsetToken} from '../api/token';

type asyncThunkConfigType = {
    dispatch: AppDispatch,
    state: Store,
    extra: AxiosInstance
};

export const fetchOffersAction = createAsyncThunk<void, undefined, asyncThunkConfigType>(
  'data/loadOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(ApiRoute.Hotels);
    dispatch(offersLoading(true));
    dispatch(loadOffers(data));
    dispatch(offersLoading(false));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, asyncThunkConfigType>(
  'app/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(ApiRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, authData, asyncThunkConfigType>(
  'app/login',
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

export const logoutAction = createAsyncThunk<void, undefined, asyncThunkConfigType>(
  'app/logout',
  async(_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    unsetToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
);
