import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import Header from './header';
import store from '../../../store/store';

describe('Component: Header', () => {
  it('should render component with Logo', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const logoElement = screen.getByTestId('logo');

    expect(logoElement).toBeInTheDocument();
  });
});
