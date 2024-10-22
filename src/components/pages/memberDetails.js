import React, { useContext, useMemo, useState, useEffect, useRef } from "react";
import { UserContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "../icons/user.png";
import ReactDatePicker from "react-datepicker";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Table from "../inc/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalizeEachWord } from "../inc/utilityFuncs.js";

function MemberDetails() {
  const { userId } = useParams();
  const [clientData, setClientData] = useState("");
  const [paymentData, setPaymentData] = useState([]);
  const [memData, setMemData] = useState([]);
  const [ptData, setPtData] = useState("");
  const {
    userAuth: { token },
    staffData,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState(null);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [currentStep, setCurrentStep] = useState(1);
  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const UPLOAD_PRESENT = process.env.REACT_APP_UPLOAD_PRESENT;

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESENT,
        multiple: true,
        folder: "GDMTool",
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

  useEffect(() => {
    fetchClientData();
    fetchPaymentData();
    fetchMemData();
    fetchPtData();

    // console.log("sdffsdj=====", memData, paymentData);
  }, [token]);

  const [personalDetailsFormData, setpersonalDetailsFormData] = useState({
    id: "",
    name: "",
    email: "",
    contact: "",
    address: {
      areaDetails: "",
      city: "",
      state: "",
      pincode: "",
    },
    gender: "Male", // Default value or fetched from the server
    joiningdate: "",
    idproof: {
      type: "",
      number: "",
      frontPicUrl: "",
      backPicUrl: "",
    },
    emergencyContact: {
      name: "",
      contact: "",
    },
  });
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [personalDetailsModalShow, setPersonalDetailsModalShow] =
    useState(false);
  const [membershipUpdateModalShow, setMembershipUpdateModalShow] =
    useState(false);
  const [ptmembershipUpdateModalShow, setPtMembershipUpdateModalShow] =
    useState(false);

  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target;

    // Handle nested structures
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1]; // Get the specific field within address
      setpersonalDetailsFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressField]: value,
        },
      }));
    } else if (name.startsWith("idproof.")) {
      const idProofField = name.split(".")[1]; // Get the specific field within idproof
      setpersonalDetailsFormData((prevState) => ({
        ...prevState,
        idproof: {
          ...prevState.idproof,
          [idProofField]: value,
        },
      }));
    } else if (name.startsWith("emergencyContact.")) {
      const emergencyField = name.split(".")[1]; // Get the specific field within emergencyContact
      setpersonalDetailsFormData((prevState) => ({
        ...prevState,
        emergencyContact: {
          ...prevState.emergencyContact,
          [emergencyField]: value,
        },
      }));
    } else {
      // For other fields
      setpersonalDetailsFormData((prevState) => ({
        ...prevState,
        [name]: name === "name" ? capitalizeEachWord(value) : value,
      }));
    }
  };

  const handlePersonalDetailsSubmit = async (e) => {
    e.preventDefault();
    handleUpdatePersonalDetails();
    handleStepChange(1);
  };
  // console.log("submit", paymentData);

  const fetchClientData = async () => {
    console.log("sajsakj");

    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + `/user/get-client/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Client Data : ", response.data);
      setClientData(response.data);
      setpersonalDetailsFormData(response.data);
    } catch (error) {
      console.log(error);
      setClientData("");
    }
  };
  const fetchPaymentData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + `/user/get-paymentDetails/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Payment Data : ", response.data);

      setPaymentData(response.data);
    } catch (error) {
      console.log(error);
      setPaymentData("");
    }
  };
  const fetchMemData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + `/user/get-memberships/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Mem Data : ", response.data);

      setMemData(response.data);
    } catch (error) {
      console.log(error);
      setMemData("");
    }
  };
  const fetchPtData = async () => {
    try {
      
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + `/user/get-ptDetails/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Pt Data : ", response.data);

      setPtData(response.data);
    } catch (error) {
      console.log(error);
      setPtData("");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handlePersonalDetailsModalClose = () =>
    setPersonalDetailsModalShow(false);
  const handlePersonalDetailsModalShow = () =>
    setPersonalDetailsModalShow(true);
  const handleMembershipUpdateModalClose = () =>
    setMembershipUpdateModalShow(false);
  const handleMembershipUpdateModalShow = () =>
    setMembershipUpdateModalShow(true);
  const handlePtMembershipUpdateModalClose = () =>
    setPtMembershipUpdateModalShow(false);
  const handlePtMembershipUpdateModalShow = () =>
    setPtMembershipUpdateModalShow(true);

  const [image, selectImage] = useState({
    placeholder: defaultImage,
    files: null,
  });

  const handleUpdatePersonalDetails = async () => {
    toast
      .promise(
        axios.put(
          `${process.env.REACT_APP_SERVER_URL}/user/update-client/${clientData._id}`,
          personalDetailsFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        {
          pending: "Updating User...",
          success: "User updated successfully!",
          error: {
            render({ data }) {
              return data?.response?.data?.message || "Update failed!";
            },
          },
        }
      )
      .then(() => {
        // Reload the page on success
        setTimeout(() => {
          window.location.reload();
        }, 900);
      });
  };

  const handleUpdateMembershipDetails = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/user/update-membership/${clientData._id}`,
        memUpdationformData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User Membership updated Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await axios.delete(
        process.env.REACT_APP_SERVER_URL + "/user/delete-client/" + userId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User deleted Successfully");
      setTimeout(() => {
        navigate("/memberships");
      }, 900);
    } catch (error) {
      toast.error(error);
      // console.log(error);
      // setEnquiryData([]);
    }
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const [memUpdationformData, setmemUpdationformData] = useState({
    registrationFees: 0,
    membershipAmount: "",
    membershipPeriod: "monthly",
    membershipStartingDate: new Date(),
    amountPaid: "",
    amountRemaining: "",
    paymentMode: "online",
    transactionDate: new Date(),
    transactionId: "",
    dueDate: "",
  });

  const handleMemUpdateChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...memUpdationformData,
      [name]: value,
    };

    if (name === "membershipAmount" || name === "registrationFees") {
      const totAmount =
        Number(updatedData.membershipAmount) +
        Number(updatedData.registrationFees);
      console.log("Membership Amount:", totAmount);
      updatedData.amountPaid = totAmount;
      updatedData.amountRemaining = 0;
    }

    if (name === "amountPaid") {
      const totAmount =
        Number(updatedData.membershipAmount) +
        Number(updatedData.registrationFees);
      console.log("Amount====:", totAmount);
      updatedData.amountRemaining = totAmount - value;
    }

    setmemUpdationformData(updatedData);
  };

  const membershipColumns = useMemo(
    () => [
      { field: "id", headerName: "Membership ID", flex: 1 },
      { field: "package", headerName: "Package", flex: 1 },
      { field: "startDate", headerName: "Start Date", flex: 1 },
      { field: "endDate", headerName: "End Date", flex: 1 },
      { field: "status", headerName: "Status", flex: 1 },
    ],
    [memData]
  );

  const paymentColumns = useMemo(
    () => [
      { field: "id", headerName: "Payment ID", flex: 1 },
      { field: "mode", headerName: "Mode", flex: 1 },
      { field: "amount_paid", headerName: "Amount Paid", flex: 1 },
      { field: "amount_remaining", headerName: "Amount Remaining", flex: 1 },
      { field: "due_date", headerName: "Due Date", flex: 1 },
    ],
    [paymentData]
  );

  const membershipRows = memData.map((membership, index) => {
    const currentDate = new Date();
    const status =
      new Date(membership?.endDate) < currentDate ? "Completed" : "Running";

    return {
      id: index + 1,
      package: membership?.membershipPeriod || "N/A",
      startDate: membership?.startDate || "N/A",
      endDate: membership?.endDate || "N/A",
      status: status,
    };
  });

  const paymentRows = paymentData.map((payment, index) => ({
    id: index + 1,
    amount_paid: payment?.amountPaid || "N/A",
    amount_remaining: payment?.amountRemaining || "N/A",
    mode: payment?.mode || "N/A",
    due_date: payment?.dueDate || "N/A",
  }));

  // console.log("----------", paymentRows);

  const [ptmemUpdationformData, setptmemUpdationformData] = useState({
    ptFees: "",
    ptMembershipPeriod: "monthly",
    ptAssignedTo: "",
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

    setptmemUpdationformData(updatedData);
  };

  const handleMemUpdationformSubmit = (e) => {
    e.preventDefault();
    handleUpdateMembershipDetails();
    handleStepChange(1);
    // console.log('Submitting membership updation form data:', memUpdationformData);
  };

  const handlePtMemUpdationformSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("ptmemUpdationformData", clientData._id);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/create-ptcid/${userId}`,
        ptmemUpdationformData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User Pt Membership updated Successfully");
      handleStepChange(1);
      setTimeout(() => {
        window.location.reload();
      }, 900);
    } catch (error) {
      toast.error(error.message);
      // console.log(error);
      // setEnquiryData([]);
    }
    // console.log('Submitting membership updation form data:', memUpdationformData);
  };

  return (
    <div className="container-fluid">
      <h2 className="userHeading mt-3 d-flex justify-content-center">
        Member Info
      </h2>
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
                    {/* <Container> */}
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
                                  id="ptAssignedTo"
                                  name="ptAssignedTo"
                                  onChange={handlePtMemUpdateChange}
                                  value={ptmemUpdationformData.ptAssignedTo}
                                  class="form-select"
                                >
                                  <option selected>Select Staff</option>
                                  {staffData.map((staff, index) => (
                                    <option key={index} value={staff._id}>
                                      {staff.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="mb-2 d-flex flex-column col-6">
                                <label>Starting Date</label>
                                <ReactDatePicker
                                  selected={
                                    ptmemUpdationformData.ptStartDate
                                  }
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
                                  {/* <input
                                    type="date"
                                    onChange={handlePtMemUpdateChange}
                                    name="transactionDate"
                                    value={
                                      ptmemUpdationformData.transactionDate
                                    }
                                    className="form-control"
                                  /> */}
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
                                    {/* <input
                                      type="date"
                                      onChange={handlePtMemUpdateChange}
                                      name="dueDate"
                                      value={ptmemUpdationformData.dueDate}
                                      className="form-control"
                                    /> */}
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
                    {/* </Container> */}
                  </Modal.Body>
                </Modal>

                <Modal
                  show={membershipUpdateModalShow}
                  onHide={handleMembershipUpdateModalClose}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Body className="">
                    {/* <Container> */}
                    <div className="card">
                      {currentStep === 1 && (
                        <>
                          <div className="card-header border-top border-bottom">
                            <p className="text-center mb-0">
                              Membership Details
                            </p>
                          </div>
                          <div className="w-100 d-flex justify-content-center">
                            <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
                              <div className="row p-2 w-100">
                                <div className="mb-2 col-lg-6">
                                  <label>Registration fees</label>
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
                                      name="registrationFees"
                                      onChange={handleMemUpdateChange}
                                      value={
                                        memUpdationformData.registrationFees
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="mb-2 col-lg-6">
                                  <label>Membership Amount</label>
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
                                      name="membershipAmount"
                                      onChange={handleMemUpdateChange}
                                      value={
                                        memUpdationformData.membershipAmount
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="mb-2 col-4">
                                  <label>Membership Period</label>
                                  <select
                                    id="membershipPeriod"
                                    name="membershipPeriod"
                                    onChange={handleMemUpdateChange}
                                    value={memUpdationformData.membershipPeriod}
                                    class="form-select"
                                  >
                                    <option selected>Select</option>
                                    <option value="monthly">One Month</option>
                                    <option value="twomonths">
                                      Two Months
                                    </option>
                                    <option value="quarterly">
                                      Three Months
                                    </option>
                                    <option value="halfyearly">
                                      Six Months
                                    </option>
                                    <option value="yearly">Yearly</option>
                                    {/* <option value="5">Other</option> */}
                                  </select>
                                </div>
                                <div className="mb-2 col-4">
                                  <label>Starting Date</label>
                                  <ReactDatePicker
                                    selected={
                                      memUpdationformData.membershipStartingDate
                                    }
                                    onChange={(date) =>
                                      handleMemUpdateChange({
                                        target: {
                                          name: "membershipStartingDate",
                                          value: date,
                                          type: "date",
                                        },
                                      })
                                    }
                                    name="membershipStartingDate"
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
                                      onChange={handleMemUpdateChange}
                                      name="amountPaid"
                                      value={memUpdationformData.amountPaid}
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
                                      onChange={handleMemUpdateChange}
                                      name="amountRemaining"
                                      value={
                                        memUpdationformData.amountRemaining
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="mb-2 col-lg-4">
                                  <label>Mode of Payment</label>
                                  <select
                                    id="paymentMode"
                                    name="paymentMode"
                                    onChange={handleMemUpdateChange}
                                    value={memUpdationformData.paymentMode}
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
                                  {/* <input
                                    type="date"
                                    onChange={handleMemUpdateChange}
                                    name="transactionDate"
                                    value={memUpdationformData.transactionDate}
                                    className="form-control"
                                  /> */}
                                  <ReactDatePicker
                                    selected={
                                      memUpdationformData.transactionDate
                                    }
                                    onChange={(date) =>
                                      handleMemUpdateChange({
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
                                    value={memUpdationformData.transactionId}
                                    onChange={handleMemUpdateChange}
                                    name="transactionId"
                                    placeholder="Enter transaction id"
                                  />
                                </div>
                                {parseFloat(
                                  memUpdationformData.amountRemaining
                                ) > 0 && (
                                  <div className="col-lg-4">
                                    <label>Due Date</label>
                                    <ReactDatePicker
                                      selected={memUpdationformData.dueDate}
                                      onChange={(date) =>
                                        handleMemUpdateChange({
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
                                onClick={handleMemUpdationformSubmit}
                              >
                                Save
                              </button>
                            )}
                          </Col>
                        </Row>
                      </div>
                    </div>
                    {/* </Container> */}
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
                            <div className="main-box custom-col-9">
                              <div className="row w-100 h-100">
                                <div className="mb-2 col-lg-12">
                                  <input
                                    type="text"
                                    onChange={handlePersonalDetailsChange}
                                    className="form-control"
                                    name="name" // no change needed
                                    value={personalDetailsFormData.name}
                                    placeholder="Enter Full Name"
                                  />
                                </div>

                                <div className="mb-2 col-lg-6">
                                  <input
                                    type="text"
                                    onChange={handlePersonalDetailsChange}
                                    name="email" // no change needed
                                    value={personalDetailsFormData.email}
                                    className="form-control"
                                    placeholder="Enter Email"
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
                                      type="number"
                                      onChange={handlePersonalDetailsChange}
                                      name="contact" // no change needed
                                      value={personalDetailsFormData.contact}
                                      className="form-control"
                                      placeholder="Contact Number"
                                      aria-label="Username"
                                      aria-describedby="basic-addon1"
                                    />
                                  </div>
                                </div>

                                <div className="mb-2 col-12">
                                  <input
                                    type="text"
                                    onChange={handlePersonalDetailsChange}
                                    name="address.areaDetails" // updated for nested state
                                    value={
                                      personalDetailsFormData.address
                                        .areaDetails
                                    }
                                    className="form-control"
                                    placeholder="Area"
                                  />
                                </div>

                                <div className="mb-2 col-md-6">
                                  <input
                                    type="text"
                                    onChange={handlePersonalDetailsChange}
                                    name="address.city" // updated for nested state
                                    value={personalDetailsFormData.address.city}
                                    className="form-control"
                                    placeholder="City"
                                  />
                                </div>

                                <div className="mb-2 col-md-4">
                                  <select
                                    id="inputState"
                                    name="address.state" // updated for nested state
                                    onChange={handlePersonalDetailsChange}
                                    value={
                                      personalDetailsFormData.address.state
                                    }
                                    className="form-select"
                                  >
                                    <option selected>Select State</option>
                                    <option value="Madhya Pradesh">
                                      Madhya Pradesh
                                    </option>
                                    <option value="Uttar Pradesh">
                                      Uttar Pradesh
                                    </option>
                                    <option value="Maharashtra">
                                      Maharashtra
                                    </option>
                                  </select>
                                </div>

                                <div className="mb-2 col-md-2">
                                  <input
                                    type="text"
                                    onChange={handlePersonalDetailsChange}
                                    name="address.pincode" // updated for nested state
                                    value={
                                      personalDetailsFormData.address.pincode
                                    }
                                    className="form-control"
                                    placeholder="Pincode"
                                  />
                                </div>

                                <div className="col-6">
                                  <label>Gender</label>
                                  <div className="col-md-12 d-flex flex-row">
                                    <div className="form-check col-6">
                                      <input
                                        className="form-check-input me-2"
                                        type="radio"
                                        name="gender" // no change needed
                                        value="Male"
                                        checked={
                                          personalDetailsFormData.gender ===
                                          "Male"
                                        }
                                        onChange={handlePersonalDetailsChange}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="gridRadios1"
                                      >
                                        Male
                                      </label>
                                    </div>
                                    <div className="form-check col-6">
                                      <input
                                        className="form-check-input me-2"
                                        type="radio"
                                        name="gender" // no change needed
                                        value="Female"
                                        checked={
                                          personalDetailsFormData.gender ===
                                          "Female"
                                        }
                                        onChange={handlePersonalDetailsChange}
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

                                <div className="col-6">
                                  <label>Joining Date</label>
                                  <ReactDatePicker
                                    selected={
                                      personalDetailsFormData.joiningdate
                                    }
                                    onChange={(date) =>
                                      handlePersonalDetailsChange({
                                        target: {
                                          name: "joiningdate", // no change needed
                                          value: date,
                                        },
                                      })
                                    }
                                    name="joiningdate" // no change needed
                                    dateFormat="MMMM d, yyyy"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="pic-box custom-col-3">
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
                                    <img
                                      className="p-1 w-100 h-100"
                                      src={image.placeholder}
                                      alt=""
                                    />
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="col-12">
                              <label>ID Proof Details</label>
                              <div className="mb-2 input-group d-flex flex-row">
                                <select
                                  id="idProofType"
                                  onChange={handlePersonalDetailsChange}
                                  name="idproof.type" // updated for nested state
                                  value={personalDetailsFormData.idproof.type}
                                  className="form-select custom-col-3"
                                >
                                  <option selected>Select</option>
                                  <option value="adhar">Adhar Card</option>
                                  <option value="pan">PAN Card</option>
                                  <option value="license">License</option>
                                </select>

                                <input
                                  className="form-control custom-col-9"
                                  type="text"
                                  onChange={handlePersonalDetailsChange}
                                  value={personalDetailsFormData.idproof.number}
                                  name="idproof.number" // updated for nested state
                                  id="idProof"
                                  placeholder="ID proof number"
                                />
                              </div>
                            </div>

                            <div className="card p-0 text-left">
                              <div className="card-header border-top border-bottom">
                                <p className="text-center mb-0">
                                  Emergency Contact Details
                                </p>
                              </div>
                              <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
                                <div className="row w-100 mt-2">
                                  <div className="mb-2 col-lg-6">
                                    <input
                                      type="text"
                                      onChange={handlePersonalDetailsChange}
                                      name="emergencyContact.name" // updated for nested state
                                      value={
                                        personalDetailsFormData.emergencyContact
                                          .name
                                      }
                                      className="form-control"
                                      placeholder="Emergency Contact Name"
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
                                        type="number"
                                        className="form-control"
                                        name="emergencyContact.contact" // updated for nested state
                                        onChange={handlePersonalDetailsChange}
                                        value={
                                          personalDetailsFormData
                                            .emergencyContact.contact
                                        }
                                        placeholder="Emergency Contact Number"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>

                            <div className="d-flex justify-content-end mt-3">
                              <button
                                className="btn btn-primary"
                                onClick={handlePersonalDetailsSubmit}
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/* </Container> */}
                  </Modal.Body>
                </Modal>

                <Modal
                  show={show2}
                  onHide={handleClose2}
                  centered
                  className="custom-modal"
                >
                  <Modal.Body className="">
                    <Container>
                      <Row className="">
                        <Col md={6} className="ps-0 pe-0 text-center">
                          <Button
                            className="w-100 h-100"
                            variant="secondary"
                            onClick={() => {
                              handleMembershipUpdateModalShow();
                              handleClose2();
                            }}
                          >
                            Renewal
                          </Button>
                        </Col>
                        <Col md={6} className="ps-2 pe-0 text-center">
                          <Button
                            className="w-100 h-100"
                            variant="primary"
                            onClick={() => {
                              handlePtMembershipUpdateModalShow();
                              handleClose2();
                            }}
                          >
                            Personal Training
                          </Button>
                        </Col>
                      </Row>
                    </Container>
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
                              handleShow2();
                              handleClose();
                            }}
                          >
                            Update Membership
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
              </div>
              <div className="d-flex justify-content-center">
                <img
                  className="rounded-circle"
                  style={{ width: "80%" }}
                  src={clientData?.photoUrl || defaultImage}
                  alt="User"
                />
              </div>
              <label className="userLabel mt-3 text-lg-center">
                {clientData?.name}
              </label>
              {/* <label className="userLabel text-lg-center text-body-tertiary">
								{clientData?.contact}
							</label> */}
              <label className="userLabel text-lg-center text-body-tertiary">
                {clientData?.address?.areaDetails},
              </label>
              <label className="userLabel text-lg-center text-body-tertiary">
                {clientData?.address?.city}, {clientData?.address?.state}
              </label>
              <label className="userLabel text-lg-center text-body-tertiary">
                {clientData?.address?.pincode}
              </label>
              <div className="card mt-5 h-100 shadow p-3">
                <div>
                  <label className="headLabel">Email ID</label>
                  <label className="smallLabel">{clientData?.email}</label>
                </div>
                <hr />
                <div>
                  <label className="headLabel">Contact</label>
                  <label className="smallLabel">{clientData?.contact}</label>
                </div>
                <hr />
                <div>
                  <label className="headLabel">Gender</label>
                  <label className="smallLabel">{clientData?.gender}</label>
                </div>
                <hr />
                <div>
                  <label className="headLabel">Joining Date</label>
                  <label className="smallLabel">
                    {clientData?.joiningdate}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card shadow w-100 p-2 mb-2">
              <h3 className="mx-4 mt-2">Past Memberships</h3>
              {memData ? (
                <Table rows={membershipRows} columns={membershipColumns} />
              ) : (
                "No data to show"
              )}
            </div>
            <div className="card shadow w-100 p-2">
              <h3 className="mx-4 mt-2">Payment History</h3>
              {paymentData ? (
                <Table rows={paymentRows} columns={paymentColumns} />
              ) : (
                "No data to show"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDetails;
