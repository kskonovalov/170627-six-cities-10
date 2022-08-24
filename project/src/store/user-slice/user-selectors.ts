import {NameSpace, AuthorizationStatus} from '../../const';
import {State, UserType} from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: State): UserType | null => state[NameSpace.User].user;
