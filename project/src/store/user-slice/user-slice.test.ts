import {faker} from '@faker-js/faker';

import {userSlice} from './user-slice';
import {addToUserFavorites, removeFromUserFavorites, setAuthorizationStatus, setUserData, setUserFavorites} from '../actions';
import {UserSlice, UserType} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import createMockOffer from '../../mocks/create-mock-offer';


describe('Reducer: User slice', () => {
  const initialState: UserSlice = {
    authorizationStatus: AuthorizationStatus.Unknown,
    favorites: new Array(faker.datatype.number(5)).fill(null).map(() => createMockOffer()),
    user: null
  };

  it('Should add offer to user favorites', () => {
    const offer = createMockOffer();
    expect(userSlice.reducer(initialState, addToUserFavorites(offer)))
      .toEqual({
        ...initialState,
        favorites: [
          ...initialState.favorites,
          offer
        ]
      });
  });

  it('Should remove element from user favorites', () => {
    expect(userSlice.reducer(initialState, removeFromUserFavorites(initialState.favorites[0].id)))
      .toEqual({
        ...initialState,
        favorites: [
          ...initialState.favorites.slice(1)
        ]
      });
  });

  it('Should completely replace user favorites', () => {
    const newFavorites = new Array(faker.datatype.number(5)).fill(null).map(() => createMockOffer());
    expect(userSlice.reducer(initialState, setUserFavorites(newFavorites)))
      .toEqual({
        ...initialState,
        favorites: newFavorites
      });
  });

  it('Should set user authorization status to auth', () => {
    expect(userSlice.reducer(initialState, setAuthorizationStatus(AuthorizationStatus.Auth)))
      .toEqual({
        ...initialState,
        authorizationStatus: AuthorizationStatus.Auth
      });
  });

  it('Should set user authorization status to no auth', () => {
    expect(userSlice.reducer(initialState, setAuthorizationStatus(AuthorizationStatus.NoAuth)))
      .toEqual({
        ...initialState,
        authorizationStatus: AuthorizationStatus.NoAuth
      });
  });

  it('Should set user data', () => {
    const mockUser: UserType = {
      avatarUrl: faker.image.abstract(),
      email: faker.internet.email(),
      id: faker.datatype.number(),
      isPro: faker.datatype.boolean(),
      name: faker.name.fullName()
    }
    expect(userSlice.reducer(initialState, setUserData(mockUser)))
      .toEqual({
        ...initialState,
        user: mockUser
      });
  });
});
