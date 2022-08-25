import {faker} from '@faker-js/faker';

import {offersSlice} from './offers-slice';
import {changeCity, changeOfferIsFavorite, changeOneOfOffersIsFavorite, loadNearby, loadOffer, loadOfferReviews, loadOffers, setSortBy} from '../actions';
import {OffersSlice} from '../../types/state';
import {locations} from '../../const';
import createMockOffer from '../../mocks/create-mock-offer';
import createMockReview from '../../mocks/create-mock-review';

describe('Reducer: Offers slice', () => {
  const initialState: OffersSlice = {
    city: locations[0],
    offers: [],
    nearby: [],
    offer: null,
    sortBy: 'Popular',
    reviews: [],
  };

  it('should change city', () => {
    expect(offersSlice.reducer(void 0, changeCity(locations[1])))
      .toEqual({
        ...initialState,
        city: locations[1],
      });
  });

  it('should load offers', () => {
    const mockOffers = new Array(faker.datatype.number(5)).fill(null).map(() => createMockOffer());
    expect(offersSlice.reducer(void 0, loadOffers(mockOffers)))
      .toEqual({
        ...initialState,
        offers: mockOffers,
      });
  });

  it('should load nearby', () => {
    const mockOffers = new Array(faker.datatype.number(5)).fill(null).map(() => createMockOffer());
    expect(offersSlice.reducer(void 0, loadNearby(mockOffers)))
      .toEqual({
        ...initialState,
        nearby: mockOffers,
      });
  });

  it('should load offer', () => {
    const mockOffer = createMockOffer();
    expect(offersSlice.reducer(void 0, loadOffer(mockOffer)))
      .toEqual({
        ...initialState,
        offer: mockOffer,
      });
  });

  it('should load offer reviews', () => {
    const mockReviews = new Array(faker.datatype.number(5)).fill(null).map(() => createMockReview());
    expect(offersSlice.reducer(void 0, loadOfferReviews(mockReviews)))
      .toEqual({
        ...initialState,
        reviews: mockReviews,
      });
  });

  it('should set sort by', () => {
    expect(offersSlice.reducer(void 0, setSortBy('Order by price')))
      .toEqual({
        ...initialState,
        sortBy: 'Order by price',
      });
  });

  // TODO: changeOneOfOffersIsFavorite
  // TODO: changeOfferIsFavorite
});
