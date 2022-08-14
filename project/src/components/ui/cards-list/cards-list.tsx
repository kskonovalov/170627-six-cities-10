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

  /*
сейчас при наведении на одну карточку, перерисовываются все карточки
Я попытался использовать useCallback, чтобы перерисовывалась только одна, но Profiler говорит, что перерисовываются все
Он пишет, что перерисовываются они потому что родительский компонент (CardsList) делает re-render
А CardsList re-render'ится, потому что меняется пропс activeCardID

Я уже на самом деле не уверен, стоит ли вообще оборачивать setCardActive в useCallback, кажется что нет
*/
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
