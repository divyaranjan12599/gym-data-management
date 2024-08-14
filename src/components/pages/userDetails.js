import React, { useContext, useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import defaultImage from "../icons/user.png";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import { UserContext } from "../../App";
import Table from "../inc/table";
import { endDateGenerator } from "../inc/utilityFuncs";

function UserDetails() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  const [image, selectImage] = useState({
    placeholder: defaultImage,
    files: null,
  });


  const { membershipData, paymentData, clientData } = useContext(UserContext);

  useEffect(() => {
    const user = membershipData?.find((membership) => membership.membershipBy.id == userId)
    if (user) {
      setUserData(user);
      console.log(user);
    } else {
      console.error("User not found");
    }
  }, [userId, clientData, membershipData]);

  const membershipRows = useMemo(() => {
    return membershipData?.map((membership, index) => ({
      id: membership?.membershipBy?.id || "N/A",
      name: membership?.membershipBy?.name || "N/A",
      phone: membership?.membershipBy?.contact || "N/A",
      email: membership?.membershipBy?.email || "N/A",
      package: membership?.membershipPeriod || "N/A",
      startDate: membership?.membershipBy?.joiningdate || "N/A",
      endDate: membership?.endDate || "N/A",
      status: membership?.status || "N/A",
      photoURL:
        membership?.membershipBy?.photoUrl ||
        "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
    })) || [];
  }, [membershipData]);

  const paymentRows = useMemo(() => {
    return paymentData?.map((payment, index) => ({
      id: payment?.amountPaidBy?.id || "N/A",
      amount_paid: payment?.amountPaid || "N/A",
      mode: payment?.mode || "N/A",
      due_date: payment?.dueDate || "N/A",
    })) || [];
  }, [paymentData]);

  const membershipColumns = useMemo(
    () => [
      {
        field: "photoURL",
        headerName: "Avatar",
        width: 90,
        renderCell: (params) => <Avatar src={params.row.photoURL} alt="Avatar" />,
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
      { field: "status", headerName: "Status", width: 140 },
    ],
    []
  );

  const paymentColumns = useMemo(
    () => [
      { field: "id", headerName: "Client ID", width: 90 },
      { field: "mode", headerName: "Mode", width: 90 },
      { field: "amount_paid", headerName: "Amount Paid", width: 140 },
      { field: "due_date", headerName: "Due Date", width: 140 },
    ],
    []
  );

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <h1 className="userHeading mt-3 d-flex justify-content-center">
        User Info
      </h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow p-2">
              <div className="d-flex justify-content-end">
                <button className="btn btn-light">
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              </div>
              <div className="d-flex justify-content-center">
                <img
                  className="rounded-circle"
                  style={{ width: "80%" }}
                  src={userData.membershipBy.photoUrl || defaultImage}
                  alt="User"
                />
              </div>
              <label className="userLabel mt-3 text-lg-center">{userData.membershipBy.name}</label>
              <label className="userLabel text-lg-center text-body-tertiary">
                {userData.membershipBy.contact}
              </label>
              <label className="userLabel text-lg-center text-body-tertiary">
                {userData.membershipBy.address.city}, {userData.membershipBy.address.state}
              </label>
              <div className="card mt-5 h-100 shadow p-3">
                <div>
                  <label className="headLabel">Client ID</label>
                  <label className="smallLabel">{userData.membershipBy.id}</label>
                </div>
                <hr />
                <div>
                  <label className="headLabel">Email ID</label>
                  <label className="smallLabel">{userData.membershipBy.email}</label>
                </div>
                <hr />
                <div>
                  <label className="headLabel">Gender</label>
                  <label className="smallLabel">{userData.membershipBy.gender}</label>
                </div>
                <hr />
                <div>
                  <label className="headLabel">Joining Date</label>
                  <label className="smallLabel">{userData.membershipBy.joiningdate}</label>
                </div>
                <hr />
                <div>
                  <label className="headLabel">End Date</label>
                  <label className="smallLabel">{endDateGenerator(userData.startingDate, userData.membershipPeriod)}</label>
                </div>
                <hr />
                <div>
                  <label className="headLabel">Membership</label>
                  <label className="smallLabel">{userData.membershipPeriod}</label>
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card shadow w-100 p-2 mb-2">
              <h3>Membership History</h3>
              <Table rows={membershipRows} columns={membershipColumns} />
            </div>
            <div className="card shadow w-100 p-2">
              <h3>Payment History</h3>
              <Table rows={paymentRows} columns={paymentColumns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
