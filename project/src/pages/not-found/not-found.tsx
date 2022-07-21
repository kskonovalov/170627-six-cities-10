import React from 'react';
import {Link} from 'react-router-dom';

import {AppRoute} from '../../const';
import styles from './not-found.module.css';

const NotFound = () => (
  <div className="page">
    <main className={`page__main page__main--404 ${styles.page}`}>
      <div className={styles['page__image-wrap']}>
        <img
          src="img/pexels-marcio-henrique-918732.jpg"
          alt="404 page not found"
          className={styles['page__image']}
        />
      </div>
      <div className={styles['page__content']}>
        <h1 className={styles['page__content-title']}>404</h1>
        <p className={styles['page__content-description']}>The page is not found</p>
        <Link to={AppRoute.Main}>
          <button type="button" className={styles['page__content-button']}>
            Go home
          </button>
        </Link>
      </div>
    </main>
  </div>
);

export default NotFound;
