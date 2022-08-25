import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {AppRoute, CardType, LoadingObject} from '../../const';
import {Offer} from '../../types/types';
import {useAppSelector} from '../../hooks/redux-hooks';
import {getUserFavorites} from '../../store/user-slice/user-selectors';
import FavoritesEmpty from '../../components/ui/favorites-empty/favorites-empty';
import CardsList from '../../components/ui/cards-list/cards-list';
import {getAppLoading} from '../../store/app-slice/app-selectors';
import Loader from '../../components/ux/loader';

const Favorites = () => {
  const offers = useAppSelector(getUserFavorites);
  const loading = useAppSelector(getAppLoading);
  const [activeCardID, setActiveCardID] = useState<number | null>(null);

  type CityOffers = {
    [city: string]: Offer[]
  }
  const cityOffers: CityOffers = {};
  offers.forEach((item) => {
    if (!(item.city.name in cityOffers)) {
      cityOffers[item.city.name] = [];
    }
    cityOffers[item.city.name].push(item);
  });

  const offersCount = Object.keys(cityOffers).length;
  const favoritesLoading = loading[LoadingObject.Favorites];
  const hasFavorites = !favoritesLoading && offersCount > 0;
  const noFavorites = !favoritesLoading && offersCount === 0;

  return (
    <div className="page">
      <main className={`page__main page__main--favorites ${noFavorites ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          <section className={`favorites ${noFavorites ? 'favorites--empty' : ''}`}>
            {favoritesLoading && <Loader/>}
            {noFavorites && <FavoritesEmpty/>}
            {hasFavorites &&
              <>
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Object.keys(cityOffers).map((key) => (
                    <li className="favorites__locations-items" key={key}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link className="locations__item-link" to={AppRoute.Main}>
                            <span>{key}</span>
                          </Link>
                        </div>
                      </div>
                      <CardsList
                        offers={cityOffers[key]}
                        setCardActive={setActiveCardID}
                        activeCardID={activeCardID}
                        className='favorites__places'
                        cardType={CardType.Favorite}
                      />
                    </li>
                  ))}
                </ul>
              </>}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Favorites;
