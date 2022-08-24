import {NameSpace} from '../../const';
import {State, AppSlice} from '../../types/state';

export const getAppError = (state: State): AppSlice['error'] => state[NameSpace.App].error;

export const getAppLoading = (state: State): AppSlice['loading'] => state[NameSpace.App].loading;
