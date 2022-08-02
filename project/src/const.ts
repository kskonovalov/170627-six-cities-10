import {City} from './types/map-types';

/* Application routes */
export const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Card = '/offer/',
  Room = '/offer/:id',
  NotFound = '*',
}

/* Icons */
type Icon = {
  iconUrl: string,
  iconSize: [number, number],
  iconAnchor: [number, number]
}
export const defaultIcon: Icon = {
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40]
};
export const activeIcon: Icon = {
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40]
};

export const defaultZoom = 13;

/* City centers and coordinates */
export const locations: City[] = [
  {
    title: 'Paris',
    lat: 48.856613,
    lng: 2.352222
  },
  {
    title: 'Cologne',
    lat: 50.937531,
    lng: 6.960279
  },
  {
    title: 'Brussels',
    lat: 50.850346,
    lng: 4.351721
  },
  {
    title: 'Amsterdam',
    lat: 52.370216,
    lng: 4.895168
  },
  {
    title: 'Hamburg',
    lat: 53.551086,
    lng: 9.993682
  },
  {
    title: 'Dusseldorf',
    lat: 51.227741,
    lng: 6.773456
  },
];

/* Order / Sort by */
type orderType = {
  [key: string]: string
};
export const order: orderType = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first'
};
export const sortByLocalStorageName = 'sortBy';
