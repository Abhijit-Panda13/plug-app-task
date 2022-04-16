import React from "react";
import { BrowserRouter as Router, Routes, Switch, Route, Link } from "react-router-dom";
import Signin from "./Signin";
import Dashboard from "./Dashboard";


function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route exact path="/" element = {<Signin />}/>
          <Route path="/dashboard" element = {<Dashboard />}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;