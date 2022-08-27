import {faker} from '@faker-js/faker';

import {offersSlice} from './offers-slice';
import {changeCity, changeOfferIsFavorite, changeOneOfOffersIsFavorite, loadNearby, loadOffer, loadOfferReviews, loadOffers, setSortBy} from '../actions';
import {OffersSlice} from '../../types/state';
import {LOCATIONS} from '../../const';
import createMockOffer from '../../mocks/create-mock-offer';
import createMockReview from '../../mocks/create-mock-review';

describe('Reducer: Offers slice', () => {
  const initialState: OffersSlice = {
    city: LOCATIONS[0],
    offers: new Array(faker.datatype.number({min: 1, max: 5})).fill(null).map(() => createMockOffer()),
    nearby: [],
    offer: createMockOffer(),
    sortBy: 'Popular',
    reviews: [],
  };

  it('should change city', () => {
    expect(offersSlice.reducer(initialState, changeCity(LOCATIONS[1])))
      .toEqual({
        ...initialState,
        city: LOCATIONS[1],
      });
  });

  it('should load offers', () => {
    const mockOffers = new Array(faker.datatype.number({min: 1, max: 5})).fill(null).map(() => createMockOffer());
    expect(offersSlice.reducer(initialState, loadOffers(mockOffers)))
      .toEqual({
        ...initialState,
        offers: mockOffers,
      });
  });

  it('should load nearby', () => {
    const mockOffers = new Array(faker.datatype.number({min: 1, max: 5})).fill(null).map(() => createMockOffer());
    expect(offersSlice.reducer(initialState, loadNearby(mockOffers)))
      .toEqual({
        ...initialState,
        nearby: mockOffers,
      });
  });

  it('should load offer', () => {
    const mockOffer = createMockOffer();
    expect(offersSlice.reducer(initialState, loadOffer(mockOffer)))
      .toEqual({
        ...initialState,
        offer: mockOffer,
      });
  });

  it('should load offer reviews', () => {
    const mockReviews = new Array(faker.datatype.number({min: 1, max: 5})).fill(null).map(() => createMockReview());
    expect(offersSlice.reducer(initialState, loadOfferReviews(mockReviews)))
      .toEqual({
        ...initialState,
        reviews: mockReviews,
      });
  });

  it('should set sort by', () => {
    expect(offersSlice.reducer(initialState, setSortBy('Order by price')))
      .toEqual({
        ...initialState,
        sortBy: 'Order by price',
      });
  });

  it('should change offer state to favorite', () => {
    expect(offersSlice.reducer(initialState, changeOfferIsFavorite(true)))
      .toEqual({
        ...initialState,
        offer: {
          ...initialState.offer,
          isFavorite: true
        }
      });
  });

  it('should change offer state to not favorite', () => {
    expect(offersSlice.reducer(initialState, changeOfferIsFavorite(false)))
      .toEqual({
        ...initialState,
        offer: {
          ...initialState.offer,
          isFavorite: false
        }
      });
  });

  it('should change one of offers state to favorite', () => {
    const expectedOffers = [
      ...initialState.offers
    ];
    expectedOffers[0] = {
      ...expectedOffers[0],
      isFavorite: true
    };
    expect(offersSlice.reducer(initialState, changeOneOfOffersIsFavorite({offerID: initialState.offers[0].id, isFavorite: true})))
      .toEqual({
        ...initialState,
        offers: expectedOffers
      });
  });

  it('should change one of offers state to not favorite', () => {
    const expectedOffers = [
      ...initialState.offers
    ];
    expectedOffers[0] = {
      ...expectedOffers[0],
      isFavorite: false
    };
    expect(offersSlice.reducer(initialState, changeOneOfOffersIsFavorite({offerID: initialState.offers[0].id, isFavorite: false})))
      .toEqual({
        ...initialState,
        offers: expectedOffers
      });
  });
});
