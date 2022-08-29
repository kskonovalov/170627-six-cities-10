import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import NotFound from './not-found';
import store from '../../store/store';

describe('Component: FavoritesEmpty', () => {
  it('should render component correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <NotFound />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/The page is not found/smi)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
