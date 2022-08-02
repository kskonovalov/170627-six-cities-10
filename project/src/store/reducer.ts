import {createReducer} from '@reduxjs/toolkit';

import {changeCity, setOffers, setSortBy} from './actions';
import {City} from '../types/map-types';
import offers, {Offer} from '../mocks/offers';
import {locations, sortByLocalStorageName, cityLocalStorageName} from '../const';

export type Store = {
  city: City,
  offers: Offer[],
  sortBy: string
};

const getUserSavedCity = () => {
  const savedCity = window.localStorage.getItem(cityLocalStorageName);
  const foundCity = locations.filter((item) => item.title === savedCity);
  return foundCity[0] ? foundCity[0] : locations[0];
};

export const initialState: Store = {
  city: getUserSavedCity(),
  offers: offers,
  sortBy: window.localStorage.getItem(sortByLocalStorageName) || 'Popular'
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state: Store, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state: Store, action) => {
      state.offers = action.payload;
    })
    .addCase(setSortBy, (state: Store, action) => {
      state.sortBy = action.payload;
    });
});

export default reducer;
