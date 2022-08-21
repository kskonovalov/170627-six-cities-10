import React, {Dispatch, SetStateAction, useCallback} from 'react';

import Card from '../card/card';
import {Offer} from '../../../types/types';
import CardWrap from '../card-wrap/card-wrap';

type CardsListProps = {
  offers: Offer[],
  setCardActive: Dispatch<SetStateAction<number | null>>,
  activeCardID: number | null,
  className: string,
  cardType: string
}

const CardsList = ({className, offers, activeCardID, setCardActive, cardType}: CardsListProps) => {
  const setCardActiveCallback = useCallback(
    (id: number) => {
      setCardActive(id);
    },
    [setCardActive],
  );
  const setCardInactiveCallback = useCallback(
    () => {
      setCardActive(null);
    },
    [setCardActive],
  );

  return (
    <div className={className}>
      {
        offers.map((offer) => (
          <CardWrap
            key={offer.id}
            offer={offer}
            isActive={offer.id === activeCardID}
            setCardActive={setCardActiveCallback}
            setCardInactive={setCardInactiveCallback}
            cardType={cardType}
          />)
        )
      }
    </div>
  );
};

export default CardsList;
