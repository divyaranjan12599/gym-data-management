import React, { useContext, useMemo } from "react";
import { UserContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import Table from "../inc/table";

function Home() {

    let { clientData } = useContext(UserContext);

    let clientColumns = useMemo(
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
            { field: "phone", headerName: "Phone Number", width: 170 },
            { field: "package", headerName: "Package", width: 180 },
            { field: "startDate", headerName: "Start Date", width: 150 },
            { field: "endDate", headerName: "End Date", width: 150 },
            { field: "amount", headerName: "Amount", width: 140 },
            { field: "balance", headerName: "Balance", width: 140 },
            {
                field: "status",
                headerName: "Status",
                width: 100,
                type: "boolean",
                editable: true,
            },
        ],
        []
    );

    const rows = clientData.map((client, index) => ({
        id: client.id || "N/A",
        name: client.name || "N/A",
        phone: client.contact || "N/A",
        package: client.membership.membershipPeriod || "N/A",
        startDate: client.joiningdate || "N/A",
        endDate: client.endDate || "N/A",
        amount: client.paymentDetails.amountPaid,
        balance: client.paymentDetails.amountRemaining,
        status: client.status || "N/A",
        photoURL: client.photoUrl || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
    }));

    const recentMemRows = rows;
    recentMemRows.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);

        if (isNaN(dateA) && isNaN(dateB)) {
            return 0; // both dates are invalid
        } else if (isNaN(dateA)) {
            return 1; // only dateA is invalid, push it to the end
        } else if (isNaN(dateB)) {
            return -1; // only dateB is invalid, push it to the end
        } else {
            return dateB - dateA; // valid dates comparison
        }
    });

    const MemEndingRows = rows;
    MemEndingRows.sort((a, b) => {
        const dateA = new Date(a.endDate);
        const dateB = new Date(b.endDate);

        if (isNaN(dateA) && isNaN(dateB)) {
            return 0; // both dates are invalid
        } else if (isNaN(dateA)) {
            return 1; // only dateA is invalid, push it to the end
        } else if (isNaN(dateB)) {
            return -1; // only dateB is invalid, push it to the end
        } else {
            return dateB - dateA; // valid dates comparison
        }
    });



    return (
        <div className="container mt-2">
            <div class="row justify-content-around">
                <div className="col-6">
                    <div className="card mb-2 text-center">
                        <div class="card-header">
                            Featured
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary"><FontAwesomeIcon icon={faMessage} />Send Message</a>
                        </div>
                        <div class="card-footer text-muted">
                            2 days ago
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card mb-2 text-center">
                        <div class="card-header">
                            Featured
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary"><FontAwesomeIcon icon={faMessage} />Send Message</a>
                        </div>
                        <div class="card-footer text-muted">
                            2 days ago
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card mb-2 text-center">
                        {/* <div class="card-header">
                            Featured
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary"><FontAwesomeIcon icon={faMessage} />Send Message</a>
                        </div>
                        <div class="card-footer text-muted">
                            2 days ago
                        </div> */}
                        <h3>New Memberships</h3>
                        <Table rows={rows} columns={clientColumns}/>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card mb-2 text-center">
                        <h3>Recent Renewals</h3>
                        <Table rows={rows} columns={clientColumns}/>
                    </div>
                    <div className="col-12">
                        <div className="card mb-2 text-center">
                            <h3>Due Date NearBy</h3>
                            <Table rows={rows} columns={clientColumns}/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card mb-2 text-center">
                            <h3>Recent Enquiries</h3>
                            <Table rows={rows} columns={clientColumns}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;