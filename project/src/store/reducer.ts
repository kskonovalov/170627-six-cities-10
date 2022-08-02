import {createReducer} from '@reduxjs/toolkit';

import {changeCity, setOffers, setSortBy} from './actions';
import {City} from '../types/map-types';
import offers, {Offer} from '../mocks/offers';
import {locations, sortByLocalStorageName} from '../const';

export type Store = {
  city: City,
  offers: Offer[],
  sortBy: string
};

export const initialState: Store = {
  city: locations[0], // show the first city -- Paris -- by default
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
