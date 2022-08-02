import React, {Dispatch, SetStateAction} from 'react';

import Card from '../card/card';
import {Offer} from '../../../mocks/offers';

type CardsListProps = {
  className: string,
  offers: Offer[],
  setCardActive: Dispatch<SetStateAction<number | null>>,
  activeCardID: number | null
}

const CardsList = ({className, offers, activeCardID, setCardActive}: CardsListProps) => (
  <div className={className}>
    {
      offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          isActive={offer.id === activeCardID}
          setCardActive={() => setCardActive(offer.id)}
          setCardInactive={() => setCardActive(null)}
        />)
      )
    }
  </div>
);

export default CardsList;
