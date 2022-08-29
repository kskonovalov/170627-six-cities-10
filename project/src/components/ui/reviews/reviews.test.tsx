import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import Reviews from './reviews';
import store from '../../../store/store';
import {faker} from '@faker-js/faker';
import createMockReview from '../../../mocks/create-mock-review';

describe('Component: Reviews', () => {
  it('should render component correctly', () => {
    const mockReviews = new Array(faker.datatype.number({min: 1, max: 5})).fill(null).map(() => createMockReview());
    const totalReviewsCount = faker.datatype.number(20);

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Reviews reviews={mockReviews} totalReviewsCount={totalReviewsCount}/>
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Reviews/smi)).toBeInTheDocument();
  });
});
