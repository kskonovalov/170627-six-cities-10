import {createAction} from '@reduxjs/toolkit';
import {offerType} from '../mocks/offers';
import {City} from '../types/map-types';

export const changeCity = createAction<City>('city/changeCity');
export const setOffers = createAction<offerType[]>('city/setOffers');
