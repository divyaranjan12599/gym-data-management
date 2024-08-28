import React, { useMemo, useState } from "react";
import defaultImage from "../icons/user.png";
import { faArrowRight, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Avatar } from "@mui/material";
import clientData from '../inc/clientData.json'
import Table from "../inc/table";

function StaffDetails() {
  const [image, selectImage] = useState({
    placeholder: defaultImage,
    files: null,
  });

  const rows = clientData

  let columns = useMemo(
    () => [
      {
        field: "photoURL",
        headerName: "Avatar",
        width: 90,
        renderCell: (params) => <Avatar src={params.row.photoURL} alt="Avatar" />,
        sortable: false,
        filterable: false,
      },
      { field: "id", headerName: "Client ID", flex: 1},
      { field: "name", headerName: "Name", flex: 1 },
      { field: "email", headerName: "Email ID", flex: 1 },
      { field: "phone", headerName: "Phone Number", flex: 1 },
      { field: "package", headerName: "Package", flex: 1 },
      { field: "startDate", headerName: "Start Date", flex: 1 },
      { field: "endDate", headerName: "End Date", flex: 1 },
      { field: "status", headerName: "Status", flex: 1 },
      { field: "amount", headerName: "Amount Paid", flex: 1 },
      {
        field: "remaining",
        headerName: "Remaining Amount",
        width: 140,
        editable: true,
      },
    ],
    []
  );

  const paymentColumns = useMemo(
    () => [
      { field: "id", headerName: "Client ID", flex: 1},
      { field: "mode", headerName: "Mode", flex: 1},
      { field: "amount_paid", headerName: "Amount Paid", flex: 1 },
      { field: "due_date", headerName: "Due Date", flex: 1 },
    ],
    []
  );

  // if (!userData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container-fluid">
      <h1 className="userHeading mt-3 d-flex justify-content-center">
        User Info
      </h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow p-2">
              <div className="d-flex justify-content-end">
                <button className="btn btn-light">
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              </div>
              <div className="d-flex justify-content-center">
                <img
                  className="rounded-circle"
                  style={{ width: "80%" }}
                  src={image.placeholder}
                  alt=""
                />
              </div>
              <label className="userLabel mt-3 text-center">Full Name</label>
              <label className="userLabel text-center text-body-tertiary">
                +91 9834****32
              </label>
              <label className="userLabel text-center text-body-tertiary">
                Los Angeles, United States
              </label>
              <div className="card mt-5 h-100 shadow p-3">
                <div className="">
                  <label className="headLabel">Client ID</label>
                  <label className="smallLabel">1602</label>
                </div>
                <hr />
                <div className="">
                  <label className="headLabel">Email ID</label>
                  <label className="smallLabel">example@xyz.com</label>
                </div>
                <hr />
                <div className="">
                  <label className="headLabel">Gender</label>
                  <label className="smallLabel">Male</label>
                </div>
                <hr />
                <div className="">
                  <label className="headLabel">Joining Date</label>
                  <label className="smallLabel">20/10/2023</label>
                </div>
                <hr />
                <div className="">
                  <label className="headLabel">End Date</label>
                  <label className="smallLabel">20/04/2024</label>
                </div>
                <hr />
                <div className="">
                  <label className="headLabel">Membership</label>
                  <label className="smallLabel">6 Months</label>
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card shadow w-100 p-2">
              <h3>Current PTs</h3>
              <Table rows={rows} columns={columns} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default StaffDetails;

