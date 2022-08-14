import {createSlice} from '@reduxjs/toolkit';

import {cityLocalStorageName, locations, NameSpace, sortByLocalStorageName} from '../../const';
import {OffersSlice} from '../../types/state';
import {changeCity, loadNearby, loadOffer, loadOfferReviews, loadOffers, setSortBy} from '../actions';

const getUserSavedCity = () => {
  const savedCity = window.localStorage.getItem(cityLocalStorageName);
  const foundCity = locations.filter((item) => item.title === savedCity);
  return foundCity[0] ? foundCity[0] : locations[0];
};

const initialState: OffersSlice = {
  city: getUserSavedCity(),
  offers: [],
  nearby: [],
  offer: null,
  sortBy: window.localStorage.getItem(sortByLocalStorageName) || 'Popular',
  reviews: [],
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeCity, (state: OffersSlice, action) => {
        state.city = action.payload;
      })
      .addCase(loadOffers, (state: OffersSlice, action) => {
        state.offers = action.payload;
      })
      .addCase(loadNearby, (state: OffersSlice, action) => {
        state.nearby = action.payload;
      })
      .addCase(loadOffer, (state: OffersSlice, action) => {
        state.offer = action.payload;
      })
      .addCase(loadOfferReviews, (state: OffersSlice, action) => {
        state.reviews = action.payload;
      })
      .addCase(setSortBy, (state: OffersSlice, action) => {
        state.sortBy = action.payload;
      });
  }
});
