import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Switch, Route, Link } from "react-router-dom";
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import { logOut } from "../../services/firebase";

function setToken(userToken) {
	localStorage.setItem('token', JSON.stringify(userToken));
  window.location.reload();
}

function getToken() {
	const tokenString = localStorage.getItem('token');
	const userToken = JSON.parse(tokenString);
  console.log("token", userToken);
	return userToken;
}
function onLogout(){
  console.log("Hello");
  window.localStorage.removeItem("token");
  logOut();
  window.location.reload();
}
function Main() {
  const token= getToken();
  console.log("Tokenn", token);
 
  if(!token) {
    return <Signin setToken={setToken} />
  }
  return (
	        <div className="wrapper">      
            <Routes>
              <Route path='/' element={<Dashboard onLogout={onLogout}/>}/>
              <Route path='/dashboard' element={<Dashboard onLogout={onLogout}/>}/>
            </Routes>
          </div>
  );
}

export default Main;