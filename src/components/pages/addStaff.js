import React, { useState } from "react";
import defaultImage from "../icons/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FaPlus, FaMinus } from 'react-icons/fa';

function AddStaffs() {
    //profile box image
    /********************************/
    const [isVisible, setIsVisible] = useState(false);
    const [image, selectImage] = useState({
        placeholder: defaultImage,
        files: null,
    });

    //preview profile image
    /********************************/
    const displaySelectedImage = (event) => {
        // const fileInput = event.target.files[0];
        console.log("hi");

        if (
            event.target.files[0].type === "image/jpeg" ||
            event.target.files[0].type === "image/png"
        ) {
            const reader = new FileReader();

            reader.onload = (r) => {
                selectImage({
                    placeholder: r.target.result,
                    files: event.target.files[0],
                });
            };
        }
    };

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
                    <div class="row w-100">
                        <div className="main-box col-md-8">
                            <div className="row w-100">
                                <div className="mb-2 flex-column col-lg-6 ">
                                    {/* <label>Client ID</label> */}

                                    <input
                                        type="text"
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
                                        className="form-control"
                                        placeholder="Enter Full Name"
                                    />
                                </div>
                                <div className="mb-2 col-lg-12">
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1">
                                            Joining Date
                                        </span>
                                        <input
                                            type="date"
                                            class="form-control"
                                            placeholder="Contact Number"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                        />
                                    </div>
                                </div>

                                <div className="mb-2 col-lg-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Email"
                                    />
                                </div>

                                <div className="mb-2 flex-column col-lg-6">
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1">
                                            +91
                                        </span>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Contact Number"
                                        />
                                    </div>
                                </div>

                                <div class="mb-2 col-12">
                                    {/* <label for="inputAddress2" class="form-label">Address 2</label> */}
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="inputAddress2"
                                        placeholder="Apartment, studio, or floor"
                                    />
                                </div>
                                <div class="mb-2 col-12">
                                    {/* <label for="inputAddress" class="form-label">Address</label> */}
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="inputAddress"
                                        placeholder="Area"
                                    />
                                </div>
                                <div class="mb-2 col-md-6">
                                    {/* <label for="inputCity" class="form-label">City</label> */}
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="inputCity"
                                        placeholder="City"
                                    />
                                </div>
                                <div class="mb-2 col-md-4">
                                    {/* <label for="inputState" class="form-label">State</label> */}
                                    <select id="inputState" class="form-select">
                                        <option selected>State</option>
                                        <option value="1">Madhya Pradesh</option>
                                        <option value="2">Uttar Pradesh</option>
                                        <option value="3">Maharashtra</option>
                                    </select>
                                </div>
                                <div class="mb-2 col-md-2">
                                    {/* <label for="inputZip" class="form-label">Zip</label> */}
                                    <input
                                        type="text"
                                        class="form-control"
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
                                            name="gridRadios"
                                            id="gridRadios1"
                                            value="option1"
                                        />
                                        <label className="form-check-label" for="gridRadios1">
                                            Male
                                        </label>
                                    </div>
                                    <div className="from-check col-4">
                                        <input
                                            className="form-check-input me-2"
                                            type="radio"
                                            name="gridRadios"
                                            id="gridRadios2"
                                            value="option2"
                                        />
                                        <label className="form-check-label" for="gridRadios2">
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pic-box col-4">
                            <div className="card w-100 h-100">
                                <div className="icon-container">
                                    <img
                                        src={image.placeholder}
                                        alt=""
                                    />
                                    <button className="btn ">
                                        <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
                                        <input
                                            className="form-control"
                                            type="file"
                                            onChange={displaySelectedImage}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <label>ID Proof Details</label>
                        <div className="mb-2 col-12 input-group d-flex flex-row">
                            <select id="idProofType" class="form-select custom-col-3">
                                <option selected>Select</option>
                                <option value="1">Adhar Card</option>
                                <option value="2">PAN Card</option>
                                <option value="3">License</option>
                                <option value="4">Other</option>
                            </select>

                            <input
                                className="form-control custom-col-9"
                                type="text"
                                name="idProof"
                                id="idProof"
                                placeholder="id proof number"
                            />
                        </div>
                        <div className="mb-2 col-6 d-flex flex-row">
                            <label for="idProofFront" class="form-label custom-col-3">
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
                            <label for="idProofBack" class="form-label custom-col-3">
                                ID Proof Back
                            </label>
                            <input
                                className="form-control custom-col-9"
                                type="file"
                                name="idProofBack"
                                id="idProofBack"
                            />
                        </div>

                        <div class="card p-0 text-left">
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
                                        />
                                    </div>
                                    <div className="mb-2 flex-column col-lg-6">
                                        <div class="input-group">
                                            <span class="input-group-text" id="basic-addon1">
                                                +91
                                            </span>
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Contact Number"
                                                aria-label="Username"
                                                aria-describedby="basic-addon1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-12 d-flex justify-content-end p-0">
                            <button type="submit" class="btn btn-primary m-2">
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
