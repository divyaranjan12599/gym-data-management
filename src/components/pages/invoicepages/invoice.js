import React, { useContext } from 'react';
import { State } from './stateContext';
import ClientDetails from './ClientDetails';
import Dates from './Dates';
import Footer from './Footer';
import Header from './Header';
import MainDetails from './MainDetails';
import Notes from './Notes';
import Table from './Table';
import ReactToPrint from 'react-to-print';

function Invoice() {
    const { handleSubmit, componentRef, description, setDescription, quantity, setQuantity, price, setPrice } = useContext(State);

    return (
        <>
            <main
                className="m-5 p-5 xl:max-w-4xl xl:mx-auto bg-white rounded shadow"
                ref={componentRef}
            >
                <Header />
                <MainDetails />
                <ClientDetails />
                <Dates />
                <Table />
                <Notes />
                <Footer />
            </main>

            <div className="mt-5 flex flex-col items-center justify-center">
                <ReactToPrint
                    trigger={() => (
                        <button className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                            Print / Download
                        </button>
                    )}
                    content={() => componentRef.current}
                />
            </div>

            <form onSubmit={handleSubmit} className="m-5 p-5 xl:max-w-4xl xl:mx-auto bg-white rounded shadow">
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="block w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="block w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white font-bold py-2 px-8 rounded shadow mt-4">
                    Add Item
                </button>
            </form>
        </>
    );
}

export default Invoice;
