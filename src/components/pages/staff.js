import React, { useContext, useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Avatar } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../App";
import StaffTable from "../inc/table";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function Staff() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const navigate = useNavigate();

  let { staffData } = useContext(UserContext);

  const handleRowClick = (row) => {
    const staffId = row.id;
    navigate(`/staff/${staffId}`);
  };

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
      { field: "id", headerName: "Staff ID", flex: 1 },
      { field: "name", headerName: "Name", flex: 1 },
      { field: "phone", headerName: "Phone Number", flex: 1 },
      { field: "package", headerName: "Package", flex: 1 },
      { field: "startDate", headerName: "Start Date", flex: 1 },
      { field: "endDate", headerName: "End Date", flex: 1 },
      { field: "amount", headerName: "Amount", flex: 1 },
      { field: "balance", headerName: "Balance", flex: 1 },
      {
        field: "actions",
        headerName: "View",
        flex: 1,
        renderCell: (params) => (
          <Button
            className="btn btn-light"
            onClick={() => {
              handleRowClick(params.row);
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
        ),
      },
    ],
    []
  );

  const rows = staffData.map((staff, index) => ({
    id: index + 1 || "N/A",
    name: staff.name || "N/A",
    phone: staff.contact || "N/A",
    package: staff.package || "N/A",
    startDate: staff.joiningdate || "N/A",
    endDate: staff.endDate || "N/A",
    amount: staff.amount || "N/A",
    balance: staff.balance || "N/A",
    status: staff.status || "N/A",
    photoURL:
      staff.photoUrl ||
      "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
  }));

  return (
    <div className="container-fluid">
      <h2 className="text-center mt-3">STAFF</h2>

      <StaffTable rows={rows} columns={columns} />
    </div>
  );
}

export default Staff;
