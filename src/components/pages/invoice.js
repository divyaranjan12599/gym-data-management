import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "../inc/invoiceItem";
import InvoiceModal from "../inc/invoiceModal";
import InputGroup from "react-bootstrap/InputGroup";

const Invoice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("$");
  const [currentDate, setCurrentDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [billTo, setBillTo] = useState("");
  const [billToEmail, setBillToEmail] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [shipTo, setShipTo] = useState("");
  const [shipToEmail, setShipToEmail] = useState("");
  const [shipToAddress, setShipToAddress] = useState("");
  const [billFrom, setBillFrom] = useState("");
  const [billFromEmail, setBillFromEmail] = useState("");
  const [billFromAddress, setBillFromAddress] = useState("");
  const [panNo, setPanNo] = useState("");
  const [gstReg, setGstReg] = useState("");
  const [notes, setNotes] = useState("");
  const [total, setTotal] = useState("0.00");
  const [subTotal, setSubTotal] = useState("0.00");
  const [taxRate, setTaxRate] = useState("");
  const [taxAmount, setTaxAmount] = useState("0.00");
  const [discountRate, setDiscountRate] = useState("");
  const [discountAmount, setDiscountAmount] = useState("0.00");
  const [items, setItems] = useState([
    {
      id: 0,
      name: "",
      description: "",
      price: "1.00",
      quantity: 1,
    },
  ]);

  useEffect(() => {
    handleCalculateTotal();
    setCurrentDate(new Date());
  }, []);

  const handleRowDel = (item) => {
    const updatedItems = items.filter((i) => i.id !== item.id);
    setItems(updatedItems);
    handleCalculateTotal();
  };

  const handleAddEvent = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id: id,
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    setItems([...items, newItem]);
    handleCalculateTotal();
  };

  const handleCalculateTotal = () => {
    let subTotalValue = 0;

    items.forEach((item) => {
      subTotalValue +=
        parseFloat(item.price).toFixed(2) * parseInt(item.quantity);
    });

    const subtotal = parseFloat(subTotalValue).toFixed(2);
    const taxAmountValue = parseFloat(subtotal * (taxRate / 100)).toFixed(2);
    const discountAmountValue = parseFloat(
      subtotal * (discountRate / 100)
    ).toFixed(2);
    const totalValue = (
      parseFloat(subtotal) -
      parseFloat(discountAmountValue) +
      parseFloat(taxAmountValue)
    ).toFixed(2);

    setSubTotal(subtotal);
    setTaxAmount(taxAmountValue);
    setDiscountAmount(discountAmountValue);
    setTotal(totalValue);
  };

  const onItemizedItemEdit = (e) => {
    const { id, name, value } = e.target;
    const updatedItems = items.map((item) => {
      if (item.id == id) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setItems(updatedItems);
    handleCalculateTotal();
  };

  const editField = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "dateOfIssue":
        setDateOfIssue(value);
        break;
      case "invoiceNumber":
        setInvoiceNumber(value);
        break;
      case "billTo":
        setBillTo(value);
        break;
      case "billToEmail":
        setBillToEmail(value);
        break;
      case "billToAddress":
        setBillToAddress(value);
        break;
      case "shipTo":
        setShipTo(value);
        break;
      case "shipToEmail":
        setShipToEmail(value);
        break;
      case "shipToAddress":
        setShipToAddress(value);
        break;
      case "billFrom":
        setBillFrom(value);
        break;
      case "billFromEmail":
        setBillFromEmail(value);
        break;
      case "PanNo":
        setPanNo(value);
        break;
      case "gstReg":
        setGstReg(value);
        break;
      case "billFromAddress":
        setBillFromAddress(value);
        break;
      case "notes":
        setNotes(value);
        break;
      case "taxRate":
        setTaxRate(value);
        break;
      case "discountRate":
        setDiscountRate(value);
        break;
      default:
        break;
    }
    handleCalculateTotal();
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Form onSubmit={openModal}>
        <div className="text-center mt-2"><h2>Invoice Generator</h2></div>
        <Row>
          <Col md={8} lg={9}>
            <Card className="p-4 p-xl-5 my-3 my-xl-4 main-card">
              <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                <div className="d-flex flex-column">
                  <div className="d-flex flex-column">
                    <div className="mb-2">
                      <span className="fw-bold">Invoice Date:&nbsp;</span>
                      <span className="current-date">{currentDate}</span>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                    <Form.Control
                      type="date"
                      value={dateOfIssue}
                      name="dateOfIssue"
                      onChange={editField}
                      style={{ maxWidth: "150px" }}
                      
                    />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold me-2">
                    Invoice Number:
                  </span>
                  <Form.Control
                    type="number"
                    value={invoiceNumber}
                    name="invoiceNumber"
                    onChange={editField}
                    min="1"
                    style={{ maxWidth: "70px" }}
                    
                  />
                </div>
              </div>
              <hr className="my-4" />
              <Row className="mb-5 gy-3">
                <Col md={6}>
                  <Form.Label className="fw-bold">Sold By:</Form.Label>
                  <Form.Control
                    placeholder={"Seller name"}
                    rows={3}
                    value={billFrom}
                    type="text"
                    name="billFrom"
                    className="my-2"
                    onChange={editField}
                    autoComplete="name"
                    
                  />
                  <Form.Control
                    placeholder={"Seller Email address"}
                    value={billFromEmail}
                    type="email"
                    name="billFromEmail"
                    className="my-2"
                    onChange={editField}
                    autoComplete="email"
                    
                  />
                  <Form.Control
                    placeholder={"Seller address"}
                    value={billFromAddress}
                    type="text"
                    name="billFromAddress"
                    className="my-2"
                    autoComplete="address"
                    onChange={editField}
                    
                  />
                  <Form.Control
                    placeholder={"PAN No."}
                    value={panNo}
                    type="text"
                    name="PanNo"
                    className="my-2"
                    autoComplete="address"
                    onChange={editField}
                    
                  />
                  <Form.Control
                    placeholder={"GST Registration No."}
                    value={gstReg}
                    type="text"
                    name="gstReg"
                    className="my-2"
                    autoComplete="address"
                    onChange={editField}
                    
                  />
                </Col>
                <Col md={6}>
                  <Form.Label className="fw-bold">Billing address:</Form.Label>
                  <Form.Control
                    placeholder={"Who is this invoice to?"}
                    rows={3}
                    value={billTo}
                    type="text"
                    name="billTo"
                    className="my-2"
                    onChange={editField}
                    autoComplete="name"
                    
                  />
                  <Form.Control
                    placeholder={"Email address"}
                    value={billToEmail}
                    type="email"
                    name="billToEmail"
                    className="my-2"
                    onChange={editField}
                    autoComplete="email"
                    
                  />
                  <Form.Control
                    placeholder={"Billing address"}
                    value={billToAddress}
                    type="text"
                    name="billToAddress"
                    className="my-2"
                    autoComplete="address"
                    onChange={editField}
                    
                  />
                </Col>
                <Col md={6}>
                  <Form.Label className="fw-bold">Shipping address:</Form.Label>
                  <Form.Control
                    placeholder={"Reciever's name"}
                    rows={3}
                    value={shipTo}
                    type="text"
                    name="shipTo"
                    className="my-2"
                    onChange={editField}
                    autoComplete="name"
                    
                  />
                  <Form.Control
                    placeholder={"Email address"}
                    value={shipToEmail}
                    type="email"
                    name="shipToEmail"
                    className="my-2"
                    onChange={editField}
                    autoComplete="email"
                    
                  />
                  <Form.Control
                    placeholder={"Shipping address"}
                    value={shipToAddress}
                    type="text"
                    name="shipToAddress"
                    className="my-2"
                    autoComplete="address"
                    onChange={editField}
                    
                  />
                </Col>
              </Row>
              <InvoiceItem
                onItemizedItemEdit={onItemizedItemEdit}
                onRowAdd={handleAddEvent}
                onRowDel={handleRowDel}
                currency={currency}
                items={items}
              />
              <Row className="mt-4 justify-content-end">
                <Col lg={6}>
                  <div className="d-flex flex-row align-items-start justify-content-between">
                    <span className="fw-bold">Subtotal:</span>
                    <span>
                      {currency}
                      {subTotal}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Discount:</span>
                    <span>
                      <span className="small">({discountRate || 0}%)</span>
                      {currency}
                      {discountAmount || 0}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Tax:</span>
                    <span>
                      <span className="small">({taxRate || 0}%)</span>
                      {currency}
                      {taxAmount || 0}
                    </span>
                  </div>
                </Col>
              </Row>
              <hr className="my-4" />
              <Form.Label className="fw-bold">Notes:</Form.Label>
              <Form.Control
                placeholder="Thanks for your ordering!"
                name="notes"
                value={notes}
                onChange={editField}
                as="textarea"
                className="my-2"
                rows={1}
              />
            </Card>
          </Col>
          <Col md={4} lg={3}>
            <div className="sticky-top pt-md-3 pt-xl-4">
              <Button variant="primary" type="submit" className="w-100">
                Review Invoice
              </Button>
              <InvoiceModal
                showModal={isOpen}
                closeModal={closeModal}
                info={{
                  currentDate,
                  invoiceNumber,
                  dateOfIssue,
                  billTo,
                  billToEmail,
                  billToAddress,
                  shipTo,
                  shipToEmail,
                  shipToAddress,
                  billFrom,
                  billFromEmail,
                  billFromAddress,
                  notes,
                  total,
                  subTotal,
                  taxAmount,
                  discountAmount,
                  panNo,
                  gstReg                  
                }}
                items={items}
                currency={currency}
                subTotal={subTotal}
                taxAmount={taxAmount}
                discountAmount={discountAmount}
                total={total}
              />
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Currency:</Form.Label>
                <Form.Select
                  onChange={(event) => setCurrency(event.target.value)}
                  className="btn btn-light my-1"
                  aria-label="Change Currency"
                >
                  <option value="$">USD (United States Dollar)</option>
                  <option value="₹">INR (Indian Rupees)</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Tax rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    name="taxRate"
                    type="number"
                    value={taxRate}
                    onChange={editField}
                    className="bg-white border"
                    placeholder="0.0"
                    min="0.00"
                    step="0.01"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Discount rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    name="discountRate"
                    type="number"
                    value={discountRate}
                    onChange={editField}
                    className="bg-white border"
                    placeholder="0.0"
                    min="0.00"
                    step="0.01"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Invoice;