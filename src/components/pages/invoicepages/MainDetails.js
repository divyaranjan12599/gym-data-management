import React, { useContext } from 'react';
import { State } from './stateContext';

const MainDetails = () => {
  const { clientName, clientAddress } = useContext(State);

  return (
    <section>
      <h2>Bill To:</h2>
      <p>{clientName}</p>
      <p>{clientAddress}</p>
    </section>
  );
};

export default MainDetails;
