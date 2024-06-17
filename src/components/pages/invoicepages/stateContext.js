import React, { createContext, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const State = createContext();

export default function StateContext({ children }) {
  const [name, setName] = useState('Gym Name');
  const [address, setAddress] = useState('123 Fitness St, Wellness City, Country');
  const [email, setEmail] = useState('gym@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [bankName, setBankName] = useState('Fitness Bank');
  const [bankAccount, setBankAccount] = useState('123456789');
  const [website, setWebsite] = useState('www.gymwebsite.com');
  const [clientName, setClientName] = useState('John Doe');
  const [clientAddress, setClientAddress] = useState('456 Health Ave, Fit Town, Country');
  const [invoiceNumber, setInvoiceNumber] = useState(uuidv4());
  const [invoiceDate, setInvoiceDate] = useState('2024-06-16');
  const [dueDate, setDueDate] = useState('2024-07-16');
  const [notes, setNotes] = useState('Thank you for choosing our gym!');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState(0);
  const [list, setList] = useState([
    { id: uuidv4(), description: 'Monthly Membership', quantity: 1, price: 50, amount: 50 },
    { id: uuidv4(), description: 'Personal Training Session', quantity: 5, price: 30, amount: 150 }
  ]);
  const [total, setTotal] = useState(200);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const componentRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !quantity || !price) {
      console.error('Please fill in all inputs');
    } else {
      const newItems = {
        id: uuidv4(),
        description,
        quantity,
        price,
        amount: quantity * price
      };
      setList([...list, newItems]);
      setDescription('');
      setQuantity('');
      setPrice('');
      setAmount(0);
      setTotal(total + newItems.amount);
    }
  };

  const context = {
    name, setName,
    address, setAddress,
    email, setEmail,
    phone, setPhone,
    bankName, setBankName,
    bankAccount, setBankAccount,
    website, setWebsite,
    clientName, setClientName,
    clientAddress, setClientAddress,
    invoiceNumber, setInvoiceNumber,
    invoiceDate, setInvoiceDate,
    dueDate, setDueDate,
    notes, setNotes,
    description, setDescription,
    quantity, setQuantity,
    price, setPrice,
    amount, setAmount,
    list, setList,
    total, setTotal,
    componentRef,
    handlePrint,
    isEditing, setIsEditing,
    showModal, setShowModal,
    handleSubmit
  };

  return <State.Provider value={context}>{children}</State.Provider>;
}
