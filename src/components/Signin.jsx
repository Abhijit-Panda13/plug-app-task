import React, { useEffect, useContext, useState } from 'react';
import './Signin.css'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import {auth, provider, db} from "../../services/firebase";
import PropTypes from 'prop-types';




export default function Signin({setToken}) {
  const signInWithGoogle = async () =>{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      setToken(user);
      
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }
  
  
  
  return (
    <div className="Buttons">
    <button onClick={signInWithGoogle} type="button" className="login-with-google-btn" >
      Sign in with Google
    </button>
    </div>
  );
}

Signin.propTypes = {
    setToken: PropTypes.func.isRequired
  }