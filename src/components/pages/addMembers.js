import React, { useState, useRef, useEffect, useContext } from "react";
import defaultImage from "../icons/user.png";
import { FaPlus, FaMinus } from "react-icons/fa";
// import { Avatar } from '@mui/material';
import axios from "axios";
import { UserContext } from "../../App";
import { Col, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import ReactDatePicker from "react-datepicker";

const initialClientState = {
  fname: "",
  lname: "",
  email: "",
  contactNumber: "",
  picUrl: "",
  address1: "",
  address2: "",
  city: "Hyderabad",
  state: "Telangana",
  zip: "",
  gender: "Male",
  membershipStartingDate: new Date(),
  joiningDate: new Date(),
  idProofType: "",
  idProofNumber: "",
  // idProofFront: null,
  // idProofBack: null,
  emergencyContactName: "",
  emergencyContactNumber: "",
  registrationFees: "",
  membershipPeriod: "monthly",
  membershipAmount: "",
  amountPaid: "",
  amountRemaining: "",
  startDate: new Date(),
  ptStartDate: new Date(),
  dueDate: new Date(),
  transactionDate: new Date(),
  paymentMode: "online",
  transactionId: "",
  ptFees: "",
  ptMembershipPeriod: "monthly",
  ptAssignedTo: "",
};

function AddMembers() {
  const [imageURL, setImageURL] = useState(null);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const [clientData, setClientData] = useState(initialClientState);

  const resetClientData = () => {
    setClientData(initialClientState);
    // resting the image url
    setImageURL(null);
  };

  const [validationErrors, setValidationErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const validateStep = () => {
    const errors = {};

    if (currentStep === 1) {
      if (!clientData.fname) errors.fname = "First Name is required";
      if (!clientData.lname) errors.lname = "First Name is required";
      if (!clientData.email) errors.email = "Email is required";
      if (!clientData.contactNumber)
        errors.contactNumber = "Contact Number is required";
      if (!clientData.address1) errors.address1 = "Address is required";
      if (!clientData.joiningDate) errors.joiningDate = "Join date required";
      if (!clientData.city) errors.city = "City is required";
      if (!clientData.state) errors.state = "State is required";
      if (!clientData.zip) errors.zip = "Pincode is required";
      if (!clientData.idProofNumber) errors.idProofNumber = "id proof required";
      if (!clientData.emergencyContactNumber)
        errors.emergencyContactNumber = "Number required";
      if (!clientData.emergencyContactName)
        errors.emergencyContactName = "Name required";
      // Additional validations can be added here for step 1
    } else if (currentStep === 2) {
      if (!clientData.registrationFees)
        errors.registrationFees = "Field required";
      if (!clientData.membershipAmount)
        errors.membershipAmount = "Field required";
      if (!clientData.membershipPeriod)
        errors.membershipPeriod = "Field required";
      if (!clientData.membershipStartingDate)
        errors.membershipStartingDate = "Field required";
      if (!clientData.membershipAmount)
        errors.membershipAmount = "Field required";
      if (!clientData.ptFees) errors.ptFees = "Field required";
      if (!clientData.ptMembershipPeriod)
        errors.ptMembershipPeriod = "Field required";
      if (!clientData.ptAssignedTo) errors.ptAssignedTo = "Field required";
      if (!clientData.ptStartDate) errors.ptStartDate = "Field required";
      // Additional validations for step 2
    } else if (currentStep === 3) {
      if (!clientData.amountPaid) errors.amountPaid = "Field required";
      if (!clientData.amountRemaining)
        errors.amountRemaining = "Field required";
      if (!clientData.paymentMode) errors.paymentMode = "Field required";
      if (!clientData.transactionDate)
        errors.transactionDate = "Field required";
      if (!clientData.transactionId) errors.transactionId = "Field required";
      if (!clientData.dueDate) errors.dueDate = "Field required";
      // Additional validations for step 3
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const UPLOAD_PRESENT = process.env.REACT_APP_UPLOAD_PRESENT;

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESENT,
        multiple: true,
        folder: "GDMTool"
      },
      (err, result) => {
        if (result.event === "success") {
          toast.success("Image uploaded Successfully");
          // console.log("Done! Here is the image info: ", result.info);

          setImageURL(result.info.secure_url);
        }
      }
    );
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
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    validateStep();
    if (currentStep === 1) {
      if (
        !clientData.fname ||
        !clientData.lname ||
        !clientData.email ||
        !clientData.contactNumber
      ) {
        toast.error("Please fill out all required fields.");
        return;
      }
    } else if (currentStep === 2) {
      if (
        !clientData.registrationFees ||
        !clientData.membershipAmount ||
        !clientData.idProofType ||
        !clientData.membershipPeriod
      ) {
        toast.error("Please fill out all required fields.");
        return;
      }
      // Additional validations can be added here
    } else if (currentStep === 3) {
      if (
        !clientData.amountPaid ||
        !clientData.amountRemaining ||
        !clientData.paymentMode
      ) {
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
      picUrl: imageURL,
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/user/create-client",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Client added Successfully")
      window.location.reload();
      setCurrentStep(1);
      resetClientData();
    } catch (error) {
      toast.error("Client can't be Added now. Please Try again later!!");
      console.error("Error creating client:", error);
    }
    // Handle form submission, e.g., send clientData to the server
  };

  let {
    userAuth: { token },
    staffData,
  } = useContext(UserContext);

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
            <div className="card-header borderBottom-top borderBottom-bottom">
              <h5 className="text-center mb-0">Personal Details</h5>
            </div>
            <div className="w-100 d-flex justify-content-center">
              <div className="row w-100">
                <form className="d-flex flex-column justify-content-center align-items-center p-2">
                  <div className="row w-100">
                    <div className="main-box col-8">
                      <div className="row w-100 h-100">
                        <div className="mb-2 flex-column col-lg-6 ">
                          <label>First Name</label>
                          <input
                            type="text"
                            onChange={handleChange}
                            name="fname"
                            className="form-control"
                            value={clientData.fname}
                            placeholder={
                              validationErrors.fname
                                ? `First name is required !!`
                                : "Enter First Name"
                            }
                            style={{
                              borderBottom: validationErrors.fname
                                ? "2px inset red"
                                : "1px solid #ced4da",
                              "--placeholder-color": validationErrors.fname
                                ? "red"
                                : "#6c757d",
                            }}
                          />
                          <style>
                            {`
  .form-control::placeholder {
    color: var(--placeholder-color);
  }
`}
                          </style>
                        </div>

                        <div className="mb-2 col-lg-6">
                          <label>Last Name</label>
                          <input
                            type="text"
                            onChange={handleChange}
                            className="form-control"
                            name="lname"
                            value={clientData.lname}
                            placeholder={
                              validationErrors.lname
                                ? `Last name is required!!`
                                : "Enter Last Name"
                            }
                            style={{
                              borderBottom: validationErrors.lname
                                ? "2px inset red"
                                : "1px solid #ced4da",
                              "--placeholder-color": validationErrors.lname
                                ? "red"
                                : "#6c757d",
                            }}
                          />
                          <style>
                            {`
.form-control::placeholder {
  color: var(--placeholder-color);
  }
  `}
                          </style>
                        </div>

                        <div className="mb-2 col-lg-6">
                          <label>Email</label>
                          <input
                            type="text"
                            onChange={handleChange}
                            name="email"
                            value={clientData.email}
                            className="form-control"
                            placeholder={
                              validationErrors.email
                                ? `Email ID required !!`
                                : "Enter Email ID"
                            }
                            style={{
                              borderBottom: validationErrors.email
                                ? "2px inset red"
                                : "1px solid #ced4da",
                              "--placeholder-color": validationErrors.email
                                ? "red"
                                : "#6c757d",
                            }}
                          />
                        </div>

                        <div className="mb-2 flex-column col-lg-6">
                          <label>Contact</label>
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              +91
                            </span>
                            <input
                              type="number"
                              onChange={handleChange}
                              name="contactNumber"
                              value={clientData.contactNumber}
                              className="form-control"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              // required
                              placeholder={
                                validationErrors.contactNumber
                                  ? `Contact Number Invalid...`
                                  : "Enter Contact Number"
                              }
                              style={{
                                borderBottom: validationErrors.contactNumber
                                  ? "2px inset red"
                                  : "2px solid #ced4da",
                                "--placeholder-color":
                                  validationErrors.contactNumber
                                    ? "red"
                                    : "#6c757d",
                              }}
                            />
                          </div>
                        </div>

                        <div className="mb-2 col-12">
                          <label>Area</label>
                          <input
                            type="text"
                            onChange={handleChange}
                            name="address1"
                            value={clientData.address1}
                            className="form-control"
                            id="inputAddress2"
                            // required
                            placeholder={
                              validationErrors.address1
                                ? `Field required...`
                                : "Apartment, studio, or floor"
                            }
                            style={{
                              borderBottom: validationErrors.address1
                                ? "2px inset red"
                                : "1px solid #ced4da",
                              "--placeholder-color": validationErrors.address1
                                ? "red"
                                : "#6c757d",
                            }}
                          />
                        </div>
                        <div className="mb-2 col-md-6">
                          <label>City</label>
                          <input
                            type="text"
                            onChange={handleChange}
                            name="city"
                            value={clientData.city}
                            className="form-control"
                            id="inputCity"
                            // required
                            placeholder={
                              validationErrors.city
                                ? `City input required !!`
                                : "Enter city"
                            }
                            style={{
                              borderBottom: validationErrors.city
                                ? "2px inset red"
                                : "1px solid #ced4da",
                              "--placeholder-color": validationErrors.city
                                ? "red"
                                : "#6c757d",
                            }}
                          />
                        </div>
                        <div className="mb-2 col-md-4">
                          <label>State</label>
                          <select
                            id="inputState"
                            name="state"
                            onChange={handleChange}
                            value={clientData.state}
                            className="form-select"
                            style={{
                              borderBottom: validationErrors.state
                                ? "2px inset red"
                                : "1px solid #ced4da",
                            }}
                          >
                            <option
                              value=""
                              disabled
                              selected={!clientData.state}
                              style={{
                                color: validationErrors.state
                                  ? "red"
                                  : "#6c757d",
                              }}
                            >
                              {validationErrors.state
                                ? "State input required!!"
                                : "State"}
                            </option>
                            <option value="Madhya Pradesh">
                              Madhya Pradesh
                            </option>
                            <option value="Telangana">Telangana</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                          </select>
                        </div>

                        <div className="mb-2 col-md-2">
                          <label>PinCode</label>
                          <input
                            type="text"
                            onChange={handleChange}
                            name="zip"
                            value={clientData.zip}
                            className="form-control"
                            id="inputZip"
                            // required
                            placeholder={
                              validationErrors.zip
                                ? `pincode requi...`
                                : "Pincode"
                            }
                            style={{
                              borderBottom: validationErrors.zip
                                ? "2px inset red"
                                : "1px solid #ced4da",
                              "--placeholder-color": validationErrors.zip
                                ? "red"
                                : "#6c757d",
                            }}
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
                                checked={clientData.gender === "Male"}
                                onChange={handleChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gridRadios1"
                              >
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
                                checked={clientData.gender === "Female"}
                                onChange={handleChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gridRadios2"
                              >
                                Female
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-6 d-flex flex-column">
                          <label>Joining Date</label>
                          <ReactDatePicker
                            // selected={enquiryData.lastFollowUpOn}
                            selected={clientData.joiningDate}
                            onChange={handleChange}
                            name="joiningDate"
                            // showTimeSelect
                            // timeFormat="HH:mm"
                            // timeIntervals={15}
                            dateFormat="MMMM d, yyyy"
                            className="form-control"
                          />
                        </div>
                        <div className="col-12">
                          <label>ID Proof Details</label>
                          <div
                            className="mb-2 input-group d-flex flex-row"
                            style={{
                              borderBottom: validationErrors.idProofNumber
                                ? "2px inset red"
                                : "1px solid #ced4da",
                              "--placeholder-color":
                                validationErrors.idProofNumber
                                  ? "red"
                                  : "#6c757d",
                            }}
                          >
                            <select
                              id="idProofType"
                              onChange={handleChange}
                              value={clientData.idProofType}
                              name="idProofType"
                              className="form-select custom-col-3"
                              style={{
                                borderBottom: validationErrors.idProofType
                                  ? "2px inset red"
                                  : "1px solid #ced4da",
                              }}
                            >
                              <option
                                value=""
                                disabled
                                selected={!clientData.idProofType}
                                style={{
                                  color: validationErrors.idProofType
                                    ? "red"
                                    : "#6c757d",
                                }}
                              >
                                {validationErrors.idProofType
                                  ? "Please select!!!"
                                  : "Select"}
                              </option>
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
                              placeholder={
                                validationErrors.idProofNumber
                                  ? "ID proof required..."
                                  : "ID proof number"
                              }
                            />
                          </div>
                        </div>
                        {/* <div className="mb-2 col-6">
                          <label htmlFor="idProofFront" className="form-label">
                            ID Proof Front
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="idProofFront"
                            id="idProofFront"
                            onChange={handleChange}
                            value={clientData.idProofFront}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            // required
                            style={{
                              borderBottom: validationErrors.idProofFront
                                ? "2px inset red"
                                : "1px solid #ced4da",
                              "--placeholder-color":
                                validationErrors.idProofFront
                                  ? "red"
                                  : "#6c757d",
                            }}
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
                            style={{
                              borderBottom: validationErrors.idProofBack
                                ? "2px inset red"
                                : "1px solid #ced4da",
                              "--placeholder-color":
                                validationErrors.idProofBack
                                  ? "red"
                                  : "#6c757d",
                            }}
                          />
                        </div> */}
                      </div>
                    </div>

                    <div className="pic-box col-4">
                      <div
                        className="card p-2 w-100 h-100 align-items-center justify-content-center"
                        onClick={() => widgetRef.current.open()}
                      >
                        <div className="icon-container">
                          {imageURL ? (
                            <img
                              src={imageURL}
                              alt=""
                              className="p-1 w-100 h-100"
                            />
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
                        <h5 className="text-center mt-3 mb-2 ">
                          Emergency Contact Details
                        </h5>
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
                              placeholder={
                                validationErrors.emergencyContactName
                                  ? `This field is required!!`
                                  : "Enter emergency name"
                              }
                              style={{
                                borderBottom:
                                  validationErrors.emergencyContactName
                                    ? "2px inset red"
                                    : "1px solid #ced4da",
                                "--placeholder-color":
                                  validationErrors.emergencyContactName
                                    ? "red"
                                    : "#6c757d",
                              }}
                            />
                          </div>
                          <div className="flex-column col-lg-6">
                            <label>Contact</label>
                            <div className="input-group">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                +91
                              </span>
                              <input
                                type="number"
                                className="form-control"
                                name="emergencyContactNumber"
                                onChange={handleChange}
                                value={clientData.emergencyContactNumber}
                                placeholder={
                                  validationErrors.emergencyContactNumber
                                    ? `This field is required!!`
                                    : "Enter emergency number"
                                }
                                style={{
                                  borderBottom:
                                    validationErrors.emergencyContactNumber
                                      ? "2px inset red"
                                      : "1px solid #ced4da",
                                  "--placeholder-color":
                                    validationErrors.emergencyContactNumber
                                      ? "red"
                                      : "#6c757d",
                                }}
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
            <div className="card-header borderBottom-top borderBottom-bottom">
              <h5 className="text-center mb-0">Membership Details</h5>
            </div>
            <div className="w-100 d-flex justify-content-center">
              {/* Add Membership Details Step */}
              {/* <div className="card text-left mb-4">
                <div className="card-header borderBottom-top borderBottom-bottom">
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
                        name="registrationFees"
                        onChange={handleChange}
                        value={clientData.registrationFees}
                        placeholder={
                          validationErrors.registrationFees
                            ? `Enter the amount!!`
                            : "00.00"
                        }
                        style={{
                          borderBottom: validationErrors.registrationFees
                            ? "2px inset red"
                            : "1px solid #ced4da",
                          "--placeholder-color":
                            validationErrors.registrationFees
                              ? "red"
                              : "#6c757d",
                        }}
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
                        name="membershipAmount"
                        onChange={handleChange}
                        value={clientData.membershipAmount}
                        placeholder={
                          validationErrors.membershipAmount
                            ? `Enter the amount!!`
                            : "00.00"
                        }
                        style={{
                          borderBottom: validationErrors.membershipAmount
                            ? "2px inset red"
                            : "1px solid #ced4da",
                          "--placeholder-color":
                            validationErrors.membershipAmount
                              ? "red"
                              : "#6c757d",
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-2 col-4">
                    <label>Membership Period</label>
                    <select
                      id="membershipPeriod"
                      name="membershipPeriod"
                      onChange={handleChange}
                      value={clientData.membershipPeriod}
                      className="form-select"
                      style={{
                        borderBottom: validationErrors.membershipPeriod
                          ? "2px inset red"
                          : "1px solid #ced4da",
                        "--placeholder-color": validationErrors.membershipPeriod
                          ? "red"
                          : "#6c757d",
                      }}
                    >
                      <option selected>Select</option>
                      <option value="monthly">One Month</option>
                      <option value="twomonths">Two Months</option>
                      <option value="quarterly">Three Months</option>
                      <option value="halfyearly">Six Months</option>
                      <option value="yearly">Yearly</option>
                      {/* <option value="5">Other</option> */}
                    </select>
                  </div>
                  <div className="mb-2 col-4 d-flex flex-column">
                    <label>Starting Date</label>
                    {/* <input
                      type="date"
                      onChange={handleChange}
                      name="membershipStartingDate"
                      value={clientData.membershipStartingDate}
                      className="form-control"
                      style={{
                        borderBottom: validationErrors.membershipStartingDate
                          ? "2px inset red"
                          : "1px solid #ced4da",
                        "--placeholder-color":
                          validationErrors.membershipStartingDate
                            ? "red"
                            : "#6c757d",
                      }}
                    /> */}
                    <ReactDatePicker
                      // selected={enquiryData.lastFollowUpOn}
                      selected={clientData.membershipStartingDate}
                      onChange={handleChange}
                      name="membershipStartingDate"
                      // showTimeSelect
                      // timeFormat="HH:mm"
                      // timeIntervals={15}
                      dateFormat="MMMM d, yyyy"
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
                      <div className="card-header borderBottom-top borderBottom-bottom">
                        <p className="text-center mb-0">PT Details</p>
                      </div>
                      <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
                        <div className="row w-100 mt-2">
                          <div className="mb-2 col-lg-6">
                            <label>PT fees</label>
                            <div className="input-group">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                INR
                              </span>
                              <input
                                type="number"
                                className="form-control"
                                name="ptFees"
                                onChange={handleChange}
                                value={clientData.ptFees}
                                placeholder={
                                  validationErrors.ptFees
                                    ? `This field is required!!`
                                    : "00.00"
                                }
                                style={{
                                  borderBottom: validationErrors.ptFees
                                    ? "2px inset red"
                                    : "1px solid #ced4da",
                                  "--placeholder-color": validationErrors.ptFees
                                    ? "red"
                                    : "#6c757d",
                                }}
                              />
                            </div>
                          </div>
                          <div className="mb-2 col-lg-6">
                            <label>Membership Period</label>
                            <select
                              id="ptMembershipPeriod"
                              onChange={handleChange}
                              name="ptMembershipPeriod"
                              value={clientData.ptMembershipPeriod}
                              className="form-select"
                              style={{
                                borderBottom:
                                  validationErrors.ptMembershipPeriod
                                    ? "2px inset red"
                                    : "1px solid #ced4da",
                                "--placeholder-color":
                                  validationErrors.ptMembershipPeriod
                                    ? "red"
                                    : "#6c757d",
                              }}
                            >
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
                            <select
                              id="ptAssignedTo"
                              name="ptAssignedTo"
                              onChange={handleChange}
                              value={clientData.ptAssignedTo}
                              className="form-select"
                              style={{
                                borderBottom: validationErrors.ptAssignedTo
                                  ? "2px inset red"
                                  : "1px solid #ced4da",
                                "--placeholder-color":
                                  validationErrors.ptAssignedTo
                                    ? "red"
                                    : "#6c757d",
                              }}
                            >
                              <option selected>Select Staff</option>
                              {staffData.map((staff, index) => (
                                <option key={index} value={staff._id}>
                                  {staff.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="mb-2 col-6 d-flex flex-column">
                            <label>Starting Date</label>
                            {/* <input
                              type="date"
                              onChange={handleChange}
                              name="ptStartDate"
                              value={clientData.ptStartDate}
                              className="form-control"
                              style={{
                                borderBottom: validationErrors.ptStartDate
                                  ? "2px inset red"
                                  : "1px solid #ced4da",
                                "--placeholder-color":
                                  validationErrors.ptStartDate
                                    ? "red"
                                    : "#6c757d",
                              }}
                            /> */}
                            <ReactDatePicker
                              // selected={enquiryData.lastFollowUpOn}
                              selected={clientData.ptStartDate}
                              onChange={handleChange}
                              name="ptStartDate"
                              // showTimeSelect
                              // timeFormat="HH:mm"
                              // timeIntervals={15}
                              dateFormat="MMMM d, yyyy"
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
              <h5 className="text-center mb-0">Payment Details</h5>
            </div>
            <div className="w-100 d-flex justify-content-center">
              {/* <div className="card text-left mb-2">
                <div className="card-header borderBottom-top borderBottom-bottom">
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
                        onChange={handleChange}
                        name="amountPaid"
                        value={clientData.amountPaid}
                        // required
                        placeholder={
                          validationErrors.amountPaid
                            ? `Enter the amount !!`
                            : "00.00"
                        }
                        style={{
                          borderBottom: validationErrors.amountPaid
                            ? "2px inset red"
                            : "1px solid #ced4da",
                          "--placeholder-color": validationErrors.amountPaid
                            ? "red"
                            : "#6c757d",
                        }}
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
                        onChange={handleChange}
                        name="amountRemaining"
                        value={clientData.amountRemaining}
                        placeholder={
                          validationErrors.amountRemaining
                            ? `Enter the amount !!`
                            : "00.00"
                        }
                        style={{
                          borderBottom: validationErrors.amountRemaining
                            ? "2px inset red"
                            : "1px solid #ced4da",
                          "--placeholder-color":
                            validationErrors.amountRemaining
                              ? "red"
                              : "#6c757d",
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-2 col-lg-4">
                    <label>Mode of Payment</label>

                    <select
                      id="paymentMode"
                      name="paymentMode"
                      onChange={handleChange}
                      value={clientData.paymentMode}
                      className="form-select"
                      // required
                      style={{
                        borderBottom: validationErrors.paymentMode
                          ? "2px inset red"
                          : "1px solid #ced4da",
                        "--placeholder-color": validationErrors.paymentMode
                          ? "red"
                          : "#6c757d",
                      }}
                    >
                      <option selected>Select</option>
                      <option value="online">ONLINE</option>
                      <option value="CASH">CASH</option>
                      <option value="NET_BANKING">NET BANKING</option>
                      <option value="DEBIT_CARD">DEBIT CARD</option>
                      <option value="CREDIT_CARD">CREDIT CARD</option>
                    </select>
                  </div>
                  <div className="col-4 d-flex flex-column">
                    <label>Transaction Date</label>
                    {/* <input
                      type="date"
                      onChange={handleChange}
                      name="transactionDate"
                      value={clientData.transactionDate}
                      className="form-control"
                      style={{
                        borderBottom: validationErrors.transactionDate
                          ? "2px inset red"
                          : "1px solid #ced4da",
                        "--placeholder-color": validationErrors.transactionDate
                          ? "red"
                          : "#6c757d",
                      }}
                    /> */}
                    <ReactDatePicker
                      // selected={enquiryData.lastFollowUpOn}
                      selected={clientData.transactionDate}
                      onChange={handleChange}
                      name="transactionDate"
                      // showTimeSelect
                      // timeFormat="HH:mm"
                      // timeIntervals={15}
                      dateFormat="MMMM d, yyyy"
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
                      placeholder={
                        validationErrors.transactionId
                          ? `Please enter the ID...`
                          : "Enter transaction ID"
                      }
                      style={{
                        borderBottom: validationErrors.transactionId
                          ? "2px inset red"
                          : "1px solid #ced4da",
                        "--placeholder-color": validationErrors.transactionId
                          ? "red"
                          : "#6c757d",
                      }}
                    />
                  </div>
                  {parseFloat(clientData.amountRemaining) > 0 && (
                    <div className="col-lg-4 d-flex flex-column">
                      <label>Due Date</label>
                      {/* <input
                        type="date"
                        onChange={handleChange}
                        name="dueDate"
                        value={clientData.dueDate}
                        className="form-control"
                        // disabled={parseFloat(clientData.amountRemaining) <= 0}
                        style={{
                          borderBottom: validationErrors.dueDate
                            ? "2px inset red"
                            : "1px solid #ced4da",
                          "--placeholder-color": validationErrors.dueDate
                            ? "red"
                            : "#6c757d",
                        }}
                      /> */}
                      <ReactDatePicker
                        // selected={enquiryData.lastFollowUpOn}
                        selected={clientData.dueDate}
                        onChange={handleChange}
                        name="dueDate"
                        // showTimeSelect
                        // timeFormat="HH:mm"
                        // timeIntervals={15}
                        dateFormat="MMMM d, yyyy"
                        className="form-control"
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
                <button
                  type="button"
                  className="btn btn-secondary w-100 me-4 ms-4"
                  onClick={handlePrev}
                >
                  Previous
                </button>
              )}
            </Col>
            <Col md={6} className="d-flex justify-content-center">
              {currentStep < 2 ? (
                <button
                  type="button"
                  className="btn btn-primary w-100 me-4"
                  onClick={handleNext}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary w-100 me-4"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default AddMembers;
