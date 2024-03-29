import {AxiosInstance} from 'axios';

import store, {AppDispatch, RootState} from '../store/store';
import {AuthorizationStatus} from '../const';
import {City, Offer, Review} from './types';

export type UserType = {
  avatarUrl: string,
  email: string,
  id: number,
  isPro: boolean,
  name: string
}

export type UserSlice = {
  authorizationStatus: AuthorizationStatus,
  user: null | UserType,
  favorites: Offer[]
}

export type OffersSlice = {
  city: City,
  offers: Offer[],
  nearby: Offer[],
  offer: Offer | null,
  reviews: Review[],
  sortBy: string,
}

export type AppSlice = {
  loading: {
    [name: string]: boolean
  }
  error: string | string[] | null
}

export type State = ReturnType<typeof store.getState>

export type AsyncThunkConfigType = {
  dispatch: AppDispatch,
  state: RootState,
  extra: AxiosInstance
};
