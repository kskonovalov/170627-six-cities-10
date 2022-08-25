import {OffersSlice} from '../types/state';
import {Offer} from '../types/types';

const getOffersByCityFilter = (offers: Offer[], cityTitle: string): OffersSlice['offers'] => offers.filter((item) => item.city.name === cityTitle);

export default getOffersByCityFilter;

