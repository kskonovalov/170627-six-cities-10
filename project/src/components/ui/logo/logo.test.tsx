import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import Logo from './logo';
import store from '../../../store/store';
import {faker} from '@faker-js/faker';

describe('Component: Logo', () => {
  const expectedWidth = faker.datatype.number({min: 50, max: 100});
  const expectedHeight = faker.datatype.number({min: 50, max: 100});

  render(
    <BrowserRouter>
      <Provider store={store}>
        <Logo location={'footer'} width={expectedWidth} height={expectedHeight} />
      </Provider>
    </BrowserRouter>
  );

  const logoElement = screen.getByTestId('logo');

  it('should render component with Logo image', () => {
    expect(logoElement).toBeInTheDocument();
  });

  it('logo image width and height should be same as passed props', () => {
    expect(logoElement.getAttribute('width')).toBe(String(expectedWidth));
    expect(logoElement.getAttribute('height')).toBe(String(expectedHeight));
  });
});
