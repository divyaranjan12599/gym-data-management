import React, { createContext, useContext, useEffect, useState } from "react";
import Dashboard from './components/pages/dashboard';
import About from './components/pages/about';
import Contact from './components/pages/contact';
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
import "./App.css"
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { lookInSession } from "./components/pages/session";
import Enquiries from "./components/pages/Enquiries";
import MemberDetails from "./components/pages/memberDetails";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import MainLayout from "./components/pages/MainLayout";
import Invoice from "./components/pages/invoice";
import InvoiceItem from "./components/inc/invoiceItem";
import InvoiceModal from "./components/inc/invoiceModal";
import FieldEdits from "./components/inc/fieldEdits";
import Invoices from "./components/pages/invoices";
import { Toaster } from 'react-hot-toast';

export const UserContext = createContext({})

function App() {
  const [clientData, setClientData] = useState([]);
  const [membershipData, setMembershipData] = useState([]);
  const [ptmembershipData, setPtMembershipData] = useState([]);
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

  const fetchPtMembershipData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-ptDetails");
      console.log("pt membership details", response.data);
      setPtMembershipData(response.data);
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
    fetchPtMembershipData();
    fetchEnquiryData();
    fetchStaffData();
    fetchClientPaymentData();
    fetchClientData()
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth, ptmembershipData, staffData, enquiryData, clientData, membershipData, paymentData, loading }}>
      <Router>
        <Routes>
          <Route path="/login" index element={<Login />} />
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" />} />
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
            <Route path="/user/:userId" element={<ProtectedRoute><MemberDetails /></ProtectedRoute>} />
            <Route path="/staff/:staffId" element={<ProtectedRoute><StaffDetails /></ProtectedRoute>} />
            <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
            <Route path="/invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
            <Route path="/invoiceItem" element={<ProtectedRoute><InvoiceItem /></ProtectedRoute>} />
            <Route path="/invoiceModal" element={<ProtectedRoute><InvoiceModal /></ProtectedRoute>} />
            <Route path="/fieldEdits" element={<ProtectedRoute><FieldEdits /></ProtectedRoute>} />
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
