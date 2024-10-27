import React, { useContext, useMemo, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Avatar } from "@mui/material";
import { UserContext } from "../../App";
import Table from "../inc/table";


function PtMembers() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  
  let { ptmembershipData } = useContext(UserContext);
  console.log("ptmembershipData",ptmembershipData);

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
      { field: "sno", headerName: "S. No.", flex: 1},
      { field: "name", headerName: "Name", flex: 1 },
      { field: "phone", headerName: "Phone Number", flex: 1 },
      { field: "ptDuration", headerName: "PT Duration", flex: 1 },
      { field: "startDate", headerName: "Start Date", flex: 1 },
      { field: "endDate", headerName: "End Date", flex: 1 },
      { field: "amount", headerName: "Amount", flex: 1 },
      { field: "ptby", headerName: "PT By", flex: 1 },
    ],
    []
  );
  
  const rows = ptmembershipData
  .map((membership, index) => ({
    sno: index+1 || "N/A",
    id: membership?.assignedTo?._id || "N/A",
    name: membership?.assignedTo?.name || "N/A",
    ptby: membership?.assignedTo?.name || "N/A",
    phone: membership?.assignedTo?.contact || "N/A",
    ptDuration: membership?.ptPeriod || "N/A",
    startDate: membership?.ptStartDate || "N/A",
    endDate: membership?.ptEndDate || "N/A",
    amount: membership?.ptfees || "N/A",
    photoURL: membership?.assignedTo?.photoUrl || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
  }));
  
  return (
    <div className="container-fluid">
      <h2 className="text-center mt-3">PT MEMBERS</h2>

      <Table rows={rows} columns={columns}/>

    </div>
  );
}

export default PtMembers;
