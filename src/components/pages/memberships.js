import React, { useContext, useMemo, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "@mui/material";
import { Avatar } from "@mui/material";
import { UserContext } from "../../App";
import Table from '../inc/table'
import emailjs from 'emailjs-com';

import clientData from '../inc/clientData.json'

function Memberships() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  let { clientData } = useContext(UserContext);

  const sendEmail = (row) => {
    const templateParams = {
      to_name: row.name,
      to_email: row.email,
      message: `Hello ${row.name}, this is a test email.`,
    };

    emailjs.send('service_dcu0jes', 'template_1jf9e6n', templateParams, 'l9xho7dUwGOfJFNU1')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (error) => {
        console.log('FAILED...', error);
      });
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
      { field: "id", headerName: "Client ID", width: 90 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "email", headerName: "Email ID", width: 150 },
      { field: "phone", headerName: "Phone Number", width: 170 },
      { field: "package", headerName: "Package", width: 180 },
      { field: "startDate", headerName: "Start Date", width: 150 },
      { field: "endDate", headerName: "End Date", width: 150 },
      { field: "amount", headerName: "Amount Paid", width: 140 },
      { field: "remaining", headerName: "Remaining Amount", width: 140, editable: true },
      // {
      //   field: "status",
      //   headerName: "Status",
      //   width: 100,
      //   type: "boolean",
      //   editable: true,
      // },
      // {
      //   field: 'actions',
      //   headerName: 'Action',
      //   width: 150,
      //   renderCell: (params) => (
      //     <Button
      //       variant="contained"
      //       color="primary"
      //       onClick={() => sendEmail(params.row.email)}
      //     >
      //       Remind
      //     </Button>
      //   ),
      // },
    ],
    []
  );


  //  const rows = clientData
  const rows = clientData.map((client, index) => ({
    id: client.id || "N/A",
    name: client.name || "N/A",
    phone: client.contact || "N/A",
    package: client.membership.membershipPeriod || "N/A",
    startDate: client.joiningdate || "N/A",
    endDate: client.endDate || "N/A",
    amount: client.paymentDetails.amountPaid,
    remaining: client.paymentDetails.amountRemaining,
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

      <Table rows={rows} columns={columns} />

    </div>
  );
}

export default Memberships;
