import React, {useEffect, useState, useMemo} from 'react';

import CardsList from '../../components/ui/cards-list/cards-list';
import Map from '../../components/ui/map/map';
import Sorting from '../../components/ui/sorting/sorting';
import Loader from '../../components/ux/loader';
import MainEmpty from '../../components/ui/main-empty/main-empty';
import {Points} from '../../types/types';
import {LoadingObj, locations} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {changeCity} from '../../store/actions';
import styles from './main.module.css';
import {fetchOffersAction} from '../../store/api-actions';
import {getCity, getOffers, getSortBy} from '../../store/offers-slice/offers-selectors';
import {getAppLoading} from '../../store/app-slice/app-selectors';

const Main = () => {
  const city = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const sortBy = useAppSelector(getSortBy);
  const loading = useAppSelector(getAppLoading);
  const dispatch = useAppDispatch();

  /* load initial offers */
  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const offersToDisplay = useMemo(() => (offers.filter((item) => item.city.name === city.title).sort((offer1, offer2) => {
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
  })), [offers, city, sortBy]);

  const offersCount = offersToDisplay.length;
  const [activeCardID, setActiveCardID] = useState<number | null>(null);

  const points: Points = offersToDisplay.map((item) => ({
    title: item.title,
    lat: item.location.latitude,
    lng: item.location.longitude,
    id: item.id
  }));

  const placesWord = (offersCount === 0 || offersCount > 1) ? 'places' : 'place';

  const offersAreLoading = loading[LoadingObj.Offers];
  const hasOffers = !offersAreLoading && offersCount > 0;
  const noOffers = !offersAreLoading && offersCount === 0;

  // console.log('offersAreLoading', offersAreLoading);
  // console.log('hasOffers', hasOffers);
  // console.log('noOffers', noOffers);

  return (
    <div className="page page--gray page--main">
      <main className={`page__main page__main--index ${noOffers ? 'page__main--index-empty' : ''}`}>
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
          <div className={`cities__places-container container ${noOffers ? 'cities__places-container--empty' : ''}`}>
            <section className={`${hasOffers ? 'cities__places places' : ''} ${noOffers ? 'cities__no-places' : ''}`}>
              {offersAreLoading && <Loader/>}
              {hasOffers &&
                <>
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offersCount} {placesWord} to stay in {city.title}</b>
                  <Sorting/>
                  <CardsList
                    offers={offersToDisplay}
                    setCardActive={setActiveCardID}
                    activeCardID={activeCardID}
                    className='cities__places-list places__list tabs__content'
                  />
                </>}
              {noOffers && <MainEmpty cityTitle={city.title}/>}
            </section>
            <div className="cities__right-section">
              {hasOffers && <Map containerClassName='cities__map map' city={city} points={points} selectedPointID={activeCardID}/>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
