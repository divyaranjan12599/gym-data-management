import React from "react";

function Add() {
    return(
        <div className="container">
        <div className="container-fluid">
            <div className="text-center">
              <h2>ADD MEMBER</h2>
            </div>
        </div>
        <div className="bg-dark text-light">
            <p className="text-center">Client Details</p>
        </div>
        <div className="d-flex align-items-stretch">
            <form>
                <div className="p-2 d-flex align-items-baseline">
                    <label>Client ID</label>
                    <input type="text" className="form-control" placeholder="Enter Client ID"/>
                </div>

                <div className="p-2 d-flex align-items-baseline">
                    <label>Client Name</label>
                    <input type="text" className="form-control" placeholder="Enter Full Name"/>
                </div>

                <div className="p-2 d-flex align-items-baseline">
                    <label>Billing Name</label>
                    <input type="text" className="form-control" placeholder="Enter Billing Name"/>
                </div>

                <div className="p-2 d-flex align-items-baseline">
                    <label>Email</label>
                    <input type="text" className="form-control" placeholder="Enter Email"/>
                </div>

                <div className="p-2 d-flex align-items-baseline">
                    <label>Phone</label>
                    <select className="form-control" aria-label="Default select example">
                        <option selected>country code</option>
                        <option value="1">India (+91)</option>
                        <option value="2">United States (+1)</option>
                        <option value="3">Nigeria (+234)</option>
                    </select>
                    <input type="text" className="form-control" placeholder="Enter Phone"/>
                </div>

                <div className="p-2 align-items-baseline">
                    <label>Address</label>
                    <input type="text" className="form-control" placeholder="Enter Address"/>
                </div>

                <div className="p-2 align-items-baseline">
                    <label>Pin</label>
                    <input type="text" className="form-control" placeholder="Enter Address"/>
                </div>

                <div className="p-2 align-items-baseline">
                    <label>Join Date</label>
                    <input type="text" className="form-control" placeholder="Enter Address"/>
                </div>

                <div className="p-2 align-items-baseline">
                    <label>State</label>
                    <select className="form-control" aria-label="Default select example">
                        <option selected>select</option>
                        <option value="1">Madhya Pradesh</option>
                        <option value="2">Uttar Pradesh</option>
                        <option value="3">Maharashtra</option>
                    </select>
                </div>

                <div className="p-2 align-items-baseline">
                    <label>Area</label>
                    <input type="text" className="form-control" placeholder="Bandra East, kukatpally"/>
                </div>

                <div className="p-2 align-items-baseline">
                    <label>Flat & Building</label>
                    <input type="text" className="form-control" placeholder="Eg: 311,First Floor, Ama Building"/>
                </div>

                <div className="p-2 align-items-baseline">
                    <label>Gender</label>
                    <div className="from-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1"/>
                        <label className="form-check-label" for="gridRadios1">
                            Male
                        </label>
                    </div>
                    <div className="from-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                        <label className="form-check-label" for="gridRadios2">
                            Female
                        </label>
                    </div>
                </div>

                <div className="p-2 align-items-baseline">
                    <label>City</label>
                    <input type="text" className="form-control" placeholder="Enter City"/>
                    </div>
            </form>
        </div>
        </div>
    );
}

export default Add;