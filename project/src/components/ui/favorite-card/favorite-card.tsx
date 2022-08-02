import React from 'react';
import {Link} from 'react-router-dom';

import {AppRoute} from '../../../const';
import {Offer} from '../../../mocks/offers';
import styles from './favorite-card.module.css';

type FavoriteCardProps = {
  offer: Offer
};

const FavoriteCard = ({offer}: FavoriteCardProps) => {
  const {id, isPremium, images, price, rating, title, type} = offer;

  const image: string | boolean = (typeof images !== 'undefined' && images.length > 0) ? images[0] : false;

  const cardLink: string = AppRoute.Card + id;
  return (
    <article className={`favorites__card place-card ${styles['place-card']}`}>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        {image &&
          <Link to={cardLink}>
            <img className="place-card__image" src={image} width="150" height="110" alt={title}/>
          </Link>}
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={cardLink}>{<title></title>}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default FavoriteCard;
