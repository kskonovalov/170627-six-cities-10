import React from 'react';

import classes from './error.module.css';

type ErrorType = {
  message: string
}

const Error = ({message}: ErrorType) => <div className={classes['error']}>{message}</div>;

export default Error;
