import React from 'react';
import {Link} from 'react-router-dom';

import Header from '../../components/ui/header/header';
import FavoriteCard from '../../components/ui/favorite-card/favorite-card';
import {AppRoute} from '../../const';
import {OfferType} from '../../mocks/offers';

type FavoritesProps = {
  Offers: OfferType[]
}

const Favorites = ({Offers}: FavoritesProps) => {
  type userFavoritesType = {
    [key: string]: string[],
  };
  // TODO: store user favorites somewhere
  // TODO: maybe store user favorites different way
  const userFavorites: userFavoritesType = {
    'Amsterdam': ['offer2', 'offer4'],
    'Cologne': ['offer1', 'offer3']
  };

  return (
    <div className="page">
      <Header/>
      {Object.keys(userFavorites).length > 0 &&
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.keys(userFavorites).map((key) => (
                  <li className="favorites__locations-items" key={key}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to={AppRoute.Main}>
                          <span>{key}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {Offers.map((item) => userFavorites[key].includes(item.id) && <FavoriteCard key={item.id} Offer={item}/>)}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>}
      {!Object.keys(userFavorites).length &&
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>}
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

export default Favorites;
