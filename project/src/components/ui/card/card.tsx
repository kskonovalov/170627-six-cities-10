import React, {Dispatch, SetStateAction} from 'react';
import {Link} from 'react-router-dom';

import {AppRoute} from '../../../const';
import {OfferType} from '../../../mocks/offers';
import styles from './card.module.css';

type CardProps = {
  Offer: OfferType,
  isActive: boolean,
  setActiveCardID: Dispatch<SetStateAction<string>>
}

const Card = ({Offer, isActive, setActiveCardID}: CardProps) => {
  const {id, isPremium, image, price, rating, title, type} = Offer;
  const cardLink: string = AppRoute.Card + id;
  const classForActiveCard = isActive ? 'place-card_active' : '';
  return (
    <article className={`cities__card place-card ${styles['place-card']} ${styles[classForActiveCard]}`} onMouseEnter={() => (setActiveCardID(Offer.id))}>
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
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{'width': `${rating} + '%'`}}></span>
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
