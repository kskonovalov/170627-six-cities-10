import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import FavoriteCard from '../../components/ui/favorite-card/favorite-card';
import {AppRoute, CardsType} from '../../const';
import {Offer} from '../../types/types';
import {useAppSelector} from '../../hooks/redux-hooks';
import {getUserFavorites} from '../../store/user-slice/user-selectors';
import FavoritesEmpty from '../../components/ui/favorites-empty/favorites-empty';
import CardsList from '../../components/ui/cards-list/cards-list';

const Favorites = () => {
  const offers = useAppSelector(getUserFavorites);
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

  const favoritesEmpty = Object.keys(cityOffers).length === 0;

  return (
    <div className="page">
      <main className={`page__main page__main--favorites ${favoritesEmpty ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          <section className={`favorites ${favoritesEmpty ? 'favorites--empty' : ''}`}>
            {!favoritesEmpty &&
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
                        cardType={CardsType.Favorite}
                      />
                      <div className="favorites__places">
                        {cityOffers[key].map((item) => <FavoriteCard key={item.id} offer={item}/>)}
                      </div>
                    </li>
                  ))}
                </ul>
              </>}
            {favoritesEmpty && <FavoritesEmpty/>}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Favorites;
