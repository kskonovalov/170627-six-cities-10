import React from 'react';
import {Navigate} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '../const';
import Loader from './ux/loader';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus,
  children: JSX.Element
};

const PrivateRoute = ({authorizationStatus, children}: PrivateRouteProps): JSX.Element => {
  if (authorizationStatus === AuthorizationStatus.Auth) {
    return children;
  }
  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return <Navigate to={AppRoute.Login}/>;
  }
  // just show the loader if the Authorization status is not clear
  return <Loader/>;
};

export default PrivateRoute;
