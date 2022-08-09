import React, {ChangeEvent, useState} from 'react';
import {Navigate} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector, useAppDispatch} from '../../hooks/redux-hooks';
import {setError} from '../../store/actions';
import {loginAction} from '../../store/api-actions';
import {validateEmail} from '../../helpers/validate-email';

const Login = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((store) => store.authorizationStatus);

  type formDataType = {
    email: string,
    password: string
  }
  const [formData, setFormData] = useState<formDataType>({
    email: '',
    password: ''
  });
  const minPasswordLength = 2;

  const formDataHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value.trim();

    setFormData({
      ...formData,
      [fieldName]: fieldValue
    });
  };

  const onSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: string[] = [];

    if (formData.password.length <= minPasswordLength) {
      errors.push(`Password length should be more than ${minPasswordLength} symbols`);
    }
    if (!validateEmail(formData.email)) {
      errors.push('Should be valid e-mail address!');
    }

    if (!errors.length) {
      dispatch(loginAction({
        login: formData.email,
        password: formData.password
      }));
    } else {
      dispatch(setError(errors));
    }
  };

  return (
    authorizationStatus === AuthorizationStatus.Auth ?
      <Navigate to={AppRoute.Main}/>
      :
      <div className="page page--gray page--login">
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post" onSubmit={onSubmitHandle}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={formDataHandler}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={formDataHandler}
                  />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <span className="locations__item-link">
                  <span>Amsterdam</span>
                </span>
              </div>
            </section>
          </div>
        </main>
      </div>
  );
};

export default Login;
