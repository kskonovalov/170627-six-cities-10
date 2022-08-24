import {createAsyncThunk} from '@reduxjs/toolkit';

import {ApiRoute, authData, AuthorizationStatus, LoadingObj, setUserFavoriteData} from '../../const';
import {addToUserFavorites, loading, removeFromUserFavorites, setAuthorizationStatus, setError, setUserData, setUserFavorites} from '../actions';
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

export const fetchUserFavorites = createAsyncThunk<void, undefined, AsyncThunkConfigType>(
  'user-slice/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(loading({
      name: LoadingObj.Favorites,
      status: true
    }));
    try {
      const response = await api.get(ApiRoute.Favorite);
      if (response?.data) {
        dispatch(setUserFavorites(response?.data));
      }
    } catch {
      dispatch(setUserFavorites([]));
    } finally {
      dispatch(loading({
        name: LoadingObj.Favorites,
        status: false
      }));
    }
  }
);

export const setUserFavoriteAction = createAsyncThunk<void, setUserFavoriteData, AsyncThunkConfigType>(
  'user-slice/setUserFavorite',
  async ({offerID, setFavorite}, {dispatch, extra: api}) => {
    try {
      const urlSetUserFavorite = ApiRoute.AddToFavorites.replace('{offerID}', `${offerID}`).replace('{setFavorite}', `${setFavorite}`);
      const response = await api.post(urlSetUserFavorite);
      if (response?.data?.isFavorite) {
        dispatch(addToUserFavorites(response?.data));
      } else {
        dispatch(removeFromUserFavorites(offerID));
      }
    } catch {
      dispatch(setError('Failed to set favorite'));
    } finally {
      dispatch(fetchUserFavorites);
    }
  }
);
