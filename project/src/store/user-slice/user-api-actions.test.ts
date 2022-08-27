import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {faker} from '@faker-js/faker';

import {checkAuthAction, loginAction, logoutAction, setUserFavoriteAction, fetchUserFavorites} from './user-api-actions';
import {ApiRoute, StatusCode} from '../../const';
import {State} from '../../types/state';
import {api} from '../store';
import {addToUserFavorites, loading, removeFromUserFavorites, setAuthorizationStatus, setError, setUserData, setUserFavorites} from '../actions';

describe('User slice async action', () => {
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

  it('should run specific actions while checking auth action', async () => {
    mockApi
      .onGet(ApiRoute.Login)
      .reply(StatusCode.OK, []);

    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      setAuthorizationStatus.type,
      setUserData.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should run specific actions while checking auth action failed', async () => {
    mockApi
      .onGet(ApiRoute.Login)
      .reply(StatusCode.NOT_FOUND, []);

    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      setAuthorizationStatus.type,
      setUserData.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should run specific actions while login action', async () => {
    mockApi
      .onPost(ApiRoute.Login)
      .reply(StatusCode.OK, []);

    await store.dispatch(loginAction({
      login: faker.internet.email(),
      password: faker.internet.password()
    }));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      setAuthorizationStatus.type,
      setUserData.type,
      loginAction.fulfilled.type
    ]);
  });

  it('should run specific actions while login action failed', async () => {
    mockApi
      .onPost(ApiRoute.Login)
      .reply(StatusCode.NOT_FOUND, []);

    await store.dispatch(loginAction({
      login: faker.internet.email(),
      password: faker.internet.password()
    }));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      setAuthorizationStatus.type,
      setUserData.type,
      loginAction.fulfilled.type
    ]);
  });

  it('should run specific actions while logout action', async () => {
    mockApi
      .onDelete(ApiRoute.Logout)
      .reply(StatusCode.OK, []);

    await store.dispatch(logoutAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      setAuthorizationStatus.type,
      setUserData.type,
      logoutAction.fulfilled.type
    ]);
  });

  it('should run specific actions while logout action failed', async () => {
    mockApi
      .onDelete(ApiRoute.Login)
      .reply(StatusCode.NOT_FOUND, []);

    await store.dispatch(logoutAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      setAuthorizationStatus.type,
      setUserData.type,
      logoutAction.fulfilled.type
    ]);
  });

  it('should run specific actions while fetching user favorites action', async () => {
    mockApi
      .onGet(ApiRoute.Favorite)
      .reply(StatusCode.OK, []);

    await store.dispatch(fetchUserFavorites());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchUserFavorites.pending.type,
      loading.type,
      setUserFavorites.type,
      loading.type,
      fetchUserFavorites.fulfilled.type
    ]);
  });

  it('should run specific actions while fetching user favorites action failed', async () => {
    mockApi
      .onGet(ApiRoute.Favorite)
      .reply(StatusCode.NOT_FOUND, {});

    await store.dispatch(fetchUserFavorites());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchUserFavorites.pending.type,
      loading.type,
      setUserFavorites.type,
      loading.type,
      fetchUserFavorites.fulfilled.type
    ]);
  });

  it('should run specific actions while adding to user favorite action', async () => {
    const setFavorite = 1;
    mockApi
      .onPost(ApiRoute.AddToFavorites.replace('{offerID}', String(testOfferID)).replace('{setFavorite}', String(setFavorite)))
      .reply(StatusCode.OK, {isFavorite: 1});

    await store.dispatch(setUserFavoriteAction({
      offerID: testOfferID,
      setFavorite
    }));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      setUserFavoriteAction.pending.type,
      addToUserFavorites.type,
      setUserFavoriteAction.fulfilled.type
    ]);
  });

  it('should run specific actions while removing from user favorite action', async () => {
    const setFavorite = 0;
    mockApi
      .onPost(ApiRoute.AddToFavorites.replace('{offerID}', String(testOfferID)).replace('{setFavorite}', String(setFavorite)))
      .reply(StatusCode.OK, {isFavorite: 0});

    await store.dispatch(setUserFavoriteAction({
      offerID: testOfferID,
      setFavorite
    }));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      setUserFavoriteAction.pending.type,
      removeFromUserFavorites.type,
      setUserFavoriteAction.fulfilled.type
    ]);
  });

  it('should run specific actions while set user favorite action failed', async () => {
    const setFavorite = 1;
    mockApi
      .onPost(ApiRoute.AddToFavorites.replace('{offerID}', String(testOfferID)).replace('{setFavorite}', String(setFavorite)))
      .reply(StatusCode.NOT_FOUND, []);

    await store.dispatch(setUserFavoriteAction({
      offerID: testOfferID,
      setFavorite
    }));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      setUserFavoriteAction.pending.type,
      setError.type,
      setUserFavoriteAction.fulfilled.type
    ]);
  });
});
