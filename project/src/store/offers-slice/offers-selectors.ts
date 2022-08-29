import {createSelector} from 'reselect';

import {NameSpace} from '../../const';
import {State, OffersSlice} from '../../types/state';
import getOffersByCityFilter from '../../helpers/get-offers-by-city-filter';
import getLastNReviewsFilter from '../../helpers/get-last-n-reviews-filter';

export const getCity = (state: State): OffersSlice['city'] => state[NameSpace.Offers].city;
export const getOffer = (state: State): OffersSlice['offer'] => state[NameSpace.Offers].offer;
export const getNearby = (state: State): OffersSlice['nearby'] => state[NameSpace.Offers].nearby;
export const getSortBy = (state: State): OffersSlice['sortBy'] => state[NameSpace.Offers].sortBy;
export const getReviews = (state: State): OffersSlice['reviews'] => state[NameSpace.Offers].reviews;

// get offers for some city only, by the city title
export const getOffersByCity = createSelector(
  [
    (state: State): OffersSlice['offers'] => state[NameSpace.Offers].offers,
    (state: State, cityTitle: string) => cityTitle
  ],
  (offers: OffersSlice['offers'], cityTitle) => getOffersByCityFilter(offers, cityTitle)
);

// get *count* latest reviews
export const getLastNReviews = createSelector(
  [
    (state: State): OffersSlice['reviews'] => state[NameSpace.Offers].reviews,
    (state: State, count: number) => count
  ],
  (reviews: OffersSlice['reviews'], count) => getLastNReviewsFilter(reviews, count)
);
