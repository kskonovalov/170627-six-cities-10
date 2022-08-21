import {createSlice} from '@reduxjs/toolkit';

import {NameSpace, AuthorizationStatus} from '../../const';
import {UserSlice} from '../../types/state';
import {addToUserFavorites, removeFromUserFavorites, setAuthorizationStatus, setUserData, setUserFavorites} from '../actions';

const initialState: UserSlice = {
  authorizationStatus: AuthorizationStatus.Unknown,
  favorites: [],
  user: null
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setAuthorizationStatus, (state: UserSlice, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(setUserData, (state: UserSlice, action) => {
        state.user = action.payload;
      })
      .addCase(setUserFavorites, (state: UserSlice, action) => {
        state.favorites = action.payload;
      })
      .addCase(addToUserFavorites, (state: UserSlice, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(removeFromUserFavorites, (state: UserSlice, action) => {
        state.favorites = state.favorites.filter((offer) => offer.id !== action.payload);
      });
  }
});
