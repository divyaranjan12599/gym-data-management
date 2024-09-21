import React, { useState, useRef, useEffect, useContext } from "react";
import defaultImage from "../icons/user.png";
import axios from "axios";
import { UserContext } from "../../App";
import toast from "react-hot-toast";

function UserProfile() {
    let { userAuth } = useContext(UserContext);
    const [imageURL, setImageURL] = useState(null);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    const [userData, setUserData] = useState(userAuth.user);

    const resetUserData = () => {
        setUserData();
        // resting the image url
        setImageURL(null);
    };

    const [validationErrors, setValidationErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1);

    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const UPLOAD_PRESENT = process.env.REACT_APP_UPLOAD_PRESENT;

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: CLOUD_NAME,
                uploadPreset: UPLOAD_PRESENT,
                multiple: true,
                folder: "GDMTool"
            },
            (err, result) => {
                if (result.event === "success") {
                    toast.success("Image uploaded Successfully");
                    // console.log("Done! Here is the image info: ", result.info);

                    setImageURL(result.info.secure_url);
                }
            }
        );
    }, []);

    //profile box image
    /********************************/
    const [isVisible, setIsVisible] = useState(false);
    const [image, selectImage] = useState({
        placeholder: defaultImage,
        files: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setUserData({
            ...userData,
            [name]: type === "file" ? files[0] : value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            ...userData,
            picUrl: imageURL,
        };

        try {
            const response = await axios.post(
                process.env.REACT_APP_SERVER_URL + "/user/create-client",
                postData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Client added Successfully")
            window.location.reload();
            setCurrentStep(1);
            resetUserData();
        } catch (error) {
            toast.error("Client can't be Added now. Please Try again later!!");
            console.error("Error creating client:", error);
        }
        // Handle form submission, e.g., send userData to the server
    };

    let {
        userAuth: { token },
        staffData,
    } = useContext(UserContext);

    return (
        <div className="container">
            <div className="container-fluid">
                <div className="text-center">
                    <h2>Update Profile</h2>
                </div>
            </div>

            <div className="card mb-4">
                {/* <div className="card-header borderBottom-top borderBottom-bottom">
              <h5 className="text-center mb-0">Personal Details</h5>
            </div> */}
                <div className="w-100 d-flex justify-content-center">

                    <form className="d-flex flex-column justify-content-center align-items-center p-2">
                        <div className="row w-100">
                            <div className="main-box col-8">
                                <div className="row w-100 h-100">
                                    <div className="mb-2 flex-column col-lg-6 ">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            name="gymTitle"
                                            className="form-control"
                                            value={userData.gymTitle}
                                        />
                                        <style>
                                            {`
  .form-control::placeholder {
    color: var(--placeholder-color);
  }
`}
                                        </style>
                                    </div>

                                    <div className="mb-2 col-lg-6">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            className="form-control"
                                            name="ownerName"
                                            value={userData.ownerName}
                                            placeholder={
                                                validationErrors.lname
                                                    ? `Last name is required!!`
                                                    : "Enter Last Name"
                                            }
                                            style={{
                                                borderBottom: validationErrors.lname
                                                    ? "2px inset red"
                                                    : "1px solid #ced4da",
                                                "--placeholder-color": validationErrors.lname
                                                    ? "red"
                                                    : "#6c757d",
                                            }}
                                        />
                                        <style>
                                            {`
.form-control::placeholder {
  color: var(--placeholder-color);
  }
  `}
                                        </style>
                                    </div>

                                    <div className="mb-2 col-lg-6">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            name="email"
                                            value={userData.email}
                                            className="form-control"
                                            placeholder={
                                                validationErrors.email
                                                    ? `Email ID required !!`
                                                    : "Enter Email ID"
                                            }
                                            style={{
                                                borderBottom: validationErrors.email
                                                    ? "2px inset red"
                                                    : "1px solid #ced4da",
                                                "--placeholder-color": validationErrors.email
                                                    ? "red"
                                                    : "#6c757d",
                                            }}
                                        />
                                    </div>

                                    <div className="mb-2 flex-column col-lg-6">
                                        <div className="input-group">
                                            <span
                                                className="input-group-text"
                                                id="basic-addon1"
                                            >
                                                +91
                                            </span>
                                            <input
                                                type="number"
                                                onChange={handleChange}
                                                name="contact"
                                                value={parseFloat(userData.contact)}
                                                className="form-control"
                                                aria-label="Username"
                                                aria-describedby="basic-addon1"
                                            // required

                                            // style={{
                                            //     borderBottom: validationErrors.contactNumber
                                            //         ? "2px inset red"
                                            //         : "2px solid #ced4da",
                                            //     "--placeholder-color":
                                            //         validationErrors.contactNumber
                                            //             ? "red"
                                            //             : "#6c757d",
                                            // }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-2 col-6">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            name="gymShortform"
                                            value={userData.gymShortform}
                                            className="form-control"
                                            id="inputAddress2"
                                            // required
                                            placeholder={
                                                validationErrors.address1
                                                    ? `Field required...`
                                                    : "Apartment, studio, or floor"
                                            }
                                            style={{
                                                borderBottom: validationErrors.address1
                                                    ? "2px inset red"
                                                    : "1px solid #ced4da",
                                                "--placeholder-color": validationErrors.address1
                                                    ? "red"
                                                    : "#6c757d",
                                            }}
                                        />
                                    </div>
                                    {/* <div className="mb-2 col-12">
                                            <input
                                                type="text"
                                                onChange={handleChange}
                                                name="addressDetail"
                                                value={userData.addressDetail || ""}
                                                className="form-control"
                                                id="inputAddress2"
                                                placeholder="enter full address"
                                            // required
                                            // placeholder={
                                            //     validationErrors.address1
                                            //         ? `Field required...`
                                            //         : "Apartment, studio, or floor"
                                            // }
                                            // style={{
                                            //     borderBottom: validationErrors.address1
                                            //         ? "2px inset red"
                                            //         : "1px solid #ced4da",
                                            //     "--placeholder-color": validationErrors.address1
                                            //         ? "red"
                                            //         : "#6c757d",
                                            // }}
                                            />
                                        </div>
                                        <div className="mb-2 col-md-6">
                                            <input
                                                type="text"
                                                onChange={handleChange}
                                                name="city"
                                                value={userData.city}
                                                className="form-control"
                                                id="inputCity"
                                                // required
                                                placeholder={
                                                    validationErrors.city
                                                        ? `City input required !!`
                                                        : "Enter city"
                                                }
                                                style={{
                                                    borderBottom: validationErrors.city
                                                        ? "2px inset red"
                                                        : "1px solid #ced4da",
                                                    "--placeholder-color": validationErrors.city
                                                        ? "red"
                                                        : "#6c757d",
                                                }}
                                            />
                                        </div>
                                        <div className="mb-2 col-md-4">
                                            <select
                                                id="inputState"
                                                name="state"
                                                onChange={handleChange}
                                                value={userData.state}
                                                className="form-select"
                                                style={{
                                                    borderBottom: validationErrors.state
                                                        ? "2px inset red"
                                                        : "1px solid #ced4da",
                                                }}
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    selected={!userData.state}
                                                    style={{
                                                        color: validationErrors.state
                                                            ? "red"
                                                            : "#6c757d",
                                                    }}
                                                >
                                                    {validationErrors.state
                                                        ? "State input required!!"
                                                        : "State"}
                                                </option>
                                                <option value="Madhya Pradesh">
                                                    Madhya Pradesh
                                                </option>
                                                <option value="Telangana">Telangana</option>
                                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                            </select>
                                        </div> */}

                                    <div className="mb-2 col-md-2">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            name="zip"
                                            value={userData.zip}
                                            className="form-control"
                                            id="inputZip"
                                            // required
                                            placeholder={
                                                validationErrors.zip
                                                    ? `pincode requi...`
                                                    : "Pincode"
                                            }
                                            style={{
                                                borderBottom: validationErrors.zip
                                                    ? "2px inset red"
                                                    : "1px solid #ced4da",
                                                "--placeholder-color": validationErrors.zip
                                                    ? "red"
                                                    : "#6c757d",
                                            }}
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="pic-box col-4">
                                <div
                                    className="card p-2 w-100 h-100 align-items-center justify-content-center"
                                    onClick={() => widgetRef.current.open()}
                                >
                                    <div className="icon-container">
                                        {imageURL ? (
                                            <img
                                                src={imageURL}
                                                alt=""
                                                className="p-1 w-100 h-100"
                                            />
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
                        </div>
                        <div className="row w-100">
                            <div className="mb-2 col-12">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="addressDetail"
                                    value={userData.addressDetail || ""}
                                    className="form-control"
                                    id="inputAddress2"
                                    placeholder="enter full address"
                                // required
                                // placeholder={
                                //     validationErrors.address1
                                //         ? `Field required...`
                                //         : "Apartment, studio, or floor"
                                // }
                                // style={{
                                //     borderBottom: validationErrors.address1
                                //         ? "2px inset red"
                                //         : "1px solid #ced4da",
                                //     "--placeholder-color": validationErrors.address1
                                //         ? "red"
                                //         : "#6c757d",
                                // }}
                                />
                            </div>
                            <div className="mb-2 col-md-6">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="city"
                                    value={userData.city}
                                    className="form-control"
                                    id="inputCity"
                                    // required
                                    placeholder={
                                        validationErrors.city
                                            ? `City input required !!`
                                            : "Enter city"
                                    }
                                    style={{
                                        borderBottom: validationErrors.city
                                            ? "2px inset red"
                                            : "1px solid #ced4da",
                                        "--placeholder-color": validationErrors.city
                                            ? "red"
                                            : "#6c757d",
                                    }}
                                />
                            </div>
                            <div className="mb-2 col-md-4">
                                <select
                                    id="inputState"
                                    name="state"
                                    onChange={handleChange}
                                    value={userData.state}
                                    className="form-select"
                                    style={{
                                        borderBottom: validationErrors.state
                                            ? "2px inset red"
                                            : "1px solid #ced4da",
                                    }}
                                >
                                    <option
                                        value=""
                                        disabled
                                        selected={!userData.state}
                                        style={{
                                            color: validationErrors.state
                                                ? "red"
                                                : "#6c757d",
                                        }}
                                    >
                                        {validationErrors.state
                                            ? "State input required!!"
                                            : "State"}
                                    </option>
                                    <option value="Madhya Pradesh">
                                        Madhya Pradesh
                                    </option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                </select>
                            </div>

                            <div className="mb-2 col-md-2">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="zip"
                                    value={userData.zip}
                                    className="form-control"
                                    id="inputZip"
                                    // required
                                    placeholder={
                                        validationErrors.zip
                                            ? `pincode requi...`
                                            : "Pincode"
                                    }
                                    style={{
                                        borderBottom: validationErrors.zip
                                            ? "2px inset red"
                                            : "1px solid #ced4da",
                                        "--placeholder-color": validationErrors.zip
                                            ? "red"
                                            : "#6c757d",
                                    }}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end w-100">
                            <button
                                type="submit"
                                className="btn btn-primary me-2"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </div >
        </div >
    );
}

export default UserProfile;
