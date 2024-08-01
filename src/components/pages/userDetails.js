import React, { useMemo, useState } from "react";
import defaultImage from "../icons/user.png";
import { faArrowRight, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Avatar } from "@mui/material";
import clientData from '../inc/clientData.json'
import Table from "../inc/table";

function UserDetails() {
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
        renderCell: (params) => <Avatar src={params.row.photoURL} />,
        sortable: false,
        filterable: false,
      },
      { field: "id", headerName: "Client ID", width: 90 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "email", headerName: "Email ID", width: 150 },
      { field: "phone", headerName: "Phone Number", width: 170 },
      { field: "package", headerName: "Package", width: 180 },
      { field: "startDate", headerName: "Start Date", width: 150 },
      { field: "endDate", headerName: "End Date", width: 150 },
      { field: "amount", headerName: "Amount Paid", width: 140 },
      {
        field: "remaining",
        headerName: "Remaining Amount",
        width: 140,
        editable: true,
      },
    ],
    []
  );

  return (
    <div className="container-fluid">
      <h1 className="userHeading mt-3 d-flex justify-content-center">
        User Info
      </h1>
      <div className="w-100 d-flex">
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
          <label className="userLabel mt-3 text-lg-center">Full Name</label>
          <label className="userLabel text-lg-center text-body-tertiary">
            +91 9834****32
          </label>
          <label className="userLabel text-lg-center text-body-tertiary">
            los angeles, united states
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
        <div className="w-100 h-100 d-flex flex-column">
          <div className="card mx-2 shadow w-100 p-3">
            <h3>Membership History</h3>
            <Table rows={rows} columns={columns} />
          </div>
          <div className="card mx-2 shadow w-100 p-3">
            <h3>Payment History</h3>
            <Table rows={rows} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
