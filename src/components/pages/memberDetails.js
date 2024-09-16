import React, { useContext, useMemo, useState, useEffect, useRef } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import axios from "axios";

function MemberDetails() {
	const [clientData, setClientData] = useState("");
	const [paymentData, setPaymentData] = useState("");
	const [memData, setMemData] = useState("");
	const [ptData, setPtData] = useState("");
	const {
		userAuth: { token },
	} = useContext(UserContext);




	const fetchClientData = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/user/get-client/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
      console.log("Client Data : ", response.data);
			setClientData(response.data);
		} catch (error) {
			console.log(error);
			setClientData("");
		}
	};
	const fetchPaymentData = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/user/get-paymentDetails/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
      console.log("Payment Data : ", response.data);

			setPaymentData(response.data);
		} catch (error) {
			console.log(error);
			setPaymentData("");
		}
	};
	const fetchMemData = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/user/get-memberships/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
      console.log("Mem Data : ", response.data);

			setMemData(response.data);
		} catch (error) {
			console.log(error);
			setMemData("");
		}
	};
	const fetchPtData = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/user/get-ptDetails/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
      console.log("Pt Data : ", response.data);

			setPtData(response.data);
		} catch (error) {
			console.log(error);
			setPtData("");
		}
	};

	const { userId } = useParams();

	useEffect(() => {
    fetchClientData();
    fetchPaymentData();
    fetchMemData();
    fetchPtData()
  }, [token]);

	return <>hello</>;
}

export default MemberDetails;
