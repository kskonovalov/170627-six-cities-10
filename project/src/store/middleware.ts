import {Middleware} from '@reduxjs/toolkit';

import {changeCity, setSortBy, setAuthorizationStatus} from './actions';
import {sortByLocalStorageName, cityLocalStorageName, AuthorizationStatus} from '../const';
import {unsetToken} from '../api/token';
import {rootReducer} from './root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

/* Save the 'Sort by' option into the user's local storage */
export const saveUserSettingsToLocalStorage: Middleware<unknown, Reducer> = (_store) =>
  (next) =>
    (action) => {
      if (setSortBy.match(action)) {
        window.localStorage.setItem(sortByLocalStorageName, action.payload);
      }
      if (changeCity.match(action)) {
        window.localStorage.setItem(cityLocalStorageName, action.payload.title);
      }
      next(action);
    };

/* drop token after logout */
export const dropUserTokenAfterLogout: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (setAuthorizationStatus.match(action) && action.payload === AuthorizationStatus.NoAuth) {
          unsetToken();
        }
        next(action);
      };
