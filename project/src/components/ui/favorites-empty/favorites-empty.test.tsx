import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import FavoritesEmpty from './favorites-empty';
import store from '../../../store/store';

describe('Component: FavoritesEmpty', () => {
  it('should render component correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <FavoritesEmpty />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Nothing yet saved/smi)).toBeInTheDocument();
  });
});
