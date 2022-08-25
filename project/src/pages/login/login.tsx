import React, {ChangeEvent, useState, useMemo} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';

import {AppRoute, AuthorizationStatus, MIN_PASSWORD_LENGTH, LOCATIONS} from '../../const';
import {useAppSelector, useAppDispatch} from '../../hooks/redux-hooks';
import {changeCity, setError} from '../../store/actions';
import {loginAction} from '../../store/user-slice/user-api-actions';
import validateEmail from '../../helpers/validate-email';
import {validatePasswordForLength, validatePasswordForSymbols} from '../../helpers/validate-password';
import {getAuthorizationStatus} from '../../store/user-slice/user-selectors';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  type formDataType = {
    email: string,
    password: string
  }
  const [formData, setFormData] = useState<formDataType>({
    email: '',
    password: ''
  });

  const formDataHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const fieldName = evt.target.name;
    const fieldValue = evt.target.value.trim();

    setFormData({
      ...formData,
      [fieldName]: fieldValue
    });
  };

  const onSubmitHandle = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const errors: string[] = [];

    if (!validatePasswordForLength(formData.password)) {
      errors.push(`Password length should be more than ${MIN_PASSWORD_LENGTH} symbols`);
    }
    if (!validatePasswordForSymbols(formData.password)) {
      errors.push('Password should contain at least one number and letter');
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

  const randomLocation = useMemo(() => LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)], []);

  const cityButtonHandler = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(changeCity(randomLocation));
    navigate(AppRoute.Main);
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
                <button className="locations__item-link" onClick={cityButtonHandler}>
                  <span>{randomLocation.title}</span>
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
  );
};

export default Login;
