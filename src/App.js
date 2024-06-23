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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { lookInSession } from "./components/pages/session";
import Enquiries from "./components/pages/Enquiries";
import Layout from "./Layout/Layout";

export const UserContext = createContext({})

function App() {

  const [clientData, setClientData] = useState([]);
  const [enquiryData, setEnquiryData] = useState([]);
  const [staffData, setStaffData] = useState([]);

  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });
  }, [])


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
  // console.log("client :-> ", clientData);
  // console.log("enquiry :-> ", enquiryData);
  // console.log("staff :-> ", staffData);
  useEffect(() => {
    fetchClientData();
    fetchEnquiryData();
    fetchStaffData();
  }, []);


  return (
    <UserContext.Provider value={{ userAuth, setUserAuth , staffData, enquiryData, clientData }}>
      <Router>
        {/* <Navbar /> */}
        <Routes>

          <Route path="/" element={<Layout/>} />

          <Route path="/login" element={<Login />} />

          <Route path="/add_member" element={<AddMembers />} />

          <Route path="/add_enquiry" element={<AddEnquiry />} />

          <Route path="/add_staff" element={<AddStaffs />} />

          <Route exact path="/home" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/memberships" element={<Memberships />} />

          <Route path="/pt" element={<Pts />} />

          <Route path="/ptMembers" element={<PtMembers />} />

          <Route path="/staff" element={<Staff />} />

          <Route path="/enquiries" element={<Enquiries />} />

          <Route path="/recentMemberships" element={<RecentMemberships />} />

          <Route path="/staffAttendance" element={<StaffAttendance />} />

          <Route path="/pts" element={<Pts />} />

          <Route path="/invoice" element={<Invoice />} />

        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
