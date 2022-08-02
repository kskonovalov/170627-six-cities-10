import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../mocks/offers';
import {City} from '../types/map-types';

export const changeCity = createAction<City>('city/changeCity');
export const setOffers = createAction<Offer[]>('city/setOffers');
