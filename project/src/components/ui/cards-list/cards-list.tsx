import React, {useState} from 'react';

import Card from '../card/card';
import {OfferType} from '../../../mocks/offers';

type CardsListProps = {
  Offers: OfferType[]
}

const CardsList = ({Offers}: CardsListProps) => {
  const [activeCardID, setActiveCardID] = useState('offer1');
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        Offers.map((Offer) => <Card key={Offer.id} Offer={Offer} isActive={Offer.id === activeCardID} setActiveCardID={setActiveCardID}/>)
      }
    </div>
  );
};

export default CardsList;
