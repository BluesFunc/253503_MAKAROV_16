// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav>
      <ul>
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        {user && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}>Logout</button></li>
          </>
        )}
        <li><Link to="/merchandise">Merchandise</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/films">Films</Link></li>
        <li><Link to="/contacts">Contacts</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;