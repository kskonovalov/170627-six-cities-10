import {createAction} from '@reduxjs/toolkit';
import {City, Offer, Review} from '../types/types';
import {AuthorizationStatus} from '../const';

export const changeCity = createAction<City>('city/changeCity');
export const loadOffers = createAction<Offer[]>('city/loadOffers');
export const loadOffer = createAction<Offer>('city/loadOffer');
export const loadNearby = createAction<Offer[]>('city/loadNearby');
export const loadOfferReviews = createAction<Review[]>('city/offerReviews');
export const setSortBy = createAction<string>('city/setSortBy');
export const loading = createAction<{name: string, status: boolean}>('city/loading');

export const setError = createAction<string|string[]|null>('app/setError');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('app/setAuthorizationStatus');
