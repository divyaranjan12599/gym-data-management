import React, { createContext, useContext, useEffect, useState } from "react";
import Home from './components/pages/home';
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
import DateRange from "./components/inc/dateRange";

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
      console.log("membership details",response.data);
      setMembershipData(response.data);
    } catch (error) {
      console.log(error);
      setMembershipData([]);
    }
  }

  const fetchClientPaymentData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-paymentDetails");
      console.log("paymentdetails",response.data);
      setPaymentData(response.data);
    } catch (error) {
      console.log(error);
      setPaymentData([]);
    }
  }

  const fetchClientData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-clients");
      console.log("clients",response.data);
      setClientData(response.data);
    } catch (error) {
      console.log(error);
      setClientData([]);
    }
  }

  const fetchEnquiryData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-enquiries");
      console.log("enquiry",response.data);
      setEnquiryData(response.data);
    } catch (error) {
      console.log(error);
      setEnquiryData([]);
    }
  }

  const fetchStaffData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-staffs");
      console.log("staff",response.data);
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
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth, staffData, enquiryData, clientData, membershipData, paymentData, loading }}>
      <Router>
        <Navbar/>
        <Routes>
          <Route index element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="/add_member" element={<AddMembers />} />
            <Route path="/add_enquiry" element={<AddEnquiry />} />
            <Route path="/add_staff" element={<AddStaffs />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/memberships" element={<Memberships />} />
            <Route path="/ptMembers" element={<PtMembers />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/enquiries" element={<Enquiries />} />
            <Route path="/recentMemberships" element={<RecentMemberships />} />
            <Route path="/staffAttendance" element={<StaffAttendance />} />
            <Route path="/userDetails" element={<UserDetails />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/invoiceItem" element={<InvoiceItem />} />
            <Route path="/invoiceModal" element={<InvoiceModal />} />
            <Route path="/fieldEdits" element={<FieldEdits />} />
            <Route path="/dateRange" element={<DateRange />} />
            {/* <Route path="/invoice" element={<Invoice />} /> */}
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
