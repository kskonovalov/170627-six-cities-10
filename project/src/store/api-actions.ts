import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {AppDispatch, RootState} from './store';
import {Offer, Review} from '../types/types';
import {loadOffers, loading, setAuthorizationStatus, loadOffer, loadNearby, loadOfferReviews} from './actions';
import {ApiRoute, AuthorizationStatus, authData, userData, LoadingObj} from '../const';
import {setToken, unsetToken} from '../api/token';

type asyncThunkConfigType = {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
};

export const fetchOffersAction = createAsyncThunk<void, undefined, asyncThunkConfigType>(
  'data/loadOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(loading({
      name: LoadingObj.Offers,
      status: true
    }));
    try {
      const {data} = await api.get<Offer[]>(ApiRoute.Hotels);
      dispatch(loadOffers(data));
    } catch {
      dispatch(loadOffers([]));
    }
    finally {
      dispatch(loading({
        name: LoadingObj.Offers,
        status: false
      }));
    }
  }
);

export const fetchOfferAction = createAsyncThunk<void, string | number, asyncThunkConfigType>(
  'data/loadOffer',
  async (offerID, {dispatch, extra: api}) => {
    dispatch(loading({
      name: LoadingObj.Offer,
      status: true
    }));
    try {
      const {data} = await api.get<Offer>(ApiRoute.Offer.replace('{hotelID}', `${offerID}`));
      dispatch(loadOffer(data));
    } finally {
      dispatch(loading({
        name: LoadingObj.Offer,
        status: false
      }));
    }
  }
);

export const fetchNearbyPlacesAction = createAsyncThunk<void, string | number, asyncThunkConfigType>(
  'data/loadNearbyPlaces',
  async (offerID, {dispatch, extra: api}) => {
    dispatch(loading({
      name: LoadingObj.Nearby,
      status: true
    }));
    try {
      const {data} = await api.get<Offer[]>(ApiRoute.Nearby.replace('{hotelID}', `${offerID}`));
      dispatch(loadNearby(data));
    } finally {
      dispatch(loading({
        name: LoadingObj.Nearby,
        status: false
      }));
    }
  }
);

export const fetchOfferReviewsAction = createAsyncThunk<void, string | number, asyncThunkConfigType>(
  'data/loadOfferReviews',
  async (offerID, {dispatch, extra: api}) => {
    dispatch(loading({
      name: LoadingObj.Reviews,
      status: true
    }));
    try {
      const {data} = await api.get<Review[]>(ApiRoute.Comments.replace('{hotelID}', `${offerID}`));
      dispatch(loadOfferReviews(data));
    } finally {
      dispatch(loading({
        name: LoadingObj.Reviews,
        status: false
      }));
    }
  }
);

export const submitReviewAction = createAsyncThunk<void, {offerID: string | number, comment: string, rating: number}, asyncThunkConfigType>(
  'data/sendReviewAction',
  async (reviewData, {dispatch, extra: api}) => {
    dispatch(loading({
      name: LoadingObj.CommentSubmit,
      status: true
    }));
    try {
      await api.post(
        ApiRoute.Comments.replace('{hotelID}', `${reviewData.offerID}`),
        {
          comment: reviewData.comment,
          rating: reviewData.rating
        }
      );
    } finally {
      dispatch(loading({
        name: LoadingObj.CommentSubmit,
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
