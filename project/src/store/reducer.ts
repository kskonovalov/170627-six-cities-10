import {createReducer} from '@reduxjs/toolkit';

import {changeCity, loadOffers, loadOffer, loading, setSortBy, setError, setAuthorizationStatus, loadNearby, loadOfferReviews} from './actions';
import {City, Offer, Review} from '../types/types';
import {locations, sortByLocalStorageName, cityLocalStorageName, AuthorizationStatus} from '../const';

export type Store = {
  city: City,
  offers: Offer[],
  nearby: Offer[],
  offer: Offer | null,
  reviews: Review[],
  loading: {
    [name: string]: boolean
  }
  sortBy: string,
  error: string | string[] | null,
  authorizationStatus: AuthorizationStatus
};

const getUserSavedCity = () => {
  const savedCity = window.localStorage.getItem(cityLocalStorageName);
  const foundCity = locations.filter((item) => item.title === savedCity);
  return foundCity[0] ? foundCity[0] : locations[0];
};

export const initialState: Store = {
  city: getUserSavedCity(),
  offers: [],
  nearby: [],
  loading: {},
  offer: null,
  reviews: [],
  sortBy: window.localStorage.getItem(sortByLocalStorageName) || 'Popular',
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state: Store, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state: Store, action) => {
      state.offers = action.payload;
    })
    .addCase(loadNearby, (state: Store, action) => {
      state.nearby = action.payload;
    })
    .addCase(loadOffer, (state: Store, action) => {
      state.offer = action.payload;
    })
    .addCase(loadOfferReviews, (state: Store, action) => {
      state.reviews = action.payload;
    })
    .addCase(loading, (state: Store, action) => {
      state.loading[action.payload.name] = action.payload.status;
    })
    .addCase(setSortBy, (state: Store, action) => {
      state.sortBy = action.payload;
    })
    .addCase(setError, (state: Store, action) => {
      state.error = action.payload;
    })
    .addCase(setAuthorizationStatus, (state: Store, action) => {
      state.authorizationStatus = action.payload;
    });
});

export default reducer;
