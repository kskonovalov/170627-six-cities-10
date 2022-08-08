import {City} from './types/types';

/* Application routes */
export const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Card = '/offer/',
  Room = '/offer/:id',
  NotFound = '*',
}

/* API routes */
// https://10.react.pages.academy/six-cities/spec
export const enum ApiRoute {
  // Hotels
  Hotels = '/hotels', // GET
  Offer = '/hotels/{hotelID}', // GET
  Nearby = '/hotels/{hotelID}/nearby', // GET
  // Favorite
  Favorite = '/favorite', // GET
  AddToFavorites = '/favorite/{hotelID}/{status}', // POST
  // Comments
  Comments = '/comments/{hotelID}', // GET, POST
  // User
  Login = '/login', // GET, POST
  Logout = '/logout', // DELETE
}

/* Authorization status */
export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
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
export const cityLocalStorageName = 'city';

/* User login */
export type userData = {
  id: number,
  email: string,
  token: string
}
export type authData = {
  login: string,
  password: string,
}

export const backendUrl = 'https://10.react.pages.academy/six-cities';
export const requestTimeout = 5000; // ms

// based on https://www.npmjs.com/package/http-status-codes
export const enum statusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  OK = 200,
}

export const defaultErrorText = 'Something went wrong! Pleasy try again later';
