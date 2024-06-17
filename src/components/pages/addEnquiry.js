import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { UserContext } from "../../App";

function AddEnquiry() {
    const [enquiryData, setEnquiryData] = useState({
        visitorName: '',
        phone: '',
        source: '',
        referredBy: '',
        enquiryOn: new Date(),
        lastFollowUpOn: new Date(),
        enquiredFor: [],
        interestedOn: '',
        attainedBy: '',
        email: '',
        address: '',
        comment: ''
    });

    const resetEnquiryData = () => {
        setEnquiryData({
            visitorName: '',
            phone: '',
            source: '',
            referredBy: '',
            enquiryOn: new Date(),
            lastFollowUpOn: new Date(),
            enquiredFor: [],
            interestedOn: '',
            attainedBy: '',
            email: '',
            address: '',
            comment: ''
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log(name, value, type, checked, enquiryData);
        if (type === 'checkbox') {
            setEnquiryData((prevState) => {
                const updatedEnquiredFor = checked
                    ? [...prevState.enquiredFor, value]
                    : prevState.enquiredFor.filter((item) => item !== value);
                return { ...prevState, enquiredFor: updatedEnquiredFor };
            });
        } else {
            setEnquiryData({
                ...enquiryData,
                [name]: value
            });
        }
    };

    let { staffData } = useContext(UserContext);

    const [lastFollowUpDateTime, setlastFollowUpDateTime] = useState(new Date());
    const [enquiryOnDateTime, setEnquiryOnDateTime] = useState(new Date());

    useEffect(() => {
        setlastFollowUpDateTime(new Date()); // Set default value to current date and time on component mount
        setEnquiryOnDateTime(new Date()); // Set default value to current date and time on component mount
    }, []);

    const lastFollowUpOnDateTimeChange = (date) => {
        setlastFollowUpDateTime(date);
        setEnquiryData({
            ...enquiryData,
            "lastFollowUpOn": lastFollowUpDateTime
        });
    };

    const enquiryOnDateTimeChange = (date) => {
        setEnquiryOnDateTime(date)
        // console.log(e);
        setEnquiryData({
            ...enquiryData,
            "enquiryOn": enquiryOnDateTime
        });
    };

    console.log(enquiryData.attainedBy);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            ...enquiryData
        };

        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/user/create-enquiry", postData);
            console.log('Enquiry created successfully:', response.data);
            resetEnquiryData();
        } catch (error) {
            console.error('Error creating enquiry:', error);
        }
        // Handle form submission, e.g., send enquiryData to the server
        console.log('Form submitted:', enquiryData);
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
                            onChange={handleChange}
                            name="visitorName"
                            value={enquiryData.visitorName}
                            className="form-control"
                            placeholder="Fullname"
                            required />
                    </div>
                    <div className="mb-2 col-lg-6">
                        <label>Phone*</label>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">
                                +91
                            </span>
                            <input
                                type="text"
                                onChange={handleChange}
                                name="phone"
                                value={enquiryData.value}
                                className="form-control"
                                placeholder="contact number"
                                required />
                        </div>
                    </div>
                    <div className="mb-2 col-lg-6">
                        <label>Source*</label>
                        <select id="idProofType" className="form-select" onChange={handleChange} name="source" value={enquiryData.source} required>
                            <option selected>Select</option>
                            <option value="walk-in">Walk In</option>
                            <option value="social-media">Social Media</option>
                            <option value="referral">Referral</option>
                            {/* <option value="5">Other</option> */}
                        </select>
                    </div>
                    <div className="mb-2 col-6">
                        <label>Refered By</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="referredBy"
                            value={enquiryData.referredBy}
                            className="form-control"
                            placeholder="Enter Member Name"
                        />
                    </div>
                    <div className="mb-2 col-6 d-flex flex-column">
                        <label>Enquiry On</label>
                        <ReactDatePicker
                            selected={enquiryOnDateTime}
                            onChange={enquiryOnDateTimeChange}
                            name="enquiryOn"
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
                            // selected={enquiryData.lastFollowUpOn}
                            selected={lastFollowUpDateTime}
                            onChange={lastFollowUpOnDateTimeChange}
                            name="lastFollowUpOn"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-2 col-12">
                        <label>Enquired For</label>
                        <div className="row p-4">
                            {['Gym', 'CrossFit', 'Calisthenics', 'Zumba', 'Dance', 'Yoga', 'Steam Bath', 'Physio Therapy', 'Power Lifting', 'Personal Training', 'Cardio', 'Aerobics'].map((activity, index) => (
                                <div className="form-check col-3" key={index}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="enquiredFor"
                                        value={activity}
                                        checked={enquiryData.enquiredFor.includes(activity)}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor={`flexCheckDefault${index}`}>
                                        {activity}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-2 col-lg-6">
                        <label>Interested On</label>
                        <select id="idProofType" name="interestedOn" onChange={handleChange} value={enquiryData.interestedOn} className="form-select">
                            <option selected>Select Package</option>
                            <option value="monthly">Monthly Package</option>
                            <option value="twomonths">Quaterly Package</option>
                            <option value="quarterly">Half Yearly Package</option>
                            <option value="halfyearly">Yearly Package</option>
                            <option value="yearly">Other</option>
                        </select>
                    </div>
                    <div className="mb-2 col-lg-6">
                        <label>Attain By</label>
                        <select id="idProofType" name="attainedBy" value={enquiryData.attainedBy} onChange={handleChange} className="form-select">
                            <option selected>Select Staff</option>
                            {staffData.map((staff, index) => (
                                <option key={index} value={staff._id}>{staff.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-2 col-lg-6">
                        <label>Email</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="email"
                            value={enquiryData.email}
                            className="form-control"
                            placeholder="asd123@gmail.com"
                        />
                    </div>
                    <div className="mb-2 col-lg-6">
                        <label>Address</label>
                        <textarea
                            type="text"
                            onChange={handleChange}
                            name="address"
                            value={enquiryData.address}
                            className="form-control"
                            placeholder="eg. 123, Colony, Hyderabad"
                        />
                    </div>
                    <div className="mb-2 col-lg-6">
                        <label>Comment</label>
                        <textarea
                            type="text"
                            onChange={handleChange}
                            name="comment"
                            value={enquiryData.comment}
                            className="form-control"
                            placeholder="Enter comment..."
                        />
                    </div>
                    <div className="col-12 d-flex justify-content-end p-0">
                        <button onClick={handleSubmit} className="btn btn-primary m-2">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddEnquiry;
