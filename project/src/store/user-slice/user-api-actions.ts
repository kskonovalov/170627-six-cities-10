import {createAsyncThunk} from '@reduxjs/toolkit';

import {ApiRoute, authData, AuthorizationStatus, LoadingObject, setUserFavoriteData} from '../../const';
import {addToUserFavorites, changeOfferIsFavorite, changeOneOfOffersIsFavorite, loading, removeFromUserFavorites, setAuthorizationStatus, setError, setUserData, setUserFavorites} from '../actions';
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
    dispatch(setUserData(null));
  }
);

export const fetchUserFavorites = createAsyncThunk<void, undefined, AsyncThunkConfigType>(
  'user-slice/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(loading({
        name: LoadingObject.Favorites,
        status: true
      }));
      const response = await api.get(ApiRoute.Favorite);
      if (response?.data) {
        dispatch(setUserFavorites(response?.data));
      }
    } catch {
      dispatch(setUserFavorites([]));
    } finally {
      dispatch(loading({
        name: LoadingObject.Favorites,
        status: false
      }));
    }
  }
);

export const setUserFavoriteAction = createAsyncThunk<void, setUserFavoriteData, AsyncThunkConfigType>(
  'user-slice/setUserFavorite',
  async ({offerID, setFavorite}, {dispatch, extra: api}) => {
    dispatch(loading({
      name: LoadingObject.FavoriteToggle,
      status: true
    }));
    try {
      const urlSetUserFavorite = ApiRoute.AddToFavorites.replace('{offerID}', String(offerID)).replace('{setFavorite}', String(setFavorite));
      const response = await api.post(urlSetUserFavorite);
      if (response?.data?.isFavorite) {
        dispatch(addToUserFavorites(response?.data));
      } else {
        dispatch(removeFromUserFavorites(offerID));
      }
      dispatch(changeOneOfOffersIsFavorite({offerID, isFavorite: response?.data?.isFavorite}));
      dispatch(changeOfferIsFavorite(response?.data?.isFavorite));
    } catch {
      dispatch(setError('Failed to set favorite'));
    } finally {
      dispatch(fetchUserFavorites);
      dispatch(loading({
        name: LoadingObject.FavoriteToggle,
        status: false
      }));
    }
  }
);
