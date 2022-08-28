import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {faker} from '@faker-js/faker';
import {createMemoryHistory} from 'history';
import {Routes, Route} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Logo from './logo';
import store from '../../../store/store';
import HistoryRouter from '../../history-route/history-route';

describe('Component: Logo', () => {
  const expectedWidth = faker.datatype.number({min: 50, max: 100});
  const expectedHeight = faker.datatype.number({min: 50, max: 100});

  const history = createMemoryHistory();

  render(
    <BrowserRouter>
      <Provider store={store}>
        <Logo location={'footer'} width={expectedWidth} height={expectedHeight} />
      </Provider>
    </BrowserRouter>
  );

  const logoElement = screen.getByTestId('logo');

  it('should render component with Logo image', () => {
    expect(logoElement).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('logo image width and height should be same as passed props', () => {
    expect(logoElement.getAttribute('width')).toBe(String(expectedWidth));
    expect(logoElement.getAttribute('height')).toBe(String(expectedHeight));
  });

  it('should redirect to root url when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={<h1>This is main page</h1>}
          />
          <Route
            path='*'
            element={<Logo location={'footer'} width={expectedWidth} height={expectedHeight} />}
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
