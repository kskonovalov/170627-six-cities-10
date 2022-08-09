import {createReducer} from '@reduxjs/toolkit';

import {changeCity, loadOffers, offersLoading, setSortBy, setError, setAuthorizationStatus} from './actions';
import {City, Offer} from '../types/types';
import {locations, sortByLocalStorageName, cityLocalStorageName, AuthorizationStatus} from '../const';

export type Store = {
  city: City,
  offers: Offer[],
  offersLoading: boolean,
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
  offersLoading: true,
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
    .addCase(offersLoading, (state: Store, action) => {
      state.offersLoading = action.payload;
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
