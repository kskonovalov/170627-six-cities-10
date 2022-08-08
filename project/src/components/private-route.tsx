import React from 'react';
import {Navigate} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from '../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus,
  children: JSX.Element
};

const PrivateRoute = ({authorizationStatus, children}: PrivateRouteProps): JSX.Element => {
  const hasAccess = authorizationStatus === AuthorizationStatus.Auth;

  return hasAccess ? children : <Navigate to={AppRoute.Login}/>;
};

export default PrivateRoute;
