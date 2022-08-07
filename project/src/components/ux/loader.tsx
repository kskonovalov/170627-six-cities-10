import React from 'react';

import classes from './loader.module.css';

const Loader = () => (
  <div className={classes['lds-ripple']}>
    <div></div>
    <div></div>
  </div>
);

export default Loader;
