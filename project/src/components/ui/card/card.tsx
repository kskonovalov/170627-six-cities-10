import React from 'react';
import {Link} from 'react-router-dom';

import {AppRoute} from '../../../const';
import {offerType} from '../../../mocks/offers';
import styles from './card.module.css';

type CardProps = {
  offer: offerType,
  isActive: boolean,
  setCardActive?: () => void,
  setCardInactive?: () => void
};

const Card = ({offer, isActive, setCardActive = () => '', setCardInactive = () => ''}: CardProps) => {
  const {isPremium, images, price, rating, title, type, id} = offer;
  const image: string | boolean = (typeof images !== 'undefined' && images.length > 0) ? images[0] : false;
  const cardLink: string = AppRoute.Card + id;
  const classForActiveCard = isActive ? 'place-card_active' : '';
  const calculatedRating = (rating >= 0 && rating <= 5) ? Math.round(rating) * 20 : 0;

  return (
    <article className={`cities__card place-card ${styles['place-card']} ${styles[classForActiveCard]}`} onMouseEnter={setCardActive} onMouseOut={setCardInactive}>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        {image &&
          <Link to={cardLink}>
            <img className="place-card__image" src={image} width="260" height="200" alt={title}/>
          </Link>}
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button place-card__bookmark-button--active" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
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

export default Card;
