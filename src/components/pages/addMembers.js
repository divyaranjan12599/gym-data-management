import React, { useState, useRef, useEffect, useContext } from "react";
import defaultImage from "../icons/user.png";
import { FaPlus, FaMinus } from 'react-icons/fa';
// import { Avatar } from '@mui/material';
import axios from "axios"
import { UserContext } from "../../App";
import { Col, Row } from "react-bootstrap";
import toast from "react-hot-toast";


const initialClientState = {
  fname: '',
  lname: '',
  email: '',
  contactNumber: '',
  picUrl: "",
  address1: '',
  address2: '',
  city: 'Hyderabad',
  state: 'Telangana',
  zip: '',
  gender: 'Male',
  membershipStartingDate: '',
  joiningDate: new Date().toLocaleDateString(),
  idProofType: '',
  idProofNumber: '',
  idProofFront: null,
  idProofBack: null,
  emergencyContactName: '',
  emergencyContactNumber: '',
  registrationFees: "",
  membershipPeriod: 'monthly',
  membershipAmount: '',
  amountPaid: '',
  amountRemaining: '',
  startingDate: new Date().toLocaleDateString(),
  ptStartingDate: new Date().toLocaleDateString(),
  dueDate: '',
  transactionDate: '',
  paymentMode: 'online',
  transactionId: '',
  ptFees: '',
  ptMembershipPeriod: 'monthly',
  ptAssignedTo: '',
}


function AddMembers() {
  // const [currentStep, setCurrentStep] = useState(1);
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

  // const [validationErrors, setValidationErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const validateStep = () => {
    const errors = {};

    if (currentStep === 1) {
      if (!clientData.fname) errors.fname = 'First Name is required';
      if (!clientData.lname) errors.lname = 'First Name is required';
      if (!clientData.email) errors.email = 'Email is required';
      if (!clientData.contactNumber) errors.contactNumber = 'Contact Number is required';
      if (!clientData.address1) errors.address1 = 'Address is required';
      if (!clientData.city) errors.city = 'City is required';
      if (!clientData.state) errors.state = 'State is required';
      if (!clientData.zip) errors.zip = 'Pincode is required';
      // Additional validations can be added here for step 1
    } else if (currentStep === 2) {
      // Example validations for step 2 (add your fields and rules)
      // Additional validations for step 2
    } else if (currentStep === 3) {
      // Example validations for step 3 (add your fields and rules)
      if (!clientData.joiningDate) errors.joiningDate = 'Joining Date is required';
      // Additional validations for step 3
    }

    // setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(client);
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
          toast.success("Image uploaded Successfully")
          // console.log("Done! Here is the image info: ", result.info);
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

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!clientData.fname || !clientData.lname || !clientData.email || !clientData.contactNumber) {
        // console.log(clientData);
        toast.error("Please fill out all required fields.");
        return;
      }
      // Additional validations can be added here

    } else if (currentStep === 2) {
      if (!clientData.registrationFees || !clientData.membershipAmount || !clientData.membershipPeriod) {
        toast.error("Please fill out all required fields.");
        return;
      }
      // Additional validations can be added here

    } else if (currentStep === 3) {
      if (!clientData.amountPaid || !clientData.amountRemaining || !clientData.paymentMode) {
        // toast.error("Please fill out all required fields.");
        return;
      }
      // Additional validations can be added here
    }
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      ...clientData,
      picUrl: imageURL
    };

    try {
      const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/user/create-client", postData);
      toast.success("Client added Successfully")
      // console.log('Client created successfully:', response.data);
      setCurrentStep(1);
      resetClientData();
    } catch (error) {
      toast.error("Client can't be Added now. Please Try again later!!");
      console.error('Error creating client:', error);
    }
    // Handle form submission, e.g., send clientData to the server
    // console.log('Form submitted:', clientData);
  };

  let { staffData } = useContext(UserContext);

  return (
    <div className="container">
      <div className="container-fluid">
        <div className="text-center">
          <h2>ADD MEMBER</h2>
        </div>
      </div>

      <div className="card mb-4">

        {currentStep === 1 && (
          <>
            <div className="card-header border-top border-bottom">
              <p className="text-center mb-0">Personal Details</p>
            </div>
            <div className="w-100 d-flex justify-content-center">
              <div className="row w-100">
                <form className="d-flex flex-column justify-content-center align-items-center p-2">
                  <div className="row w-100">
                    <div className="main-box col-8">
                      <div className="row w-100 h-100">
                        <div className="mb-2 flex-column col-lg-6 ">
                          <input
                            type="text"
                            onChange={handleChange}
                            name="fname"
                            className="form-control"
                            value={clientData.fname}
                            placeholder="Enter First Name"
                          // disabled
                          />
                          {/* <span className="text-muted">*previous client id: 1601</span> */}
                        </div>

                        <div className="mb-2 col-lg-6">
                          <input
                            type="text"
                            onChange={handleChange}
                            className="form-control"
                            name="lname"
                            value={clientData.lname}
                            placeholder="Enter Last Name"
                          // required
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
                          // required
                          />
                        </div>

                        <div className="mb-2 flex-column col-lg-6">
                          <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">
                              +91
                            </span>
                            <input
                              type="number"
                              onChange={handleChange}
                              name="contactNumber"
                              value={clientData.contactNumber}
                              className="form-control"
                              placeholder="Contact Number"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            // required
                            />
                          </div>
                        </div>

                        <div className="mb-2 col-12">
                          <input
                            type="text"
                            onChange={handleChange} name="address1"
                            value={clientData.address1}
                            className="form-control"
                            id="inputAddress2"
                            placeholder="Apartment, studio, or floor"
                          // required
                          />
                        </div>
                        <div className="mb-2 col-md-6">
                          <input
                            type="text"
                            onChange={handleChange}
                            name="city"
                            value={clientData.city}
                            className="form-control"
                            id="inputCity"
                            placeholder="City"
                          // required
                          />
                        </div>
                        <div className="mb-2 col-md-4">
                          <select id="inputState" name="state" onChange={handleChange} value={clientData.state} className="form-select"
                          // required
                          >
                            <option selected>State</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                          </select>
                        </div>
                        <div className="mb-2 col-md-2">
                          <input
                            type="text"
                            onChange={handleChange}
                            name="zip"
                            value={clientData.zip}
                            className="form-control"
                            id="inputZip"
                            placeholder="Pincode"
                          // required
                          />
                        </div>

                        <div className="col-6">
                          <label>Gender</label>
                          <div className="col-md-12 d-flex flex-row">
                            <div className="from-check col-6">
                              <input
                                className="form-check-input me-2"
                                type="radio"
                                name="gender"
                                id="gridRadios1"
                                value="Male"
                                checked={clientData.gender === 'Male'}
                                onChange={handleChange}
                              />
                              <label className="form-check-label" htmlFor="gridRadios1">
                                Male
                              </label>
                            </div>
                            <div className="from-check col-6">
                              <input
                                className="form-check-input me-2"
                                type="radio"
                                name="gender"
                                id="gridRadios2"
                                value="Female"
                                checked={clientData.gender === 'Female'}
                                onChange={handleChange}
                              />
                              <label className="form-check-label" htmlFor="gridRadios2">
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
                          // required
                          />
                        </div>
                        <div className="col-12">
                          <label>ID Proof Details</label>
                          <div className="mb-2 input-group d-flex flex-row">
                            <select id="idProofType" onChange={handleChange} value={clientData.idProofType} name="idProofType" className="form-select custom-col-3">
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

                        <div className="mb-2 col-6">
                          <label htmlFor="idProofFront" className="form-label">
                            ID Proof Front
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="idProofFront"
                            id="idProofFront"
                          />
                        </div>
                        <div className="mb-2 col-6">
                          <label htmlFor="idProofBack" className="form-label">
                            ID Proof Back
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="idProofBack"
                            id="idProofBack"
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

                    <div className="p-0 border-bottom">
                      <div className="border-top border-bottom ">
                        <p className="text-center mt-3 mb-2">Emergency Contact Details</p>
                      </div>
                      <form className="d-flex flex-column justify-content-center align-items-center w-100">
                        <div className="row w-100 mt-2">
                          <div className="col-lg-6 mb-2">
                            <label>Name</label>
                            <input
                              type="text"
                              onChange={handleChange}
                              name="emergencyContactName"
                              value={clientData.emergencyContactName}
                              className="form-control"
                              placeholder="Name"
                            />
                          </div>
                          <div className="flex-column col-lg-6">
                            <label>Contact</label>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon1">
                                +91
                              </span>
                              <input
                                type="number"
                                className="form-control"
                                name="emergencyContactNumber"
                                onChange={handleChange}
                                value={clientData.emergencyContactNumber}
                                placeholder="Contact Number"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="card-header border-top border-bottom">
              <p className="text-center mb-0">Membership Details</p>
            </div>
            <div className="w-100 d-flex justify-content-center">
              {/* Add Membership Details Step */}
              {/* <div className="card text-left mb-4">
                <div className="card-header border-top border-bottom">
                  <p className="text-center mb-0">Add Membership Details</p>
                </div> */}
              <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
                <div className="row p-2 w-100">
                  <div className="mb-2 col-lg-6">
                    <label>Registration fees</label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
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
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
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
                    <select id="membershipPeriod" name="membershipPeriod" onChange={handleChange} value={clientData.membershipPeriod} className="form-select">
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
                  {isVisible && (
                    <div className="card p-0 text-left">
                      <div className="card-header border-top border-bottom">
                        <p className="text-center mb-0">PT Details</p>
                      </div>
                      <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
                        <div className="row w-100 mt-2">
                          <div className="mb-2 col-lg-6">
                            <label>PT fees</label>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon1">
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
                            <select id="ptMembershipPeriod" onChange={handleChange} name="ptMembershipPeriod" value={clientData.ptMembershipPeriod} className="form-select">
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
                            <select id="ptAssignedTo" name="ptAssignedTo" onChange={handleChange} value={clientData.ptAssignedTo} className="form-select">
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
              </form>
            </div>
            <div className="card-header border-top border-bottom">
              <p className="text-center mb-0">Payment Details</p>
            </div>
            <div className="w-100 d-flex justify-content-center">
              {/* <div className="card text-left mb-2">
                <div className="card-header border-top border-bottom">
                  <p className="text-center mb-0">Add Payment Details</p>
                </div> */}
              <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
                <div className="row p-2 w-100">
                  <div className="mb-2 col-lg-4">
                    <label>Amount Paid</label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        INR
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="00.00"
                        onChange={handleChange}
                        name="amountPaid"
                        value={clientData.amountPaid}
                      // required
                      />
                    </div>
                  </div>
                  <div className="mb-2 col-lg-4">
                    <label>Amount Remaining</label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
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
                    <select id="paymentMode" name="paymentMode" onChange={handleChange} value={clientData.paymentMode} className="form-select"
                    // required
                    >
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
                  {parseFloat(clientData.amountRemaining) > 0 && (
                    <div className="col-lg-4">
                      <label>Due Date</label>
                      <input
                        type="date"
                        onChange={handleChange}
                        name="dueDate"
                        value={clientData.dueDate}
                        className="form-control"
                      // disabled={parseFloat(clientData.amountRemaining) <= 0}
                      />
                    </div>
                  )}
                </div>
              </form>
            </div>
          </>

        )}

        <div className="w-100 h-100 mb-2">
          <Row>
            <Col md={6} className="d-flex justify-content-center">
              {currentStep > 1 && (
                <button type="button" className="btn btn-secondary w-100 me-4 ms-4" onClick={handlePrev}>Previous</button>
              )}
            </Col>
            <Col md={6} className="d-flex justify-content-center">
              {currentStep < 2 ? (
                <button type="button" className="btn btn-primary w-100 me-4" onClick={handleNext}>Next</button>
              ) : (
                <button type="submit" className="btn btn-primary w-100 me-4" onClick={handleSubmit}>Submit</button>
              )}
            </Col>
          </Row>
        </div>
      </div>

    </div>
  );

}

export default AddMembers;