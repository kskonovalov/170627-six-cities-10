import React, {ChangeEvent, FormEvent, useState, useEffect, Fragment, useMemo} from 'react';

import {useAppDispatch, useAppSelector} from '../../../hooks/redux-hooks';
import {fetchOfferReviewsAction, submitReviewAction} from '../../../store/offers-slice/offers-api-actions';
import Loader from '../../ux/loader';
import {LoadingObject, MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH} from '../../../const';
import {getAppLoading} from '../../../store/app-slice/app-selectors';

type CommentFormProps = {
  offerID: number
}

const CommentForm = ({offerID}: CommentFormProps) => {
  const dispatch = useAppDispatch();
  const commentIsLoading = useAppSelector(getAppLoading);
  const commentIsOnSubmit = commentIsLoading[LoadingObject.CommentSubmit] || false;

  type FormData = {
    rating: number,
    comment: string
  }
  const initialFormData: FormData = useMemo(() => ({
    rating: 0,
    comment: ''
  }), []);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const setRating = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      rating: parseInt(evt.target.value, 10)
    }));
  };

  const handleCommentText = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      comment: evt.target.value
    }));
  };

  const commentLengthMoreThanMin = MIN_COMMENT_LENGTH > 0 ? formData.comment.length >= MIN_COMMENT_LENGTH : true;
  const commentLengthLessThanMax = MAX_COMMENT_LENGTH > 0 ? formData.comment.length <= MAX_COMMENT_LENGTH : true;

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!commentIsOnSubmit) {
      dispatch(submitReviewAction({
        offerID,
        comment: formData.comment,
        rating: formData.rating
      }));
    }
  };

  // clear form fields after the comment was pushed
  useEffect(() => {
    if (!commentIsOnSubmit) {
      setFormData(initialFormData);
      dispatch(fetchOfferReviewsAction(offerID));
    }
  }, [commentIsOnSubmit, dispatch, initialFormData, offerID]);

  type starsType = {
    [stars: string]: string
  };

  const stars: starsType = {
    'perfect': '5',
    'good': '4',
    'not bad': '3',
    'badly': '2',
    'terribly': '1',
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={submitHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          Object.keys(stars).map((key) => (
            <Fragment key={stars[key]}>
              <input className="form__rating-input visually-hidden" name="rating" value={stars[key]} id={`${stars[key]}-stars`} type="radio" checked={formData.rating === parseInt(stars[key], 10)} onChange={setRating} required/>
              <label htmlFor={`${stars[key]}-stars`} className="reviews__rating-label form__rating-label" title={key}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleCommentText}
        disabled={commentIsOnSubmit}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set&nbsp;
          <span className="reviews__star">rating</span>
          and describe your stay with at least&nbsp;
          <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b> and no more than <b className="reviews__text-amount">{MAX_COMMENT_LENGTH} characters</b><br/>
          {!commentLengthMoreThanMin && <>&nbsp;({MIN_COMMENT_LENGTH - formData.comment.length} symbols left)</>}
          {!commentLengthLessThanMax && <>&nbsp;({formData.comment.length - MAX_COMMENT_LENGTH} symbols over {MAX_COMMENT_LENGTH})</>}
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!commentLengthMoreThanMin || !commentLengthLessThanMax || commentIsOnSubmit}>{commentIsOnSubmit ? <Loader/> : 'Submit'}</button>
      </div>
    </form>
  );
};

export default CommentForm;
