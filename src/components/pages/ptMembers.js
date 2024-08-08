import React, { useContext, useMemo, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Avatar } from "@mui/material";
import { UserContext } from "../../App";
import Table from "../inc/table";


function PtMembers() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  
  let { membershipData } = useContext(UserContext);

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
      { field: "ptDuration", headerName: "PT Duration", width: 180 },
      { field: "startDate", headerName: "Start Date", width: 150 },
      { field: "endDate", headerName: "End Date", width: 150 },
      { field: "amount", headerName: "Amount", width: 140 },
      { field: "ptby", headerName: "PT By", width: 140 },
    ],
    []
  );
  
  const rows = membershipData
  .filter(membership => membership.isPt)
  .map((membership, index) => ({
    id: membership.membershipBy.id || "N/A",
    name: membership.membershipBy.name || "N/A",
    ptby: membership.PTDetails.assignedTo.name || "N/A",
    phone: membership.membershipBy.contact || "N/A",
    ptDuration: membership.PTDetails.ptPeriod || "N/A",
    startDate: membership.PTDetails.ptStartingDate || "N/A",
    endDate: membership.endDate || "N/A",
    amount: membership.PTDetails.ptfees || "N/A",
    photoURL: membership.membershipBy.photoUrl || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
  }));
  
  return (
    <div className="container-fluid">
      <h2 className="text-center mt-3">PT MEMBERS</h2>

      <Table rows={rows} columns={columns}/>

    </div>
  );
}

export default PtMembers;
