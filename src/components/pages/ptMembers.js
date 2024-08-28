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
      { field: "id", headerName: "Client ID", flex: 1},
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
