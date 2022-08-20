import {OffersSlice} from '../types/state';
import {Offer} from '../types/types';

export const getOffersByCityFilter = (offers: Offer[], cityTitle: string): OffersSlice['offers'] => offers.filter((item) => item.city.name === cityTitle);
