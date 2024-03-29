import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import AddToFavorites from '../add-to-favorites/add-to-favorites';
import {AppRoute, CardType} from '../../../const';
import styles from './card.module.css';
import {Offer} from '../../../types/types';

export type CardProps = {
  offer: Offer,
  isActive: boolean,
  setCardActive: (id: number) => void,
  setCardInactive: () => void,
  cardType: string
};

const Card = ({offer, isActive, setCardActive, setCardInactive, cardType}: CardProps) => {
  const {isPremium, images, price, rating, title, type, id, isFavorite} = offer;
  const image: string | boolean = (typeof images !== 'undefined' && images.length > 0) ? images[0] : false;
  const cardLink: string = AppRoute.Card + id;
  const classForActiveCard = isActive ? 'place-card_active' : '';
  const calculatedRating = (rating >= 0 && rating <= 5) ? Math.round(rating) * 20 : 0;

  // different classes and styles for different card types
  // currently the difference is between the default card (main) and favorite
  const articleClass = cardType === CardType.Favorite ? 'favorites__card' : 'cities__card';
  const imageWrapperClass = cardType === CardType.Favorite ? 'favorites__image-wrapper' : 'cities__image-wrapper';
  const cardInfoClass = cardType === CardType.Favorite ? 'favorites__card-info' : '';
  const imageWidth = cardType === CardType.Favorite ? 150 : 260;
  const imageHeight = cardType === CardType.Favorite ? 110 : 200;

  return (
    <article className={`${articleClass} place-card ${styles['place-card']} ${styles[classForActiveCard]}`} onMouseEnter={() => setCardActive(id)} onMouseLeave={setCardInactive}>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${imageWrapperClass} place-card__image-wrapper`}>
        {image &&
          <Link to={cardLink}>
            <img className="place-card__image" src={image} width={imageWidth} height={imageHeight} alt={title} data-testid="card-image"/>
          </Link>}
      </div>
      <div className={`${cardInfoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <AddToFavorites id={id} type="card" isFavorite={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${calculatedRating}%`}}></span>
            {calculatedRating}
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={cardLink}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default memo(Card);
