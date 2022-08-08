import {createAction} from '@reduxjs/toolkit';
import {City, Offer} from '../types/types';
import {AuthorizationStatus} from '../const';

export const changeCity = createAction<City>('city/changeCity');
export const loadOffers = createAction<Offer[]>('city/loadOffers');
export const setSortBy = createAction<string>('city/setSortBy');
export const offersLoading = createAction<boolean>('city/offersLoading');

export const setError = createAction<string|null>('app/setError');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('app/setAuthorizationStatus');
