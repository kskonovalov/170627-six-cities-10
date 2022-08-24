import {offersSlice} from './offers-slice';
import {changeCity, changeOfferIsFavorite, changeOneOfOffersIsFavorite, loadNearby, loadOffer, loadOfferReviews, loadOffers, setSortBy} from '../actions';
import {OffersSlice} from '../../types/state';
import {locations} from '../../const';

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
    expect(offersSlice.reducer(void 0, loadOffers([1, '2', 'test'])))
    .toEqual({
      ...initialState,
      offers: [1, '2', 'test'],
    });
  });

  it('should load nearby', () => {
    expect(offersSlice.reducer(void 0, loadNearby([1, '2', 'test'])))
    .toEqual({
      ...initialState,
      nearby: [1, '2', 'test'],
    });
  });

  it('should load offer', () => {
    expect(offersSlice.reducer(void 0, loadOffer({offer: 'test'})))
    .toEqual({
      ...initialState,
      offer: {offer: 'test'},
    });
  });

  it('should load offer reviews', () => {
    expect(offersSlice.reducer(void 0, loadOfferReviews([1, '2', 'test'])))
    .toEqual({
      ...initialState,
      reviews: [1, '2', 'test'],
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
