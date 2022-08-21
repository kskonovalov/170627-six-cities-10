import React from 'react';

import {useAppDispatch} from '../../../hooks/redux-hooks';
import {AppRoute, CardsType} from '../../../const';
import {setUserFavoriteAction} from '../../../store/user-slice/user-api-actions';
import {changeOfferIsFavorite} from '../../../store/actions';
import Card from '../card/card';
import CardFavorite from '../card-favorite/card-favorite';
import {CardWrapProps} from '../../../types/types';

const CardWrap = (cardWrapProps: CardWrapProps) => {
  const dispatch = useAppDispatch();
  const {offer, isActive, cardType} = cardWrapProps;
  const {images, rating, id, isFavorite} = offer;

  const image: string | boolean = (typeof images !== 'undefined' && images.length > 0) ? images[0] : false;
  const cardLink: string = AppRoute.Card + id;
  const classForActiveCard = isActive ? 'place-card_active' : '';
  const calculatedRating = (rating >= 0 && rating <= 5) ? Math.round(rating) * 20 : 0;

  const favoriteButtonHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(setUserFavoriteAction({offerID: id, setFavorite: !isFavorite ? 1 : 0}));
    dispatch(changeOfferIsFavorite({offerID: id, isFavorite: !isFavorite}));
  };

  if (cardType === CardsType.Favorite) {
    return <CardFavorite {...cardWrapProps} />;
  }

  return <Card {...cardWrapProps} />;
};

export default CardWrap;
