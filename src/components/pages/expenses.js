import React, { useContext, useEffect, useMemo, useState } from "react";
import Table from "../inc/table";
import ReactDatePicker from "react-datepicker";
import { UserContext } from "../../App";
import axios from "axios";
import toast from "react-hot-toast";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Expenses = () => {
    const { userAuth } = useContext(UserContext);

    const [formData, setFormData] = useState({
        detail: "",
        amount: "",
        paidOn: new Date(),
    });

    const [exData, setExData] = useState([]);
    const fetchExpenseData = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/user/expenses/get-expense`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Expense Data : ", response.data);
            setExData(response.data);
        } catch (error) {
            console.log(error);
            setExData([]);
        }
    };

    const {
        userAuth: { token },
    } = useContext(UserContext);

    const handleChange = (e) => {
        console.log(e);

        if (e.target) {
            const { name, value, type } = e.target;
            if (name) {
                setFormData({
                    ...formData,
                    [name]: value,
                });
            }
        } else
            setFormData({
                ...formData,
                ["paidOn"]: new Date(e),
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                process.env.REACT_APP_SERVER_URL + "/user/expenses/create",
                {
                    amountPaid: formData.amount,
                    amountPaidOn: formData.paidOn,
                    paidFor: formData.detail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Expense Added Successfully!!");
            window.location.reload();
        } catch (error) {
            toast.error("Can't add expense now. Please Try Again Later!!");
            console.log(error);
        }
        // console.log("Form Expense data submitted:", formData);
    };


    let columns = useMemo(
        () => [
            { field: "id", headerName: "Id", flex: 1 },
            { field: "paidFor", headerName: "Detail", flex: 1 },
            { field: "amountPaidOn", headerName: "Paid Date", flex: 1 },
            { field: "amountPaid", headerName: "Amount", flex: 1 },
            {
                field: 'actions',
                headerName: 'View',
                flex: 1,
                renderCell: (params) => (
                    <Button
                        className="btn btn-danger"
                        onClick={() => { handleDelete(params.row) }}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                ),
            },
        ],
        [exData]
    );

    const rows = exData
        .map((ex, index) => {
            return {
                id: index+1,
                paidFor: ex.paidFor,
                amountPaidOn: ex.amountPaidOn,
                amountPaid: ex.amountPaid,
                exId: ex._id,
            };
        });

    const handleDelete = async (row) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this expense?");

        if (!isConfirmed) {
            return;
        }
        const exId = row.exId;
        console.log(exId);
        
        toast.loading("Deleting user");
        try {
            const response = await axios.delete(process.env.REACT_APP_SERVER_URL + `/user/expenses/delete/${exId}`, {
                headers: {
                    Authorization: `Bearer ${userAuth?.token}`,
                },
            });
            toast.dismiss();
            toast.success("User deleted successfully!!");
        } catch (error) {
            console.log(error);
            toast.dismiss();
            toast.error(error.response.data.message);
        }
        window.location.reload();
    }

    useEffect(() => {
        fetchExpenseData();
    }, [token]);

    return (
        <div className="container-fluid">
            <div className="card mb-4 pt-4 p-2">
                <form className="d-flex flex-column justify-content-center align-items-center mb-2 w-100" onSubmit={handleSubmit}>
                    <div className="row w-100">
                        <div className="col-12">
                            <label>Expense Detail:</label>
                            <input className="form-control" type="text" name="detail" value={formData.detail} onChange={handleChange} />
                        </div>
                        <div className="col-6">
                            <label>Amount Paid:</label>
                            <input className="form-control" type="number" name="amount" value={formData.amount} onChange={handleChange} />
                        </div>
                        <div className="col-6 d-flex flex-column">
                            <label>Amount Paid On:</label>
                            <ReactDatePicker
                                // selected={enquiryData.lastFollowUpOn}
                                selected={formData.paidOn}
                                onChange={handleChange}
                                name="paidOn"
                                // showTimeSelect
                                // timeFormat="HH:mm"
                                // timeIntervals={15}
                                dateFormat="MMMM d, yyyy"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-end p-0">
                        <button onClick={handleSubmit} className="btn btn-primary m-2">
                            Submit
                        </button>
                    </div>
                </form>
                <Table rows={rows} columns={columns} />
            </div>
        </div>
    );
};

export default Expenses;
