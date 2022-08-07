import {Middleware, Dispatch, AnyAction} from '@reduxjs/toolkit';

import {Store} from './reducer';
import {changeCity, setSortBy} from './actions';
import {sortByLocalStorageName, cityLocalStorageName} from '../const';

/* Save the 'Sort by' option into the user's local storage */
export const saveUserSettingsToLocalStorage: Middleware<Record<string, unknown>, Store, Dispatch<AnyAction>> = (_store) =>
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
