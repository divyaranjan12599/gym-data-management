import React, { useEffect, useMemo, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";


function Staff() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  
  
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
      { field: "phone", headerName: "Phone Number", width: 170 },
      { field: "package", headerName: "Package", width: 180 },
      { field: "startDate", headerName: "Start Date", width: 150 },
      { field: "endDate", headerName: "End Date", width: 150 },
      { field: "amount", headerName: "Amount", width: 140 },
      { field: "balance", headerName: "Balance", width: 140 },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        type: "boolean",
        editable: true,
      },
    ],
    []
  );
  
  const rows = [
    {
      photoURL: "https://cdn-icons-png.flaticon.com/128/560/560277.png",
      id: 1602,
      name: "Divyaranjan",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      status: "Active",
    },
    {
      photoURL: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png",
      id: 1603,
      name: "Aman",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      status: "Active",
    },
    {
      photoURL: "https://cdn-icons-png.flaticon.com/128/4140/4140037.png",
      id: 1604,
      name: "Abhay",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      status: "Active",
    },
    {
      photoURL: "https://cdn-icons-png.flaticon.com/128/4140/4140048.png",
      id: 1605,
      name: "Chetan",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      status: "Active",
    },
    {
      photoURL: "https://cdn-icons-png.flaticon.com/128/6997/6997662.png",
      id: 1606,
      name: "Abhishek",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      status: "Active",
    },
    {
      photoURL: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
      id: 1607,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      status: "Active",
    },
    {
      id: 1608,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      status: "Active",
    },
    {
      id: 1609,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      status: "Active",
    },
    {
      id: 1610,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      status: "Active",
    },
    {
      id: 1611,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      status: "Active",
    },
  ];
  
  return (
    <div className="container-fluid">
      <h2 className="text-center mt-3">STAFF</h2>

      <div className="container-fluid d-flex flex-column mt-5">
        <div className="d-flex flex-row">
          <div className="col-2 mx-3 d-flex flex-column">
            <label>From</label>
            <DatePicker
              id="from-date-picker"
              className="form-select "
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
            />
          </div>

          <div className="col-2 mx-3 d-flex flex-column">
            <label>To</label>
            <DatePicker
              id="to-date-picker"
              className="form-select "
              selected={toDate}
              onChange={(date) => setToDate(date)}
            />
          </div>

          <div className="col-2 mx-3">
            <label>Search On</label>
            <select id="expired" class="form-select w-100">
              <option selected>Expired</option>
              <option value="1">*-*</option>
              <option value="2">*-*</option>
              <option value="3">*-*</option>
              <option value="4">*-*</option>
            </select>
          </div>

          <div className="col-2 mx-3" type="select">
            <label>Status</label>
            <select id="status" class="form-select w-100">
              <option selected>Active</option>
              <option value="1">*_*</option>
              <option value="2">*_*</option>
              <option value="3">*_*</option>
            </select>
          </div>

          <div className="col-2 mx-3" type="select">
            <label>Package</label>
            <select id="package" class="form-select w-100">
              <option selected>All</option>
              <option value="1">*_*</option>
              <option value="2">*_*</option>
              <option value="3">*_*</option>
            </select>
          </div>

          <div className="membership-btn btn btn-primary mt-4 w-50 h-100 mx-3">
            Submit
          </div>

        </div>
      </div>

      <div className="mt-5 mx-4">
          <DataGrid
            className="data-grid"
            sx={{
              width: "100%",
              height: 550,
              [`& .${gridClasses.row}`]: {
                bgcolor: grey[200],
              },
            }}
            rows={rows}
            columns={columns}
            getRowSpacing={(params) => ({
                top: params.isFirstVisible ? 0 : 2,
              bottom: params.isLastVisible ? 0 : 2,
            })}
            localeText={{
              toolbarDensity: "Size",
              toolbarDensityLabel: "Size",
              toolbarDensityCompact: "Small",
              toolbarDensityStandard: "Medium",
              toolbarDensityComfortable: "Large",
            }}
            slots={{
              toolbar: GridToolbar,
            }}
          />
      </div>

    </div>
  );
}

export default Staff;
