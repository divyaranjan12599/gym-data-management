import React, { useState, useRef, useEffect } from "react";
import defaultImage from "../icons/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FaPlus, FaMinus } from 'react-icons/fa';

function AddMembers() {
  // cloudinary setup

  const [imageURL, setImageURL] = useState(null);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const UPLOAD_PRESENT = process.env.REACT_APP_UPLOAD_PRESENT;

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: CLOUD_NAME,
      uploadPreset: UPLOAD_PRESENT,
      multiple: true
    },
      (err, result) => {
        if (result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setImageURL(result.info.secure_url);
        }
      });
  }, []);

  //profile box image
  /********************************/
  const [isVisible, setIsVisible] = useState(false);
  const [image, selectImage] = useState({
    placeholder: defaultImage,
    files: null,
  });

  //preview profile image
  /********************************/
  const displaySelectedImage = (event) => {
    // const fileInput = event.target.files[0];
    console.log("hi");

    if (
      event.target.files[0].type === "image/jpeg" ||
      event.target.files[0].type === "image/png"
    ) {
      const reader = new FileReader();

      reader.onload = (r) => {
        selectImage({
          placeholder: r.target.result,
          files: event.target.files[0],
        });
      };
    }
  };

  return (
    <div className="container">
      <div className="container-fluid">
        <div className="text-center">
          <h2>ADD MEMBER</h2>
        </div>
      </div>
      {/* <div className="bg-dark text-light">
            <p className="text-center">Client Details</p>
        </div> */}

      <div className="card mb-4">
        <div className="card-header border-top border-bottom">
          <p className="text-center mb-0">Add Personal Details</p>
        </div>
        <form className="d-flex flex-column justify-content-center align-items-center p-2">
          <div class="row w-100">
            <div className="main-box col-md-8">
              <div className="row w-100">
                <div className="mb-2 flex-column col-lg-6 ">
                  {/* <label>Client ID</label> */}

                  <input
                    type="text"
                    className="form-control"
                    value={1602}
                    placeholder="Enter Client ID"
                    disabled
                  />
                  <span className="text-muted">*previous client id: 1601</span>
                </div>

                <div className="mb-2 col-lg-6">
                  {/* <label>Client Name</label> */}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                  />
                </div>

                <div className="mb-2 col-lg-6">
                  <input
                    type="text"
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
                      type="text"
                      class="form-control"
                      placeholder="Contact Number"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>

                <div class="mb-2 col-12">
                  {/* <label for="inputAddress2" class="form-label">Address 2</label> */}
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress2"
                    placeholder="Apartment, studio, or floor"
                  />
                </div>
                <div class="mb-2 col-12">
                  {/* <label for="inputAddress" class="form-label">Address</label> */}
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress"
                    placeholder="Area"
                  />
                </div>
                <div class="mb-2 col-md-6">
                  {/* <label for="inputCity" class="form-label">City</label> */}
                  <input
                    type="text"
                    class="form-control"
                    id="inputCity"
                    placeholder="City"
                  />
                </div>
                <div class="mb-2 col-md-4">
                  {/* <label for="inputState" class="form-label">State</label> */}
                  <select id="inputState" class="form-select">
                    <option selected>State</option>
                    <option value="1">Madhya Pradesh</option>
                    <option value="2">Uttar Pradesh</option>
                    <option value="3">Maharashtra</option>
                  </select>
                </div>
                <div class="mb-2 col-md-2">
                  {/* <label for="inputZip" class="form-label">Zip</label> */}
                  <input
                    type="text"
                    class="form-control"
                    id="inputZip"
                    placeholder="Pincode"
                  />
                </div>

                <label>Gender</label>
                <div className="mb-2 col-md-12 d-flex flex-row">
                  <div className="from-check col-4">
                    <input
                      className="form-check-input me-2"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios1"
                      value="option1"
                    />
                    <label className="form-check-label" for="gridRadios1">
                      Male
                    </label>
                  </div>
                  <div className="from-check col-4">
                    <input
                      className="form-check-input me-2"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios2"
                      value="option2"
                    />
                    <label className="form-check-label" for="gridRadios2">
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pic-box col-4">
              <div className="card w-100 h-00 p-10 align-items-center justify-content-center   " onClick={() => widgetRef.current.open()} style={{height: "75%"}}>
                <div className="icon-container w-100 h-100" >
                  {imageURL ? (
                    <img src={imageURL} alt="" className="p-1  w-100 img-fluid" style={{height: "100%"}} />
                  ) : (
                    <>
                      <img
                        className="p-3 w-100 "
                        src={image.placeholder}
                        alt=""
                      />
                      
                    </>
                  )}
                </div>
              </div>
            </div>

            <label>ID Proof Details</label>
            <div className="mb-2 col-12 input-group d-flex flex-row">
              <select id="idProofType" class="form-select custom-col-3">
                <option selected>Select</option>
                <option value="1">Adhar Card</option>
                <option value="2">PAN Card</option>
                <option value="3">License</option>
                {/* <option value="4">Other</option> */}
              </select>

              <input
                className="form-control custom-col-9"
                type="text"
                name="idProof"
                id="idProof"
                placeholder="id proof number"
              />
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
                        type="text"
                        class="form-control"
                        placeholder="Contact Number"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </form>
      </div>

      <div class="card text-left mb-4">
        <div className="card-header border-top border-bottom">
          <p className="text-center mb-0">Add Membership Details</p>
        </div>
        <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
          <div className="row p-2 w-100">
            <div className="mb-2 col-lg-6">
              <label>Registration fees</label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  INR
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value="00.00"
                />
              </div>
            </div>
            <div className="mb-2 col-lg-6">
              <label>Membership Period</label>
              <select id="idProofType" class="form-select">
                <option selected>Select</option>
                <option value="1">Monthly</option>
                <option value="2">Quaterly</option>
                <option value="3">Half Yearly</option>
                <option value="4">Yearly</option>
                {/* <option value="5">Other</option> */}
              </select>
            </div>
            <div className="mb-2 col-6">
              <label>Joining Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Enter Address"
              />
            </div>
            <div className="mb-2 col-lg-6">
              <label>Membership Amount</label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  INR
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value="00.00"
                />
              </div>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-start">
              <button
                className="btn text-black-50 d-flex align-items-center"
                onClick={(e) => {
                  e.preventDefault();
                  setIsVisible(!isVisible);
                }}
              >
                {isVisible ? (
                  <>
                    <FaMinus className="me-2" />{" "}
                    <span className="text-black">Remove PT</span>
                  </>
                ) : (
                  <>
                    <FaPlus className="me-2" />
                    <label className="text-black">Add PT</label>
                  </>
                )}
              </button>
              {/* {isVisible ? <label>Remove PT</label> : <label>Add PT</label>} */}
            </div>
            {/* <div className="col-6">
                        <input className="form-check-input me-2" type="radio" checked={isVisible} onClick={() => setIsVisible(!isVisible)} />
                        {!isVisible?(<label>Add PT</label>):(<label>Remove PT</label>)}
                    </div> */}
            {isVisible && (
              <div class="card p-0 text-left">
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
                          placeholder=""
                          value="00.00"
                        />
                      </div>
                    </div>
                    <div className="mb-2 col-lg-6">
                      <label>Membership Period</label>
                      <select id="idProofType" class="form-select">
                        <option selected>Select</option>
                        <option value="1">Monthly</option>
                        <option value="2">Quaterly</option>
                        <option value="3">Half Yearly</option>
                        <option value="4">Yearly</option>
                        <option value="5">Other</option>
                      </select>
                    </div>
                    <div className="mb-2 col-lg-6">
                      <label>PT Assigned to</label>
                      <select id="idProofType" class="form-select">
                        <option selected>Select</option>
                        <option value="1">T1</option>
                        <option value="2">T2</option>
                        <option value="5">Other</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* <div class="card w-100" hidden="false">

                    <div class="card-body">
                        <h4 class="card-title">Title</h4>
                        <p class="card-text">Body</p>
                    </div>
                </div> */}
        </form>
      </div>

      <div class="card text-left mb-2">
        <div className="card-header border-top border-bottom">
          <p className="text-center mb-0">Add Payment Details</p>
        </div>
        <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100">
          <div className="row p-2 w-100">
            <div className="mb-2 col-lg-6">
              <label>Amount</label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  INR
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value="00.00"
                />
              </div>
            </div>
            <div className="mb-2 col-lg-6">
              <label>Mode of Payment</label>
              <select id="idProofType" class="form-select">
                <option selected>Select</option>
                <option value="1">Online</option>
                <option value="2">Cash</option>
              </select>
            </div>
            <div className="mb-2 col-6">
              <label>Transaction ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Address"
              />
            </div>
            <div className="mb-2 col-lg-6">
              <label>Membership Amount</label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  INR
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value="00.00"
                />
              </div>
            </div>
          </div>

          {/* <div class="card w-100" hidden="false">

<div class="card-body">
<h4 class="card-title">Title</h4>
<p class="card-text">Body</p>
</div>
</div> */}
        </form>
      </div>
      <div className="col-12 d-flex justify-content-end p-0 mb-4">
        <button type="submit" class="btn btn-primary m-2">
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddMembers;
