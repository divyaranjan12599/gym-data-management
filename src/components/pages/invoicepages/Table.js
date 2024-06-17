import React, { useContext } from 'react';
import { State } from './stateContext';

const Table = () => {
  const { list, total } = useContext(State);

  return (
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {list.map(item => (
          <tr key={item.id}>
            <td>{item.description}</td>
            <td>{item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.amount}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3">Total</td>
          <td>${total}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
