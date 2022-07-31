import {createReducer} from '@reduxjs/toolkit';

import {changeCity, setOffers, setSortBy} from './actions';
import {City} from '../types/map-types';
import offers, {offerType} from '../mocks/offers';
import {locations, sortByLocalStorageName} from '../const';

export type storeType = {
  city: City,
  offers: offerType[],
  sortBy: string
};

export const initialState: storeType = {
  city: locations[0], // show the first city -- Paris -- by default
  offers: offers,
  sortBy: window.localStorage.getItem(sortByLocalStorageName) || 'Popular'
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state: storeType, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state: storeType, action) => {
      state.offers = action.payload;
    })
    .addCase(setSortBy, (state: storeType, action) => {
      state.sortBy = action.payload;
    });
});

export default reducer;
