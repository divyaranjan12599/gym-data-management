import React, { useMemo, useState, useContext, useEffect } from "react";
import defaultImage from "../icons/user.png";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../../App";
import { Avatar } from "@mui/material";
// import clientData from '../inc/clientData.json'
import Table from "../inc/table";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";

function StaffDetails() {
  const { staffId } = useParams();
  const [staffData, setStaffData] = useState("");

  const {
    userAuth: { token },
    clientData,
  } = useContext(UserContext);

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
      // setpersonalDetailsFormData(response.data);
    } catch (error) {
      console.log(error);
      setStaffData("");
    }
  };

  useEffect(() => {
    fetchStaffData();
    // fetchPtData();

    // console.log("sdffsdj=====", memData, paymentData);
  }, [token]);

  const [image, selectImage] = useState({
    placeholder: defaultImage,
    files: null,
  });

  const rows = clientData;

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

  // if (!userData) {
  //   return <div>Loading...</div>;
  // }

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
                <button className="btn btn-light">
                  <FontAwesomeIcon icon={faPencil} />
                </button>
{/* 
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
                              <div className="mb-2 col-6">
                                <label>Starting Date</label>
                              
                                <ReactDatePicker
                                  selected={
                                    personalDetailsFormData.ptStartingDate
                                  }
                                  onChange={(date) =>
                                    handlePtMemUpdateChange({
                                      target: {
                                        name: "ptStartingDate",
                                        value: date,
                                        type: "date",
                                      },
                                    })
                                  }
                                  name="ptStartingDate"
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
                </Modal> */}
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
