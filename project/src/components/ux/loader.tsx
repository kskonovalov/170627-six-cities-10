import React from 'react';

import classes from './loader.module.css';

const Loader = () => (
  <div className={classes['loader-wrap']}>
    <div className={classes['lds-ellipsis']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loader;
