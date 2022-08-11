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
import {fetchOffersAction} from '../../store/api-actions';

const Main = () => {
  const {city, offers, sortBy, loading} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  /* load initial offers */
  useEffect(() => {
    dispatch(fetchOffersAction());
  }, []);


  // I tried to use useMemo here, but the app works faster without it
  const offersToDisplay = offers.filter((item) => item.city.name === city.title).sort((offer1, offer2) => {
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
  });

  const [offersCount, setOffersCount] = useState<null | number>(null);
  useEffect(() => {
    setOffersCount(offersToDisplay.length);
  }, [offersToDisplay]);

  const [activeCardID, setActiveCardID] = useState<number | null>(null);

  const points: Points = offers.map((item) => ({
    title: item.title,
    lat: item.location.latitude,
    lng: item.location.longitude,
    id: item.id
  }));

  const placesWord = (offersCount !== null && (offersCount === 0 || offersCount > 1)) ? 'places' : 'place';

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
              {loading['offers'] || offersCount === null ?
                <Loader/> :
                <><h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offersCount} {placesWord} to stay in {city.title}</b>
                  <Sorting/>
                  <CardsList
                    offers={offersToDisplay}
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
