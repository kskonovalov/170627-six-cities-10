import React from 'react';
import {Link, useLocation} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../../hooks/redux-hooks';
import {logoutAction} from '../../../store/user-slice/user-api-actions';
import {AppRoute, AuthorizationStatus} from '../../../const';
import Loader from '../../ux/loader';
import {getAuthorizationStatus, getUser} from '../../../store/user-slice/user-selectors';

const HeaderNav = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const signOutHandle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  const location = useLocation();
  const toShowUserFields = authorizationStatus === AuthorizationStatus.Auth;
  const toShowSignInLink = authorizationStatus === AuthorizationStatus.NoAuth && location.pathname !== AppRoute.Login;

  const avatarUrl = user !== null ? user.avatarUrl : '';
  const email = user !== null ? user.email : '';

  return authorizationStatus === AuthorizationStatus.Unknown ?
    <Loader/> :
    <nav className="header__nav">
      <ul className="header__nav-list">
        {toShowUserFields &&
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage: avatarUrl}}></div>
                <span className="header__user-name user__name">{email}</span>
                <span className="header__favorite-count">3</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" href='/#' onClick={signOutHandle}>
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </>}
        {toShowSignInLink &&
          <li className="header__nav-item">
            <Link className="header__nav-link" to={AppRoute.Login}>
              <span className="header__signout">Sign in</span>
            </Link>
          </li>}
      </ul>
    </nav>;
};

export default HeaderNav;
