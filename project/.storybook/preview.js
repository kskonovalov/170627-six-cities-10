import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { legacy_createStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from '../src/store/root-reducer';

import '../public/css/main.css';

// react router
addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter> );

// react redux
const store = legacy_createStore(rootReducer);
addDecorator(S => (
  <Provider store={store}>
    <S />
  </Provider>
));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
