import React, { useContext, useState } from "react";
import Table from "../inc/table";
import ReactDatePicker from "react-datepicker";
import { UserContext } from "../../App";
import axios from "axios";
import toast from "react-hot-toast";

const Expenses = () => {
	const [formData, setFormData] = useState({
		detail: "",
		amount: "",
		paidOn: new Date(),
	});

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
		} catch (error) {
			toast.error("Can't add expense now. Please Try Again Later!!");
			console.log(error);
		}
		// console.log("Form Expense data submitted:", formData);
	};

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
						<div className="col-6">
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
				{/* <Table rows={rows} columns={columns} /> */}
			</div>
		</div>
	);
};

export default Expenses;
