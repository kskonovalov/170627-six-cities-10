import React, {useEffect, useState} from 'react';
import {Link, Navigate, useLocation} from 'react-router-dom';

import {AppRoute} from '../../../const';

const Header = () => {
  /* TODO: move isAuth to the global state */
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const storedIsAuth: boolean = (window.localStorage.getItem('isAuth') === 'true') || false;
    setIsAuth(storedIsAuth);
  }, []);
  const signOutHandle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    window.localStorage.setItem('isAuth', 'false');
    setIsAuth(false);
    return <Navigate to={AppRoute.Main}/>;
  };

  const location = useLocation();
  const toShowSignInLink = !isAuth && location.pathname !== AppRoute.Login;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={`header__logo-link ${isAuth ? 'header__logo-link--active' : ''}`} to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth &&
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
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
