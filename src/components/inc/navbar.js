import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "@fortawesome/free-solid-svg-icons";
import Nav from 'react-bootstrap/Nav';

function Navbar(props) {
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("adhjdsaj",props);
  };

  const filterData = (event) => {
    event.preventDefault();
    const filteredClients = props.clientData.filter(client => {
      const searchLower = searchTerm.toLowerCase();
      return (
        // client.id.includes(searchLower) ||
        client.name.toLowerCase().includes(searchLower) ||
        client.email.split(/[@.]/)[0].toLowerCase().includes(searchLower) ||
        client.contact.includes(searchLower)
      );
    });

    console.log(filteredClients);
  }


  const handleDropdownToggle = (isOpen, num) => {
    if (num === 1) setIsDropdownOpen1(isOpen);
    if (num === 2) setIsDropdownOpen2(isOpen);
  };
  return (
    <Nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand me-0" href="/home">
          Famous Fitness Studio
        </a>
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
        <div
          className="collapse navbar-collapse justify-content-around"
          id="navbarSupportedContent"
        >
          <div className="row w-100 justify-content-end">
            <div className="col-lg-8">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-evenly">
                <li className="nav-item">
                  <Link to="/home" className="nav-link">
                    <FontAwesomeIcon icon={faDisplay} /> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/memberships" className="nav-link">
                    <FontAwesomeIcon icon={faAddressCard} /> Memberships
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ptMembers" className="nav-link">
                    <FontAwesomeIcon icon={faDumbbell} /> PTs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/invoice" className="nav-link">
                    <FontAwesomeIcon icon={faFileInvoiceDollar} /> Invoices
                  </Link>
                </li>
                <li
                  className="nav-item dropdown"
                  onMouseEnter={() => handleDropdownToggle(true, 1)}
                  onMouseLeave={() => handleDropdownToggle(false, 1)}
                >
                  <a className="nav-link" role="button" aria-expanded="false">
                    <FontAwesomeIcon icon={faSquarePlus} /> Add{" "}
                    {!isDropdownOpen1 ? (
                      <FontAwesomeIcon icon={faAngleDown} />
                    ) : (
                      <FontAwesomeIcon icon={faAngleUp} />
                    )}
                  </a>
                  <ul
                    className={`dropdown-menu ${isDropdownOpen1 ? "show" : ""}`}
                  >
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
                  className="nav-item dropdown"
                  onMouseEnter={() => handleDropdownToggle(true, 2)}
                  onMouseLeave={() => handleDropdownToggle(false, 2)}
                >
                  <a className="nav-link" role="button" aria-expanded="false">
                    <FontAwesomeIcon icon={faLayerGroup} /> More{" "}
                    {!isDropdownOpen2 ? (
                      <FontAwesomeIcon icon={faAngleDown} />
                    ) : (
                      <FontAwesomeIcon icon={faAngleUp} />
                    )}
                  </a>
                  <ul
                    className={`dropdown-menu ${isDropdownOpen2 ? "show" : ""}`}
                  >
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
                    <li>
                      <Link className="dropdown-item" to="/staffAttendance">
                        Staff Attendance
                      </Link>
                      <Link className="dropdown-item" to="/enquiries">
                        Enquiries
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* <li className="nav-item">
                  <Link to="/contact" className="nav-link active">
                    Contact Us
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/about" className="nav-link active">
                    About Us
                  </Link>
                </li> */}
              </ul>
            </div>
            {/* <div className="col-lg-4">
              <form className="d-flex nav-search-bar" role="search" onSubmit={filterData}>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="search"
                    onChange={handleSearchChange}
                    value={searchTerm}
                    placeholder="Name, Email or Contact"
                    aria-label="Search"
                  />
                  <span className="input-group-text" onClick={filterData}>
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                </div>
              </form>
            </div> */}
          </div>
        </div>
      </div>
    </Nav>
  );
}

export default Navbar;
