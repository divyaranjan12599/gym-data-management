import React, { useContext } from 'react';
import { State } from './stateContext';

const Dates = () => {
  const { invoiceNumber, invoiceDate, dueDate } = useContext(State);

  return (
    <section>
      <p>Invoice Number: {invoiceNumber}</p>
      <p>Invoice Date: {invoiceDate}</p>
      <p>Due Date: {dueDate}</p>
    </section>
  );
};

export default Dates;
