import React from "react";

function invoice1() {
  return (
    <div>
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
          gstReg,
        }}
        items={items}
        currency={currency}
        subTotal={subTotal}
        taxAmount={taxAmount}
        discountAmount={discountAmount}
        total={total}
      />
    </div>
  );
}

export default invoice1;
