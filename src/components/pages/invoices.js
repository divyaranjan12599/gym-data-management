import React, { useContext, useMemo, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "@mui/material";
import { Avatar } from "@mui/material";
import { UserContext } from "../../App";
import Table from '../inc/table'
import emailjs from 'emailjs-com';
import toast from "react-hot-toast";
import InvoiceModal from '../inc/invoiceModal';
import Memberships from "./memberships";

function Invoices() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);


  let { paymentData } = useContext(UserContext);

  const sendEmail = (row) => {
    const templateParams = {
      to_name: row.name,
      to_email: row.email,
      message: `Hello ${row.name}, this is a test email.`,
    };

    emailjs.send('service_dcu0jes', 'template_1jf9e6n', templateParams, 'l9xho7dUwGOfJFNU1')
      .then((response) => {
        toast.success("Email sent");
        // console.log('SUCCESS!', response.status, response.text);
      }, (error) => {
        toast.error("Failed to Send Email. Try again later");
        // console.log('FAILED...', error);
      });
  };

  const handleGenerateClick = (row) => {
    const info = {
      billFrom: "Famous Fitness Studio",
      billFromAddress: "123 Business Rd.",
      billFromEmail: "contact@yourcompany.com",
      gstReg: "GST12345",
      billTo: row.name,
      billToAddress: row.address,
      billToEmail: row.email,
      invoiceNumber: `INV-${row.id}`,
      dateOfIssue: new Date().toISOString().split("T")[0],
      currentDate: new Date().toISOString().split("T")[0],
      notes: "Thank you for your business!",
    };
  

  const membership = [
    { membershipPlan: "Monthly", personalTrainer: "No P.T.", Period: 1, price: row.amountPaid },
  ];

  setModalData({
    info,
    currency: "INR",
    total: row.amountPaid,
    amountDue: row.amountRemaining,
    membership,
    subTotal: row.amountPaid,
    taxAmount: 0,
    discountAmount: 0
  });
  setShowModal(true);
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

      { field: "sno", headerName: "S. No.", flex: 1},
      { field: "name", headerName: "Name", flex: 1 },
      { field: "email", headerName: "Email ID", flex: 1 },
      { field: "phone", headerName: "Phone Number", flex: 1 },
      { field: "paymentDate", headerName: "Payment On", flex: 1 },
      { field: "amountPaid", headerName: "Amount Paid", flex: 1 },
      { field: "paidFor", headerName: "Paid For", flex: 1 },
      { field: "amountRemaining", headerName: "Amount Remaining", flex: 1 },
      { field: "dueDate", headerName: "Due Date", flex: 1 },
      { field: "transactionId", headerName: "Transaction Id", flex: 1 },
      // { field: "remaining", headerName: "Remaining Amount", flex: 1, editable: true },
      // {
      //   field: "status",
      //   headerName: "Status",
      //   width: 100,
      //   type: "boolean",
      //   editable: true,
      // },
      // {
      {  field: 'actions',
        headerName: 'Generate Invoice',
        width: 150,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => 
              handleGenerateClick(params.row)
            }
          >
            Generate
          </Button>
        ),
      },
    ],
    []
  );

  console.log(paymentData);

  const rows = paymentData.map((payment, index) => ({
    sno: index + 1,
    id: payment?._id,
    name: payment?.amountPaidBy?.name || "N/A",
    phone: payment?.amountPaidBy?.contact || "N/A",
    email: payment?.amountPaidBy?.email || "N/A",
    paidFor: payment?.paidFor || "N/A",
    paymentDate: payment?.amountPaidOn || "N/A",
    amountPaid: payment?.amountPaid || "N/A",
    amountRemaining: payment?.amountRemaining || "N/A",
    dueDate: payment?.dueDate || "N/A",
    transactionId: payment?.transactionId || "N/A",
    address: payment?.amountPaidBy?.address.city || "N/A",
    status: payment?.status || "N/A",
    photoURL: payment?.amountPaidBy?.photoUrl || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
    actions: "",
  }));

  return (
    <div className="container-fluid">
      <h2 className="text-center mt-3">INVOICES</h2>

      <Table rows={rows} columns={columns} />
      {showModal && (
        <InvoiceModal
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          {...modalData}
        />
      )}

    </div>
  );
}

export default Invoices;
