import React from 'react';
import {useNavigate} from 'react-router-dom';

import {setUserFavoriteAction} from '../../../store/user-slice/user-api-actions';
import {changeOneOfOffersIsFavorite, setError} from '../../../store/actions';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux-hooks';
import {getAuthorizationStatus} from '../../../store/user-slice/user-selectors';
import {AppRoute, AuthorizationStatus} from '../../../const';

type AddToFavoritesProps = {
  id: number,
  type: string,
  isFavorite: boolean
}

const AddToFavorites = ({id, type, isFavorite}: AddToFavoritesProps) => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  const favoriteButtonHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if(authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(setError('Please log in to add to favorites!'));
      return navigate(AppRoute.Login);
    }
    dispatch(setUserFavoriteAction({offerID: id, setFavorite: !isFavorite ? 1 : 0}));
    dispatch(changeOneOfOffersIsFavorite({offerID: id, isFavorite: !isFavorite}));
  };

  const buttonClass = type === 'card' ? 'place-card__bookmark-button' : 'property__bookmark-button';
  const svgClass = type === 'card' ? '' : 'property__bookmark-icon';
  const iconWidth = type === 'card' ? 18 : 31;
  const iconHeight = type === 'card' ? 19 : 33;

  return (
    <button className={`${buttonClass} button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button" onClick={favoriteButtonHandler}>
      <svg className={`${svgClass} place-card__bookmark-icon`} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>);
};

export default AddToFavorites;
