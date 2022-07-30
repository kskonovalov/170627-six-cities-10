import React, {useState} from 'react';
import {useParams} from 'react-router-dom';

import Reviews from '../../components/ui/reviews/reviews';
import CommentForm from '../../components/ui/comment-form/comment-form';
import CardsList from '../../components/ui/cards-list/cards-list';
import NotFound from '../not-found/not-found';
import Map from '../../components/ui/map/map';
import {reviewType} from '../../mocks/reviews';
import {Points} from '../../types/map-types';
import {useAppSelector} from '../../hooks/redux-hooks';

type RoomType = {
  reviews: reviewType[]
}

const Room = ({reviews}: RoomType) => {
  const [activeCardID, setActiveCardID] = useState<number | null>(null);
  /* TODO: move isAuth to the global state */
  const isAuth: boolean = (window.localStorage.getItem('isAuth') === 'true') || false;

  /* TODO: replace offers with nearby places */
  const {offers, city} = useAppSelector((store) => store);

  const {id} = useParams();

  // TODO: replace with actual data from the server
  if (typeof id === 'undefined') {
    return <NotFound/>;
  }
  const requestedOfferID = Number(id);
  if (isNaN(requestedOfferID) || typeof offers[requestedOfferID - 1] === 'undefined') {
    return <NotFound/>;
  }

  /* TODO: replace offers[requestedOfferID - 1] with the data from the server */
  const {isPremium, price, rating, title, images, bedrooms, type, maxAdults, goods, host, description = ''} = offers[requestedOfferID - 1];
  const {avatarUrl, name, isPro} = host;
  const calculatedRating = (rating >= 0 && rating <= 5) ? Math.floor(rating) * 20 : 0;

  // TODO: replace with the nearby places
  const nearbyPlaces = offers.slice(0, 3);
  const points: Points = nearbyPlaces.map((item) => ({
    title: item.title,
    lat: item.location.latitude,
    lng: item.location.longitude,
    id: item.id
  }));

  return (
    <div className="page">
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((item: string) => (
                <div className="property__image-wrapper" key={item}>
                  <img className="property__image" src={item} alt={title}/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>)}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button property__bookmark-button--active" type="button">
                  <svg className="property__bookmark-icon place-card__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${calculatedRating}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                {bedrooms > 0 &&
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>}
                {maxAdults > 0 &&
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>}
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((item) => (
                    <li className="property__inside-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt={name}/>
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                  {isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>}
                </div>
                <div className="property__description">
                  {Array.isArray(description) && description.map((value) => (
                    <p className="property__text" key={value}>
                      {value}
                    </p>
                  ))}
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <Reviews reviews={reviews}/>
                {isAuth && <CommentForm/>}
              </section>
            </div>
          </div>
          <Map containerClassName='property__map map' city={city} points={points} selectedPointID={activeCardID}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CardsList
              offers={nearbyPlaces}
              setCardActive={setActiveCardID}
              activeCardID={activeCardID}
              className='near-places__list places__list'
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Room;
