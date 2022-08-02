import {createReducer} from '@reduxjs/toolkit';

import {changeCity, setOffers} from './actions';
import {City} from '../types/map-types';
import offers, {Offer} from '../mocks/offers';
import {locations} from '../const';

export type Store = {
  city: City,
  offers: Offer[]
};

export const initialState: Store = {
  city: locations[0], // show the first city -- Paris -- by default
  offers: offers
};


const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state: Store, action) => {
    state.city = action.payload;
  });
  builder.addCase(setOffers, (state: Store, action) => {
    state.offers = action.payload;
  });
});

export default reducer;
