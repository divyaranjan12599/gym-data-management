import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAddressCard,
  faLayerGroup,
  faSquarePlus,
  faFileInvoiceDollar,
  faDisplay,
  faDumbbell,
  faAngleDown,
  faAngleUp,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import Nav from 'react-bootstrap/Nav';
import { logOutUser } from "../pages/session";

function Navbar(props) {
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const handleLogout = () => {
      logOutUser("user");
      window.location.reload();
  }

  const handleDropdownToggle = (isOpen, num) => {
    if (num === 1) setIsDropdownOpen1(isOpen);
    if (num === 2) setIsDropdownOpen2(isOpen);
  };
  return (
    <Nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <div className="w-100 justify-content-start">
            <ul className="navbar-nav me-4 mb-2 mb-lg-0 d-flex align-items-center justify-content-start">
              <li className="navbar-brand">LOGO</li>

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
              {/* <li className="nav-item">
                  <Link to="/ptMembers" className={`nav-link m-2 ${location.pathname === '/ptMembers' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faDumbbell} /> PTs
                  </Link>
                </li> */}
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
                  {/* {!isDropdownOpen1 ? (
                      <FontAwesomeIcon icon={faAngleDown} />
                    ) : (
                      <FontAwesomeIcon icon={faAngleUp} />
                    )} */}
                </a>
                <ul className={`dropdown-menu ${isDropdownOpen1 ? 'show' : ''}`}>
                  <li>
                    <Link className="dropdown-item" to="/add_member">
                      Add Members
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/add_staff">
                      Add Staff Member
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/add_enquiry">
                      Add Enquiry
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className="nav-item dropstart"
                onMouseEnter={() => handleDropdownToggle(true, 2)}
                onMouseLeave={() => handleDropdownToggle(false, 2)}
              >
                <a className={`nav-link m-2 ${(location.pathname === '/staff' || location.pathname === '/ptMembers' || location.pathname === '/recentMemberships' || location.pathname === '/staffAttendance' || location.pathname === '/enquiries') ? 'active' : ''}`} role="button" aria-expanded="false">
                  {/* <FontAwesomeIcon icon={faLayerGroup} />  */}
                  More{" "}
                  {/* {!isDropdownOpen2 ? (
                      <FontAwesomeIcon icon={faAngleDown} />
                    ) : (
                      <FontAwesomeIcon icon={faAngleUp} />
                    )} */}
                </a>
                <ul className={`dropdown-menu dropdown-menu-lg-end ${isDropdownOpen2 ? 'show' : ''}`}>
                  <li>
                    <Link className="dropdown-item" to="/staff">
                      Staff
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/ptMembers">
                      PT Members
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/recentMemberships">
                      Recent Memberships
                    </Link>
                  </li>
                  {/* <li>
                      <Link className="dropdown-item" to="/staffAttendance">
                        Staff Attendance
                      </Link>
                    </li> */}
                  <li>
                    <Link className="dropdown-item" to="/enquiries">
                      Enquiries
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex justify-content-end align-items-center w-100 me-2" >
          <a className='nav-link text-dark me-2'><FontAwesomeIcon icon={faCog} /></a> | <button className="nav-link ms-2 text-dark" onClick={handleLogout}>Logout</button>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

      </div>


    </Nav >
  );
}

export default Navbar;
