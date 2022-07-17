import React, {useState} from 'react';

import Card from '../card/card';
import {OfferType} from '../../../mocks/offers';

type CardsListProps = {
  Offers: OfferType[]
}

const CardsList = ({Offers}: CardsListProps) => {
  const [activeCardID, setActiveCardID] = useState<string | boolean>(false);
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        Offers.map((Offer) => (
          <Card
            key={Offer.id}
            Offer={Offer}
            isActive={Offer.id === activeCardID}
            setCardActive={() => setActiveCardID(Offer.id)}
          />)
        )
      }
    </div>
  );
};

export default CardsList;