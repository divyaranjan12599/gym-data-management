import React, { useEffect, useState } from "react";
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
import Memberships from "./components/pages/memberships";
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";



function App() {

  const [clientData, setClientData] = useState([]);
  const [enquiryData, setEnquiryData] = useState([]);
  const [staffData, setStaffData] = useState([]);


  const fetchClientData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL+"/user/get-clients");
      setClientData(response.data);

    } catch (error) {
      console.log(error);
      setClientData([]);
    }
  }
  const fetchEnquiryData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL+"/user/get-enquirys");
      setEnquiryData(response.data);

    } catch (error) {
      console.log(error);
      setEnquiryData([]);
    }
  }
  const fetchStaffData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL+"/user/get-staffs");
      setStaffData(response.data);

    } catch (error) {
      console.log(error);
      setStaffData([]);
    }
  }
  console.log("client :-> ", clientData);
  console.log("enquiry :-> ", enquiryData);
  console.log("staff :-> ", staffData);
  useEffect(() => {
    fetchClientData();
    fetchEnquiryData();
    fetchStaffData();
  }, []);

  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/add_member" element={<AddMembers />}>
          </Route>

          <Route path="/add_enquiry" element={<AddEnquiry />}>
          </Route>

          <Route path="/add_staff" element={<AddStaffs />}>
          </Route>

          <Route exact path="/home" element={<Home />}>
          </Route>

          <Route path="/about" element={<About />}>
          </Route>

          <Route path="/contact" element={<Contact />}>
          </Route>

          <Route path="/memberships" element={<Memberships />}>
          </Route>


          <Route path="/pt" element={<Pts />}>
          </Route>

          <Route path="/ptMembers" element={<PtMembers />}>
          </Route>

          <Route path="/staff" element={<Staff />}>
          </Route>
          
          <Route path="/recentMemberships" element={<RecentMemberships />}>
          </Route>

          <Route path="/staffAttendance" element={<StaffAttendance />}>
          </Route>

          <Route path="/pts" element={<Pts />}>
          </Route>

          <Route path="/invoice" element={<Invoice />}>
          </Route>

        </Routes>
    </Router>
  );
}

export default App;
