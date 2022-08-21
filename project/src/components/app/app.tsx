import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route';
import Layout from '../ui/layout/layout';
import ScrollTop from '../ux/scroll-top';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {setError} from '../../store/actions';
import {getAuthorizationStatus} from '../../store/user-slice/user-selectors';
import {getAppError} from '../../store/app-slice/app-selectors';
import {fetchUserFavorites} from '../../store/user-slice/user-api-actions';

const App = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const error = useAppSelector(getAppError);
  const dispatch = useAppDispatch();

  // load user favorites if the user is logged in
  useEffect(() => {
    if(authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchUserFavorites());
    }
  }, [authorizationStatus]);

  // if there's error and error is not empty, just show the error and remove it from the store
  useEffect(() => {
    if (typeof error === 'string' || error instanceof String) {
      NotificationManager.error(error, 'Error', 3000);
    }
    if (Array.isArray(error)) {
      error.map((errorItem) => NotificationManager.error(errorItem, 'Error', 3000));
    }
    dispatch(setError(null));
  }, [error, dispatch]);

  return (
    <BrowserRouter>
      <ScrollTop/>
      <NotificationContainer/>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path={AppRoute.Login} element={<Login/>}/>
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Room} element={<Room/>}/>
          <Route path={AppRoute.NotFound} element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
