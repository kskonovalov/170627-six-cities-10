import React, {useEffect, useState} from 'react';

import {AppRoute} from '../../const';
import {Navigate} from 'react-router-dom';

const Login = () => {
  /* TODO: move isAuth to the global state */
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const storedIsAuth: boolean = (window.localStorage.getItem('isAuth') === 'true') || false;
    setIsAuth(storedIsAuth);
  }, []);
  const onSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.localStorage.setItem('isAuth', 'true');
    setIsAuth(true);
  };

  return (
    isAuth ?
      <Navigate to={AppRoute.Favorites}/>
      :
      <div className="page page--gray page--login">
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post" onSubmit={onSubmitHandle}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" placeholder="Email" required/>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" placeholder="Password" required/>
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="/#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
  );
};

export default Login;
