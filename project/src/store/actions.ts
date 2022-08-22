import {createAction} from '@reduxjs/toolkit';
import {City, Offer, Review} from '../types/types';
import {AuthorizationStatus} from '../const';
import {UserType} from '../types/state';

export const changeCity = createAction<City>('offers/changeCity');
export const loadOffers = createAction<Offer[]>('offers/loadOffers');
export const loadOffer = createAction<Offer>('offers/loadOffer');
export const loadNearby = createAction<Offer[]>('offers/loadNearby');
export const loadOfferReviews = createAction<Review[]>('offers/offerReviews');
export const setSortBy = createAction<string>('offers/setSortBy');
export const loading = createAction<{ name: string, status: boolean }>('offers/loading');
export const changeOneOfOffersIsFavorite = createAction<{ offerID: number, isFavorite: boolean }>('offers/changeOneOfOffersIsFavorite');
export const changeOfferIsFavorite = createAction<boolean>('offers/changeOfferIsFavorite');

export const setError = createAction<string | string[] | null>('app/setError');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');
export const setUserData = createAction<null | UserType>('user/setUserData');
export const setUserFavorites = createAction<Offer[]>('user/setUserFavorites');
export const addToUserFavorites = createAction<Offer>('user/addToUserFavorites');
export const removeFromUserFavorites = createAction<number>('user/removeFromUserFavorites');
