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
            { field: "name", headerName: "Name", flex: 1 },
            { field: "email", headerName: "Email ID", flex:    1 },
            { field: "phone", headerName: "Phone Number", flex:    1 },
            { field: "package", headerName: "Package", flex:   1 },
            { field: "startDate", headerName: "Start Date", flex:  1 },
            { field: "endDate", headerName: "End Date", flex:  1 },
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
        id: index,
        name: membership?.membershipBy?.name || "N/A",
        phone: membership?.membershipBy?.contact || "N/A",
        email: membership?.membershipBy?.email || "N/A",
        package: membership?.membershipPeriod || "N/A",
        startDate: membership?.membershipBy?.joiningdate || "N/A",
        // endDate: endDateGenerator(membership?.membershipBy?.joiningdate, membership?.membershipPeriod) || "N/A",
        // amount: membership.paymentDetails.amountPaid,
        // remaining: membership.paymentDetails.amountRemaining,
        status: membership?.status || "N/A",
        photoURL: membership?.membershipBy?.photoUrl || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
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
            { field: "name", headerName: "Name", flex: 1 },
            { field: "phone", headerName: "Phone Number", flex:    1 },
            { field: "email", headerName: "Email", flex:   1 },
            { field: "enquiryDate", headerName: "Enquiry Date", flex:  1 },
            { field: "lastFollowUpDate", headerName: "Last FollowUp Date", flex:   1 },
            { field: "referredBy", headerName: "Referred By", flex:    1 },
            { field: "attainBy", headerName: "Attained By", flex:  1 },
            { field: "intrestedOn", headerName: "Intrested On", flex:  1 },
            { field: "source", headerName: "Source", flex: 1 },
        ],
        []
    );

    const enqRows = enquiryData?.map((enquiry, index) => ({
        id: index,
        name: enquiry?.name || "N/A",
        phone: enquiry?.contact || "N/A",
        email: enquiry?.email || "N/A",
        referredBy: enquiry?.referredBy || "None",
        attainBy: enquiry?.attainBy.name || "None",
        enquiryDate: enquiry?.enquiryDate || "N/A",
        lastFollowUpDate: enquiry?.lastFollowUpDate || "N/A",
        intrestedOn: enquiry?.intrestedOn || "N/A",
        balance: enquiry?.balance || "N/A",
        source: enquiry?.source || "N/A",
        photoURL: enquiry?.photoUrl || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
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
            { field: "name", headerName: "Name", flex: 1 },
            { field: "email", headerName: "Email ID", flex:    1 },
            { field: "phone", headerName: "Phone Number", flex:    1 },
            { field: "paymentDate", headerName: "Payment On", flex:    1 },
            { field: "amountPaid", headerName: "Amount Paid", flex:    1 },
            { field: "amountRemaining", headerName: "Amount Remaining", flex:  1 },
            { field: "dueDate", headerName: "Due Date", flex:  1 },
            { field: "transactionId", headerName: "Transaction Id", flex:  1 },
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

    const payRows = paymentData?.map((payment, index) => ({
        id: index,
        name: payment?.amountPaidBy?.name || "N/A",
        phone: payment?.amountPaidBy?.contact || "N/A",
        email: payment?.amountPaidBy?.email || "N/A",
        paymentDate: payment?.amountPaidOn || "N/A",
        amountPaid: payment?.amountPaid || "N/A",
        amountRemaining: payment?.amountRemaining || "N/A",
        dueDate: payment?.dueDate || "N/A",
        transactionId: payment?.transactionId || "N/A",
        // remaining: payment?.paymentDetails.amountRemaining,
        status: payment?.status || "N/A",
        photoURL: payment?.amountPaidBy?.photoUrl || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
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
        <div className="container-fluid mt-2">
            <div class="row justify-content-around">
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