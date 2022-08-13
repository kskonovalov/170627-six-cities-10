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
  проблема: при наведении на одну карточку, перерисовываются все карточки
  Я попытался использовать useCallback, чтобы перерисовывалась только одна, но Profiler говорит, что перерисовываются все
  Он пишет, что перерисовываются они потому что родительский компонент делает re-render
  А родительский компонент re-renderится, потому что меняются пропсы offers и activeCardID
  */
  const setCardActiveCallback = useCallback(
    (id: number) => {
      setCardActive(id);
    },
    [],
  );
  const setCardInactiveCallback = useCallback(
    () => {
      setCardActive(null);
    },
    [],
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
