import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import MainEmpty from './main-empty';
import store from '../../../store/store';
import {faker} from '@faker-js/faker';

describe('Component: MainEmpty', () => {
  it('should render component correctly', () => {
    const randomCityTitle = faker.address.city();
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainEmpty cityTitle={randomCityTitle} />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/No places to stay available/smi)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(randomCityTitle, ''))).toBeInTheDocument();
  });
});
