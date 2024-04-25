import React from "react";
import Home from './components/pages/home';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Navbar from "./components/inc/navbar";
import Add from "./components/pages/add";
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div class="container-fluid">
        <Navbar />
        <Routes>
          <Route path="/add_member" element={<Add />}>
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
