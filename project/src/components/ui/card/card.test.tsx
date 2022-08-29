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

    expect(screen.getByText(/27482364/sm)).toBeInTheDocument();
  });


  it('should render Favorite card image correctly', () => {
    const expectedImageWidth = '150';
    const expectedImageHeight = '110';
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card
            offer={mockOffer}
            isActive={false}
            setCardActive={() => undefined}
            setCardInactive={() => undefined}
            cardType={CardType.Favorite}
          />
        </Provider>
      </BrowserRouter>);

    const cardImage = screen.getByTestId('card-image');

    expect(cardImage).toBeInTheDocument();
    expect(cardImage.getAttribute('width')).toBe(expectedImageWidth);
    expect(cardImage.getAttribute('height')).toBe(expectedImageHeight);
  });

  it('should render Main card image correctly', () => {
    const expectedImageWidth = '260';
    const expectedImageHeight = '200';
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card
            offer={mockOffer}
            isActive={false}
            setCardActive={() => undefined}
            setCardInactive={() => undefined}
            cardType={CardType.Main}
          />
        </Provider>
      </BrowserRouter>);

    const cardImage = screen.getByTestId('card-image');

    expect(cardImage).toBeInTheDocument();
    expect(cardImage.getAttribute('width')).toBe(expectedImageWidth);
    expect(cardImage.getAttribute('height')).toBe(expectedImageHeight);
  });

});
