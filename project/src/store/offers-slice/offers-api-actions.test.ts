import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {faker} from '@faker-js/faker';

import {fetchNearbyPlacesAction, fetchOfferAction, fetchOfferReviewsAction, fetchOffersAction, submitReviewAction} from './offers-api-actions';
import {ApiRoute, StatusCode} from '../../const';
import {State} from '../../types/state';
import {api} from '../store';
import {loadOffers, loading, loadOffer, loadNearby, loadOfferReviews} from '../actions';

describe('Offers slice async actions', () => {
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const testOfferID = faker.datatype.number({min: 1, max: 99});

  const mockStore = configureMockStore<State,
    Action,
    ThunkDispatch<State, typeof api, Action>>(middlewares);
  let store = mockStore();

  beforeEach(() => {
    store = mockStore();

    expect(store.getActions()).toEqual([]);
  });

  it('should run specific actions while fetch offers', async () => {
    mockApi
      .onGet(ApiRoute.Hotels)
      .reply(StatusCode.OK, []);

    await store.dispatch(fetchOffersAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      loading.type,
      loadOffers.type,
      loading.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('should run specific actions while failed fetch offers', async () => {
    mockApi
      .onGet(ApiRoute.Hotels)
      .reply(StatusCode.NOT_FOUND, []);

    await store.dispatch(fetchOffersAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      loading.type,
      loading.type,
      fetchOffersAction.rejected.type
    ]);
  });

  it('should run specific actions while fetch offer', async () => {
    mockApi
      .onGet(ApiRoute.Offer.replace('{offerID}', String(testOfferID)))
      .reply(StatusCode.OK, []);

    await store.dispatch(fetchOfferAction(testOfferID));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      loading.type,
      loadOffer.type,
      loading.type,
      fetchOfferAction.fulfilled.type
    ]);
  });

  it('should run specific actions if fetch offer failed (not found)', async () => {
    mockApi
      .onGet(ApiRoute.Offer.replace('{offerID}', String(testOfferID)))
      .reply(StatusCode.NOT_FOUND, []);

    await store.dispatch(fetchOfferAction(testOfferID));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      loading.type,
      loading.type,
      fetchOfferAction.rejected.type
    ]);
  });

  it('should run specific actions while fetch nearby offers', async () => {
    mockApi
      .onGet(ApiRoute.Nearby.replace('{offerID}', String(testOfferID)))
      .reply(StatusCode.OK, []);

    await store.dispatch(fetchNearbyPlacesAction(testOfferID));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearbyPlacesAction.pending.type,
      loading.type,
      loadNearby.type,
      loading.type,
      fetchNearbyPlacesAction.fulfilled.type
    ]);
  });

  it('should run specific actions while failed fetch nearby offers', async () => {
    mockApi
      .onGet(ApiRoute.Nearby.replace('{offerID}', String(testOfferID)))
      .reply(StatusCode.NOT_FOUND, []);

    await store.dispatch(fetchNearbyPlacesAction(testOfferID));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearbyPlacesAction.pending.type,
      loading.type,
      loading.type,
      fetchNearbyPlacesAction.rejected.type
    ]);
  });

  it('should run specific actions while fetch offer reviews', async () => {
    mockApi
      .onGet(ApiRoute.Comments.replace('{offerID}', String(testOfferID)))
      .reply(StatusCode.OK, []);

    await store.dispatch(fetchOfferReviewsAction(testOfferID));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferReviewsAction.pending.type,
      loading.type,
      loadOfferReviews.type,
      loading.type,
      fetchOfferReviewsAction.fulfilled.type
    ]);
  });

  it('should run specific actions while failed fetch offer reviews', async () => {
    mockApi
      .onGet(ApiRoute.Comments.replace('{offerID}', String(testOfferID)))
      .reply(StatusCode.NOT_FOUND, []);

    await store.dispatch(fetchOfferReviewsAction(testOfferID));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferReviewsAction.pending.type,
      loading.type,
      loading.type,
      fetchOfferReviewsAction.rejected.type
    ]);
  });

  it('should run specific actions while post offer review', async () => {
    mockApi
      .onPost(ApiRoute.Comments.replace('{offerID}', String(testOfferID)))
      .reply(StatusCode.OK, []);

    await store.dispatch(submitReviewAction({offerID: testOfferID, comment: '', rating: faker.datatype.number()}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      submitReviewAction.pending.type,
      loading.type,
      loading.type,
      submitReviewAction.fulfilled.type
    ]);
  });

  it('should run specific actions while failed post offer review', async () => {
    mockApi
      .onPost(ApiRoute.Comments.replace('{offerID}', String(testOfferID)))
      .reply(StatusCode.NOT_FOUND, []);

    await store.dispatch(submitReviewAction({offerID: testOfferID, comment: '', rating: faker.datatype.number()}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      submitReviewAction.pending.type,
      loading.type,
      loading.type,
      submitReviewAction.rejected.type
    ]);
  });
});
