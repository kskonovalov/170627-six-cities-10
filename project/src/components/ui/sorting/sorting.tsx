import React from 'react';
import {useState} from 'react';

import {order} from '../../../const';
import styles from './sorting.module.css';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux-hooks';
import {setSortBy} from '../../../store/actions';

const Sorting = () => {
  const [opened, setOpened] = useState(false);
  const {sortBy} = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  const changeSortBy = (key: string) => {
    dispatch(setSortBy(key));
    setOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <button className={`places__sorting-type ${styles['places__sorting-type']}`} tabIndex={0} onClick={() => setOpened(!opened)} type="button">
        {order[sortBy]}
        <svg className={`places__sorting-arrow ${styles['places__sorting-arrow']} ${opened ? styles['places__sorting-arrow--opened'] : ''}`} width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </button>
      <ul className={`places__options places__options--custom ${opened ? 'places__options--opened' : ''}`}>
        {Object.keys(order).map((key) => (
          <li className={`places__option ${styles['places__option']} ${sortBy === key ? 'places__option--active' : ''}`} tabIndex={0} key={key}>
            <button onClick={(e) => {e.preventDefault(); changeSortBy(key);}} className={`${styles['places__option-button']} ${sortBy === key ? styles['places__option-button--active'] : ''}`}>{order[key]}</button>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Sorting;
