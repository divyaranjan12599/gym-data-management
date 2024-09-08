import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import Nav from 'react-bootstrap/Nav';
import { logOutUser } from "../pages/session";
import { Modal } from "react-bootstrap";
import { toast } from "react-hot-toast"
import axios from "axios"
import { UserContext } from "../../App";

function Navbar(props) {

  const { userAuth: { token } } = useContext(UserContext)

  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const [changePassShow, setChangePassShow] = useState(false);
  const [passMatched, setPassMatched] = useState(false);
  const [changePassData, setChangePass] = useState({
    prevPass: '',
    newPass: '',
    newPass2: '',
  });

  const handlePassChangeModalClose = () => setChangePassShow(false);
  const handlePassChangeModalShow = () => setChangePassShow(true);

  const handleLogout = () => {
    logOutUser("user");
    window.location.reload();
  }

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
      console.error("pass not matched");
    }
    setChangePass({
      ...changePassData,
      newPass2: value
    })
  }

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
        const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/user/change-password", { oldPassword: changePassData.prevPass, newPassword: changePassData.newPass }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success("Password Updated Successfully");
        setChangePass({
          prevPass: '',
          newPass: '',
          newPass2: '',
        })
        handlePassChangeModalClose();
        // console.log('Enquiry created successfully:', response.data);
      } catch (error) {
        toast.error(error.response.data.message);
        console.error('Error Updating Password: ', error);
      }
    }

  }

  const handleDropdownToggle = (isOpen, num) => {
    if (num === 1) setIsDropdownOpen1(isOpen);
    if (num === 2) setIsDropdownOpen2(isOpen);
  };
  return (
    <>
      <Nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">LOGO</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/dashboard" className={`nav-link m-2 ${(location.pathname === '/dashboard') || (location.pathname === '/') ? 'active' : ''}`}>
                  {/* <FontAwesomeIcon icon={faDisplay} />  */}
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/memberships" className={`nav-link m-2 ${location.pathname === '/memberships' ? 'active' : ''}`}>
                  {/* <FontAwesomeIcon icon={faAddressCard} />  */}
                  Memberships
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/invoices" className={`nav-link m-2 ${location.pathname === '/invoices' ? 'active' : ''}`}>
                  {/* <FontAwesomeIcon icon={faFileInvoiceDollar} />  */}
                  Invoices
                </Link>
              </li>
              <li
                className="nav-item dropdown"
                onMouseEnter={() => handleDropdownToggle(true, 1)}
                onMouseLeave={() => handleDropdownToggle(false, 1)}
              >
                <a className={`nav-link m-2 ${(location.pathname === '/add_member' || location.pathname === '/add_staff' || location.pathname === '/add_enquiry') ? 'active' : ''}`} role="button" aria-expanded="false">
                  {/* <FontAwesomeIcon icon={faSquarePlus} />  */}
                  Add{" "}
                </a>
                <ul className={`dropdown-menu p-2 ${isDropdownOpen1 ? 'show' : ''}`}>
                  <li>
                    <Link className={`dropdown-item ${location.pathname === '/add_member' ? 'active-dropdown' : ''}`} to="/add_member">
                      Add Members
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item ${location.pathname === '/add_staff' ? 'active-dropdown' : ''}`} to="/add_staff">
                      Add Staff Member
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item ${location.pathname === '/add_enquiry' ? 'active-dropdown' : ''}`} to="/add_enquiry">
                      Add Enquiry
                    </Link>
                  </li>
                  {true && (<li>
                    <Link className={`dropdown-item ${location.pathname === '/add-expenses' ? 'active-dropdown' : ''}`} to="/add-expenses">
                      Add Expenses
                    </Link>
                  </li>)}
                </ul>
              </li>
              <li
                className="nav-item dropstart"
                onMouseEnter={() => handleDropdownToggle(true, 2)}
                onMouseLeave={() => handleDropdownToggle(false, 2)}
              >
                <a className={`nav-link m-2 ${(location.pathname === '/staff' || location.pathname === '/ptMembers' || location.pathname === '/recentMemberships' || location.pathname === '/staffAttendance' || location.pathname === '/enquiries') ? 'active' : ''}`} role="button" aria-expanded="false">
                  More{" "}
                </a>
                <ul className={`dropdown-menu dropdown-menu-lg-end ${isDropdownOpen2 ? 'show' : ''} p-2`}>
                  <li>
                    <Link className={`dropdown-item ${location.pathname === '/staff' ? 'active-dropdown' : ''}`} to="/staff">
                      Staff
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item ${location.pathname === '/ptMembers' ? 'active-dropdown' : ''}`} to="/ptMembers">
                      PT Members
                    </Link>
                  </li>
                  {true && (<>
                    <li>
                      <Link className={`dropdown-item ${location.pathname === '/expenses' ? 'active-dropdown' : ''}`} to="/expenses">
                        Expenses
                      </Link>
                    </li>
                    <li>
                      <Link className={`dropdown-item ${location.pathname === '/revenue' ? 'active-dropdown' : ''}`} to="/revenue">
                        Revenue
                      </Link>
                    </li>
                    <li>
                      <Link className={`dropdown-item ${location.pathname === '/add-user' ? 'active-dropdown' : ''}`} to="/add-user">
                        Add User
                      </Link>
                    </li>
                  </>)}
                </ul>
              </li>
            </ul>
            <div className="d-flex" >
              <div class="btn-group">
                <button class="nav-link py-2 px-0 px-lg-2 dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon icon={faUser} />
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-2">
                  <li><a class="dropdown-item" onClick={handlePassChangeModalShow}>Change Password</a></li>
                  <li><a class="dropdown-item" href="#">Update Profile</a></li>
                  <li><button type="button" class="btn btn-outline-danger w-100" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Nav >
      <Modal show={changePassShow} onHide={handlePassChangeModalClose} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Body className="">
          {/* <Container> */}
          <div className="w-100 d-flex justify-content-center">
            <h4>Change Password</h4>
            <div className="row w-100">
              <form className="p-2">
                <label for="prevPass" class="form-label">Previous Password</label>
                <input type="password" id="prevPass" name="prevPass" class="form-control mb-2" onChange={handleChangePassChange} value={changePassData.prevPass} aria-describedby="passwordHelpBlock" />
                <label for="newPass" class="form-label">New Password</label>
                <input type="password" id="newPass" name="newPass" class="form-control mb-2" onChange={handleChangePassChange} value={changePassData.newPass} aria-describedby="passwordHelpBlock" />
                <label for="newPass2" class="form-label">Re-Enter New Password</label>
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
