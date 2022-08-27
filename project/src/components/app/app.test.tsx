import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';

import {AuthorizationStatus, AppRoute, NameSpace, sortByLocalStorageName} from '../../const';
import App from './app';
import {getUserSavedCity} from '../../store/offers-slice/offers-slice';
import HistoryRouter from '../history-route/history-route';

const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Unknown,
    favorites: [],
    user: null
  },
  [NameSpace.Offers]: {
    city: getUserSavedCity(),
    offers: [],
    nearby: [],
    offer: null,
    sortBy: window.localStorage.getItem(sortByLocalStorageName) || 'Popular',
    reviews: [],
  },
  [NameSpace.App]: {
    loading: {},
    error: null
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render LoginForm when user is not auth and navigate to /login', () => {
    history.push(AppRoute.Login);
    render(fakeApp);

    expect(screen.getByText(/E-mail/)).toBeInTheDocument();
    expect(screen.getByText(/Password/)).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
});
