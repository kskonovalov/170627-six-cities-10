import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import AddToFavorites from './add-to-favorites';
import {ApiRoute, AuthorizationStatus, NameSpace, StatusCode} from '../../../const';
import {addToUserFavorites, changeOfferIsFavorite, changeOneOfOffersIsFavorite, loading, removeFromUserFavorites, setError} from '../../../store/actions';
import {api} from '../../../store/store';
import {setUserFavoriteAction} from '../../../store/user-slice/user-api-actions';

describe('Component: Add to favorites button', () => {
  const mockApi = new MockAdapter(api);
  mockApi.onGet(/.*?/).reply(() => [StatusCode.OK, {}]);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore(middlewares);

  it('should render add to favorites button correctly', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        favorites: [],
        user: null
      },
      [NameSpace.App]: {
        loading: {},
        error: null
      }
    });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AddToFavorites id={1} isFavorite={false} type='card'/>
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should return error if user is not authorized', async () => {
    mockApi
      .onGet(ApiRoute.Login)
      .reply(StatusCode.OK, []);

    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        favorites: [],
        user: null
      },
      [NameSpace.App]: {
        loading: {},
        error: null
      }
    });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AddToFavorites id={1} isFavorite={false} type='card'/>
        </Provider>
      </BrowserRouter>
    );

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      setError.type
    ]);
  });

  it('should add to user favorites on button click if user is authorized and offer is not favorite', async () => {
    mockApi.onPost(/.*?/).reply(() => [StatusCode.OK, {isFavorite: 1}]);
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        favorites: [],
        user: null
      },
      [NameSpace.App]: {
        loading: {},
        error: null
      }
    });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AddToFavorites id={1} isFavorite={false} type='card'/>
        </Provider>
      </BrowserRouter>
    );

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      setUserFavoriteAction.pending.type,
      loading.type,
      addToUserFavorites.type,
      changeOneOfOffersIsFavorite.type,
      changeOfferIsFavorite.type,
      loading.type,
      setUserFavoriteAction.fulfilled.type
    ]);
  });

  it('should remove from user favorites on button click if user is authorized and offer is favorite', async () => {
    mockApi.onPost(/.*?/).reply(() => [StatusCode.OK, {isFavorite: 0}]);
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        favorites: [],
        user: null
      },
      [NameSpace.App]: {
        loading: {},
        error: null
      }
    });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AddToFavorites id={1} isFavorite type='card'/>
        </Provider>
      </BrowserRouter>
    );

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      setUserFavoriteAction.pending.type,
      loading.type,
      removeFromUserFavorites.type,
      changeOneOfOffersIsFavorite.type,
      changeOfferIsFavorite.type,
      loading.type,
      setUserFavoriteAction.fulfilled.type
    ]);
  });
});
