import React, { useContext, useMemo, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { Avatar } from "@mui/material";
import { UserContext } from "../../App";
import Table from '../inc/table';
import emailjs from 'emailjs-com';
import { endDateGenerator } from "../inc/utilityFuncs";

function Memberships() {

  let { membershipData } = useContext(UserContext);

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
      // { field: "amount", headerName: "Amount Paid", width: 140 },
      // { field: "remaining", headerName: "Remaining Amount", width: 140, editable: true },
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
    [membershipData]
  );

  const rows = membershipData
  .filter((membership) => {
    const endDate = endDateGenerator(membership?.startingDate, membership?.membershipPeriod);
    const currentDate = new Date();
    return new Date(endDate) > currentDate;
  })
  .map((membership) => {
    const endDate = endDateGenerator(membership?.startingDate, membership?.membershipPeriod);
    return {
      id: membership.membershipBy?.id || "N/A",
      name: membership.membershipBy?.name || "N/A",
      phone: membership.membershipBy?.contact || "N/A",
      email: membership.membershipBy?.email || "N/A",
      package: membership.membershipPeriod || "N/A",
      startDate: membership.startingDate || "N/A",
      endDate: endDate || "N/A",
      status: membership.status || "N/A",
      photoURL: membership.membershipBy?.photoUrl || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
    };
  });

  rows.sort((a, b) => {
    if (a.startDate === "N/A" && b.startDate === "N/A") {
      return 0; // both are invalid
    } else if (a.startDate === "N/A") {
      return 1; // a is invalid, push it to the end
    } else if (b.startDate === "N/A") {
      return -1; // b is invalid, push it to the end
    } else {
      return new Date(a.startDate) - new Date(b.startDate); // valid dates comparison
    }
  });

  console.log("Mapped Rows:", rows);

  return (
    <div className="container-fluid">
      <h2 className="text-center mt-3">MEMBERS</h2>
      <Table rows={rows} columns={columns} />
    </div>
  );
}

export default Memberships;
