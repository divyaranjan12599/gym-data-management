import React, { useEffect, useRef, useState } from "react";
import defaultImage from "../icons/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FaPlus, FaMinus } from 'react-icons/fa';
import axios from "axios";

const initialStaffState = {
    staffName: '',
    email: '',
    picUrl: '',
    contactNumber: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    gender: '',
    joiningDate: '',
    idProofType: '',
    idProofNumber: '',
    idProofFront: null,
    idProofBack: null,
    emergencyContactName: '',
    emergencyContactNumber: '',
};

function AddStaffs() {


    const [staffData, setStaffData] = useState(initialStaffState);
    const resetStaffData = () => {
        setStaffData(initialStaffState);
    };

    //profile box image
    /********************************/
    const [isVisible, setIsVisible] = useState(false);

    const [imageURL, setImageURL] = useState(null);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    const [image, selectImage] = useState({
        placeholder: defaultImage,
        files: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setStaffData({
            ...staffData,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            ...staffData,
            picUrl: imageURL
        };

        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/user/create-staff", postData);
            console.log('Staff Added successfully:', response.data);
            resetStaffData();
        } catch (error) {
            console.error('Error creating client:', error);
        }
        // Handle form submission, e.g., send staffData to the server
        console.log('Form submitted:', staffData);
    };

    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const UPLOAD_PRESENT = process.env.REACT_APP_UPLOAD_PRESENT;

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: CLOUD_NAME,
            uploadPreset: UPLOAD_PRESENT,
            multiple: true
        },
            (err, result) => {
                if (result.event === "success") {
                    console.log("Done! Here is the image info: ", result.info);
                    setImageURL(result.info.secure_url);
                }
            });
    }, []);

    return (
        <div className="container">
            <div className="container-fluid">
                <div className="text-center">
                    <h2>ADD Staff MEMBER</h2>
                </div>
            </div>
            {/* <div className="bg-dark text-light">
            <p className="text-center">Client Details</p>
        </div> */}

            <div className="card mb-4">
                <div className="card-header border-top border-bottom">
                    <p className="text-center mb-0">Add Personal Details</p>
                </div>
                <form className="d-flex flex-column justify-content-center align-items-center p-2">
                    <div className="row w-100">
                        <div className="main-box col-md-8">
                            <div className="row w-100">
                                <div className="mb-2 flex-column col-lg-6 ">
                                    {/* <label>Client ID</label> */}

                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        className="form-control"
                                        value={1602}
                                        placeholder="Enter Client ID"
                                        disabled
                                    />
                                    <span className="text-muted">*previous staff id: 1601</span>
                                </div>

                                <div className="mb-2 col-lg-6">
                                    {/* <label>Client Name</label> */}
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name="staffName"
                                        value={staffData.staffName}
                                        className="form-control"
                                        placeholder="Enter Full Name"
                                    />
                                </div>
                                <div className="mb-2 col-lg-12">
                                    <div className="input-group">
                                        <span className="input-group-text" id="basic-addon1">
                                            Joining Date
                                        </span>
                                        <input
                                            type="date"
                                            onChange={handleChange}
                                            name="joiningDate"
                                            value={staffData.joiningDate}
                                            className="form-control"
                                            aria-describedby="basic-addon1"
                                        />
                                    </div>
                                </div>

                                <div className="mb-2 col-lg-6">
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name="email"
                                        value={staffData.email}
                                        className="form-control"
                                        placeholder="Enter Email"
                                    />
                                </div>

                                <div className="mb-2 flex-column col-lg-6">
                                    <div className="input-group">
                                        <span className="input-group-text" id="basic-addon1">
                                            +91
                                        </span>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            name="contactNumber"
                                            value={staffData.contactNumber}
                                            className="form-control"
                                            placeholder="Contact Number"
                                        />
                                    </div>
                                </div>

                                <div className="mb-2 col-12">
                                    {/* <label for="inputAddress2" className="form-label">Address 2</label> */}
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name="address1"
                                        value={staffData.address1}
                                        className="form-control"
                                        id="inputAddress2"
                                        placeholder="Apartment, studio, or floor"
                                    />
                                </div>
                                <div className="mb-2 col-12">
                                    {/* <label for="inputAddress" className="form-label">Address</label> */}
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name="address2"
                                        value={staffData.address2}
                                        className="form-control"
                                        id="inputAddress"
                                        placeholder="Area"
                                    />
                                </div>
                                <div className="mb-2 col-md-6">
                                    {/* <label for="inputCity" className="form-label">City</label> */}
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name="city"
                                        value={staffData.city}
                                        className="form-control"
                                        id="inputCity"
                                        placeholder="City"
                                    />
                                </div>
                                <div className="mb-2 col-md-4">
                                    {/* <label for="inputState" className="form-label">State</label> */}
                                    <select id="inputState" className="form-select" onChange={handleChange} name="state" value={staffData.state}>
                                        <option selected>State</option>
                                        <option value="1">Madhya Pradesh</option>
                                        <option value="2">Uttar Pradesh</option>
                                        <option value="3">Maharashtra</option>
                                    </select>
                                </div>
                                <div className="mb-2 col-md-2">
                                    {/* <label for="inputZip" className="form-label">Zip</label> */}
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name="zip"
                                        value={staffData.zip}
                                        className="form-control"
                                        id="inputZip"
                                        placeholder="Pincode"
                                    />
                                </div>

                                <label>Gender</label>
                                <div className="mb-2 col-md-12 d-flex flex-row">
                                    <div className="from-check col-4">
                                        <input
                                            className="form-check-input me-2"
                                            type="radio"
                                            name="gender"
                                            id="gridRadios1"
                                            value="Male"
                                            checked={staffData.gender === 'Male'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" for="gridRadios1">
                                            Male
                                        </label>
                                    </div>
                                    <div className="from-check col-4">
                                        <input
                                            className="form-check-input me-2"
                                            type="radio"
                                            name="gender"
                                            id="gridRadios2"
                                            value="Female"
                                            checked={staffData.gender === 'Female'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" for="gridRadios2">
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pic-box col-4">
                            <div className="card p-2 align-items-center justify-content-center" onClick={() => widgetRef.current.open()}>
                                <div className="icon-container">
                                    {imageURL ? (
                                        <img src={imageURL} alt="" className="p-1 w-100" />
                                    ) : (
                                        <>
                                            <img
                                                className=""
                                                src={image.placeholder}
                                                alt=""
                                            />

                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <label>ID Proof Details</label>
                        <div className="mb-2 col-12 input-group d-flex flex-row">
                            <select id="idProofType" onChange={handleChange} value={staffData.idProofType} name="idProofType" className="form-select custom-col-3">
                                <option selected>Select</option>
                                <option value="adhar">Adhar Card</option>
                                <option value="pan">PAN Card</option>
                                <option value="license">License</option>
                            </select>

                            <input
                                className="form-control custom-col-9"
                                type="text"
                                name="idProofNumber"
                                onChange={handleChange}
                                value={staffData.idProofNumber}
                                id="idProof"
                                placeholder="id proof number"
                            />
                        </div>
                        <div className="mb-2 col-6 d-flex flex-row">
                            <label for="idProofFront" className="form-label custom-col-3">
                                ID Proof Front
                            </label>
                            <input
                                className="form-control custom-col-9"
                                type="file"
                                name="idProofFront"
                                id="idProofFront"
                            />
                        </div>
                        <div className="mb-2 col-6 d-flex flex-row">
                            <label for="idProofBack" className="form-label custom-col-3">
                                ID Proof Back
                            </label>
                            <input
                                className="form-control custom-col-9"
                                type="file"
                                name="idProofBack"
                                id="idProofBack"
                            />
                        </div>

                        <div className="card p-0 text-left">
                            <div className="card-header border-top border-bottom">
                                <p className="text-center mb-0">Emergency Contact Details</p>
                            </div>
                            <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
                                <div className="row w-100 mt-2">
                                    <div className="mb-2 col-lg-6">
                                        {/* <label>Client Name</label> */}
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            name="emergencyContactName"
                                            value={staffData.emergencyContactName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-2 flex-column col-lg-6">
                                        <div className="input-group">
                                            <span className="input-group-text" id="basic-addon1">
                                                +91
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Contact Number"
                                                onChange={handleChange}
                                                value={staffData.emergencyContactNumber}
                                                name="emergencyContactNumber"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-12 d-flex justify-content-end p-0">
                            <button onClick={handleSubmit} className="btn btn-primary m-2">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default AddStaffs;
