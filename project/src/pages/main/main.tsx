import React, {useState} from 'react';

import CardsList from '../../components/ui/cards-list/cards-list';
import Map from '../../components/ui/map/map';
import {Points} from '../../types/map-types';
import {locations} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {changeCity} from '../../store/actions';
import styles from './main.module.css';

const Main = () => {
  /* store */
  const {city, offers: allOffers} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  /* TODO: replace with actual data from server */
  const offers = allOffers.filter((item) => item.city.name === city.title);

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
                  <button className={`locations__item-link tabs__item ${item.title === city.title ? 'tabs__item--active' : ''} ${styles['locations__item-link']}`} onClick={(e) => {e.preventDefault(); dispatch(changeCity(item));}}>
                    <span>{item.title}</span>
                  </button>
                </li>))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} {placesWord} to stay in {city.title}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <CardsList
                offers={offers}
                setCardActive={setActiveCardID}
                activeCardID={activeCardID}
                className='cities__places-list places__list tabs__content'
              />
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
