import React, {ChangeEvent, FormEvent, useState, useEffect, Fragment} from 'react';

import {useAppDispatch, useAppSelector} from '../../../hooks/redux-hooks';
import {fetchOfferReviewsAction, submitReviewAction} from '../../../store/api-actions';
import Loader from '../../ux/loader';
import {loadingObj} from '../../../const';

type CommentFormProps = {
  offerID: number
}

const CommentForm = ({offerID}: CommentFormProps) => {
  const dispatch = useAppDispatch();
  const commentIsOnSubmit = useAppSelector((store) => store.loading[loadingObj.commentSubmit]) || false;

  type FormData = {
    rating: number,
    comment: string
  }
  const initialFormData: FormData = {
    rating: 0,
    comment: ''
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const setRating = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      rating: parseInt(e.target.value, 10)
    }));
  };

  const handleCommentText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      comment: e.target.value
    }));
  };

  const minCommentLength = 50;
  const commentLengthGoodEnough = formData.comment.length > minCommentLength;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  }, [commentIsOnSubmit]);

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
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set&nbsp;
          <span className="reviews__star">rating</span>
          and describe your stay with at least&nbsp;
          <b className="reviews__text-amount">50 characters</b>
          {!commentLengthGoodEnough && <>&nbsp;({minCommentLength - formData.comment.length} symbols left)</>}.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!commentLengthGoodEnough || commentIsOnSubmit}>{commentIsOnSubmit ? <Loader /> : 'Submit'}</button>
      </div>
    </form>
  );
};

export default CommentForm;
