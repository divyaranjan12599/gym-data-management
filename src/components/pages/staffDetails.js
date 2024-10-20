import React, { useContext, useMemo, useState, useEffect, useRef } from "react";
import { UserContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Avatar } from "@mui/material";
import defaultImage from "../icons/user.png";
import ReactDatePicker from "react-datepicker";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Table from "../inc/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StaffDetails() {
  const { staffId } = useParams();
  const [staffData, setStaffData] = useState("");
  const [ptData, setPtData] = useState([]);
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState(null);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [currentStep, setCurrentStep] = useState(1);
  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const UPLOAD_PRESENT = process.env.REACT_APP_UPLOAD_PRESENT;

  const {
    userAuth: { token },
    clientData,
  } = useContext(UserContext);

  const [validationErrors, setValidationErrors] = useState({});

  const validateStep = () => {
    const errors = {};
    if (!personalDetailsFormData.staffName) errors.staffName = "Field required";
    if (!personalDetailsFormData.joiningDate)
      errors.joiningDate = "Field required";
    if (!personalDetailsFormData.email) errors.email = "Field required";
    if (!personalDetailsFormData.contactNumber)
      errors.contactNumber = "Field required";
    if (!personalDetailsFormData.address) errors.address = "Field required";
    if (!personalDetailsFormData.city) errors.city = "Field required";
    if (!personalDetailsFormData.state) errors.state = "Field required";
    if (!personalDetailsFormData.zip) errors.zip = "Field required";
    if (!personalDetailsFormData.gender) errors.gender = "Field required";
    if (!personalDetailsFormData.idProofType)
      errors.idProofType = "Field required";
    if (!personalDetailsFormData.idProofNumber)
      errors.idProofNumber = "Field required";
    if (!personalDetailsFormData.emergencyContactName)
      errors.emergencyContactName = "Field required";
    if (!personalDetailsFormData.emergencyContactNumber)
      errors.emergencyContactNumber = "Field required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fetchStaffData = async () => {
    console.log("sajsakj");

    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + `/user/get-staff/${staffId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Staff Data : ", response.data);
      setStaffData(response.data);
      setpersonalDetailsFormData(response.data);
    } catch (error) {
      console.log(error);
      setStaffData("");
    }
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleDelete = () => {
    alert("delete");
  };

  useEffect(() => {
    fetchStaffData();
    // fetchPtData();

    // console.log("sdffsdj=====", memData, paymentData);
  }, [token]);

  const [ptmembershipUpdateModalShow, setPtMembershipUpdateModalShow] =
    useState(false);
  const [show, setShow] = useState(false);
  const [personalDetailsModalShow, setPersonalDetailsModalShow] =
    useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Example handlers
  const handlePtMembershipUpdateModalShow = () =>
    setPtMembershipUpdateModalShow(true);
  const handlePtMembershipUpdateModalClose = () =>
    setPtMembershipUpdateModalShow(false);
  const handlePersonalDetailsModalShow = () =>
    setPersonalDetailsModalShow(true);
  const handlePersonalDetailsModalClose = () =>
    setPersonalDetailsModalShow(false);

  const [image, selectImage] = useState({
    placeholder: defaultImage,
    files: null,
  });

  const rows = ptData;

  const [personalDetailsFormData, setpersonalDetailsFormData] = useState({
    staffName: "",
    email: "",
    picUrl: "",
    contactNumber: "",
    address: "",
    city: "",
    state: "Telangana",
    zip: "",
    gender: "Male",
    joiningDate: new Date(),
    idProofType: "adhar",
    idProofNumber: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
  });

  const personalDetailsChange = (e) => {
    console.log(e);
    const { name, value, type, files } = e.target;
    setpersonalDetailsFormData({
      ...personalDetailsFormData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const personalDetailsSubmit = async (e) => {
    e.preventDefault();
    console.log("Token : ", token);
    console.log("staffId : ", staffId)
    console.log("personalDetailsFormData: ", personalDetailsFormData);
    try {
      const response = await axios.put(
        process.env.REACT_APP_SERVER_URL + `/user/update-staff/${staffId}`,
        personalDetailsFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Staff Data : ", response.data);
      toast.success(response.data.message)
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  };

  let columns = useMemo(
    () => [
      {
        field: "photoURL",
        headerName: "Avatar",
        width: 90,
        renderCell: (params) => (
          <Avatar src={params.row.photoURL} alt="Avatar" />
        ),
        sortable: false,
        filterable: false,
      },
      { field: "id", headerName: "Client ID", flex: 1 },
      { field: "name", headerName: "Name", flex: 1 },
      { field: "email", headerName: "Email ID", flex: 1 },
      { field: "phone", headerName: "Phone Number", flex: 1 },
      { field: "package", headerName: "Package", flex: 1 },
      { field: "startDate", headerName: "Start Date", flex: 1 },
      { field: "endDate", headerName: "End Date", flex: 1 },
      { field: "status", headerName: "Status", flex: 1 },
      { field: "amount", headerName: "Amount Paid", flex: 1 },
      {
        field: "remaining",
        headerName: "Remaining Amount",
        width: 140,
        editable: true,
      },
    ],
    []
  );

  const paymentColumns = useMemo(
    () => [
      { field: "id", headerName: "Client ID", flex: 1 },
      { field: "mode", headerName: "Mode", flex: 1 },
      { field: "amount_paid", headerName: "Amount Paid", flex: 1 },
      { field: "due_date", headerName: "Due Date", flex: 1 },
    ],
    []
  );

  const [ptmemUpdationformData, setptmemUpdationformData] = useState({
    ptFees: "",
    ptMembershipPeriod: "monthly",
    ptTo: "",
    ptStartDate: new Date(),
    amountPaid: "",
    amountRemaining: "",
    paymentMode: "online",
    transactionDate: new Date(),
    transactionId: "",
    dueDate: new Date(),
  });

  const handlePtMemUpdateChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...ptmemUpdationformData,
      [name]: value,
    };

    if (name === "ptFees") {
      // const totAmount = updatedData.membershipAmount+updatedData.registrationFees;
      console.log("Membership Amount:", value);
      updatedData.amountPaid = value;
    }

    if (name === "amountPaid") {
      // const totAmount = updatedData.membershipAmount+updatedData.registrationFees;
      console.log("Amount====:", value);
      updatedData.amountRemaining = updatedData.ptFees - value;
    }

    setptmemUpdationformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePtMemUpdationformSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(ptmemUpdationformData);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/create-ptcid/${clientData._id}`,
        ptmemUpdationformData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User Pt Membership updated Successfully");
      handleStepChange(1);
      // alert("deleted user", response.data);
      // setEnquiryData(response.data);
    } catch (error) {
      toast.error(error.message);
      // console.log(error);
      // setEnquiryData([]);
    }
    // console.log('Submitting membership updation form data:', memUpdationformData);
  };

  return (
    <div className="container-fluid">
      <h1 className="userHeading mt-3 d-flex justify-content-center">
        Staff Info
      </h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow p-2">
              <div className="d-flex justify-content-end">
                <button className="btn btn-light" onClick={handleShow}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>

                <Modal
                  show={ptmembershipUpdateModalShow}
                  onHide={handlePtMembershipUpdateModalClose}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Body className="">
                    <div className="card">
                      {currentStep === 1 && (
                        <>
                          <div className="card-header border-top border-bottom">
                            <p className="text-center mb-0">PT Details</p>
                          </div>
                          <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
                            <div className="row w-100 mt-2">
                              <div className="mb-2 col-lg-6">
                                <label>PT fees</label>
                                <div class="input-group">
                                  <span
                                    class="input-group-text"
                                    id="basic-addon1"
                                  >
                                    INR
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="00.00"
                                    name="ptFees"
                                    onChange={handlePtMemUpdateChange}
                                    value={ptmemUpdationformData.ptFees}
                                  />
                                </div>
                              </div>
                              <div className="mb-2 col-lg-6">
                                <label>Membership Period</label>
                                <select
                                  id="ptMembershipPeriod"
                                  onChange={handlePtMemUpdateChange}
                                  name="ptMembershipPeriod"
                                  value={
                                    ptmemUpdationformData.ptMembershipPeriod
                                  }
                                  class="form-select"
                                >
                                  <option selected>Select</option>
                                  <option value="monthly">One Month</option>
                                  <option value="twomonths">Two Months</option>
                                  <option value="quarterly">
                                    Three Months
                                  </option>
                                  <option value="halfyearly">Six Months</option>
                                  <option value="yearly">Yearly</option>
                                </select>
                              </div>
                              <div className="mb-2 col-lg-6">
                                <label>PT Assigned to</label>
                                <select
                                  id="ptTo"
                                  name="ptTo"
                                  onChange={handlePtMemUpdateChange}
                                  value={ptmemUpdationformData.ptTo}
                                  class="form-select"
                                >
                                  <option selected>Select Client</option>
                                  {clientData.map((client, index) => (
                                    <option key={index} value={client._id}>
                                      {client.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="mb-2 col-6">
                                <label>Starting Date</label>

                                <ReactDatePicker
                                  selected={personalDetailsFormData.ptStartDate}
                                  onChange={(date) =>
                                    handlePtMemUpdateChange({
                                      target: {
                                        name: "ptStartDate",
                                        value: date,
                                        type: "date",
                                      },
                                    })
                                  }
                                  name="ptStartDate"
                                  dateFormat="MMMM d, yyyy"
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </form>
                        </>
                      )}

                      {currentStep === 2 && (
                        <>
                          <div className="card-header border-top border-bottom">
                            <p className="text-center mb-0">Payment Details</p>
                          </div>
                          <div className="w-100 d-flex justify-content-center">
                            <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
                              <div className="row p-2 w-100">
                                <div className="mb-2 col-lg-4">
                                  <label>Amount Paid</label>
                                  <div class="input-group">
                                    <span
                                      class="input-group-text"
                                      id="basic-addon1"
                                    >
                                      INR
                                    </span>
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder="00.00"
                                      onChange={handlePtMemUpdateChange}
                                      name="amountPaid"
                                      value={ptmemUpdationformData.amountPaid}
                                    />
                                  </div>
                                </div>
                                <div className="mb-2 col-lg-4">
                                  <label>Amount Remaining</label>
                                  <div class="input-group">
                                    <span
                                      class="input-group-text"
                                      id="basic-addon1"
                                    >
                                      INR
                                    </span>
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder="00.00"
                                      onChange={handlePtMemUpdateChange}
                                      name="amountRemaining"
                                      value={
                                        ptmemUpdationformData.amountRemaining
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="mb-2 col-lg-4">
                                  <label>Mode of Payment</label>
                                  <select
                                    id="paymentMode"
                                    name="paymentMode"
                                    onChange={handlePtMemUpdateChange}
                                    value={ptmemUpdationformData.paymentMode}
                                    class="form-select"
                                  >
                                    <option selected>Select</option>
                                    <option value="online">ONLINE</option>
                                    <option value="CASH">CASH</option>
                                    <option value="NET_BANKING">
                                      NET BANKING
                                    </option>
                                    <option value="DEBIT_CARD">
                                      DEBIT CARD
                                    </option>
                                    <option value="CREDIT_CARD">
                                      CREDIT CARD
                                    </option>
                                  </select>
                                </div>
                                <div className="col-4">
                                  <label>Transaction Date</label>

                                  <ReactDatePicker
                                    selected={
                                      ptmemUpdationformData.transactionDate
                                    }
                                    onChange={(date) =>
                                      handlePtMemUpdateChange({
                                        target: {
                                          name: "transactionDate",
                                          value: date,
                                          type: "date",
                                        },
                                      })
                                    }
                                    name="transactionDate"
                                    dateFormat="MMMM d, yyyy"
                                    className="form-control"
                                  />
                                </div>
                                <div className="mb-2 col-4">
                                  <label>Transaction ID</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={ptmemUpdationformData.transactionId}
                                    onChange={handlePtMemUpdateChange}
                                    name="transactionId"
                                    placeholder="Enter transaction id"
                                  />
                                </div>
                                {parseFloat(
                                  ptmemUpdationformData.amountRemaining
                                ) > 0 && (
                                    <div className="col-lg-4">
                                      <label>Due Date</label>

                                      <ReactDatePicker
                                        selected={ptmemUpdationformData.dueDate}
                                        onChange={(date) =>
                                          handlePtMemUpdateChange({
                                            target: {
                                              name: "dueDate",
                                              value: date,
                                              type: "date",
                                            },
                                          })
                                        }
                                        name="dueDate"
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
                      <div className="w-100 h-100 py-2">
                        <Row>
                          <Col md={6} className="d-flex justify-content-center">
                            {currentStep > 1 && (
                              <button
                                type="button"
                                className="btn btn-secondary w-100 me-4 ms-4"
                                onClick={() => handleStepChange(1)}
                              >
                                Back
                              </button>
                            )}
                          </Col>
                          <Col md={6} className="d-flex justify-content-center">
                            {currentStep < 2 ? (
                              <button
                                type="button"
                                className="btn btn-primary w-100 me-4"
                                onClick={() => handleStepChange(2)}
                              >
                                Next
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="btn btn-primary w-100 me-4"
                                onClick={handlePtMemUpdationformSubmit}
                              >
                                Save
                              </button>
                            )}
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>

                <Modal
                  show={show}
                  onHide={handleClose}
                  centered
                  className="custom-modal"
                >
                  <Modal.Body className="">
                    <Container>
                      <Row className="">
                        <Col md={4} className="ps-0 pe-0 text-center">
                          <Button
                            className="w-100 h-100"
                            variant="secondary"
                            onClick={() => {
                              handlePersonalDetailsModalShow();
                              handleClose();
                            }}
                          >
                            Update Profile Details
                          </Button>
                        </Col>
                        <Col md={4} className="ps-2 pe-0 text-center">
                          <Button
                            className="w-100 h-100"
                            variant="primary"
                            onClick={() => {
                              handlePtMembershipUpdateModalShow();
                              handleClose();
                            }}
                          >
                            Add PT Client
                          </Button>
                        </Col>
                        <Col md={4} className="ps-2 pe-0 text-center">
                          <Button
                            className="w-100 h-100"
                            variant="danger"
                            onClick={() => {
                              handleDelete();
                              handleClose();
                            }}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Modal.Body>
                </Modal>

                <Modal
                  show={personalDetailsModalShow}
                  onHide={handlePersonalDetailsModalClose}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Body className="">
                    {/* <Container> */}
                    <div className="w-100 d-flex justify-content-center">
                      <div className="row w-100">
                        <form className="d-flex flex-column justify-content-center align-items-center p-2">
                          <div className="row w-100">
                            <div className="main-box col-md-10">
                              <div className="row w-100">
                                <div className="mb-2 col-lg-6">
                                  <label>Name</label>
                                  <input
                                    type="text"
                                    onChange={personalDetailsChange}
                                    name="staffName"
                                    value={personalDetailsFormData.staffName}
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
                                      "--placeholder-color":
                                        validationErrors.staffName
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

                                <div className="mb-2 flex-column col-lg-6">
                                  <label>Contact Number</label>
                                  <div className="input-group">
                                    <span
                                      className="input-group-text"
                                      id="basic-addon1"
                                    >
                                      +91
                                    </span>
                                    <input
                                      type="text"
                                      onChange={personalDetailsChange}
                                      name="contactNumber"
                                      value={
                                        personalDetailsFormData.contactNumber
                                      }
                                      className="form-control"
                                      placeholder={
                                        validationErrors.contactNumber
                                          ? `Contact number required !!`
                                          : "Contact Number"
                                      }
                                      style={{
                                        borderBottom:
                                          validationErrors.contactNumber
                                            ? "2px inset red"
                                            : "1px solid #ced4da",
                                        "--placeholder-color":
                                          validationErrors.contactNumber
                                            ? "red"
                                            : "#6c757d",
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="mb-2 col-lg-6 d-flex flex-column">
                                  <label>Joining Date</label>
                                  <ReactDatePicker
                                    // selected={enquiryData.lastFollowUpOn}
                                    selected={
                                      personalDetailsFormData.joiningDate
                                    }
                                    onChange={(date) =>
                                      personalDetailsChange({
                                        target: {
                                          name: "joiningDate",
                                          value: date,
                                          type: "date",
                                        },
                                      })
                                    }
                                    name="joiningDate"
                                    dateFormat="MMMM d, yyyy"
                                    className="form-control "
                                  />
                                </div>

                                <div className="mb-2 col-lg-6">
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    onChange={personalDetailsChange}
                                    name="email"
                                    value={personalDetailsFormData.email}
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
                                      "--placeholder-color":
                                        validationErrors.email
                                          ? "red"
                                          : "#6c757d",
                                    }}
                                  />
                                </div>

                                <div className="mb-2 flex-column col-lg-6">
                                  <div className="mt-2 d-flex flex-row">
                                    <label className="col-4">Gender</label>
                                    <div className="from-check col-4">
                                      <input
                                        className="form-check-input me-2"
                                        type="radio"
                                        name="gender"
                                        id="gridRadios1"
                                        value="Male"
                                        checked={
                                          personalDetailsFormData.gender ===
                                          "Male"
                                        }
                                        onChange={personalDetailsChange}
                                      />
                                      <label
                                        className="form-check-label"
                                        for="gridRadios1"
                                      >
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
                                        checked={
                                          personalDetailsFormData.gender ===
                                          "Female"
                                        }
                                        onChange={personalDetailsChange}
                                      />
                                      <label
                                        className="form-check-label"
                                        for="gridRadios2"
                                      >
                                        Female
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="pic-box col-2">
                              <div
                                className="card p-2 align-items-center justify-content-center w-100"
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

                            <div className="mb-2 col-12">
                              <label for="inputAddress" className="form-label">
                                Area Details
                              </label>
                              <input
                                type="text"
                                onChange={personalDetailsChange}
                                name="address"
                                value={personalDetailsFormData.address}
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
                                  "--placeholder-color":
                                    validationErrors.address
                                      ? "red"
                                      : "#6c757d",
                                }}
                              />
                            </div>
                            <div className="mb-2 col-md-6">
                              <label for="inputCity" className="form-label">
                                City
                              </label>
                              <input
                                type="text"
                                onChange={personalDetailsChange}
                                name="city"
                                value={personalDetailsFormData.city}
                                className="form-control"
                                id="inputCity"
                                placeholder={
                                  validationErrors.city
                                    ? `Enter city name !!`
                                    : "City"
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
                              <label for="inputState" className="form-label">
                                State
                              </label>
                              <select
                                id="inputState"
                                className="form-select"
                                onChange={personalDetailsChange}
                                name="state"
                                value={personalDetailsFormData.state}
                                style={{
                                  borderBottom: validationErrors.state
                                    ? "2px inset red"
                                    : "1px solid #ced4da",
                                  "--placeholder-color": validationErrors.state
                                    ? "red"
                                    : "#6c757d",
                                }}
                              >
                                <option value="">State</option>
                                <option value="Andhra Pradesh">
                                  Andhra Pradesh
                                </option>
                                <option value="Arunachal Pradesh">
                                  Arunachal Pradesh
                                </option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">
                                  Chhattisgarh
                                </option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">
                                  Himachal Pradesh
                                </option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">
                                  Madhya Pradesh
                                </option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana" selected>
                                  Telangana
                                </option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">
                                  Uttar Pradesh
                                </option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                              </select>
                            </div>
                            <div className="mb-2 col-md-2">
                              <label for="inputZip" className="form-label">
                                Zip
                              </label>
                              <input
                                type="text"
                                onChange={personalDetailsChange}
                                name="zip"
                                value={personalDetailsFormData.zip}
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
                                onChange={personalDetailsChange}
                                value={personalDetailsFormData.idProofType}
                                name="idProofType"
                                className="form-select custom-col-3"
                                style={{
                                  borderBottom: validationErrors.idProofType
                                    ? "2px inset red"
                                    : "1px solid #ced4da",
                                  "--placeholder-color":
                                    validationErrors.idProofType
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
                                onChange={personalDetailsChange}
                                value={personalDetailsFormData.idProofNumber}
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
                                  "--placeholder-color":
                                    validationErrors.idProofNumber
                                      ? "red"
                                      : "#6c757d",
                                }}
                              />
                            </div>

                            <div className="p-0 border-bottom bg-light">
                              <div className="border-top border-bottom ">
                                <h5 className="text-center mt-3 mb-2 ">
                                  Emergency Contact Details
                                </h5>
                              </div>
                              <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
                                <div className="row w-100 mt-2">
                                  <div className="mb-2 col-lg-6">
                                    {/* <label>Client Name</label> */}
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="emergencyContactName"
                                      value={
                                        personalDetailsFormData.emergencyContactName
                                      }
                                      onChange={personalDetailsChange}
                                      placeholder={
                                        validationErrors.fname
                                          ? `Name is required !!`
                                          : "Enter Name"
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
                                  <div className="mb-2 flex-column col-lg-6">
                                    <div className="input-group">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        +91
                                      </span>
                                      <input
                                        type="text"
                                        className="form-control"
                                        onChange={personalDetailsChange}
                                        value={
                                          personalDetailsFormData.emergencyContactNumber
                                        }
                                        name="emergencyContactNumber"
                                        placeholder={
                                          validationErrors.emergencyContactNumber
                                            ? `Number is required !!`
                                            : "Enter contact number"
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
                            <div className="col-12 d-flex justify-content-end p-0">
                              <button
                                onClick={personalDetailsSubmit}
                                className="btn btn-primary m-2"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/* </Container> */}
                  </Modal.Body>
                </Modal>
              </div>
              <div className="d-flex justify-content-center">
                <img
                  className="rounded-circle"
                  style={{ width: "80%" }}
                  src={image.placeholder}
                  alt=""
                />
              </div>
              <label className="userLabel mt-3 text-center">Full Name</label>
              <label className="userLabel text-center text-body-tertiary">
                +91 9834****32
              </label>
              <label className="userLabel text-center text-body-tertiary">
                Los Angeles, United States
              </label>
              <div className="card mt-5 h-100 shadow p-3">
                <div className="">
                  <label className="headLabel">Client ID</label>
                  <label className="smallLabel">1602</label>
                </div>
                <hr />
                <div className="">
                  <label className="headLabel">Email ID</label>
                  <label className="smallLabel">example@xyz.com</label>
                </div>
                <hr />
                <div className="">
                  <label className="headLabel">Gender</label>
                  <label className="smallLabel">Male</label>
                </div>
                <hr />
                <div className="">
                  <label className="headLabel">Joining Date</label>
                  <label className="smallLabel">20/10/2023</label>
                </div>
                <hr />
                <div className="">
                  <label className="headLabel">End Date</label>
                  <label className="smallLabel">20/04/2024</label>
                </div>
                <hr />
                <div className="">
                  <label className="headLabel">Membership</label>
                  <label className="smallLabel">6 Months</label>
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card shadow w-100 p-2">
              <h3>Current PTs</h3>
              {/* <Table rows={rows} columns={columns} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDetails;
