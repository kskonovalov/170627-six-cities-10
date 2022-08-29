import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {AppRoute} from '../../../const';

type LogoProps = {
  location: string,
  width: number,
  height: number
}

const Logo = ({location, width, height}: LogoProps) => (
  <Link className={`${location}__logo-link ${location}__logo-link--active`} to={AppRoute.Main}>
    <img className={`${location}__logo`} src="img/logo.svg" alt="6 cities logo" width={width} height={height} data-testid="logo"/>
  </Link>
);

export default memo(Logo);
