import React from "react";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut, UserDetails } from "../../services/firebase";


export default function Dashboard() {
  const user=UserDetails;
  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
        navigate('/');
    }
  }, [user]);
  
  return (
    <div className="dashboard">
      <h1 className="dashboard-text">Welcome Home</h1>
      <button className="logout-button" onClick={logOut}>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
          alt="google icon"
        />
        <span> logout</span>
      </button>
    </div>
  );
}