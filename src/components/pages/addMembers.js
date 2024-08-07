import React, { useState, useRef, useEffect, useContext } from "react";
import defaultImage from "../icons/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Avatar } from '@mui/material';
import axios from "axios"
import { UserContext } from "../../App";

const initialClientState = {
  clientName: '',
  email: '',
  contactNumber: '',
  picUrl: "",
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  gender: '',
  membershipStartingDate: '',
  joiningDate: '',
  idProofType: '',
  idProofNumber: '',
  idProofFront: null,
  idProofBack: null,
  emergencyContactName: '',
  emergencyContactNumber: '',
  registrationFees: '',
  membershipPeriod: '',
  membershipAmount: '',
  amountPaid: '',
  amountRemaining: '',
  startingDate: '',
  ptStartingDate: '',
  dueDate: '',
  transactionDate: '',
  paymentMode: '',
  transactionId: '',
  ptFees: '',
  ptMembershipPeriod: '',
  ptAssignedTo: '',
}
function AddMembers() {
  // cloudinary setup

  const [imageURL, setImageURL] = useState(null);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const [clientData, setClientData] = useState(initialClientState);

  const resetClientData = () => {
    setClientData(initialClientState);
    // resting the image url
    setImageURL(null);

  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(client);
  //   // Submit the client data to the backend
  // };


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

  //profile box image
  /********************************/
  const [isVisible, setIsVisible] = useState(false);
  const [image, selectImage] = useState({
    placeholder: defaultImage,
    files: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setClientData({
      ...clientData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      ...clientData,
      picUrl: imageURL
    };

    try {
      const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/user/create-client", postData);
      console.log('Client created successfully:', response.data);
      resetClientData();
    } catch (error) {
      console.error('Error creating client:', error);
    }
    // Handle form submission, e.g., send clientData to the server
    console.log('Form submitted:', clientData);
  };

  let { staffData } = useContext(UserContext);

  return (
    <div className="container">
      <div className="container-fluid">
        <div className="text-center">
          <h2>ADD MEMBER</h2>
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
              <div className="row w-100 h-100">
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
                  <span className="text-muted">*previous client id: 1601</span>
                </div>

                <div className="mb-2 col-lg-6">
                  {/* <label>Client Name</label> */}
                  <input
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                    name="clientName"
                    value={clientData.clientName}
                    placeholder="Enter Full Name"

                  />
                </div>

                <div className="mb-2 col-lg-6">
                  <input
                    type="text"
                    onChange={handleChange}
                    name="email"
                    value={clientData.email}
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
                      type="number"
                      onChange={handleChange}
                      name="contactNumber"
                      value={clientData.contactNumber}
                      class="form-control"
                      placeholder="Contact Number"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>

                <div class="mb-2 col-12">
                  {/* <label for="inputAddress2" class="form-label">Address 2</label> */}
                  <input
                    type="text"
                    onChange={handleChange} name="address1"
                    value={clientData.address1}
                    class="form-control"
                    id="inputAddress2"
                    placeholder="Apartment, studio, or floor"
                  />
                </div>
                <div class="mb-2 col-12">
                  {/* <label for="inputAddress" class="form-label">Address</label> */}
                  <input
                    type="text"
                    onChange={handleChange}
                    name="address2"
                    value={clientData.address2}
                    class="form-control"
                    id="inputAddress"
                    placeholder="Area"
                  />
                </div>
                <div class="mb-2 col-md-6">
                  {/* <label for="inputCity" class="form-label">City</label> */}
                  <input
                    type="text"
                    onChange={handleChange}
                    name="city"
                    value={clientData.city}
                    class="form-control"
                    id="inputCity"
                    placeholder="City"
                  />
                </div>
                <div class="mb-2 col-md-4">
                  {/* <label for="inputState" class="form-label">State</label> */}
                  <select id="inputState" name="state" onChange={handleChange} value={clientData.state} class="form-select">
                    <option selected>State</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                  </select>
                </div>
                <div class="mb-2 col-md-2">
                  {/* <label for="inputZip" class="form-label">Zip</label> */}
                  <input
                    type="text"
                    onChange={handleChange}
                    name="zip"
                    value={clientData.zip}
                    class="form-control"
                    id="inputZip"
                    placeholder="Pincode"
                  />
                </div>

                <div className="col-6">
                  <label>Gender</label>
                  <div className="col-md-12 d-flex flex-row">
                    <div className="from-check col-4">
                      <input
                        className="form-check-input me-2"
                        type="radio"
                        name="gender"
                        id="gridRadios1"
                        value="Male"
                        checked={clientData.gender === 'Male'}
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
                        checked={clientData.gender === 'Female'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" for="gridRadios2">
                        Female
                      </label>
                    </div>

                  </div>
                </div>

                <div className="col-6">
                  <label>Joining Date</label>
                  <input
                    type="date"
                    onChange={handleChange}
                    name="joiningDate"
                    value={clientData.joiningDate}
                    className="form-control"
                    placeholder="Enter Address"
                  />
                </div>

              </div>
            </div>


            <div className="pic-box col-4">
              <div className="card p-2 w-100 h-100 align-items-center justify-content-center" onClick={() => widgetRef.current.open()}>
                <div className="icon-container">
                  {imageURL ? (
                    <img src={imageURL} alt="" className="p-1 w-100 h-100" />
                  ) : (
                    <>
                      <img
                        className="p-1 w-100 h-100"
                        src={image.placeholder}
                        alt=""
                      />

                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="col-12">
              <label>ID Proof Details</label>
              <div className="mb-2 input-group d-flex flex-row">
                <select id="idProofType" onChange={handleChange} value={clientData.idProofType} name="idProofType" class="form-select custom-col-3">
                  <option selected>Select</option>
                  <option value="adhar">Adhar Card</option>
                  <option value="pan">PAN Card</option>
                  <option value="license">License</option>
                  {/* <option value="4">Other</option> */}
                </select>

                <input
                  className="form-control custom-col-9"
                  type="text"
                  onChange={handleChange}
                  value={clientData.idProofNumber}
                  name="idProofNumber"
                  id="idProof"
                  placeholder="id proof number"
                />
              </div>
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
                      onChange={handleChange}
                      name="emergencyContactName"
                      value={clientData.emergencyContactName}
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
                        type="number"
                        class="form-control"
                        name="emergencyContactNumber"
                        onChange={handleChange}
                        value={clientData.emergencyContactNumber}
                        placeholder="Contact Number"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </form>
      </div>

      <div class="card text-left mb-4">
        <div className="card-header border-top border-bottom">
          <p className="text-center mb-0">Add Membership Details</p>
        </div>
        <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
          <div className="row p-2 w-100">
            <div className="mb-2 col-lg-6">
              <label>Registration fees</label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  INR
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="00.00"
                  name="registrationFees"
                  onChange={handleChange}
                  value={clientData.registrationFees}
                />
              </div>
            </div>
            <div className="mb-2 col-lg-6">
              <label>Membership Amount</label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  INR
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="00.00"
                  name="membershipAmount"
                  onChange={handleChange}
                  value={clientData.membershipAmount}
                />
              </div>
            </div>
            <div className="mb-2 col-4">
              <label>Membership Period</label>
              <select id="membershipPeriod" name="membershipPeriod" onChange={handleChange} value={clientData.membershipPeriod} class="form-select">
                <option selected>Select</option>
                <option value="monthly">One Month</option>
                <option value="twomonths">Two Months</option>
                <option value="quarterly">Three Months</option>
                <option value="halfyearly">Six Months</option>
                <option value="yearly">Yearly</option>
                {/* <option value="5">Other</option> */}
              </select>
            </div>
            <div className="mb-2 col-4">
              <label>Starting Date</label>
              <input
                type="date"
                onChange={handleChange}
                name="membershipStartingDate"
                value={clientData.membershipStartingDate}
                className="form-control"
              />
            </div>
            <div className="col-4 d-flex align-items-center justify-content-start">
              <button
                className="btn text-black-50 d-flex align-items-center"
                onClick={(e) => {
                  e.preventDefault();
                  setIsVisible(!isVisible);
                }}
              >
                {isVisible ? (
                  <>
                    <FaMinus className="me-2" />{" "}
                    <span className="text-black">Remove PT</span>
                  </>
                ) : (
                  <>
                    <FaPlus className="me-2" />
                    <label className="text-black">Add PT</label>
                  </>
                )}
              </button>
              {/* {isVisible ? <label>Remove PT</label> : <label>Add PT</label>} */}
            </div>
            {/* <div className="col-6">
                          <input className="form-check-input me-2" type="radio" checked={isVisible} onClick={() => setIsVisible(!isVisible)} />
                          {!isVisible?(<label>Add PT</label>):(<label>Remove PT</label>)}
                      </div> */}
            {isVisible && (
              <div class="card p-0 text-left">
                <div className="card-header border-top border-bottom">
                  <p className="text-center mb-0">PT Details</p>
                </div>
                <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
                  <div className="row w-100 mt-2">
                    <div className="mb-2 col-lg-6">
                      <label>PT fees</label>
                      <div class="input-group">
                        <span class="input-group-text" id="basic-addon1">
                          INR
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="00.00"
                          name="ptFees"
                          onChange={handleChange}
                          value={clientData.ptFees}
                        />
                      </div>
                    </div>
                    <div className="mb-2 col-lg-6">
                      <label>Membership Period</label>
                      <select id="ptMembershipPeriod" onChange={handleChange} name="ptMembershipPeriod" value={clientData.ptMembershipPeriod} class="form-select">
                        <option selected>Select</option>
                        <option value="monthly">One Month</option>
                        <option value="twomonths">Two Months</option>
                        <option value="quarterly">Three Months</option>
                        <option value="halfyearly">Six Months</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                    <div className="mb-2 col-lg-6">
                      <label>PT Assigned to</label>
                      <select id="ptAssignedTo" name="ptAssignedTo" onChange={handleChange} value={clientData.ptAssignedTo} class="form-select">
                        <option selected>Select Staff</option>
                        {staffData.map((staff, index) => (
                          <option key={index} value={staff._id}>{staff.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 col-6">
                      <label>Starting Date</label>
                      <input
                        type="date"
                        onChange={handleChange}
                        name="ptStartingDate"
                        value={clientData.ptStartingDate}
                        className="form-control"
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* <div class="card w-100" hidden="false">

                      <div class="card-body">
                          <h4 class="card-title">Title</h4>
                          <p class="card-text">Body</p>
                      </div>
                  </div> */}
        </form>
      </div>

      <div class="card text-left mb-2">
        <div className="card-header border-top border-bottom">
          <p className="text-center mb-0">Add Payment Details</p>
        </div>
        <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
          <div className="row p-2 w-100">
            <div className="mb-2 col-lg-4">
              <label>Amount Paid</label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  INR
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="00.00"
                  onChange={handleChange}
                  name="amountPaid"
                  value={clientData.amountPaid}
                />
              </div>
            </div>
            <div className="mb-2 col-lg-4">
              <label>Amount Remaining</label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  INR
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="00.00"
                  onChange={handleChange}
                  name="amountRemaining"
                  value={clientData.amountRemaining}
                />
              </div>
            </div>
            <div className="mb-2 col-lg-4">
              <label>Mode of Payment</label>
              <select id="paymentMode" name="paymentMode" onChange={handleChange} value={clientData.paymentMode} class="form-select">
                <option selected>Select</option>
                <option value="online">ONLINE</option>
                <option value="CASH">CASH</option>
                <option value="NET_BANKING">NET BANKING</option>
                <option value="DEBIT_CARD">DEBIT CARD</option>
                <option value="CREDIT_CARD">CREDIT CARD</option>
              </select>
            </div>
            <div className="col-4">
              <label>Transaction Date</label>
              <input
                type="date"
                onChange={handleChange}
                name="transactionDate"
                value={clientData.transactionDate}
                className="form-control"
              />
            </div>
            <div className="mb-2 col-4">
              <label>Transaction ID</label>
              <input
                type="text"
                className="form-control"
                value={clientData.transactionId}
                onChange={handleChange}
                name="transactionId"
                placeholder="Enter transaction id"
              />
            </div>
            <div className="col-4">
              <label>Due Date</label>
              <input
                type="date"
                onChange={handleChange}
                name="dueDate"
                value={clientData.dueDate}
                className="form-control"
              />
            </div>
          </div>

          {/* <div class="card w-100" hidden="false">

  <div class="card-body">
  <h4 class="card-title">Title</h4>
  <p class="card-text">Body</p>
  </div>
  </div> */}
        </form>
      </div>
      <div className="col-12 d-flex justify-content-end p-0 mb-4">
        <button onClick={handleSubmit} class="btn btn-primary m-2">
          Submit
        </button>
      </div>
    </div >
  );

}

export default AddMembers;