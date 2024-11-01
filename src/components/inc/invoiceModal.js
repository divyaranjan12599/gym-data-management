import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { RWebShare } from "react-web-share";

const InvoiceModal = (props) => {
  const {
    showModal,
    closeModal,
    info,
    currency,
    total,
    amountDue,
    membership,
    subTotal,
    taxAmount,
    discountAmount,
  } = props;

  console.log(info);
  

  const createInvoice = async () => {
    const invoiceData = {
      logo: "data:image/jpeg;base64,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",
      from: `${info.billFrom}\n${info.billFromAddress}\n${info.billFromEmail}\n${info.gstReg}\n${info.panNo}`,
      to: `${info.billTo}\n${info.billToAddress}\n${info.billToEmail}`,
      number: info.invoiceNumber,
      date: info.dateOfIssue || new Date().toISOString().split("T")[0],
      payment_terms: "NET 30",
      due_date: info.currentDate,
      membership: membership.map((plan) => ({
        membershipPlan: plan.membershipPlan,
        personalTrainer: plan.personalTrainer,
        Period: plan.period,
        price: plan.price,
      })),
      fields: { tax: "%", discounts: false, shipping: false },
      discounts: discountAmount,
      tax: taxAmount,
      amount_paid: 0,
      notes: info.notes,
      terms: "Terms and conditions go will here...",
    };

    try {
      const response = await axios.post(
        "https://invoice-generator-qys7.onrender.com/api/create-invoice",
        invoiceData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    // <Modal show={showModal} onHide={closeModal} size="lg" centered>
    //   <div id="invoiceCapture">
    //     <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
    //       <div className="w-100">
    //         <h4 className="fw-bold my-2">
    //           {info.billFrom || "Famous Fitness Studio"}
    //         </h4>
    //         <h6 className="fw-bold text-secondary mb-1">
    //           Invoice #: {info.invoiceNumber || ""}
    //         </h6>
    //       </div>
    //       <div className="text-end ms-4">
    //         <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
    //         <h5 className="fw-bold text-secondary">
    //           {" "}
    //           {currency} {amountDue}
    //         </h5>
    //       </div>
    //     </div>
    //     <div className="p-4">
    //       <Row className="mb-4">
    //         <Col md={4}>
    //           <div className="fw-bold">Client Details:</div>
    //           <div>{info.billTo || ""}</div>
    //           <div>{info.billToAddress || ""}</div>
    //           <div>{info.billToEmail || ""}</div>
    //         </Col>
    //         <Col md={4}>
    //           <div className="fw-bold">Management Details:</div>
    //           <div>{info.billFrom || ""}</div>
    //           <div>{info.billFromAddress || ""}</div>
    //           <div>{info.billFromEmail || ""}</div>
    //         </Col>
    //         <Col md={4}>
    //           <div className="fw-bold">Date Of Issue:</div>
    //           <div>{info.dateOfIssue || ""}</div>
    //         </Col>
    //       </Row>
    //       <Table className="mb-0">
    //         <thead>
    //           <tr>
    //             <th>PLAN</th>
    //             <th>PERSONAL TRAINER</th>
    //             <th className="text-end">PRICE</th>
    //             <th className="text-end">AMOUNT PAID</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {membership.map((membership, i) => (
    //             <tr id={i} key={i}>
    //               <td style={{ width: "100px" }}>{membership.membershipPlan}</td>
    //               <td>
    //                 {membership.personalTrainer}
    //               </td>
    //               <td className="text-end" style={{ width: "140px" }}>
    //                 {currency} {membership.price + amountDue}
    //               </td>
    //               <td className="text-end" style={{ width: "  140px" }}>
    //                 {currency} {membership.price}
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </Table>
    //       <Table>
    //         <tbody>
    //           <tr>
    //             {/* <td>&nbsp;</td>
    //             <td>&nbsp;</td>
    //             <td>&nbsp;</td> */}
    //           </tr>
    //           {/* <tr className="text-end">
    //             <td></td>
    //             <td className="fw-bold" style={{ width: "100px" }}>
    //               SUBTOTAL
    //             </td>
    //             <td className="text-end" style={{ width: "100px" }}>
    //               {currency} {subTotal}
    //             </td>
    //           </tr> */}
    //           {/* {taxAmount !== 0.0 && (
    //             <tr className="text-end">
    //               <td></td>
    //               <td className="fw-bold" style={{ width: "100px" }}>
    //                 TAX
    //               </td>
    //               <td className="text-end" style={{ width: "100px" }}>
    //                 {currency} {taxAmount}
    //               </td>
    //             </tr>
    //           )} */}
    //           {/* {discountAmount !== 0.0 && (
    //             <tr className="text-end">
    //               <td></td>
    //               <td className="fw-bold" style={{ width: "100px" }}>
    //                 DISCOUNT
    //               </td>
    //               <td className="text-end" style={{ width: "100px" }}>
    //                 {currency} {discountAmount}
    //               </td>
    //             </tr>
    //           )} */}
    //           <tr className="text-end">
    //             <td></td>
    //             <td className="fw-bold" style={{ width: "140px" }}>
    //               TOTAL
    //             </td>
    //             <td className="text-end" style={{ width: "140px" }}>
    //               {currency} {total}
    //             </td>
    //           </tr>
    //         </tbody>
    //       </Table>
    //       {info.notes && (
    //         <div className="bg-light py-3 px-4 rounded">{info.notes}</div>
    //       )}
    //     </div>
    //   </div>
    //   <div className="pb-4 px-4">
    //     <Row>
    //       <Col md={6}>
    //         <RWebShare
    //           data={{
    //             text: "Web Share - invoice",
    //             url: "http://localhost:3000",
    //             title: "Invoice",
    //           }}
    //           onClick={() => console.log("shared successfully!")}
    //         >
    //           <Button
    //             variant="primary"
    //             className="d-block w-100"
    //             onClick={createInvoice}
    //           >
    //             Send Invoice
    //           </Button>
    //         </RWebShare>
    //       </Col>
    //       <Col md={6}>
    //         <Button
    //           variant="outline-primary"
    //           className="d-block w-100 mt-3 mt-md-0"
    //           onClick={createInvoice}
    //         >
    //           Download Copy
    //         </Button>
    //       </Col>
    //     </Row>
    //   </div>
    //   <hr className="mt-4 mb-3" />
    // </Modal>
    <Modal show={showModal} onHide={closeModal} size="lg" centered>
      <div id="invoiceCapture" className="invoice-container m-2">
        {/* Header Section */}
        <table className="invoice-header">
          <tbody>
            <tr>
              <td className="title" colSpan="2">TAX INVOICE</td>
            </tr>
            <tr>
              <td>
                <strong>FAMOUS FITNESS STUDIO</strong><br />
                Dairy farm pillar number 210 Attapur Hyderabad, Telangana<br />
                <strong>Phone:</strong> 4040133682<br />
                <strong>Email:</strong> famousfitnessstudio401@gmail.com<br />
                <strong>Website:</strong> <a href="http://famousfitnessstudio.com">famousfitnessstudio.com</a><br />
              </td>
              <td>
                <strong>Bill To:</strong><br />
                {info.billTo} ({info._id?info._id:"FFS123"})<br />
                {info.billToAddress}<br />
                <strong>Phone:</strong> {info.billToPhone}<br />
                <strong>Email:</strong> {info.billToEmail}<br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Invoice No:</strong> {info.invoiceNumber}<br />
                <strong>Date:</strong> {info.dateOfIssue}<br />
              </td>
              <td>
                <strong>Payment Mode(s)</strong><br />
                1. Online Payment<br />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Details Section */}
        <table className="invoice-details">
          <thead>
            <tr className="table-header">
              <th>Description</th>
              <th className="text-right">Amount (Rs)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 MONTH Package from {info.dateOfIssue} to {/* End date calculation here */}</td>
              <td className="text-right">{currency} {membership[0]?.price}</td>
            </tr>
          </tbody>
        </table>

        {/* Summary Section */}
        <table className="invoice-summary">
          <tbody>
            <tr>
              <td className="text-right"><strong>Total</strong></td>
              <td className="text-right">{currency} {total}</td>
            </tr>
            <tr>
              <td className="text-right"><strong>Paid Amount</strong></td>
              <td className="text-right">{currency} {total}</td>
            </tr>
            <tr>
              <td className="total-due"><strong>Total Due</strong></td>
              <td className="total-due">{currency} {amountDue}</td>
            </tr>
          </tbody>
        </table>

        {/* Action Buttons */}
        <div className="p-4">
          <Row>
            <Col md={6}>
              <RWebShare
                data={{
                  text: "Web Share - invoice",
                  url: "http://localhost:3000",
                  title: "Invoice",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <Button variant="primary" className="d-block w-100" onClick={closeModal}>
                  Send Invoice
                </Button>
              </RWebShare>
            </Col>
            <Col md={6}>
              <Button
                variant="outline-primary"
                className="d-block w-100 mt-3 mt-md-0"
                onClick={closeModal}
              >
                Download Copy
              </Button>
            </Col>
          </Row>
        </div>
      </div>

      {/* Inline CSS Styles */}
      <style jsx>{`
        .invoice-container {
          max-width: 800px;
          margin: auto;
          padding: 20px;
          border: 1px solid #000;
          font-family: Arial, sans-serif;
        }
        .invoice-header,
        .invoice-info,
        .invoice-details,
        .invoice-summary {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .invoice-header td,
        .invoice-info td,
        .invoice-details th,
        .invoice-details td,
        .invoice-summary td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
        .invoice-header td,
        .invoice-summary td {
          border: none;
        }
        .title {
          font-weight: bold;
          font-size: 24px;
          text-align: center;
        }
        .total-due {
          font-weight: bold;
          font-size: 20px;
          text-align: right;
        }
        .text-right {
          text-align: right;
        }
        .table-header {
          font-weight: bold;
          background-color: #f0f0f0;
        }
      `}</style>
    </Modal>
  );
};

export default InvoiceModal;
