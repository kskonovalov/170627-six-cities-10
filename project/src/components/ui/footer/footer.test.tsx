import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import Footer from './footer';
import store from '../../../store/store';

describe('Component: Footer', () => {
  it('should render component with Logo', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Footer />
        </Provider>
      </BrowserRouter>
    );

    const logoElement = screen.getByTestId('logo');

    expect(logoElement).toBeInTheDocument();
  });
});
