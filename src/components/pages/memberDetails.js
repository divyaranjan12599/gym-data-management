import React, { useContext, useMemo, useState, useEffect, useRef } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Modal, Row, Table } from "react-bootstrap";

function MemberDetails() {
	const [clientData, setClientData] = useState("");
	const [paymentData, setPaymentData] = useState("");
	const [memData, setMemData] = useState("");
	const [ptData, setPtData] = useState("");
	const {
		userAuth: { token },
	} = useContext(UserContext);




	const fetchClientData = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/user/get-client/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
      console.log("Client Data : ", response.data);
			setClientData(response.data);
		} catch (error) {
			console.log(error);
			setClientData("");
		}
	};
	const fetchPaymentData = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/user/get-paymentDetails/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
      console.log("Payment Data : ", response.data);

			setPaymentData(response.data);
		} catch (error) {
			console.log(error);
			setPaymentData("");
		}
	};
	const fetchMemData = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/user/get-memberships/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
      console.log("Mem Data : ", response.data);

			setMemData(response.data);
		} catch (error) {
			console.log(error);
			setMemData("");
		}
	};
	const fetchPtData = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/user/get-ptDetails/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
      console.log("Pt Data : ", response.data);

			setPtData(response.data);
		} catch (error) {
			console.log(error);
			setPtData("");
		}
	};

	const { userId } = useParams();

	useEffect(() => {
    fetchClientData();
    fetchPaymentData();
    fetchMemData();
    fetchPtData()
  }, [token]);

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
	
	                <Modal show={ptmembershipUpdateModalShow} onHide={handlePtMembershipUpdateModalClose} size="lg"
	                  aria-labelledby="contained-modal-title-vcenter"
	                  centered>
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
	                                  <span class="input-group-text" id="basic-addon1">
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
	                                <select id="ptMembershipPeriod" onChange={handlePtMemUpdateChange} name="ptMembershipPeriod" value={ptmemUpdationformData.ptMembershipPeriod} class="form-select">
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
	                                <select id="ptAssignedTo" name="ptAssignedTo" onChange={handlePtMemUpdateChange} value={ptmemUpdationformData.ptAssignedTo} class="form-select">
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
	                                  onChange={handlePtMemUpdateChange}
	                                  name="ptStartingDate"
	                                  value={ptmemUpdationformData.ptStartingDate}
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
	                                    <span class="input-group-text" id="basic-addon1">
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
	                                    <span class="input-group-text" id="basic-addon1">
	                                      INR
	                                    </span>
	                                    <input
	                                      type="number"
	                                      className="form-control"
	                                      placeholder="00.00"
	                                      onChange={handlePtMemUpdateChange}
	                                      name="amountRemaining"
	                                      value={ptmemUpdationformData.amountRemaining}
	                                    />
	                                  </div>
	                                </div>
	                                <div className="mb-2 col-lg-4">
	                                  <label>Mode of Payment</label>
	                                  <select id="paymentMode" name="paymentMode" onChange={handlePtMemUpdateChange} value={ptmemUpdationformData.paymentMode} class="form-select">
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
	                                    onChange={handlePtMemUpdateChange}
	                                    name="transactionDate"
	                                    value={ptmemUpdationformData.transactionDate}
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
	                                {(parseFloat(ptmemUpdationformData.amountRemaining) > 0) &&
	                                  <div className="col-lg-4">
	                                    <label>Due Date</label>
	                                    <input
	                                      type="date"
	                                      onChange={handlePtMemUpdateChange}
	                                      name="dueDate"
	                                      value={ptmemUpdationformData.dueDate}
	                                      className="form-control"
	                                    />
	                                  </div>
	                                }
	                              </div>
	                            </form>
	                          </div>
	                        </>
	                      )}
	                      <div className="w-100 h-100 py-2">
	                        <Row>
	                          <Col md={6} className="d-flex justify-content-center">
	                            {currentStep > 1 && (
	                              <button type="button" className="btn btn-secondary w-100 me-4 ms-4" onClick={() => handleStepChange(1)}>Back</button>
	                            )}
	                          </Col>
	                          <Col md={6} className="d-flex justify-content-center">
	                            {currentStep < 2 ? (
	                              <button type="button" className="btn btn-primary w-100 me-4" onClick={() => handleStepChange(2)}>Next</button>
	                            ) : (
	                              <button type="submit" className="btn btn-primary w-100 me-4" onClick={handlePtMemUpdationformSubmit}>Save</button>
	                            )}
	                          </Col>
	                        </Row>
	                      </div>
	                    </div>
	                    {/* </Container> */}
	                  </Modal.Body>
	                </Modal>
	
	                <Modal show={membershipUpdateModalShow} onHide={handleMembershipUpdateModalClose} size="lg"
	                  aria-labelledby="contained-modal-title-vcenter"
	                  centered>
	                  <Modal.Body className="">
	                    {/* <Container> */}
	                    <div className="card">
	                      {currentStep === 1 && (
	                        <>
	                          <div className="card-header border-top border-bottom">
	                            <p className="text-center mb-0">Membership Details</p>
	                          </div>
	                          <div className="w-100 d-flex justify-content-center">
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
	                                      onChange={handleMemUpdateChange}
	                                      value={memUpdationformData.registrationFees}
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
	                                      onChange={handleMemUpdateChange}
	                                      value={memUpdationformData.membershipAmount}
	                                    />
	                                  </div>
	                                </div>
	                                <div className="mb-2 col-4">
	                                  <label>Membership Period</label>
	                                  <select id="membershipPeriod" name="membershipPeriod" onChange={handleMemUpdateChange} value={memUpdationformData.membershipPeriod} class="form-select">
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
	                                    onChange={handleMemUpdateChange}
	                                    name="membershipStartingDate"
	                                    value={memUpdationformData.membershipStartingDate}
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
	                                    <span class="input-group-text" id="basic-addon1">
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
	                                    <span class="input-group-text" id="basic-addon1">
	                                      INR
	                                    </span>
	                                    <input
	                                      type="number"
	                                      className="form-control"
	                                      placeholder="00.00"
	                                      onChange={handleMemUpdateChange}
	                                      name="amountRemaining"
	                                      value={memUpdationformData.amountRemaining}
	                                    />
	                                  </div>
	                                </div>
	                                <div className="mb-2 col-lg-4">
	                                  <label>Mode of Payment</label>
	                                  <select id="paymentMode" name="paymentMode" onChange={handleMemUpdateChange} value={memUpdationformData.paymentMode} class="form-select">
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
	                                    onChange={handleMemUpdateChange}
	                                    name="transactionDate"
	                                    value={memUpdationformData.transactionDate}
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
	                                {(parseFloat(memUpdationformData.amountRemaining) > 0) &&
	                                  <div className="col-lg-4">
	                                    <label>Due Date</label>
	                                    <input
	                                      type="date"
	                                      onChange={handleMemUpdateChange}
	                                      name="dueDate"
	                                      value={memUpdationformData.dueDate}
	                                      className="form-control"
	                                    />
	                                  </div>
	                                }
	                              </div>
	                            </form>
	                          </div>
	                        </>
	                      )}
	                      <div className="w-100 h-100 py-2">
	                        <Row>
	                          <Col md={6} className="d-flex justify-content-center">
	                            {currentStep > 1 && (
	                              <button type="button" className="btn btn-secondary w-100 me-4 ms-4" onClick={() => handleStepChange(1)}>Back</button>
	                            )}
	                          </Col>
	                          <Col md={6} className="d-flex justify-content-center">
	                            {currentStep < 2 ? (
	                              <button type="button" className="btn btn-primary w-100 me-4" onClick={() => handleStepChange(2)}>Next</button>
	                            ) : (
	                              <button type="submit" className="btn btn-primary w-100 me-4" onClick={handleMemUpdationformSubmit}>Save</button>
	                            )}
	                          </Col>
	                        </Row>
	                      </div>
	                    </div>
	                    {/* </Container> */}
	                  </Modal.Body>
	                </Modal>
	
	                <Modal show={personalDetailsModalShow} onHide={handlePersonalDetailsModalClose} size="lg"
	                  aria-labelledby="contained-modal-title-vcenter"
	                  centered>
	                  <Modal.Body className="">
	                    {/* <Container> */}
	                    <div className="w-100 d-flex justify-content-center">
	                      <div className="row w-100">
	                        <form className="d-flex flex-column justify-content-center align-items-center p-2">
	                          <div class="row w-100">
	                            <div className="main-box custom-col-9">
	                              <div className="row w-100 h-100">
	                                <div className="mb-2 flex-column col-lg-6 ">
	                                  <input
	                                    type="text"
	                                    onChange={handlePersonalDetailsChange}
	                                    className="form-control"
	                                    value={personalDetailsFormData.id}
	                                    placeholder="Enter Client ID"
	                                    disabled
	                                  />
	                                  {/* <span className="text-muted">*previous client id: 1601</span> */}
	                                </div>
	
	                                <div className="mb-2 col-lg-6">
	                                  <input
	                                    type="text"
	                                    onChange={handlePersonalDetailsChange}
	                                    className="form-control"
	                                    name="name"
	                                    value={personalDetailsFormData.name}
	                                    placeholder="Enter Full Name"
	
	                                  />
	                                </div>
	
	                                <div className="mb-2 col-lg-6">
	                                  <input
	                                    type="text"
	                                    onChange={handlePersonalDetailsChange}
	                                    name="email"
	                                    value={personalDetailsFormData.email}
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
	                                      onChange={handlePersonalDetailsChange}
	                                      name="contact"
	                                      value={personalDetailsFormData.contact}
	                                      class="form-control"
	                                      placeholder="Contact Number"
	                                      aria-label="Username"
	                                      aria-describedby="basic-addon1"
	                                    />
	                                  </div>
	                                </div>
	
	                                <div class="mb-2 col-12">
	                                  <input
	                                    type="text"
	                                    onChange={handlePersonalDetailsChange}
	                                    name="address2"
	                                    value={personalDetailsFormData.address.areaDetails}
	                                    class="form-control"
	                                    id="inputAddress"
	                                    placeholder="Area"
	                                  />
	                                </div>
	                                <div class="mb-2 col-md-6">
	                                  <input
	                                    type="text"
	                                    onChange={handlePersonalDetailsChange}
	                                    name="city"
	                                    value={personalDetailsFormData.address.city}
	                                    class="form-control"
	                                    id="inputCity"
	                                    placeholder="City"
	                                  />
	                                </div>
	                                <div class="mb-2 col-md-4">
	                                  <select id="inputState" name="state" onChange={handlePersonalDetailsChange} value={personalDetailsFormData.address.state} class="form-select">
	                                    <option selected>State</option>
	                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
	                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
	                                    <option value="Maharashtra">Maharashtra</option>
	                                  </select>
	                                </div>
	                                <div class="mb-2 col-md-2">
	                                  <input
	                                    type="text"
	                                    onChange={handlePersonalDetailsChange}
	                                    name="zip"
	                                    value={personalDetailsFormData.address.pincode}
	                                    class="form-control"
	                                    id="inputZip"
	                                    placeholder="Pincode"
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
	                                        checked={personalDetailsFormData.gender === 'male'}
	                                        onChange={handlePersonalDetailsChange}
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
	                                        checked={personalDetailsFormData.gender === 'female'}
	                                        onChange={handlePersonalDetailsChange}
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
	                                    onChange={handlePersonalDetailsChange}
	                                    name="joiningDate"
	                                    value={personalDetailsFormData.joiningdate}
	                                    className="form-control"
	                                    placeholder="Enter Address"
	                                  />
	                                </div>
	                              </div>
	                            </div>
	
	                            <div className="pic-box custom-col-3">
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
	                                <select id="idProofType" onChange={handlePersonalDetailsChange} value={personalDetailsFormData.idproof.type} name="idProofType" class="form-select custom-col-3">
	                                  <option selected>Select</option>
	                                  <option value="adhar">Adhar Card</option>
	                                  <option value="pan">PAN Card</option>
	                                  <option value="license">License</option>
	                                  {/* <option value="4">Other</option> */}
	                                </select>
	
	                                <input
	                                  className="form-control custom-col-9"
	                                  type="text"
	                                  onChange={handlePersonalDetailsChange}
	                                  value={personalDetailsFormData.idproof.number}
	                                  name="idProofNumber"
	                                  id="idProof"
	                                  placeholder="id proof number"
	                                />
	                              </div>
	                            </div>
	
	                            <div className="mb-2 col-6 d-flex flex-row align-content-center">
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
	                                      onChange={handlePersonalDetailsChange}
	                                      name="emergencyContactName"
	                                      value={personalDetailsFormData.emergencyContact.name}
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
	                                        onChange={handlePersonalDetailsChange}
	                                        value={personalDetailsFormData.emergencyContact.contact}
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
	                            <div className="d-flex justify-content-end mt-3">
	                              <button className="btn btn-primary" onClick={handlePersonalDetailsSubmit}>Save Changes</button>
	                            </div>
	                          </div>
	                        </form>
	                      </div>
	                    </div>
	                    {/* </Container> */}
	                  </Modal.Body>
	                </Modal>
	
	                <Modal show={show2} onHide={handleClose2} centered className="custom-modal">
	                  <Modal.Body className="">
	                    <Container>
	                      <Row className="">
	                        <Col md={6} className="ps-0 pe-0 text-center">
	                          <Button className="w-100 h-100" variant="secondary" onClick={() => {
	                            handleMembershipUpdateModalShow();
	                            handleClose2();
	                          }}>
	                            Renewal
	                          </Button>
	                        </Col>
	                        <Col md={6} className="ps-2 pe-0 text-center">
	                          <Button className="w-100 h-100" variant="primary" onClick={() => {
	                            handlePtMembershipUpdateModalShow();
	                            handleClose2();
	                          }}>
	                            Personal Training
	                          </Button>
	                        </Col>
	                      </Row>
	                    </Container>
	                  </Modal.Body>
	                </Modal>
	
	                <Modal show={show} onHide={handleClose} centered className="custom-modal">
	                  <Modal.Body className="">
	                    <Container>
	                      <Row className="">
	                        <Col md={4} className="ps-0 pe-0 text-center">
	                          <Button className="w-100 h-100" variant="secondary" onClick={() => {
	                            handlePersonalDetailsModalShow();
	                            handleClose();
	                          }}>
	                            Update Profile Details
	                          </Button>
	                        </Col>
	                        <Col md={4} className="ps-2 pe-0 text-center">
	                          <Button className="w-100 h-100" variant="primary" onClick={() => {
	                            handleShow2();
	                            handleClose();
	                          }}>
	                            Update Membership
	                          </Button>
	                        </Col>
	                        <Col md={4} className="ps-2 pe-0 text-center">
	                          <Button className="w-100 h-100" variant="danger" onClick={() => {
	                            handleDelete();
	                            handleClose();
	                          }}>
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
	              <label className="userLabel mt-3 text-lg-center">{clientData?.name}</label>
	              <label className="userLabel text-lg-center text-body-tertiary">
	                {clientData?.contact}
	              </label>
	              <label className="userLabel text-lg-center text-body-tertiary">
	                {clientData?.address.areaDetails}
	              </label>
	              <label className="userLabel text-lg-center text-body-tertiary">
	                {clientData?.address.city}, {clientData?.address.state}
	              </label>
	              <label className="userLabel text-lg-center text-body-tertiary">
	                {clientData?.address.pincode}
	              </label>
	              <div className="card mt-5 h-100 shadow p-3">
	                <div>
	                  <label className="headLabel">Email ID</label>
	                  <label className="smallLabel">{clientData?.email}</label>
	                </div>
	                <hr />
	                <div>
	                  <label className="headLabel">Gender</label>
	                  <label className="smallLabel">{clientData?.gender}</label>
	                </div>
	                <hr />
	                <div>
	                  <label className="headLabel">Joining Date</label>
	                  <label className="smallLabel">{clientData?.joiningdate}</label>
	                </div>
	              </div>
	            </div>
	          </div>
	          <div className="col-md-9">
	            <div className="card shadow w-100 p-2 mb-2">
	              <h3 className="mx-4 mt-2">Past Memberships</h3>
	              <Table rows={membershipRows} columns={membershipColumns} />
	            </div>
	            <div className="card shadow w-100 p-2">
	              <h3 className="mx-4 mt-2">Payment History</h3>
	              <Table rows={paymentRows} columns={paymentColumns} />
	            </div>
	          </div>
	        </div >
	      </div >
	    </div >
	  );
	}	

export default MemberDetails;
