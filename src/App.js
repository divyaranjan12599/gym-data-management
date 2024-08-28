import React, { createContext, useContext, useEffect, useState } from "react";
import Dashboard from './components/pages/dashboard';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Navbar from "./components/inc/navbar";
import AddMembers from "./components/pages/addMembers";
import AddEnquiry from "./components/pages/addEnquiry";
import AddStaffs from "./components/pages/addStaff";
// import Pts from "./components/pages/pt";
import PtMembers from "./components/pages/ptMembers";
import Staff from "./components/pages/staff";
import StaffAttendance from "./components/pages/staffAttendance";
import StaffDetails from "./components/pages/staffDetails";
import RecentMemberships from "./components/pages/recentMemberships";
import Login from "./components/pages/login";
import Memberships from "./components/pages/memberships";
import "./App.css"
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { lookInSession } from "./components/pages/session";
import Enquiries from "./components/pages/Enquiries";
import UserDetails from "./components/pages/userDetails";
import Layout from "./Layout/Layout";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import MainLayout from "./components/pages/MainLayout";
import Invoice from "./components/pages/invoice";
import InvoiceItem from "./components/inc/invoiceItem";
import InvoiceModal from "./components/inc/invoiceModal";
import FieldEdits from "./components/inc/fieldEdits";
import Invoices from "./components/pages/invoices";
import { endDateGenerator } from "./components/inc/utilityFuncs";
import { Toaster } from 'react-hot-toast';
import { duration } from "@mui/material";

export const UserContext = createContext({})

function App() {
  const [clientData, setClientData] = useState([]);
  const [membershipData, setMembershipData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [enquiryData, setEnquiryData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [userAuth, setUserAuth] = useState({});
  const [loading, setLoading] = useState(true);

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
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-memberships");
      console.log("membership details", response.data);
      setMembershipData(response.data);
    } catch (error) {
      console.log(error);
      setMembershipData([]);
    }
  }

  const fetchClientPaymentData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-paymentDetails");
      console.log("paymentdetails", response.data);
      setPaymentData(response.data);
    } catch (error) {
      console.log(error);
      setPaymentData([]);
    }
  }

  const fetchClientData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-clients");
      console.log("clients", response.data);
      setClientData(response.data);
    } catch (error) {
      console.log(error);
      setClientData([]);
    }
  }

  const fetchEnquiryData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-enquiries");
      console.log("enquiry", response.data);
      setEnquiryData(response.data);
    } catch (error) {
      console.log(error);
      setEnquiryData([]);
    }
  }


  const fetchStaffData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-staffs");
      console.log("staff", response.data);
      setStaffData(response.data);
    } catch (error) {
      console.log(error);
      setStaffData([]);
    }
  }

  useEffect(() => {
    fetchClientMembershipData();
    fetchEnquiryData();
    fetchStaffData();
    fetchClientPaymentData();
    fetchClientData()
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth, staffData, enquiryData, clientData, membershipData, paymentData, loading }}>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/user" index element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/add_member" element={<ProtectedRoute><AddMembers /></ProtectedRoute>} />
            <Route path="/add_enquiry" element={<ProtectedRoute><AddEnquiry /></ProtectedRoute>} />
            <Route path="/add_staff" element={<ProtectedRoute><AddStaffs /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/memberships" element={<ProtectedRoute><Memberships /></ProtectedRoute>} />
            <Route path="/ptMembers" element={<ProtectedRoute><PtMembers /></ProtectedRoute>} />
            <Route path="/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
            <Route path="/enquiries" element={<ProtectedRoute><Enquiries /></ProtectedRoute>} />
            <Route path="/recentMemberships" element={<ProtectedRoute><RecentMemberships /></ProtectedRoute>} />
            <Route path="/staffAttendance" element={<ProtectedRoute><StaffAttendance /></ProtectedRoute>} />
            <Route path="/user/:userId" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
            <Route path="/staff/:staffId" element={<ProtectedRoute><StaffDetails /></ProtectedRoute>} />
            <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
            <Route path="/invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
            <Route path="/invoiceItem" element={<ProtectedRoute><InvoiceItem /></ProtectedRoute>} />
            <Route path="/invoiceModal" element={<ProtectedRoute><InvoiceModal /></ProtectedRoute>} />
            <Route path="/fieldEdits" element={<ProtectedRoute><FieldEdits /></ProtectedRoute>} />

            {/* <Route path="/memberships" element={<Memberships />} />
            <Route path="/ptMembers" element={<PtMembers />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/enquiries" element={<Enquiries />} />
            <Route path="/recentMemberships" element={<RecentMemberships />} />
            <Route path="/staffAttendance" element={<StaffAttendance />} />
            <Route path="/user/:userId" element={<UserDetails />} />
            <Route path="/staff/:staffId" element={<StaffDetails />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/invoiceGenerator" element={<InvoiceGenerator />} />
            <Route path="/invoiceItem" element={<InvoiceItem />} />
            <Route path="/invoiceModal" element={<InvoiceModal />} />
            <Route path="/fieldEdits" element={<FieldEdits />} />

            {/* <Route path="/dateRange" element={<DateRange />} /> */}
            {/* <Route path="/invoice" element={<Invoice />} /> */}
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
