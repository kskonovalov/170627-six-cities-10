import {createSlice} from '@reduxjs/toolkit';

import {cityLocalStorageName, LOCATIONS, NameSpace, sortByLocalStorageName} from '../../const';
import {OffersSlice} from '../../types/state';
import {changeCity, changeOfferIsFavorite, changeOneOfOffersIsFavorite, loadNearby, loadOffer, loadOfferReviews, loadOffers, setSortBy} from '../actions';

export const getUserSavedCity = () => {
  const savedCity = window.localStorage.getItem(cityLocalStorageName);
  const foundCity = LOCATIONS.filter((item) => item.title === savedCity);
  return foundCity[0] ? foundCity[0] : LOCATIONS[0];
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
      })
      .addCase(changeOneOfOffersIsFavorite, (state: OffersSlice, action) => {
        state.offers = state.offers.map((item) => {
          if (item.id === action.payload.offerID) {
            return {
              ...item,
              isFavorite: action.payload.isFavorite
            };
          }
          return item;
        });
      })
      .addCase(changeOfferIsFavorite, (state, action) => {
        if(state.offer !== null) {
          state.offer = {
            ...state.offer,
            isFavorite: action.payload
          };
        }
      });
  }
});
