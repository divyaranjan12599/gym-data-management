import React, { useContext, useMemo, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import defaultImage from "../icons/user.png";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import { UserContext } from "../../App";
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import Table from "../inc/table";
import { endDateGenerator } from "../inc/utilityFuncs";
import axios from "axios";
import toast from "react-hot-toast";

function UserDetails() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [show, setShow] = useState(false);
  const [personalDetailsModalShow, setPersonalDetailsModalShow] = useState(false);
  const [membershipUpdateModalShow, setMembershipUpdateModalShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlePersonalDetailsModalClose = () => setPersonalDetailsModalShow(false);
  const handlePersonalDetailsModalShow = () => setPersonalDetailsModalShow(true);
  const handleMembershipUpdateModalClose = () => setMembershipUpdateModalShow(false);
  const handleMembershipUpdateModalShow = () => setMembershipUpdateModalShow(true);

  const [image, selectImage] = useState({
    placeholder: defaultImage,
    files: null,
  });

  const handleUpdatePersonalDetails = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/update-client/" + userId);
      toast.success("Updated User")
      alert("updated user", response.data);
      // setEnquiryData(response.data);
    } catch (error) {
      toast.error(error);
      console.log(error);
      // setEnquiryData([]);
    }
  }
  const handleUpdateMembershipDetails = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/delete-client/" + userId);
      toast.success("User deleted Successfully");
      alert("deleted user", response.data);
      // setEnquiryData(response.data);
    } catch (error) {
      toast.error(error);
      console.log(error);
      // setEnquiryData([]);
    }
  }

  const handleDelete = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/delete-client/" + userId);
      toast.success("User deleted Successfully");
      alert("deleted user", response.data);
      // setEnquiryData(response.data);
    } catch (error) {
      toast.error(error);
      console.log(error);
      // setEnquiryData([]);
    }
  }

  const { membershipData, paymentData, clientData } = useContext(UserContext);
  const [clientDetails, setClientData] = useState(clientData);
  const [imageURL, setImageURL] = useState(null);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const UPLOAD_PRESENT = process.env.REACT_APP_UPLOAD_PRESENT;

  useEffect(() => {
    // console.log(typeof userId, typeof client.id);
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: CLOUD_NAME,
      uploadPreset: UPLOAD_PRESENT,
      multiple: true
    },
      (err, result) => {
        if (result.event === "success") {
          toast.success("Image Uploaded");
          console.log("Done! Here is the image info: ", result.info);
          setImageURL(result.info.secure_url);
        }
      });
    const user = clientData?.find((client) => Number(client.id) === Number(userId))
    if (user) {
      setUserData(user);
      console.log("user details", user);
    } else {
      console.error("User not found");
    }
  }, [userId, clientData, membershipData]);

  const membershipRows = useMemo(() => {
    // Filter and map the data
    const rows = (membershipData || [])
      .filter((membership) => Number(membership.membershipBy.id) === Number(userId))
      .map((membership, index) => {
        const startingDate = new Date(membership?.startingDate);
        const endDate = endDateGenerator(membership?.startingDate, membership?.membershipPeriod);
        const currentDate = new Date();
        const status = new Date(endDate) < currentDate ? "Completed" : "Running";

        return {
          id: membership?._id || index, // Use index as a fallback unique id
          package: membership?.membershipPeriod || "N/A",
          startDate: membership?.startingDate || "N/A",
          endDate: endDate || "N/A",
          status: status,
          photoURL:
            membership?.membershipBy?.photoUrl ||
            "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
        };
      });

    // Sort the data
    return rows.sort((a, b) => {
      if (a.startDate === "N/A" && b.startDate === "N/A") {
        return 0; // both are invalid
      } else if (a.startDate === "N/A") {
        return 1; // a is invalid, push it to the end
      } else if (b.startDate === "N/A") {
        return -1; // b is invalid, push it to the end
      } else {
        return new Date(b.startDate) - new Date(a.startDate); // valid dates comparison
      }
    });
  }, [membershipData, userId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setClientData({
      ...clientData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const paymentRows = useMemo(() => {
    return (paymentData || []).map((payment, index) => ({
      id: payment?.amountPaidBy?.id || index, // Use index as a fallback unique id
      amount_paid: payment?.amountPaid || "N/A",
      amount_remaining: payment?.amountRemaining || "N/A",
      mode: payment?.mode || "N/A",
      due_date: payment?.dueDate || "N/A",
    }));
  }, [paymentData]);

  const membershipColumns = useMemo(() => [
    { field: "package", headerName: "Package", width: 180 },
    { field: "startDate", headerName: "Start Date", width: 150 },
    { field: "endDate", headerName: "End Date", width: 150 },
    { field: "status", headerName: "Status", width: 140 },
  ], []);

  const paymentColumns = useMemo(
    () => [
      { field: "id", headerName: "Client ID", width: 90 },
      { field: "mode", headerName: "Mode", width: 90 },
      { field: "amount_paid", headerName: "Amount Paid", width: 140 },
      { field: "amount_remaining", headerName: "Amount Remaining", width: 140 },
      { field: "due_date", headerName: "Due Date", width: 140 },
    ],
    []
  );

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <h1 className="userHeading mt-3 d-flex justify-content-center">
        User Info
      </h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow p-2">
              <div className="d-flex justify-content-end">
                <button className="btn btn-light" onClick={handleShow}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <Modal show={personalDetailsModalShow} onHide={handlePersonalDetailsModalClose} size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered>
                  <Modal.Body className="">
                    {/* <Container> */}
                    <div className="w-100 d-flex justify-content-center">
                      <div className="row w-100">
                        <form className="d-flex flex-column justify-content-center align-items-center p-2">
                          <div class="row w-100">
                            <div className="main-box col-md-8">
                              <div className="row w-100 h-100">
                                <div className="mb-2 flex-column col-lg-6 ">
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
                                  <input
                                    type="text"
                                    onChange={handleChange}
                                    className="form-control"
                                    name="name"
                                    value={userData.name}
                                    placeholder="Enter Full Name"

                                  />
                                </div>

                                <div className="mb-2 col-lg-6">
                                  <input
                                    type="text"
                                    onChange={handleChange}
                                    name="email"
                                    value={userData.email}
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
                                      name="contact"
                                      value={userData.contact}
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
                                    onChange={handleChange} name="address1"
                                    value={userData.address}
                                    class="form-control"
                                    id="inputAddress2"
                                    placeholder="Apartment, studio, or floor"
                                  />
                                </div>
                                <div class="mb-2 col-12">
                                  <input
                                    type="text"
                                    onChange={handleChange}
                                    name="address2"
                                    value={userData.address.areaDetails}
                                    class="form-control"
                                    id="inputAddress"
                                    placeholder="Area"
                                  />
                                </div>
                                <div class="mb-2 col-md-6">
                                  <input
                                    type="text"
                                    onChange={handleChange}
                                    name="city"
                                    value={userData.address.city}
                                    class="form-control"
                                    id="inputCity"
                                    placeholder="City"
                                  />
                                </div>
                                <div class="mb-2 col-md-4">
                                  <select id="inputState" name="state" onChange={handleChange} value={userData.address.state} class="form-select">
                                    <option selected>State</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                  </select>
                                </div>
                                <div class="mb-2 col-md-2">
                                  <input
                                    type="text"
                                    onChange={handleChange}
                                    name="zip"
                                    value={userData.address.zip}
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
                                        checked={userData.gender === 'Male'}
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
                                        checked={userData.gender === 'Female'}
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
                                    value={userData.joiningdate}
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
                                <select id="idProofType" onChange={handleChange} value={userData.idProofType} name="idProofType" class="form-select custom-col-3">
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
                                  value={userData.idProofNumber}
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
                                      value={userData.emergencyContactName}
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
                                        value={userData.emergencyContactNumber}
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
                    </div>
                    {/* </Container> */}
                  </Modal.Body>
                </Modal>
                <Modal show={show} onHide={handleClose} centered className="custom-modal">
                  <Modal.Body className="">
                    <Container>
                      <Row className="">
                        <Col md={4} className="ps-0 pe-0 text-center">
                          <Button className="w-100 h-100" variant="secondary" onClick={handlePersonalDetailsModalShow}>
                            Update Profile Details
                          </Button>
                        </Col>
                        <Col md={4} className="ps-2 pe-0 text-center">
                          <Button className="w-100 h-100" variant="primary" onClick={handleMembershipUpdateModalShow}>
                            Update Membership
                          </Button>
                        </Col>
                        <Col md={4} className="ps-2 pe-0 text-center">
                          <Button className="w-100 h-100" variant="danger" onClick={handleDelete}>
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
                  src={userData.photoUrl || defaultImage}
                  alt="User"
                />
              </div>
              <label className="userLabel mt-3 text-lg-center">{userData.name}</label>
              <label className="userLabel text-lg-center text-body-tertiary">
                {userData.contact}
              </label>
              <label className="userLabel text-lg-center text-body-tertiary">
                {userData.address.city}, {userData.address.state}
              </label>
              <div className="card mt-5 h-100 shadow p-3">
                <div>
                  <label className="headLabel">Client ID</label>
                  <label className="smallLabel">{userData.id}</label>
                </div>
                <hr />
                <div>
                  <label className="headLabel">Email ID</label>
                  <label className="smallLabel">{userData.email}</label>
                </div>
                <hr />
                <div>
                  <label className="headLabel">Gender</label>
                  <label className="smallLabel">{userData.gender}</label>
                </div>
                <hr />
                <div>
                  <label className="headLabel">Joining Date</label>
                  <label className="smallLabel">{userData.joiningdate}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card shadow w-100 p-2 mb-2">
              <h3>Past Memberships</h3>
              <Table rows={membershipRows} columns={membershipColumns} />
            </div>
            <div className="card shadow w-100 p-2">
              <h3>Payment History</h3>
              <Table rows={paymentRows} columns={paymentColumns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
