import {OffersSlice} from '../types/state';
import {Offer} from '../types/types';

export const getOffersByCityFilter = (offers: Offer[], cityTitle: string): OffersSlice['offers'] => {
  console.log('calc');
  return offers.filter((item) => item.city.name === cityTitle);
};
