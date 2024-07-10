import React, { useContext } from 'react';
import { State } from './stateContext';

const Footer = () => {
  const { name, address, email, phone, bankName, bankAccount, website } = useContext(State);

  return (
    <footer>
      <p>{name}</p>
      <p>{address}</p>
      <p>{email}</p>
      <p>{phone}</p>
      <p>{bankName} - {bankAccount}</p>
      <p>{website}</p>
    </footer>
  );
};

export default Footer;
