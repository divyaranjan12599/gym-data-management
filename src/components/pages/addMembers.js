import React from "react";

function AddMembers() {

    
    return (
        <div className="container">
            <div className="container-fluid">
                <div className="text-center">
                    <h2>ADD MEMBER</h2>
                </div>
            </div>
            <div className="bg-dark text-light">
                <p className="text-center">Client Details</p>
            </div>


            <div className="card">
                <div className="card-header border-top border-bottom">
                    <p className="text-center mb-0">Add Personal Details</p>
                </div>
                <form className="d-flex flex-column justify-content-center align-items-center p-2">
                    <div class="row w-100">
                        <div className="main-box col-md-8">
                            <div className="row w-100">
                                <div className="p-2 d-flex flex-column col-lg-6 ">
                                    {/* <label>Client ID</label> */}
                                    
                                    <input type="text" className="form-control" value={1602} placeholder="Enter Client ID" disabled/>
                                    <span className="text-muted">*previous client id: 1601</span>
                                </div>

                                <div className="p-2 d-flex col-lg-6">
                                    {/* <label>Client Name</label> */}
                                    <input type="text" className="form-control" placeholder="Enter Full Name" />
                                </div>
                            </div>

                            <div className="row w-100">
                                <div className="p-2 d-flex col-lg-4">
                                    <label>Billing Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Billing Name" />
                                </div>

                                <div className="p-2 d-flex col-lg-4">
                                    <label>Email</label>
                                    <input type="text" className="form-control" placeholder="Enter Email" />
                                </div>

                                <div className="p-2 d-flex col-lg-4">
                                    <label>Phone</label>
                                    <select className="form-control" aria-label="Default select example">
                                        <option selected>country code</option>
                                        <option value="1">India (+91)</option>
                                        <option value="2">United States (+1)</option>
                                        <option value="3">Nigeria (+234)</option>
                                    </select>
                                    <input type="text" className="form-control" placeholder="Enter Phone" />
                                </div>
                            </div>

                            <div className="p-2 d-flex">
                                <label>Address</label>
                                <input type="text" className="form-control" placeholder="Enter Address" />
                            </div>

                            <div className="p-2 d-flex">
                                <label>Pin</label>
                                <input type="text" className="form-control" placeholder="Enter Address" />
                            </div>

                            <div className="p-2 d-flex">
                                <label>Join Date</label>
                                <input type="text" className="form-control" placeholder="Enter Address" />
                            </div>

                            <div className="p-2 d-flex">
                                <label>State</label>
                                <select className="form-control" aria-label="Default select example">
                                    <option selected>select</option>
                                    <option value="1">Madhya Pradesh</option>
                                    <option value="2">Uttar Pradesh</option>
                                    <option value="3">Maharashtra</option>
                                </select>
                            </div>

                            <div className="p-2 d-flex">
                                <label>Area</label>
                                <input type="text" className="form-control" placeholder="Bandra East, kukatpally" />
                            </div>

                            <div className="p-2 d-flex">
                                <label>Flat & Building</label>
                                <input type="text" className="form-control" placeholder="Eg: 311,First Floor, Ama Building" />
                            </div>

                            <div className="p-2 d-flex">
                                <label>Gender</label>
                                <div className="from-check">
                                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" />
                                    <label className="form-check-label" for="gridRadios1">
                                        Male
                                    </label>
                                </div>
                                <div className="from-check">
                                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                    <label className="form-check-label" for="gridRadios2">
                                        Female
                                    </label>
                                </div>
                            </div>

                            <div className="p-2 d-flex">
                                <label>City</label>
                                <input type="text" className="form-control" placeholder="Enter City" />
                            </div>
                        </div>
                        <div className="pic-box col-md-4">

                        </div>
                    </div>
                </form>
            </div>
            <form className="d-flex flex-column justify-content-center align-items-center p-2 w-100">
                <div className="bg-dark text-light">
                    <p className="text-center">Membership Details</p>
                </div>
                <div class="row w-100">
                    <div className="main-box col-md-8">
                        <div className="row w-100">
                            <div className="p-2 d-flex col-lg-6">
                                {/* <label>Client ID</label> */}
                                <input type="text" className="form-control" placeholder="Enter Client ID" />
                            </div>

                            <div className="p-2 d-flex col-lg-6">
                                {/* <label>Client Name</label> */}
                                <input type="text" className="form-control" placeholder="Enter Full Name" />
                            </div>
                        </div>

                        <div className="row w-100">
                            <div className="p-2 d-flex col-lg-4">
                                <label>Billing Name</label>
                                <input type="text" className="form-control" placeholder="Enter Billing Name" />
                            </div>

                            <div className="p-2 d-flex col-lg-4">
                                <label>Email</label>
                                <input type="text" className="form-control" placeholder="Enter Email" />
                            </div>

                            <div className="p-2 d-flex col-lg-4">
                                <label>Phone</label>
                                <select className="form-control" aria-label="Default select example">
                                    <option selected>country code</option>
                                    <option value="1">India (+91)</option>
                                    <option value="2">United States (+1)</option>
                                    <option value="3">Nigeria (+234)</option>
                                </select>
                                <input type="text" className="form-control" placeholder="Enter Phone" />
                            </div>
                        </div>

                        <div className="p-2 d-flex">
                            <label>Address</label>
                            <input type="text" className="form-control" placeholder="Enter Address" />
                        </div>

                        <div className="p-2 d-flex">
                            <label>Pin</label>
                            <input type="text" className="form-control" placeholder="Enter Address" />
                        </div>

                        <div className="p-2 d-flex">
                            <label>Join Date</label>
                            <input type="text" className="form-control" placeholder="Enter Address" />
                        </div>

                        <div className="p-2 d-flex">
                            <label>State</label>
                            <select className="form-control" aria-label="Default select example">
                                <option selected>select</option>
                                <option value="1">Madhya Pradesh</option>
                                <option value="2">Uttar Pradesh</option>
                                <option value="3">Maharashtra</option>
                            </select>
                        </div>

                        <div className="p-2 d-flex">
                            <label>Area</label>
                            <input type="text" className="form-control" placeholder="Bandra East, kukatpally" />
                        </div>

                        <div className="p-2 d-flex">
                            <label>Flat & Building</label>
                            <input type="text" className="form-control" placeholder="Eg: 311,First Floor, Ama Building" />
                        </div>

                        <div className="p-2 d-flex">
                            <label>Gender</label>
                            <div className="from-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" />
                                <label className="form-check-label" for="gridRadios1">
                                    Male
                                </label>
                            </div>
                            <div className="from-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                <label className="form-check-label" for="gridRadios2">
                                    Female
                                </label>
                            </div>
                        </div>

                        <div className="p-2 d-flex">
                            <label>City</label>
                            <input type="text" className="form-control" placeholder="Enter City" />
                        </div>
                    </div>
                    <div className="pic-box col-md-4">

                    </div>
                </div>
            </form>

            <form>
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Enter your name" />
                </div>
                <div class="mb-3">
                    <input type="email" class="form-control" placeholder="Enter your email" />
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" placeholder="Enter your password" />
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" placeholder="Confirm your password" />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddMembers;