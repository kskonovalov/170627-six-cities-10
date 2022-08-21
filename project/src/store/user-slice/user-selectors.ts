import {NameSpace, AuthorizationStatus} from '../../const';
import {State, UserType} from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: State): UserType | null => state[NameSpace.User].user;
export const getUserFavorites = (state: State) => state[NameSpace.User].favorites;
export const getUserFavoriteCount = (state: State) => state[NameSpace.User].favorites.length;
