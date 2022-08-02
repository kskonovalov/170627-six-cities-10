import React from 'react';

import {Review} from '../../../mocks/reviews';

type ReviewsProps = {
  reviews: Review[]
}

const Reviews = ({reviews}: ReviewsProps) => (
  <>
    <h2 className="reviews__title">
      Reviews &middot;
      <span className="reviews__amount">{Object.keys(reviews).length}</span>
    </h2>
    {reviews.length > 0 &&
      <ul className="reviews__list">
        {reviews.map((review) => {
          const {comment, date, id, rating, user} = review;
          const {avatarUrl, name} = user;
          const commentDate = new Date(date);
          const localizedDate = `${commentDate.toLocaleString('default', {month: 'long'})} ${commentDate.getUTCFullYear()}`;
          // let's do the default rating to be 100%
          const ratingPercent = (rating > 1 && rating <= 5) ? rating * 20 : 100;
          return (
            <li className="reviews__item" key={id}>
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt={name}/>
                </div>
                <span className="reviews__user-name">
                  {name}
                </span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{width: `${ratingPercent}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">{comment}</p>
                <time className="reviews__time" dateTime="{date}">{localizedDate}</time>
              </div>
            </li>);
        })}
      </ul>}
  </>
);

export default Reviews;
