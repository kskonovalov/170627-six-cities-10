import React, {memo} from 'react';

import Logo from '../logo/logo';

const Footer = () => (
  <footer className="footer container">
    <Logo location='footer' width={64} height={33} />
  </footer>
);

export default memo(Footer);
