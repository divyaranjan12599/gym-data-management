import React, { useContext } from 'react';
import { State } from './stateContext';

const Header = () => {
  const { name, address, email, phone, bankName, bankAccount, website } = useContext(State);

  return (
    <header>
      <h1>{name}</h1>
      <p>{address}</p>
      <p>{email}</p>
      <p>{phone}</p>
      <p>{bankName} - {bankAccount}</p>
      <p>{website}</p>
    </header>
  );
};

export default Header;
