import React from 'react';
import {Link, useLocation} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '../../../const';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux-hooks';
import {logoutAction} from '../../../store/api-actions';
import Loader from '../../ux/loader';

const Header = () => {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();

  const signOutHandle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  const location = useLocation();
  const toShowUserFields = authorizationStatus === AuthorizationStatus.Auth;
  const toShowSignInLink = authorizationStatus === AuthorizationStatus.NoAuth && location.pathname !== AppRoute.Login;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className='header__logo-link header__logo-link--active' to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          {authorizationStatus === AuthorizationStatus.Unknown ?
            <Loader/> :
            <nav className="header__nav">
              <ul className="header__nav-list">
                {toShowUserFields &&
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
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
            </nav>}
        </div>
      </div>
    </header>
  );
};

export default Header;
