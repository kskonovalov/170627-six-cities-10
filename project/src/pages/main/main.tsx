import React, {useEffect, useState} from 'react';

import CardsList from '../../components/ui/cards-list/cards-list';
import Map from '../../components/ui/map/map';
import {Points} from '../../types/types';
import {locations} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {changeCity} from '../../store/actions';
import styles from './main.module.css';
import Sorting from '../../components/ui/sorting/sorting';
import Loader from '../../components/ux/loader';

const Main = () => {
  const {city, offers: allOffers, sortBy, offersLoading} = useAppSelector((state) => state);
  const [offers, setOffers] = useState(allOffers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setOffers(allOffers.filter((item) => item.city.name === city.title).sort((offer1, offer2) => {
      switch (sortBy) {
        case 'Popular':
          return 0; // default order;
        case 'PriceLowToHigh':
          return offer1.price - offer2.price;
        case 'PriceHighToLow':
          return offer2.price - offer1.price;
        case 'TopRatedFirst':
          return offer2.rating - offer1.rating;
        default:
          return 0;
      }
    }));
  }, [allOffers, city, sortBy]);

  const offersCount = offers.length;

  const [activeCardID, setActiveCardID] = useState<number | null>(null);

  const points: Points = offers.map((item) => ({
    title: item.title,
    lat: item.location.latitude,
    lng: item.location.longitude,
    id: item.id
  }));

  const placesWord = offersCount === 0 || offersCount > 1 ? 'places' : 'place';

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {locations.map((item) => (
                <li className="locations__item" key={item.title}>
                  <button className={`locations__item-link tabs__item ${item.title === city.title ? 'tabs__item--active' : ''} ${styles['locations__item-link']}`} onClick={(e) => {
                    e.preventDefault();
                    dispatch(changeCity(item));
                  }}
                  >
                    <span>{item.title}</span>
                  </button>
                </li>))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              {/* если убираю тут " || offersCount === 0", то после загрузки офферов _иногда_ мелькает "0 places to stay in Amsterdam"*/}
              {offersLoading || offersCount === 0 ?
                <Loader/> :
                <><h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offersCount} {placesWord} to stay in {city.title}</b>
                  <Sorting/>
                  <CardsList
                    offers={offers}
                    setCardActive={setActiveCardID}
                    activeCardID={activeCardID}
                    className='cities__places-list places__list tabs__content'
                  />
                </>}
            </section>
            <div className="cities__right-section">
              <Map containerClassName='cities__map map' city={city} points={points} selectedPointID={activeCardID}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
