import React, { useContext, useEffect, useMemo, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Avatar } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import { UserContext } from "../../App";
import AddEnquiry from "./addEnquiry";
import Table from "../inc/table";

function Enquiries() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  let { staffData } = useContext(UserContext);

  let { enquiryData } = useContext(UserContext)

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
      { field: "email", headerName: "Email", flex: 1 },
      { field: "enquiryDate", headerName: "Enquiry Date", flex: 1 },
      { field: "lastFollowUpDate", headerName: "Last FollowUp Date", flex: 1 },
      { field: "referredBy", headerName: "Referred By", flex: 1 },
      { field: "attainBy", headerName: "Attained By", flex: 1 },
      { field: "intrestedOn", headerName: "Intrested On", flex: 1 },
      { field: "source", headerName: "Source", flex: 1 },
    ],
    []
  );

  const rows = enquiryData.map((enquiry, index) => ({
    id: enquiry.id || "N/A",
    name: enquiry.name || "N/A",
    phone: enquiry.contact || "N/A",
    email: enquiry.email || "N/A",
    referredBy: enquiry.referredBy || "None",
    attainBy: enquiry.attainBy.name || "None",
    enquiryDate: enquiry.enquiryDate || "N/A",
    lastFollowUpDate: enquiry.lastFollowUpDate || "N/A",
    intrestedOn: enquiry.intrestedOn || "N/A",
    balance: enquiry.balance || "N/A",
    source: enquiry.source || "N/A",
    photoURL: enquiry.photoUrl || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
  }));

  return (
    <div className="container-fluid">
      <h2 className="text-center mt-3">ENQUIRIES</h2>

      {/* <div className="mt-5 mx-4">
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
          components={{
            Toolbar: QuickSearchToolbar,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 500,
              },
            },
          }}
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
          hideFooter
        />
      </div> */}
      <Table rows={rows} columns={columns}/>

    </div>
  );
}

export default Enquiries;
