import React, { useEffect, useContext, useState } from 'react';
import './Signin.css'
import { signInWithGoogle, UserDetails } from '../../services/firebase';
import {useNavigate} from "react-router-dom";


export default function Signin() {
  const user = UserDetails;
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user])
  
  return (
      <div className="login-buttons">
        <button className="login-provider-button" onClick={signInWithGoogle}>
        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
        <span> Continue with Google</span>
       </button>
      </div>
  );
}