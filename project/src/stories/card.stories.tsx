import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Card from '../components/ui/card/card';
import createMockOffer from '../mocks/create-mock-offer';

export default {
  title: 'Cards/Card',
  component: Card,
  parameters: {
    offer: {
      isFavorite: false
    },
    isActive: true,
    setCardActive: () => {
      // eslint-disable-next-line no-console
      console.log('card activated');
    },
    setCardInactive: () => {
      // eslint-disable-next-line no-console
      console.log('card deactivated');
    },
    cardType: '',
  }
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

const mockOffer = createMockOffer();

export const SimpleCard = Template.bind({});
SimpleCard.args = {
  offer: {
    ...mockOffer,
    isFavorite: false,
    isPremium: false
  },
  isActive: false,
  setCardActive: () => {
    // eslint-disable-next-line no-console
    console.log('card deactivated');
  },
  setCardInactive: () => {
    // eslint-disable-next-line no-console
    console.log('card deactivated');
  },
  cardType: ''
};

export const SimpleActiveCard = Template.bind({});
SimpleActiveCard.args = {
  ...SimpleCard.args,
  isActive: true
};

export const FavoriteCard = Template.bind({});
FavoriteCard.args = {
  ...SimpleCard.args,
  offer: {
    ...mockOffer,
    isFavorite: true,
    isPremium: false
  }
};

export const PremiumCard = Template.bind({});
PremiumCard.args = {
  ...SimpleCard.args,
  offer: {
    ...mockOffer,
    isFavorite: false,
    isPremium: true
  }
};
