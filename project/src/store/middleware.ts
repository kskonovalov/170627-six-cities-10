import {Middleware, Dispatch, AnyAction} from '@reduxjs/toolkit';

import {storeType} from './reducer';
import {setSortBy} from './actions';
import {sortByLocalStorageName} from '../const';

/* Save the 'Sort by' option into the user's local storage */
/* Немного вуду-программирования. Тут я пытался типизировать свой кастомный middleware, оно работает, но выглядит как-то странно */
/* Если поменять Middleware<Record<string, unknown> на Middleware<{} то eslint начинает ругаться */
export const saveSortByToLocalStorage: Middleware<Record<string, unknown>, storeType, Dispatch<AnyAction>> = (_store) =>
  (next) =>
    (action) => {
      if (setSortBy.match(action)) {
        window.localStorage.setItem(sortByLocalStorageName, action.payload);
      }
      next(action);
    };
