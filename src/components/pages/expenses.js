import React, { useState } from 'react';
import Table from '../inc/table';
import ReactDatePicker from 'react-datepicker';

const Expenses = () => {
    const [formData, setFormData] = useState({
        detail: '',
        amount: '',
        paidOn: new Date(),
    });

    const handleChange = (e) => {
        console.log(e);

        if (e.target) {
            const { name, value, type } = e.target;
            if (name) {
                setFormData({
                    ...formData,
                    [name]: value,
                });
            }
        }

        else setFormData({
            ...formData,
            ["paidOn"]:  new Date(e),
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Expense data submitted:', formData);
    };

    return (
        <div className='container-fluid'>
            <div className="card mb-4 pt-4 p-2">
                <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100" onSubmit={handleSubmit}>
                    <div className="row w-100">
                        <div className='col-12'>
                            <label>Expense Detail:</label>
                            <input className="form-control"
                                type="text"
                                name="detail"
                                value={formData.detail}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-6'>
                            <label>Amount Paid:</label>
                            <input className="form-control"
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-6'>
                            <label>Amount Paid On:</label>
                            <ReactDatePicker
                                // selected={enquiryData.lastFollowUpOn}
                                selected={formData.paidOn}
                                onChange={handleChange}
                                name="paidOn"
                                // showTimeSelect
                                // timeFormat="HH:mm"
                                // timeIntervals={15}
                                dateFormat="MMMM d, yyyy"
                                className="form-control"
                            />
                        </div>

                    </div>
                    <div className="col-12 d-flex justify-content-end p-0">
                        <button onClick={handleSubmit} className="btn btn-primary m-2">
                            Submit
                        </button>
                    </div>
                </form>
                {/* <Table rows={rows} columns={columns} /> */}
            </div>
        </div>
    );
};

export default Expenses;
