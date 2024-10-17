import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUser } from "@fortawesome/free-regular-svg-icons";
import Nav from "react-bootstrap/Nav";
import { logOutUser } from "../pages/session";
import { Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../../App";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
  const { userAuth, staffData, staffUser } = useContext(UserContext);

  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [loggedInUser, setloggedInUser] = useState(userAuth.user);
  const location = useLocation();
  const [changePassShow, setChangePassShow] = useState(false);
  const [passMatched, setPassMatched] = useState(false);
  const [changePassData, setChangePass] = useState({
    prevPass: "",
    newPass: "",
    newPass2: "",
  });
  const [staffUserId, setStaffUserId] = useState("");
  const [defaultPassword, setDefaultPassword] = useState("");

  const isAdmin = userAuth.user.role === "ADMIN";
  const [addusershow, setaddusershow] = useState(false);
  const handleAddUserModalClose = () => setaddusershow(false);
  const handleAddUserModalShow = () => setaddusershow(true);

  const handlePassChangeModalClose = () => setChangePassShow(false);
  const handlePassChangeModalShow = () => setChangePassShow(true);

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure?");
    if (!isConfirmed) {
      return;
    }
    logOutUser("user");
    window.location.reload();
  };

  const handleChangePassChange = (e) => {
    const { name, value, type, files } = e.target;
    setChangePass({
      ...changePassData,
      [name]: value,
    });
  };

  const handlePassMatch = (e) => {
    const { name, value, type, files } = e.target;
    if (value != changePassData.newPass) {
      toast.error("pass not matched");
    }
    setChangePass({
      ...changePassData,
      newPass2: value,
    });
  };

  const handlePassChangeModalSubmit = async (e) => {
    e.preventDefault();
    if (changePassData.prevPass === changePassData.newPass) {
      toast.error("Your New password is same as old Password. Keep the new password different");
      return;
    }
    if (changePassData.newPass !== changePassData.newPass2) {
      toast.error("Re-Enter New Password correctly..");
      return;
    } else {
      try {
        const response = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/user/change-password",
          { oldPassword: changePassData.prevPass, newPassword: changePassData.newPass },
          {
            headers: {
              Authorization: `Bearer ${userAuth.token}`,
            },
          }
        );
        toast.success("Password Updated Successfully");
        setChangePass({
          prevPass: "",
          newPass: "",
          newPass2: "",
        });
        handlePassChangeModalClose();
        // console.log('Enquiry created successfully:', response.data);
      } catch (error) {
        toast.error(error.response.data.message);
        console.error("Error Updating Password: ", error);
      }
    }
  };

  const handleAddUserformSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Adding user");
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + `/user/add-user/${staffUserId}`,
        {
          password: defaultPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userAuth?.token}`,
          },
        }
      );
      toast.dismiss();
      toast.success("User added successfully!!");
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(error.response.data.message);
    }
    setStaffUserId("");
    setDefaultPassword("");
  };

  const handleDeleteClick = async (staffId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");

    if (!isConfirmed) {
      return;
    }
    toast.loading("Deleting user");
    try {
      const response = await axios.delete(process.env.REACT_APP_SERVER_URL + `/user/delete-user/${staffId}`, {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      });
      toast.dismiss();
      toast.success("User deleted successfully!!");
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(error.response.data.message);
    }
    window.location.reload();
  };

  const handleDropdownToggle = (isOpen, num) => {
    if (num === 1) setIsDropdownOpen1(isOpen);
    if (num === 2) setIsDropdownOpen2(isOpen);
  };
  return (
    <>
      <Nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <Modal show={addusershow} onHide={handleAddUserModalClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Body className="">
            <div className="card-header border-top border-bottom">
              <h4 className="text-center mb-0">Select from staffs</h4>
            </div>
            <form className="d-flex flex-column justify-content-around align-items-center mb-2 w-100">
              <div className="row w-100 mt-2">
                <div className="mb-2 col-lg-9">
                  <select id="ptAssignedTo" name="ptAssignedTo" class="form-select" value={staffUserId} onChange={(e) => setStaffUserId(e.target.value)}>
                    <option value="" disabled selected>
                      Select Staff
                    </option>
                    {staffData.map((staff, index) => (
                      <option key={index} value={staff._id}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2 col-lg-6">
                  <input type="password" id="password" name="password" className="form-control" placeholder="Enter password" value={defaultPassword} onChange={(e) => setDefaultPassword(e.target.value)} />
                </div>
                <div className="col-lg-3">
                  <button type="submit" className="btn btn-primary w-100 me-4" onClick={handleAddUserformSubmit}>
                    Add
                  </button>
                </div>
              </div>
            </form>

            <div className="card p-2">
              <table className="table">
                <thead>
                  <tr>
                    <th width="8%" scope="col">
                      #
                    </th>
                    <th width="28%" scope="col">
                      Name
                    </th>
                    <th width="33%" scope="col">
                      Email
                    </th>
                    <th width="24%" scope="col">
                      Contact
                    </th>
                    <th width="7%" scope="col">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {staffUser ? staffUser?.staff?.map((staff, index) => (
                    <tr key={staff._id}>
                      <th scope="row" style={{ verticalAlign: 'middle' }}>{index + 1}</th>
                      <td style={{ verticalAlign: 'middle' }}>{staff?.name}</td>
                      <td style={{ verticalAlign: 'middle' }}>{staff?.email}</td>
                      <td style={{ verticalAlign: 'middle' }}>{staff?.contact}</td>
                      <td style={{ verticalAlign: 'middle' }}>
                        <button className="btn btn-danger w-100" onClick={() => handleDeleteClick(staff._id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  )) : "No user selected"}
                  {/* <tr>
                    <th scope="row">1</th>
                    <td>{staffUser?.staff?.name}</td>
                    <td>{staffUser?.staff?.contact}</td>
                    <td>{staffUser?.staff?.email}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDeleteClick(staffUser.staff._id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </Modal.Body>
        </Modal>
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            LOGO
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/dashboard" className={`nav-link m-2 ${location.pathname === "/dashboard" || location.pathname === "/" ? "active" : ""}`}>
                  {/* <FontAwesomeIcon icon={faDisplay} />  */}
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/memberships" className={`nav-link m-2 ${location.pathname === "/memberships" ? "active" : ""}`}>
                  {/* <FontAwesomeIcon icon={faAddressCard} />  */}
                  Memberships
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/invoices" className={`nav-link m-2 ${location.pathname === "/invoices" ? "active" : ""}`}>
                  {/* <FontAwesomeIcon icon={faFileInvoiceDollar} />  */}
                  Invoices
                </Link>
              </li>
              <li className="nav-item dropdown" onMouseEnter={() => handleDropdownToggle(true, 1)} onMouseLeave={() => handleDropdownToggle(false, 1)}>
                <a className={`nav-link m-2 ${location.pathname === "/add_member" || location.pathname === "/add_staff" || location.pathname === "/add_enquiry" ? "active" : ""}`} role="button" aria-expanded="false">
                  {/* <FontAwesomeIcon icon={faSquarePlus} />  */}
                  Add{" "}
                </a>
                <ul className={`dropdown-menu p-2 ${isDropdownOpen1 ? "show" : ""}`}>
                  <li>
                    <Link className={`dropdown-item ${location.pathname === "/add_member" ? "active-dropdown" : ""}`} to="/add_member">
                      Add Members
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item ${location.pathname === "/add_staff" ? "active-dropdown" : ""}`} to="/add_staff">
                      Add Staff Member
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item ${location.pathname === "/add_enquiry" ? "active-dropdown" : ""}`} to="/add_enquiry">
                      Add Enquiry
                    </Link>
                  </li>
                  {userAuth.user.role === "ADMIN" && (
                    // <li>
                    // 	<Link className={`dropdown-item admin-tab ${location.pathname === "/add-expenses" ? "active-dropdown" : ""}`} to="/add-expenses">
                    // 		Add Expenses
                    // 	</Link>
                    // </li>
                    <li>
                      <Link className={`dropdown-item admin-tab`} onClick={handleAddUserModalShow}>
                        Add User
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
              <li className="nav-item dropstart" onMouseEnter={() => handleDropdownToggle(true, 2)} onMouseLeave={() => handleDropdownToggle(false, 2)}>
                <a className={`nav-link m-2 ${location.pathname === "/staff" || location.pathname === "/ptMembers" || location.pathname === "/expenses" || location.pathname === "/revenue" ||  location.pathname === "/recentMemberships" || location.pathname === "/staffAttendance" || location.pathname === "/enquiries" ? "active" : ""}`} role="button" aria-expanded="false">
                  More{" "}
                </a>
                <ul className={`dropdown-menu dropdown-menu-lg-end ${isDropdownOpen2 ? "show" : ""} p-2`}>
                  <li>
                    <Link className={`dropdown-item ${location.pathname === "/staff" ? "active-dropdown" : ""}`} to="/staff">
                      Staff
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item ${location.pathname === "/ptMembers" ? "active-dropdown" : ""}`} to="/ptMembers">
                      PT Members
                    </Link>
                  </li>
                  {userAuth.user.role === "ADMIN" && (
                    <>
                      <li>
                        <Link className={`dropdown-item ${location.pathname === "/expenses" ? "active-dropdown" : "admin-tab"}`} to="/expenses">
                          Expenses
                        </Link>
                      </li>
                      <li>
                        <Link className={`dropdown-item ${location.pathname === "/revenue" ? "active-dropdown" : "admin-tab "}`} to="/revenue">
                          Revenue
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
            <div className="d-flex">
              <div class="btn-group">
                <button class="nav-link py-2 px-0 px-lg-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon icon={faUser} />
                  {userAuth.user.role === "ADMIN" ? " ADMIN" : loggedInUser.name}
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                  <li>
                    <a class="dropdown-item" onClick={handlePassChangeModalShow}>
                      Change Password
                    </a>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/userprofile">
                      Update Profile
                    </Link>
                  </li>
                  <li>
                    <button type="button" class="btn btn-outline-danger w-100" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Nav>
      <Modal show={changePassShow} onHide={handlePassChangeModalClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className="">
          {/* <Container> */}
          <div className="w-100 d-flex justify-content-center">
            <h4>Change Password</h4>
            <div className="row w-100">
              <form className="p-2">
                <label for="prevPass" class="form-label">
                  Previous Password
                </label>
                <input type="password" id="prevPass" name="prevPass" class="form-control mb-2" onChange={handleChangePassChange} value={changePassData.prevPass} aria-describedby="passwordHelpBlock" />
                <label for="newPass" class="form-label">
                  New Password
                </label>
                <input type="password" id="newPass" name="newPass" class="form-control mb-2" onChange={handleChangePassChange} value={changePassData.newPass} aria-describedby="passwordHelpBlock" />
                <label for="newPass2" class="form-label">
                  Re-Enter New Password
                </label>
                <input type="password" id="newPass2" name="newPass2" class="form-control" onChange={handlePassMatch} value={changePassData.newPass2} aria-describedby="passwordHelpBlock" />
                <div className="col-12 d-flex justify-content-end p-0">
                  <button onClick={handlePassChangeModalSubmit} className="btn btn-primary m-2">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* </Container> */}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Navbar;
