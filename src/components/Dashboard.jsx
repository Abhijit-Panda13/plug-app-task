import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../services/firebase";
import Signin from "./Signin";
import PropTypes from 'prop-types';

export default function Dashboard({onLogout}) {
  const [user, setUser]=useState(localStorage.getItem("User"));
  let navigate = useNavigate();
  console.log(user);
  
  
  return (
    <div>
      <div className="dashboard">
      <h1 className="dashboard-text">Welcome Home</h1>
      <button className="logout-button" onClick={onLogout}>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
          alt="google icon"
        />
        <span>logout</span>
      </button>
    </div> 
  </div>
    
  );
}
