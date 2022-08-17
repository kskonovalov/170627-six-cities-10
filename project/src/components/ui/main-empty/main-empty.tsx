import React, {memo} from 'react';

type MainEmptyProps = {
  cityTitle: string
}

const MainEmpty = ({cityTitle}: MainEmptyProps) => (
  <div className="cities__status-wrapper tabs__content">
    <b className="cities__status">No places to stay available</b>
    <p className="cities__status-description">We could not find any property available at the moment in {cityTitle}</p>
  </div>
);

export default memo(MainEmpty);
