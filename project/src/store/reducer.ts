import {createReducer} from '@reduxjs/toolkit';

import {changeCity, setOffers} from './actions';
import {City} from '../types/map-types';
import offers, {offerType} from '../mocks/offers';
import {locations} from '../const';

export type storeType = {
  city: City,
  offers: offerType[]
};

export const initialState: storeType = {
  city: locations[0], // show the first city -- Paris -- by default
  offers: offers
};


const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state: storeType, action) => {
    state.city = action.payload;
  });
  builder.addCase(setOffers, (state: storeType, action) => {
    state.offers = action.payload;
  });
});

export default reducer;
