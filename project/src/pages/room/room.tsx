import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';

import Reviews from '../../components/ui/reviews/reviews';
import CommentForm from '../../components/ui/comment-form/comment-form';
import CardsList from '../../components/ui/cards-list/cards-list';
import NotFound from '../not-found/not-found';
import Map from '../../components/ui/map/map';
import Loader from '../../components/ux/loader';
import {Offer, Points} from '../../types/types';
import {useAppSelector, useAppDispatch} from '../../hooks/redux-hooks';
import {AppRoute, AuthorizationStatus, CardType, LoadingObject} from '../../const';
import {fetchNearbyPlacesAction, fetchOfferAction, fetchOfferReviewsAction} from '../../store/offers-slice/offers-api-actions';
import classes from './room.module.css';
import {getCity, getLastNReviews, getNearby, getOffer, getReviews} from '../../store/offers-slice/offers-selectors';
import {getAuthorizationStatus} from '../../store/user-slice/user-selectors';
import {getAppLoading} from '../../store/app-slice/app-selectors';
import AddToFavorites from '../../components/ui/add-to-favorites/add-to-favorites';

const Room = () => {
  const dispatch = useAppDispatch();
  const [activeCardID, setActiveCardID] = useState<number | null>(null);

  const city = useAppSelector(getCity);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const offer = useAppSelector(getOffer);
  const loading = useAppSelector(getAppLoading);
  const nearby = useAppSelector(getNearby);
  const reviews = useAppSelector(getReviews);
  const lastNReviews = useAppSelector((state) => getLastNReviews(state, 10));

  const {id} = useParams();

  useEffect(() => {
    if (typeof id !== 'undefined') {
      dispatch(fetchOfferAction(id));
    }
  }, [id, dispatch]);

  // we may not need to load Nearby and Comments, in case we didn't load the offer
  useEffect(() => {
    if (typeof id !== 'undefined' && offer !== null) {
      dispatch(fetchNearbyPlacesAction(id));
      dispatch(fetchOfferReviewsAction(id));
    }
  }, [offer, id, dispatch]);

  if (loading[LoadingObject.Offer]) {
    return <Loader/>;
  }

  if (typeof id === 'undefined' || offer === null) {
    return <NotFound/>;
  }

  const {isPremium, price, rating, title, images, bedrooms, type, maxAdults, goods, host, description = '', isFavorite} = offer;
  const {avatarUrl, name, isPro} = host;
  const calculatedRating = (rating >= 0 && rating <= 5) ? Math.floor(rating) * 20 : 0;

  // nearby places
  const points: Points = nearby.map((item: Offer) => ({
    title: item.title,
    lat: item.location.latitude,
    lng: item.location.longitude,
    id: item.id
  }));
  // add current offer to the points
  points.push({
    title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
    id: offer.id
  });
  const nearbyIsLoading = LoadingObject.Nearby in loading && loading[LoadingObject.Nearby];

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
                <AddToFavorites id={Number(id)} type="room" isFavorite={isFavorite} />
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
                <Reviews reviews={lastNReviews} totalReviewsCount={Object.keys(reviews).length}/>
                {authorizationStatus === AuthorizationStatus.Auth ?
                  <CommentForm offerID={offer.id}/> :
                  <p className={classes['sign-in-message']}><Link to={AppRoute.Login}>Sign in</Link> to write a review!</p>}
              </section>
            </div>
          </div>
          {nearby.length > 0 &&
            <Map containerClassName='property__map map' city={city} points={points} selectedPointID={offer.id}/>}
        </section>
        {nearbyIsLoading && <Loader/>}
        {nearby.length > 0 &&
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <CardsList
                offers={nearby}
                setCardActive={setActiveCardID}
                activeCardID={activeCardID}
                className='near-places__list places__list'
                cardType={CardType.Room}
              />
            </section>
          </div>}
      </main>
    </div>
  );
};

export default Room;
