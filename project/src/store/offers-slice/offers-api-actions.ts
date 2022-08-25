import {createAsyncThunk} from '@reduxjs/toolkit';

import {loading, loadNearby, loadOffer, loadOfferReviews, loadOffers} from '../actions';
import {ApiRoute, LoadingObject} from '../../const';
import {Offer, Review} from '../../types/types';
import {AsyncThunkConfigType} from '../../types/state';

export const fetchOffersAction = createAsyncThunk<void, undefined, AsyncThunkConfigType>(
  'offers-slice/loadOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(loading({
      name: LoadingObject.Offers,
      status: true
    }));
    try {
      const {data} = await api.get<Offer[]>(ApiRoute.Hotels);
      dispatch(loadOffers(data));
    } catch {
      dispatch(loadOffers([]));
    } finally {
      dispatch(loading({
        name: LoadingObject.Offers,
        status: false
      }));
    }
  }
);

export const fetchOfferAction = createAsyncThunk<void, string | number, AsyncThunkConfigType>(
  'offers-slice/loadOffer',
  async (offerID, {dispatch, extra: api}) => {
    dispatch(loading({
      name: LoadingObject.Offer,
      status: true
    }));
    try {
      const {data} = await api.get<Offer>(ApiRoute.Offer.replace('{offerID}', `${offerID}`));
      dispatch(loadOffer(data));
    } finally {
      dispatch(loading({
        name: LoadingObject.Offer,
        status: false
      }));
    }
  }
);

export const fetchNearbyPlacesAction = createAsyncThunk<void, string | number, AsyncThunkConfigType>(
  'offers-slice/loadNearbyPlaces',
  async (offerID, {dispatch, extra: api}) => {
    dispatch(loading({
      name: LoadingObject.Nearby,
      status: true
    }));
    try {
      const {data} = await api.get<Offer[]>(ApiRoute.Nearby.replace('{offerID}', `${offerID}`));
      dispatch(loadNearby(data));
    } finally {
      dispatch(loading({
        name: LoadingObject.Nearby,
        status: false
      }));
    }
  }
);

export const fetchOfferReviewsAction = createAsyncThunk<void, string | number, AsyncThunkConfigType>(
  'offers-slice/loadOfferReviews',
  async (offerID, {dispatch, extra: api}) => {
    dispatch(loading({
      name: LoadingObject.Reviews,
      status: true
    }));
    try {
      const {data} = await api.get<Review[]>(ApiRoute.Comments.replace('{offerID}', `${offerID}`));
      dispatch(loadOfferReviews(data));
    } finally {
      dispatch(loading({
        name: LoadingObject.Reviews,
        status: false
      }));
    }
  }
);

export const submitReviewAction = createAsyncThunk<void, { offerID: string | number, comment: string, rating: number }, AsyncThunkConfigType>(
  'offers-slice/sendReviewAction',
  async (reviewData, {dispatch, extra: api}) => {
    dispatch(loading({
      name: LoadingObject.CommentSubmit,
      status: true
    }));
    try {
      await api.post(
        ApiRoute.Comments.replace('{offerID}', `${reviewData.offerID}`),
        {
          comment: reviewData.comment,
          rating: reviewData.rating
        }
      );
    } finally {
      dispatch(loading({
        name: LoadingObject.CommentSubmit,
        status: false
      }));
    }
  }
);
