import React, {ChangeEvent, useState} from 'react';
import {Navigate} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector, useAppDispatch} from '../../hooks/redux-hooks';
import {loginAction} from '../../store/api-actions';
import {validateEmail} from '../../helpers/validate-email';
import classes from './login.module.css';

const Login = () => {
  type formDataType = {
    email: string,
    password: string,
    emailError: string,
    passwordError: string,
    hasErrors: boolean
  }
  const [formData, setFormData] = useState<formDataType>({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    hasErrors: false
  });
  const minPasswordLength = 2;

  /* TODO: тут возможно фигня написана, и сложно будет расширять правила валидации
  *  думаю что хорошей практикой будет подключить что-нибудь для работы с формами,
  * например https://www.npmjs.com/package/react-hook-form
  * или https://www.npmjs.com/package/formik
  * */
  const formDataHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value.trim();
    // validation
    const newFormData = {
      ...formData,
      [fieldName]: fieldValue,
      hasErrors: false,
      passwordError: '',
      emailError: ''
    };
    if (fieldName === 'password' && fieldValue.length <= minPasswordLength) {
      newFormData.hasErrors = true;
      newFormData.passwordError = `Password length should be more than ${minPasswordLength} symbols`;
    }
    if (fieldName === 'email' && fieldValue && !validateEmail(fieldValue)) {
      newFormData.hasErrors = true;
      newFormData.emailError = 'Should be valid e-mail address!';
    }
    setFormData(newFormData);
  };

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((store) => store.authorizationStatus);

  const onSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.hasErrors) {
      dispatch(loginAction({
        login: formData.email,
        password: formData.password
      }));
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
                  {formData.emailError && <div className={classes['form__input-warning']}>{formData.emailError}</div>}
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
                  {formData.passwordError && <div className={classes['form__input-warning']}>{formData.passwordError}</div>}
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
