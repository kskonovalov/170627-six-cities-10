import React, {ChangeEvent, FormEvent, useState} from 'react';

const CommentForm = () => {
  type FormData = {
    rating: number | boolean,
    comment: string
  }
  const [formData, setFormData] = useState<FormData>({
    rating: false,
    comment: ''
  });

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
  const commentLengthGoodEnough = formData.comment.length > 0 && formData.comment.length < minCommentLength;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: handle submitted comment
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={submitHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" checked={formData.rating === 5} onChange={setRating}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" checked={formData.rating === 4} onChange={setRating}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" checked={formData.rating === 3} onChange={setRating}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" checked={formData.rating === 2} onChange={setRating}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" checked={formData.rating === 1} onChange={setRating}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
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
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least&nbsp;
          <b className="reviews__text-amount">50 characters</b>
          {commentLengthGoodEnough && <>&nbsp;({minCommentLength - formData.comment.length} symbols left)</>}.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={commentLengthGoodEnough}>Submit</button>
      </div>
    </form>
  );
};

export default CommentForm;
