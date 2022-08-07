import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {AppDispatch} from './store';
import {Store} from './reducer';
import {Offer} from '../types/types';
import {loadOffers, offersLoading} from './actions';
import {ApiRoute} from '../const';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: Store,
  extra: AxiosInstance
}>(
  'data/loadOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(offersLoading(true));
    const {data} = await api.get<Offer[]>(ApiRoute.Hotels);
    dispatch(loadOffers(data));
    dispatch(offersLoading(false));
  }
);
