import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar-light bg-dark shadow">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav class="navbar navbar-expand-lg">
              <div class="container-fluid">
                <a class="navbar-brand text-light" href="#">
                  Famous Fitness Studio
                </a>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div
                  class="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <Link to="/home" class="nav-link active text-light">
                        Home
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/add_member" class="nav-link active text-light">
                        Add Member
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/contact" class="nav-link active text-light">
                        Contact Us
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/about" class="nav-link active text-light">
                        About Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
