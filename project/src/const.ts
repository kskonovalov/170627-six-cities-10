import {City} from './types/types';

// Application routes
export const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Card = '/offer/',
  Room = '/offer/:id',
  NotFound = '*',
}

// API routes
// https://10.react.pages.academy/six-cities/spec
export const enum ApiRoute {
  // Hotels
  Hotels = '/hotels', // GET
  Offer = '/hotels/{offerID}', // GET
  Nearby = '/hotels/{offerID}/nearby', // GET
  // Favorite
  Favorite = '/favorite', // GET
  AddToFavorites = '/favorite/{offerID}/{setFavorite}', // POST
  // Comments
  Comments = '/comments/{offerID}', // GET, POST
  // User
  Login = '/login', // GET, POST
  Logout = '/logout', // DELETE
}

// Authorization status
export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

// Icons
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

export const DEFAULT_ZOOM = 13;

// City centers and coordinates
export const LOCATIONS: City[] = [
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

// Order / Sort by
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

// User login
export type authData = {
  login: string,
  password: string,
}
export type setUserFavoriteData = {
  offerID: number,
  setFavorite: 0 | 1
}

export const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000; // ms

// based on https://www.npmjs.com/package/http-status-codes
export const enum StatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  OK = 200,
}

export const DEFAULT_ERROR_TEXT = 'Something went wrong! Please try again later';

// 'loading' status for different components/things
export const enum LoadingObject {
  Offers = 'offers',
  Offer = 'offer',
  Nearby = 'nearby',
  Reviews = 'reviews',
  CommentSubmit = 'commentSubmit',
  Favorites = 'favorites',
  FavoriteToggle = 'favoriteToggle',
}

// reducer slices
export const enum NameSpace {
  Offers = 'offers',
  User = 'user',
  App = 'app'
}

// type of the cards
export const enum CardType {
  Main = 'main',
  Room = 'room',
  Favorite = 'favorite'
}

// comment length
export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export const MIN_PASSWORD_LENGTH = 2;

export const ERROR_SHOW_MS = 3000;
