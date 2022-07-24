import {City} from './types/map-types';

/* Application routes */
export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Card = '/offer/',
  Room = '/offer/:id',
  NotFound = '*',
}

/* Icons */
type iconType = {
  iconUrl: string,
  iconSize: [number, number],
  iconAnchor: [number, number]
}
export const defaultIcon: iconType = {
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40]
};
export const activeIcon: iconType = {
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40]
};

/* City centers and coordinates */
export const AmsterdamCity: City = {
  title: 'Amsterdam',
  lat: 52.370216,
  lng: 4.895168,
  zoom: 13
};
