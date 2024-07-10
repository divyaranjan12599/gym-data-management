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
import Invoice from "./components/pages/invoicepages/invoice";
import StateContext from "./components/pages/invoicepages/stateContext";
import Layout from "./Layout/Layout";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import MainLayout from "./components/pages/MainLayout";

export const UserContext = createContext({})

function App() {
  const [clientData, setClientData] = useState([]);
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

  const fetchClientData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-clients");
      setClientData(response.data);
    } catch (error) {
      console.log(error);
      setClientData([]);
    }
  }

  const fetchEnquiryData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-enquiries");
      setEnquiryData(response.data);
    } catch (error) {
      console.log(error);
      setEnquiryData([]);
    }
  }

  const fetchStaffData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-staffs");
      setStaffData(response.data);
    } catch (error) {
      console.log(error);
      setStaffData([]);
    }
  }

  useEffect(() => {
    fetchClientData();
    fetchEnquiryData();
    fetchStaffData();
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth, staffData, enquiryData, clientData, loading }}>
      <Router>

        <Navbar clientData={clientData} staffData={staffData} enquiryData={enquiryData} />
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
            {/* <Route path="/pt" element={<Pts />} /> */}
            <Route path="/ptMembers" element={<PtMembers />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/enquiries" element={<Enquiries />} />
            <Route path="/recentMemberships" element={<RecentMemberships />} />
            <Route path="/staffAttendance" element={<StaffAttendance />} />
            {/* <Route path="/pts" element={<Pts />} /> */}
            <Route path="/invoice" element={<Invoice />} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
