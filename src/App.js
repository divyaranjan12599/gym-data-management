import React, { createContext, useContext, useEffect, useState } from "react";
import Home from './components/pages/home';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Navbar from "./components/inc/navbar";
import AddMembers from "./components/pages/addMembers";
import AddEnquiry from "./components/pages/addEnquiry";
import AddStaffs from "./components/pages/addStaff";
import Pts from "./components/pages/pt";
import PtMembers from "./components/pages/ptMembers";
import Staff from "./components/pages/staff";
import StaffAttendance from "./components/pages/staffAttendance";
import RecentMemberships from "./components/pages/recentMemberships";
import Invoice from "./components/pages/invoice";
import Login from "./components/pages/login";
import Memberships from "./components/pages/memberships";
import "./App.css"
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { lookInSession } from "./components/pages/session";
import Enquiries from "./components/pages/Enquiries";
import Layout from "./Layout/Layout";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import RedirectToHome from "./components/Protected/RedirectToHome";
import MainLayout from "./components/pages/MainLayout";

export const UserContext = createContext({})

function App() {
  const [clientData, setClientData] = useState([]);
  const [enquiryData, setEnquiryData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [userAuth, setUserAuth] = useState({});
  const [loading, setLoading] = useState(true); // Add a loading state


  useEffect(() => {
    let userInSession = lookInSession("user");
    if (userInSession) {
      setUserAuth(JSON.parse(userInSession));
    } else {
      setUserAuth({ access_token: null });
    }
    setLoading(false); // Set loading to false after setting userAuth
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
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/user/get-enquirys");
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
        <Routes>
          <Route index element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>

            <Route path="/add_member" element={<ProtectedRoute><AddMembers /></ProtectedRoute>} />
            <Route path="/add_enquiry" element={<ProtectedRoute><AddEnquiry /></ProtectedRoute>} />
            <Route path="/add_staff" element={<ProtectedRoute><AddStaffs /></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path="/memberships" element={<ProtectedRoute><Memberships /></ProtectedRoute>} />
            <Route path="/pt" element={<ProtectedRoute><Pts /></ProtectedRoute>} />
            <Route path="/ptMembers" element={<ProtectedRoute><PtMembers /></ProtectedRoute>} />
            <Route path="/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
            <Route path="/enquiries" element={<ProtectedRoute><Enquiries /></ProtectedRoute>} />
            <Route path="/recentMemberships" element={<ProtectedRoute><RecentMemberships /></ProtectedRoute>} />
            <Route path="/staffAttendance" element={<ProtectedRoute><StaffAttendance /></ProtectedRoute>} />
            <Route path="/pts" element={<ProtectedRoute><Pts /></ProtectedRoute>} />
            <Route path="/invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
