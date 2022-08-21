import {createSelector} from 'reselect';

import {NameSpace} from '../../const';
import {State, OffersSlice} from '../../types/state';
import {getOffersByCityFilter} from '../../helpers/getOffersByCityFilter';

export const getCity = (state: State): OffersSlice['city'] => state[NameSpace.Offers].city;
export const getOffer = (state: State): OffersSlice['offer'] => state[NameSpace.Offers].offer;
export const getNearby = (state: State): OffersSlice['nearby'] => state[NameSpace.Offers].nearby;
export const getSortBy = (state: State): OffersSlice['sortBy'] => state[NameSpace.Offers].sortBy;
export const getReviews = (state: State): OffersSlice['reviews'] => state[NameSpace.Offers].reviews;

export const getOffersByCity = createSelector(
  [
    (state: State): OffersSlice['offers'] => state[NameSpace.Offers].offers,
    (state: State, cityTitle: string) => cityTitle
  ],
  (offers: OffersSlice['offers'], cityTitle) => getOffersByCityFilter(offers, cityTitle)
);
