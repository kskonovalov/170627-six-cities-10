import {Middleware, Dispatch, AnyAction} from '@reduxjs/toolkit';

import {Store} from './reducer';
import {changeCity, setSortBy} from './actions';
import {sortByLocalStorageName, cityLocalStorageName} from '../const';

/* Save the 'Sort by' option into the user's local storage */
/* Немного вуду-программирования. Тут я пытался типизировать свой кастомный middleware, оно работает, но выглядит как-то странно */
/* Если поменять Middleware<Record<string, unknown> на Middleware<{} то eslint начинает ругаться */
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
