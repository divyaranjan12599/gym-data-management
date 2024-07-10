import React, { useContext } from 'react';
import { State } from './stateContext';

const Notes = () => {
  const { notes } = useContext(State);

  return (
    <section>
      <h3>Notes:</h3>
      <p>{notes}</p>
    </section>
  );
};

export default Notes;
