import React, { useContext, useMemo, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Avatar } from "@mui/material";
import { UserContext } from "../../App";
import Table from '../inc/table'

function Memberships() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  let { clientData } = useContext(UserContext);

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

  const rows = clientData.map((client, index) => ({
    id: client.id || "N/A",
    name: client.name || "N/A",
    phone: client.contact || "N/A",
    package: client.membership.membershipPeriod || "N/A",
    startDate: client.joiningdate || "N/A",
    endDate: client.endDate || "N/A",
    amount: client.paymentDetails.amountPaid,
    balance: client.paymentDetails.amountRemaining,
    status: client.status || "N/A",
    photoURL: client.photoUrl || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
  }));

  rows.sort((a, b) => {
    if (a.id === "N/A" && b.id === "N/A") {
      return 0; // both ids are invalid
    } else if (a.id === "N/A") {
      return 1; // only a.id is invalid, push it to the end
    } else if (b.id === "N/A") {
      return -1; // only b.id is invalid, push it to the end
    } else {
      return a.id - b.id; // valid ids comparison
    }
  });

  return (
    <div className="container-fluid">
      <h2 className="text-center mt-3">MEMBERS</h2>

      <Table rows={rows} columns={columns}/>

    </div>
  );
}

export default Memberships;
