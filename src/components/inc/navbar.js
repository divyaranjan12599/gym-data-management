import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAddressCard, faLayerGroup, faSquarePlus, faDisplay, faDumbbell, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  const handleDropdownToggle = (isOpen, num) => {
    if(num === 1)
      setIsDropdownOpen1(isOpen);
    if(num === 2)
      setIsDropdownOpen2(isOpen);
  };
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" to="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="row w-100">
            <div class="col-lg-8">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-evenly">
                <li class="nav-item">
                  <Link to="/home" class="nav-link">
                  <FontAwesomeIcon icon={faDisplay} /> Dashboard
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/" class="nav-link">
                  <FontAwesomeIcon icon={faAddressCard}/> Memberships
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/" class="nav-link">
                  <FontAwesomeIcon icon={faDumbbell} /> PTs
                  </Link>
                </li>
                <li class="nav-item dropdown" onMouseEnter={() => handleDropdownToggle(true, 1)} onMouseLeave={() => handleDropdownToggle(false, 1)}>
                  <a class="nav-link" role="button" aria-expanded="false">
                  <FontAwesomeIcon icon={faSquarePlus} /> Add {!isDropdownOpen1 ?<FontAwesomeIcon icon={faAngleDown} />:<FontAwesomeIcon icon={faAngleUp} />}
                  </a>
                  <ul className={`dropdown-menu ${isDropdownOpen1 ? 'show' : ''}`}>
                    <li><Link class="dropdown-item" to="/add_member">
                      Add Members</Link>
                    </li>
                    <li><Link class="dropdown-item" to="#">
                      Add Staff</Link>
                    </li>
                    <li><Link class="dropdown-item" to="#">
                      Add Pts</Link>
                    </li>
                  </ul>
                </li>
                <li class="nav-item dropdown" onMouseEnter={() => handleDropdownToggle(true, 2)} onMouseLeave={() => handleDropdownToggle(false, 2)}>
                  <a class="nav-link" role="button" aria-expanded="false">
                  <FontAwesomeIcon icon={faLayerGroup}/> More {!isDropdownOpen2 ?<FontAwesomeIcon icon={faAngleDown}/>:<FontAwesomeIcon icon={faAngleUp} />}
                  </a>
                  <ul className={`dropdown-menu ${isDropdownOpen2 ? 'show' : ''}`}>
                    <li><Link class="dropdown-item" to="#">
                      Staff</Link>
                    </li>
                    <li><Link class="dropdown-item" to="#">
                      PT Members</Link>
                    </li>
                    <li><Link class="dropdown-item" to="#">
                      Recent Memberships</Link>
                    </li>
                    <li><Link class="dropdown-item" to="#">
                      Staff Attendance</Link>
                    </li>
                  </ul>
                </li>
                {/* <li class="nav-item">
                  <Link to="/contact" class="nav-link active">
                    Contact Us
                  </Link>
                </li>

                <li class="nav-item">
                  <Link to="/about" class="nav-link active">
                    About Us
                  </Link>
                </li> */}
              </ul>
            </div>
            <div class="col-lg-4">
              <form className="d-flex nav-search-bar" role="search">
                <div className="input-group">
                  <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                  <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
