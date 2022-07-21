import React, {useState} from 'react';

import Card from '../card/card';
import {offerType} from '../../../mocks/offers';

type CardsListProps = {
  offers: offerType[]
}

const CardsList = ({offers}: CardsListProps) => {
  const [activeCardID, setActiveCardID] = useState<number | boolean>(false);
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <Card
            key={offer.id}
            offer={offer}
            isActive={offer.id === activeCardID}
            setCardActive={() => setActiveCardID(offer.id)}
          />)
        )
      }
    </div>
  );
};

export default CardsList;
