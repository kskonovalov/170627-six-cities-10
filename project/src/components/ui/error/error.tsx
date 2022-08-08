import React from 'react';

import classes from './error.module.css';

type ErrorType = {
  message: string
}
// TODO: replace with https://www.npmjs.com/package/react-notifications
const Error = ({message}: ErrorType) => <div className={classes['error']}>{message}</div>;

export default Error;
