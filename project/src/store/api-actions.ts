import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {AppDispatch} from './store';
import {Store} from './reducer';
import {Offer, Review} from '../types/types';
import {loadOffers, loading, setAuthorizationStatus, loadOffer, loadNearby, loadOfferReviews} from './actions';
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
    dispatch(loading({
      name: 'offers',
      status: true
    }));
    try {
      const {data} = await api.get<Offer[]>(ApiRoute.Hotels);
      dispatch(loadOffers(data));
    } finally {
      dispatch(loading({
        name: 'offers',
        status: false
      }));
    }
  }
);

export const fetchOfferAction = createAsyncThunk<void, string, asyncThunkConfigType>(
  'data/loadOffer',
  async (offerID, {dispatch, extra: api}) => {
    dispatch(loading({
      name: 'offer',
      status: true
    }));
    try {
      const {data} = await api.get<Offer>(ApiRoute.Offer.replace('{hotelID}', offerID));
      dispatch(loadOffer(data));
    } finally {
      dispatch(loading({
        name: 'offer',
        status: false
      }));
    }
  }
);

export const fetchNearbyPlacesAction = createAsyncThunk<void, string, asyncThunkConfigType>(
  'data/loadNearbyPlaces',
  async (offerID, {dispatch, extra: api}) => {
    dispatch(loading({
      name: 'nearby',
      status: true
    }));
    try {
      const {data} = await api.get<Offer[]>(ApiRoute.Nearby.replace('{hotelID}', offerID));
      dispatch(loadNearby(data));
    } finally {
      dispatch(loading({
        name: 'nearby',
        status: false
      }));
    }
  }
);

export const fetchOfferReviewsAction = createAsyncThunk<void, string, asyncThunkConfigType>(
  'data/loadOfferReviews',
  async (offerID, {dispatch, extra: api}) => {
    dispatch(loading({
      name: 'reviews',
      status: true
    }));
    try {
      const {data} = await api.get<Review[]>(ApiRoute.Comments.replace('{hotelID}', offerID));
      dispatch(loadOfferReviews(data));
    } finally {
      dispatch(loading({
        name: 'reviews',
        status: false
      }));
    }
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
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    unsetToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
);
