import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Switch, Route, Link } from "react-router-dom";
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import { logOut } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import {ref, set, get, child} from "firebase/database"; 
import {auth, provider, db} from "../../services/firebase";
import Profile from "./Profile";

const saveChange = async(user) =>{
  console.log("Hi", user.uid);
  const dbRef = ref(db);
  await get(child(dbRef, 'users/'+user.uid)).then(async(snapshot) => {
    console.log(snapshot);
    await set(ref(db, 'users/'+user.uid),{
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      likes: snapshot.val().likes,
      thumbsUp: snapshot.val().thumbsUp,
      thumbsDown: snapshot.val().thumbsDown,
      description: snapshot.val().description
    }).then(function(res){
      
      window.location.reload();
    }).catch(function(err){
      alert("Data error");
    }) 
  }).catch(async (error) => {
    await set(ref(db, 'users/'+user.uid),{
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      likes: true,
      thumbsUp: true,
      thumbsDown: true,
      description: true
    }).then(function(res){
      window.location.reload();
    }).catch(function(err){
      alert("Data error");
    }) 
  });

  
}


function setToken(userToken) {
	localStorage.setItem('token', JSON.stringify(userToken));
  saveChange(userToken);
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
              <Route path='/profile' element={<Profile onLogout={onLogout}/>}/>
            </Routes>
          </div>
  );
}

export default Main;