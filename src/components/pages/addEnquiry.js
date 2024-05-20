import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPlus, FaMinus } from 'react-icons/fa';

function AddEnquiry() {
    //profile box image
    /********************************/
    const [isVisible, setIsVisible] = useState(false);

    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        setDateTime(new Date()); // Set default value to current date and time on component mount
    }, []);

    const handleDateTimeChange = (date) => {
        setDateTime(date);
    };

    return (
        <div className="container">
            <div className="container-fluid">
                <div className="text-center">
                    <h2>ADD Enquiry</h2>
                </div>
            </div>
            {/* <div className="bg-dark text-light">
            <p className="text-center">Client Details</p>
        </div> */}

            <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
                <div className="row w-100">
                    <div className="mb-2 col-lg-6">
                        <label>Visitor's Name*</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Fullname"
                            required />
                    </div>
                    <div className="mb-2 col-lg-6">
                        <label>Phone*</label>
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1">
                                +91
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="contact number"
                                required />
                        </div>
                    </div>
                    <div className="mb-2 col-lg-6">
                        <label>Source*</label>
                        <select id="idProofType" class="form-select" required>
                            <option selected>Select</option>
                            <option value="1">Walk In</option>
                            <option value="2">Social Media</option>
                            <option value="3">Referral</option>
                            <option value="5">Other</option>
                        </select>
                    </div>
                    <div className="mb-2 col-6">
                        <label>Refered By</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Member Name"
                        />
                    </div>
                    <div className="mb-2 col-6 d-flex flex-column">
                        <label>Enquiry On</label>
                        <ReactDatePicker
                            selected={dateTime}
                            onChange={handleDateTimeChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-2 col-6 d-flex flex-column">
                        <label>Last Follow Up On</label>
                        <ReactDatePicker
                            selected={dateTime}
                            onChange={handleDateTimeChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-2 col-12">
                        <label>Equired For</label>
                        <div class="row p-4">

                            <div class="form-check col-3">
                                <input class="form-check-input" type="checkbox" value="Gym" id="flexCheckChecked" checked />
                                <label class="form-check-label" for="flexCheckChecked">
                                    Gym
                                </label>
                            </div>
                            <div class="form-check col-3">
                                <input class="form-check-input" type="checkbox" value="CrossFit" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    CrossFit
                                </label>
                            </div>
                            <div class="form-check col-3">
                                <input class="form-check-input" type="checkbox" value="Calisthenics" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Calisthenics
                                </label>
                            </div>
                            <div class="form-check col-3">
                                <input class="form-check-input" type="checkbox" value="Zumba" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Zumba
                                </label>
                            </div>
                            <div class="form-check col-3">
                                <input class="form-check-input" type="checkbox" value="Dance" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Dance
                                </label>
                            </div>
                            <div class="form-check col-3">
                                <input class="form-check-input" type="checkbox" value="Yoga" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Yoga
                                </label>
                            </div>
                            <div class="form-check col-3">
                                <input class="form-check-input" type="checkbox" value="Steam Bath" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Steam Bath
                                </label>
                            </div>
                            <div class="form-check col-3">
                                <input class="form-check-input" type="checkbox" value="Physio Therapy" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Physio Therapy
                                </label>
                            </div>
                            <div class="form-check col-3">
                                <input class="form-check-input" type="checkbox" value="Power Lifting" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Power Lifting
                                </label>
                            </div>
                            <div class="form-check col-3">
                                <input class="form-check-input" type="checkbox" value="Personal Training" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Personal Training
                                </label>
                            </div>
                            <div class="form-check col-3">
                                <input class="form-check-input" type="checkbox" value="Cardio" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Cardio
                                </label>
                            </div>
                            <div class="form-check col-3">
                                <input class="form-check-input" type="checkbox" value="Aerobics" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Aerobics
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-2 col-lg-6">
                        <label>Interested On</label>
                        <select id="idProofType" class="form-select">
                            <option selected>Select Package</option>
                            <option value="1">Monthly Package</option>
                            <option value="2">Quaterly Package</option>
                            <option value="3">Half Yearly Package</option>
                            <option value="4">Yearly Package</option>
                            <option value="5">Other</option>
                        </select>
                    </div>
                    <div className="mb-2 col-lg-6">
                        <label>Attain By</label>
                        <select id="idProofType" class="form-select">
                            <option selected>Select Staff</option>
                            <option value="1">S1</option>
                            <option value="2">S2</option>
                            <option value="5">Other</option>
                        </select>
                    </div>
                    <div className="mb-2 col-lg-6">
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="asd123@gmail.com"
                        />
                    </div>
                    <div className="mb-2 col-lg-6">
                        <label>Address</label>
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="eg. 123, Colony, Hyderabad"
                        />
                    </div>
                    <div className="mb-2 col-lg-6">
                        <label>Comment</label>
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Enter comment..."
                        />
                    </div>
                    <div className="col-12 d-flex justify-content-end p-0">
                        <button type="submit" class="btn btn-primary m-2">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddEnquiry;
