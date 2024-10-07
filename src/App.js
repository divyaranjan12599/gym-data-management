import React, { createContext, useContext, useEffect, useState } from "react";
import Dashboard from "./components/pages/dashboard";
import About from "./components/pages/about";
import Contact from "./components/pages/contact";
import AddMembers from "./components/pages/addMembers";
import AddEnquiry from "./components/pages/addEnquiry";
import AddStaffs from "./components/pages/addStaff";
import PtMembers from "./components/pages/ptMembers";
import Staff from "./components/pages/staff";
import StaffAttendance from "./components/pages/staffAttendance";
import StaffDetails from "./components/pages/staffDetails";
import RecentMemberships from "./components/pages/recentMemberships";
import Login from "./components/pages/login";
import Memberships from "./components/pages/memberships";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { logOutUser, lookInSession } from "./components/pages/session";
import Enquiries from "./components/pages/Enquiries";
import MemberDetails from "./components/pages/memberDetails";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import MainLayout from "./components/pages/MainLayout";
import Invoice from "./components/pages/invoice";
import InvoiceItem from "./components/inc/invoiceItem";
import InvoiceModal from "./components/inc/invoiceModal";
import FieldEdits from "./components/inc/fieldEdits";
import Invoices from "./components/pages/invoices";
import toast, { Toaster } from "react-hot-toast";
import UserProfile from "./components/pages/userProfile";
import Expenses from "./components/pages/expenses";
import Revenue from "./components/pages/Revenue";

export const UserContext = createContext({});

function App() {
	const [clientData, setClientData] = useState([]);
	const [membershipData, setMembershipData] = useState([]);
	const [ptmembershipData, setPtMembershipData] = useState([]);
	const [paymentData, setPaymentData] = useState([]);
	const [enquiryData, setEnquiryData] = useState([]);
	const [staffData, setStaffData] = useState([]);
	const [userAuth, setUserAuth] = useState({});
	const [loading, setLoading] = useState(true);
	const [verified, setVerified] = useState(false);

	const [staffUser, setStaffUser] = useState();

	console.log("Verified : ", verified);

	useEffect(() => {
		let userInSession = lookInSession("user");
		if (userInSession) {
			setUserAuth(JSON.parse(userInSession));
		} else {
			setUserAuth({ access_token: null });
		}
		setLoading(false);
	}, []);

	const fetchClientMembershipData = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-memberships", {
				headers: {
					Authorization: `Bearer ${userAuth?.token}`,
				},
			});
			console.log("membership details", response.data);
			setMembershipData(response.data);
		} catch (error) {
			console.log(error);
			setMembershipData([]);
		}
	};

	const fetchPtMembershipData = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-ptDetails", {
				headers: {
					Authorization: `Bearer ${userAuth?.token}`,
				},
			});
			console.log("pt membership details", response.data);
			setPtMembershipData(response.data);
		} catch (error) {
			console.log(error);
			setMembershipData([]);
		}
	};

	const fetchClientPaymentData = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-paymentDetails", {
				headers: {
					Authorization: `Bearer ${userAuth?.token}`,
				},
			});
			console.log("paymentdetails", response.data);
			setPaymentData(response.data);
		} catch (error) {
			console.log(error);
			setPaymentData([]);
		}
	};

	const fetchClientData = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-clients", {
				headers: {
					Authorization: `Bearer ${userAuth?.token}`,
				},
			});
			console.log("clients", response.data);
			setClientData(response.data);
		} catch (error) {
			console.log(error);
			setClientData([]);
		}
	};

	const fetchEnquiryData = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-enquiries", {
				headers: {
					Authorization: `Bearer ${userAuth?.token}`,
				},
			});
			console.log("enquiry", response.data);
			setEnquiryData(response.data);
		} catch (error) {
			console.log(error);
			setEnquiryData([]);
		}
	};

	const fetchStaffData = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-staffs", {
				headers: {
					Authorization: `Bearer ${userAuth?.token}`,
				},
			});
			console.log("staff", response.data);
			setStaffData(response.data);
		} catch (error) {
			console.log(error);
			setStaffData([]);
		}
	};
	const fetchStaffUser = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-myusers", {
				headers: {
					Authorization: `Bearer ${userAuth?.token}`,
				},
			});
			console.log("staff users", response.data);
			setStaffUser(response.data);
		} catch (error) {
			console.log(error);
			setStaffUser('');
		}
	};

	const handleLogout = () => {
		toast.error("Session Expired. Login in again.");
		logOutUser("user");
		setUserAuth({ access_token: null });
		setVerified(false);
		window.location.href = "/login";
	};

	const checkJWT = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/check", {
				headers: {
					Authorization: `Bearer ${userAuth?.token}`,
				},
			});
			setVerified(true);
		} catch (error) {
			if (error.response && error.response.status === 401) {
				console.log("Token expired, logging out...");
				handleLogout();
			} else {
				console.log(error);
			}
		}
	};


	useEffect(() => {
		if (userAuth.token) {
			const interval = setInterval(() => {
				checkJWT();
				console.log("Check : ", userAuth?.token);
			}, 60000);

			return () => clearInterval(interval);
		}
	}, [userAuth]);

	useEffect(() => {
		if (userAuth.token) {
			fetchClientMembershipData();
			fetchPtMembershipData();
			fetchEnquiryData();
			fetchStaffData();
			fetchClientPaymentData();
			fetchClientData();
			fetchStaffUser();
		}
	}, [
		userAuth,
		// , clientData, membershipData, paymentData, staffData, ptmembershipData
	]);

	console.log("userAuth : ", userAuth);

	return (
		<UserContext.Provider value={{ userAuth, staffUser, setUserAuth, ptmembershipData, staffData, enquiryData, clientData, membershipData, paymentData, loading }}>
			<Router>
				<Routes>
					<Route path="/login" index element={<Login />} />
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<MainLayout />
							</ProtectedRoute>
						}
					>
						<Route index element={<Navigate to="/dashboard" />} />
						<Route
							path="/add_member"
							element={
								<ProtectedRoute>
									<AddMembers />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/add_enquiry"
							element={
								<ProtectedRoute>
									<AddEnquiry />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/add_staff"
							element={
								<ProtectedRoute>
									<AddStaffs />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
						<Route
							path="/memberships"
							element={
								<ProtectedRoute>
									<Memberships />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/add-user"
							element={
								<ProtectedRoute>
									<Memberships />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/ptMembers"
							element={
								<ProtectedRoute>
									<PtMembers />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/staff"
							element={
								<ProtectedRoute>
									<Staff />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/enquiries"
							element={
								<ProtectedRoute>
									<Enquiries />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/recentMemberships"
							element={
								<ProtectedRoute>
									<RecentMemberships />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/staffAttendance"
							element={
								<ProtectedRoute>
									<StaffAttendance />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/user/:userId"
							element={
								<ProtectedRoute>
									<MemberDetails />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/staff/:staffId"
							element={
								<ProtectedRoute>
									<StaffDetails />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/invoices"
							element={
								<ProtectedRoute>
									<Invoices />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/expenses"
							element={
								<ProtectedRoute>
									<Expenses />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/revenue"
							element={
								<ProtectedRoute>
									<Revenue/>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/invoice"
							element={
								<ProtectedRoute>
									<Invoice />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/invoiceItem"
							element={
								<ProtectedRoute>
									<InvoiceItem />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/invoiceModal"
							element={
								<ProtectedRoute>
									<InvoiceModal />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/fieldEdits"
							element={
								<ProtectedRoute>
									<FieldEdits />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/userprofile"
							element={
								<ProtectedRoute>
									<UserProfile />
								</ProtectedRoute>
							}
						/>
					</Route>
				</Routes>

				<Toaster
					position="top-center"
					toastOptions={{
						duration: 3000,
					}}
				/>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
