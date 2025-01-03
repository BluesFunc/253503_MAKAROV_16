import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Merchandise from "./components/Merchandise/Merchandise";
import News from "./components/News/News";
import Films from "./components/Films/Films";
import Contacts from "./components/Contacts/Contacts";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Admin from "./components/Admin/Admin";
import NewsDetail from "./components/News/NewsDetail";
import MerchandiseDetail from "./components/Merchandise/MerchandiseDetail";
import AuthCallback from "./components/Auth/AuthCallback";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/merchandise" element={<Merchandise />} />
        <Route path="/merchandise/:id" element={<MerchandiseDetail />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/films" element={<Films />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/auth/callback' element={<AuthCallback/>} />
      </Routes>
    </Router>
  );
};

export default App;
