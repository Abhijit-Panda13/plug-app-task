import React from "react";
import Main from "./Main.jsx"
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </div>
  ); 
}

export default App;