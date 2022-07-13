import React from 'react';

import Header from '../../components/ui/header/Header';
import styles from './not-found.module.css';

const NotFound = () => (
  <div className="page">
    <Header/>
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
      </div>
    </main>
  </div>
);

export default NotFound;
