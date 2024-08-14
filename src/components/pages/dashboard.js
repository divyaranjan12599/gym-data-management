import React, { useContext, useMemo } from "react";
import { UserContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import Table from "../inc/table";
import Button from '@mui/material/Button';
import { endDateGenerator } from "../inc/utilityFuncs";

function Dashboard() {

    let { membershipData, enquiryData, paymentData } = useContext(UserContext);

    let memColumns = useMemo(
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
            {
                field: 'actions',
                headerName: 'Action',
                width: 150,
                renderCell: (params) => (
                    <Button
                        variant="contained"
                        color="primary"
                    // onClick={() => sendEmail(params.row.email)}
                    >
                        Remind
                    </Button>
                ),
            },
        ],
        []
    );

    const memRows = membershipData.map((membership, index) => ({
        id: membership.membershipBy.id || "N/A",
        name: membership.membershipBy.name || "N/A",
        phone: membership.membershipBy.contact || "N/A",
        email: membership.membershipBy.email || "N/A",
        package: membership.membershipPeriod || "N/A",
        startDate: membership.membershipBy.joiningdate || "N/A",
        endDate: endDateGenerator(membership.membershipBy.joiningdate, membership.membershipPeriod) || "N/A",
        // amount: membership.paymentDetails.amountPaid,
        // remaining: membership.paymentDetails.amountRemaining,
        status: membership.status || "N/A",
        photoURL: membership.membershipBy.photoUrl || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
    }));

    // const recentMemRows = memRows;
    // recentMemRows.sort((a, b) => {
    //     const dateA = new Date(a.startDate);
    //     const dateB = new Date(b.startDate);

    //     if (isNaN(dateA) && isNaN(dateB)) {
    //         return 0; // both dates are invalid
    //     } else if (isNaN(dateA)) {
    //         return 1; // only dateA is invalid, push it to the end
    //     } else if (isNaN(dateB)) {
    //         return -1; // only dateB is invalid, push it to the end
    //     } else {
    //         return dateB - dateA; // valid dates comparison
    //     }
    // });

    const memEndingRows = memRows;
    memEndingRows.sort((a, b) => {
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

    let enqColumns = useMemo(
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
            { field: "email", headerName: "Email", width: 180 },
            { field: "enquiryDate", headerName: "Enquiry Date", width: 150 },
            { field: "lastFollowUpDate", headerName: "Last FollowUp Date", width: 150 },
            { field: "referredBy", headerName: "Referred By", width: 150 },
            { field: "attainBy", headerName: "Attained By", width: 150 },
            { field: "intrestedOn", headerName: "Intrested On", width: 140 },
            { field: "source", headerName: "Source", width: 140 },
        ],
        []
    );

    const enqRows = enquiryData.map((enquiry, index) => ({
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

    let recentEnq = enqRows;
    recentEnq.sort((a, b) => {
        const dateA = new Date(a.enquiryDate);
        const dateB = new Date(b.enquiryDate);

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

    let payColumns = useMemo(
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
            { field: "paymentDate", headerName: "Payment On", width: 180 },
            { field: "amountPaid", headerName: "Amount Paid", width: 150 },
            { field: "amountRemaining", headerName: "Amount Remaining", width: 150 },
            { field: "dueDate", headerName: "Due Date", width: 150 },
            { field: "transactionId", headerName: "Transaction Id", width: 140 },
            {
                field: 'actions',
                headerName: 'Action',
                width: 150,
                renderCell: (params) => (
                    <Button
                        variant="contained"
                        color="primary"
                    // onClick={() => sendEmail(params.row.email)}
                    >
                        Remind
                    </Button>
                ),
            },
        ],
        []
    );

    const payRows = paymentData.map((payment, index) => ({
        id: payment.amountPaidBy.id || "N/A",
        name: payment.amountPaidBy.name || "N/A",
        phone: payment.amountPaidBy.contact || "N/A",
        email: payment.amountPaidBy.email || "N/A",
        paymentDate: payment.amountPaidOn || "N/A",
        amountPaid: payment.amountPaid || "N/A",
        amountRemaining: payment.amountRemaining || "N/A",
        dueDate: payment.dueDate || "N/A",
        transactionId: payment.transactionId || "N/A",
        // remaining: payment.paymentDetails.amountRemaining,
        status: payment.status || "N/A",
        photoURL: payment.amountPaidBy.photoUrl || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
        actions: "N/A",
    }));

    let dueDateRows = payRows;
    dueDateRows.sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);

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
                        <h3>Payment Reminders</h3>
                        <Table rows={dueDateRows} columns={payColumns} />
                    </div>
                    <div className="col-12">
                        <div className="card mb-2 text-center">
                            <h3>Membership Ending</h3>
                            <Table rows={memEndingRows} columns={memColumns} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card mb-2 text-center">
                            <h3>Recent Enquiries</h3>
                            <Table rows={recentEnq} columns={enqColumns} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;