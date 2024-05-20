import React from "react";
import Home from './components/pages/home';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Navbar from "./components/inc/navbar";
import AddMembers from "./components/pages/addMembers";
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddEnquiry from "./components/pages/addEnquiry";
import AddStaffs from "./components/pages/addStaff";

function App() {
  return (
    <Router>
      <div className="container-fluid ps-0 pe-0">
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
