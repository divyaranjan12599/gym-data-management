import React from "react";

let date = 10;
let month = 8;
let year = 2024;

let CurrentDate = () => {
  let exactDate = date + "/" + month + "/" + year;

  return exactDate;
};

let startDate = CurrentDate();

console.log(startDate)

let selected = "half-yearly";
let endDate;

if (selected == "monthly") {
  for (let i = 0; i < 1; i++) {
    if (month >= 13) {
      month = 1;
      year = year + 1;
    }
    month = month + 1;
  }
  endDate = date + "/" + month + "/" + year;
}
if (selected == "quarterly") {
  for (let i = 0; i < 3; i++) {
    if (month >= 13) {
      month = 1;
      year = year + 1;
    }
    month = month + 1;
  }
  endDate = date + "/" + month + "/" + year;
}
if (selected == "half-yearly") {
  for (let i = 0; i < 6; i++) {
    if (month >= 13) {
      month = 1;
      year = year + 1;
    }
    month = month + 1;
  }
  endDate = date + "/" + month + "/" + year;
}

console.log(endDate);

function DateRange() {
  return( 
    <div className="container-fluid">
    <h1 className="d-flex justify-content-center text-primary">Selected : {selected}</h1>
  <h3>
    start date : {startDate}
  </h3>
  <h3>
    end date : {endDate}
  </h3>
    </div>
  )
}

export default DateRange;
