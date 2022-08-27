import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import Card from './card';
import createMockOffer from '../../../mocks/create-mock-offer';
import {CardType} from '../../../const';
import store from '../../../store/store';

describe('Component: Card', () => {
  const mockOffer = createMockOffer();

  it('should render premium offer correctly', () => {
    const premiumOffer = {
      ...mockOffer,
      isPremium: true
    };
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card
            offer={premiumOffer}
            isActive={false}
            setCardActive={() => undefined}
            setCardInactive={() => undefined}
            cardType={CardType.Main}
          />
        </Provider>
      </BrowserRouter>);

    const offerIsPremium = screen.getByText('Premium');

    expect(offerIsPremium).toBeInTheDocument();
  });

  it('should display price', () => {
    const expectedPrice = 27482364;
    const expectedPriceOffer = {
      ...mockOffer,
      price: expectedPrice
    };
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card
            offer={expectedPriceOffer}
            isActive={false}
            setCardActive={() => undefined}
            setCardInactive={() => undefined}
            cardType={CardType.Main}
          />
        </Provider>
      </BrowserRouter>);

    const cardPriceContainer = screen.getByText(/27482364/sm);
    expect(cardPriceContainer).toBeInTheDocument();
  });
});
