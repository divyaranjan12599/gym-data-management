import React, { useContext, useEffect, useMemo, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Avatar } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../App";
import StaffTable from "../inc/table";


function Staff() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  
  let {staffData} = useContext(UserContext);
  
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
      { field: "id", headerName: "Staff ID", flex: 1},
      { field: "name", headerName: "Name", flex: 1 },
      { field: "phone", headerName: "Phone Number", flex: 1 },
      { field: "package", headerName: "Package", flex: 1 },
      { field: "startDate", headerName: "Start Date", flex: 1 },
      { field: "endDate", headerName: "End Date", flex: 1 },
      { field: "amount", headerName: "Amount", flex: 1 },
      { field: "balance", headerName: "Balance", flex: 1 },
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
  
  const rows =  staffData.map((staff, index) => ({
    // id: staff.id || "N/A",
    name: staff.name || "N/A",
    phone: staff.contact || "N/A",
    package: staff.package || "N/A",
    startDate: staff.joiningdate || "N/A",
    endDate: staff.endDate || "N/A",
    amount: staff.amount || "N/A",
    balance: staff.balance || "N/A",
    status: staff.status || "N/A",
    photoURL: staff.photoUrl || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
  }));
  
  return (
    <div className="container-fluid">
      <h2 className="text-center mt-3">STAFF</h2>

      <StaffTable rows={rows} columns={columns}/>

    </div>
  );
}

export default Staff;
