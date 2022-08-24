import {createSlice} from '@reduxjs/toolkit';

import {AppSlice} from '../../types/state';
import {loading, setError} from '../actions';
import {NameSpace} from '../../const';

const initialState: AppSlice = {
  loading: {},
  error: null
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loading, (state: AppSlice, action) => {
        state.loading[action.payload.name] = action.payload.status;
      })
      .addCase(setError, (state: AppSlice, action) => {
        state.error = action.payload;
      });
  }
});
