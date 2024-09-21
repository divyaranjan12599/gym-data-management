import React, { useContext, useEffect, useRef, useState } from "react";
import defaultImage from "../icons/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../../App";
import ReactDatePicker from "react-datepicker";

const initialStaffState = {
  staffName: "",
  email: "",
  picUrl: "",
  contactNumber: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  gender: "Male",
  joiningDate: new Date(),
  idProofType: "",
  idProofNumber: "",
  idProofFront: null,
  idProofBack: null,
  emergencyContactName: "",
  emergencyContactNumber: "",
};

function AddStaffs() {
  const [validationErrors, setValidationErrors] = useState({});

  const {
    userAuth: { token },
  } = useContext(UserContext);

  const validateStep = () => {
    const errors = {};
    if (!staffData.staffName) errors.staffName = "Field required";
    if (!staffData.joiningDate) errors.joiningDate = "Field required";
    if (!staffData.email) errors.email = "Field required";
    if (!staffData.contactNumber) errors.contactNumber = "Field required";
    if (!staffData.address) errors.address = "Field required";
    if (!staffData.city) errors.city = "Field required";
    if (!staffData.state) errors.state = "Field required";
    if (!staffData.zip) errors.zip = "Field required";
    if (!staffData.gender) errors.gender = "Field required";
    if (!staffData.idProofType) errors.idProofType = "Field required";
    if (!staffData.idProofNumber) errors.idProofNumber = "Field required";
    if (!staffData.idProofFront) errors.idProofFront = "Field required";
    if (!staffData.idProofBack) errors.idProofBack = "Field required";
    if (!staffData.emergencyContactName)
      errors.emergencyContactName = "Field required";
    if (!staffData.emergencyContactNumber)
      errors.emergencyContactNumber = "Field required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const [staffData, setStaffData] = useState(initialStaffState);
  const resetStaffData = () => {
    setImageURL(null);
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
    // console.log(e);

    const { name, value, type, files } = e.target;
    setStaffData({
      ...staffData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const joiningDateChange = (date) => {
    // setJoiningDate(date);
    setStaffData({
      ...staffData,
      "joiningDate": date
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateStep();
    const postData = {
      ...staffData,
      picUrl: imageURL,
    };

    // Handle form submission, e.g., send staffData to the server
    // console.log('Form submitted:', staffData);
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/user/create-staff",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Staff Added successfully");
      // console.log('Staff Added successfully:', response.data);
      resetStaffData();
    } catch (error) {
      toast.error("Error creating staff");
      console.error("Error creating Staff:", error);
    }
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
          <h5 className="text-center mb-0">Add Personal Details</h5>
        </div>
        <form className="d-flex flex-column justify-content-center align-items-center p-2">
          <div className="row w-100">
            <div className="main-box col-md-8">
              <div className="row w-100">
                <div className="mb-2 flex-column col-lg-6 ">
                  <label>Staff ID</label>
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
                  <label>Name</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="staffName"
                    value={staffData.staffName}
                    className="form-control"
                    placeholder={
                      validationErrors.staffName
                        ? `Full name is required !!`
                        : "Enter Full Name"
                    }
                    style={{
                      borderBottom: validationErrors.staffName
                        ? "2px inset red"
                        : "1px solid #ced4da",
                      "--placeholder-color": validationErrors.staffName
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
                <div className="mb-2 col-lg-6 d-flex flex-column">
                  <label>Joining Date</label>
                  {/* <input
                                            type="date"
                                            onChange={handleChange}
                                            name="joiningDate"
                                            value={staffData.joiningDate}
                                            className="form-control"
                                            aria-describedby="basic-addon1"
                                              style={{
                                                borderBottom: validationErrors.joiningDate
                                                  ? "2px inset red"
                                                  : "1px solid #ced4da",
                                                "--placeholder-color": validationErrors.joiningDate
                                                  ? "red"
                                                  : "#6c757d",
                                              }}
                                            /> */}
                  <ReactDatePicker
                    // selected={enquiryData.lastFollowUpOn}
                    selected={staffData.joiningDate}
                    onChange={joiningDateChange}
                    name="joiningDate"
                    // showTimeSelect
                    // timeFormat="HH:mm"
                    // timeIntervals={15}
                    dateFormat="MMMM d, yyyy"
                    className="form-control "
                  />

                </div>

                <div className="mb-2 col-lg-6">
                  <label>Email</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="email"
                    value={staffData.email}
                    className="form-control"
                    placeholder={
                      validationErrors.email
                        ? `Email is required !!`
                        : "Enter email"
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
                  <label>Gender</label>
                  <div className="mt-2 d-flex flex-row">
                    <div className="from-check col-6">
                      <input
                        className="form-check-input me-2"
                        type="radio"
                        name="gender"
                        id="gridRadios1"
                        value="Male"
                        checked={staffData.gender === "Male"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" for="gridRadios1">
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
                        checked={staffData.gender === "Female"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" for="gridRadios2">
                        Female
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-2 flex-column col-lg-6">
                  <label>Contact Number</label>
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
                      placeholder={
                        validationErrors.contactNumber
                          ? `Contact number required !!`
                          : "Contact Number"
                      }
                      style={{
                        borderBottom: validationErrors.contactNumber
                          ? "2px inset red"
                          : "1px solid #ced4da",
                        "--placeholder-color": validationErrors.contactNumber
                          ? "red"
                          : "#6c757d",
                      }}
                    />
                  </div>
                </div>

              </div>
            </div>
            <div className="pic-box col-4">
              <div
                className="card p-2 align-items-center justify-content-center w-100 h-100"
                onClick={() => widgetRef.current.open()}
              >
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

            <div className="mb-2 col-12">
              <label for="inputAddress" className="form-label">Area Details</label>
              <input
                type="text"
                onChange={handleChange}
                name="address"
                value={staffData.address}
                className="form-control"
                id="inputAddress"
                placeholder={
                  validationErrors.address
                    ? `Area field is required !!`
                    : "Area"
                }
                style={{
                  borderBottom: validationErrors.address
                    ? "2px inset red"
                    : "1px solid #ced4da",
                  "--placeholder-color": validationErrors.address
                    ? "red"
                    : "#6c757d",
                }}
              />
            </div>
            <div className="mb-2 col-md-6">
              <label for="inputCity" className="form-label">City</label>
              <input
                type="text"
                onChange={handleChange}
                name="city"
                value={staffData.city}
                className="form-control"
                id="inputCity"
                placeholder={
                  validationErrors.city ? `Enter city name !!` : "City"
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
              <label for="inputState" className="form-label">State</label>
              <select
                id="inputState"
                className="form-select"
                onChange={handleChange}
                name="state"
                value={staffData.state}
                style={{
                  borderBottom: validationErrors.state
                    ? "2px inset red"
                    : "1px solid #ced4da",
                  "--placeholder-color": validationErrors.state
                    ? "red"
                    : "#6c757d",
                }}
              >
                <option selected>State</option>
                <option value="1">Madhya Pradesh</option>
                <option value="2">Uttar Pradesh</option>
                <option value="3">Maharashtra</option>
              </select>
            </div>
            <div className="mb-2 col-md-2">
              <label for="inputZip" className="form-label">Zip</label>
              <input
                type="text"
                onChange={handleChange}
                name="zip"
                value={staffData.zip}
                className="form-control"
                id="inputZip"
                placeholder={
                  validationErrors.zip
                    ? `Please enter pincode !!`
                    : "pincode"
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

            <label>ID Proof Details</label>
            <div className="mb-2 col-12 input-group d-flex flex-row">
              <select
                id="idProofType"
                onChange={handleChange}
                value={staffData.idProofType}
                name="idProofType"
                className="form-select custom-col-3"
                style={{
                  borderBottom: validationErrors.idProofType
                    ? "2px inset red"
                    : "1px solid #ced4da",
                  "--placeholder-color": validationErrors.idProofType
                    ? "red"
                    : "#6c757d",
                }}
              >
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
                placeholder={
                  validationErrors.idProofNumber
                    ? `Digit Invalid !!`
                    : "Enter digit"
                }
                style={{
                  borderBottom: validationErrors.idProofNumber
                    ? "2px inset red"
                    : "1px solid #ced4da",
                  "--placeholder-color": validationErrors.idProofNumber
                    ? "red"
                    : "#6c757d",
                }}
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
                style={{
                  borderBottom: validationErrors.idProofFront
                    ? "2px inset red"
                    : "1px solid #ced4da",
                  "--placeholder-color": validationErrors.idProofFront
                    ? "red"
                    : "#6c757d",
                }}
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
                style={{
                  borderBottom: validationErrors.idProofBack
                    ? "2px inset red"
                    : "1px solid #ced4da",
                  "--placeholder-color": validationErrors.idProofBack
                    ? "red"
                    : "#6c757d",
                }}
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
                      name="emergencyContactName"
                      value={staffData.emergencyContactName}
                      onChange={handleChange}
                      placeholder={
                        validationErrors.fname
                          ? `Name is required !!`
                          : "Enter Name"
                      }
                      style={{
                        borderBottom: validationErrors.emergencyContactName
                          ? "2px inset red"
                          : "1px solid #ced4da",
                        "--placeholder-color":
                          validationErrors.emergencyContactName
                            ? "red"
                            : "#6c757d",
                      }}
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
                        onChange={handleChange}
                        value={staffData.emergencyContactNumber}
                        name="emergencyContactNumber"
                        placeholder={
                          validationErrors.emergencyContactNumber
                            ? `Number is required !!`
                            : "Enter contact number"
                        }
                        style={{
                          borderBottom: validationErrors.emergencyContactNumber
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
