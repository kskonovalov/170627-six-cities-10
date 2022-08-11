import React, {ChangeEvent, FormEvent, useState, Fragment} from 'react';

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

  type starsType = {
    [stars: string]: string
  };

  const stars: starsType = {
    '5': 'perfect',
    '4': 'good',
    '3': 'not bad',
    '2': 'badly',
    '1': 'terribly',
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={submitHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          Object.keys(stars).map((key) => (
            <Fragment key={key}>
              <input className="form__rating-input visually-hidden" name="rating" value={key} id={`${key}-stars`} type="radio" checked={formData.rating === parseInt(key, 10)} onChange={setRating}/>
              <label htmlFor={`${key}-stars`} className="reviews__rating-label form__rating-label" title={stars[key]}>
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
