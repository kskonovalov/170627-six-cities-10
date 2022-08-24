import React, {Dispatch, SetStateAction, useCallback} from 'react';

import Card from '../card/card';
import {Offer} from '../../../types/types';

type CardsListProps = {
  className: string,
  offers: Offer[],
  setCardActive: Dispatch<SetStateAction<number | null>>,
  activeCardID: number | null
}

const CardsList = ({className, offers, activeCardID, setCardActive}: CardsListProps) => {
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
          <Card
            key={offer.id}
            offer={offer}
            isActive={offer.id === activeCardID}
            setCardActive={setCardActiveCallback}
            setCardInactive={setCardInactiveCallback}
          />)
        )
      }
    </div>
  );
};

export default CardsList;
