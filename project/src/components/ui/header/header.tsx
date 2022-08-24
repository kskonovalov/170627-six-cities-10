import React, {memo} from 'react';

import Logo from '../logo/logo';
import HeaderNav from '../header-nav/header-nav';

const Header = () => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Logo location='header' width={81} height={41}/>
        </div>
        <HeaderNav/>
      </div>
    </div>
  </header>
);

export default memo(Header);
