// src/App.js
import React from "react";
import SignUp from "./SignUp";     // make sure SignUp.js is in src/
import "./SignUp.css";             // styles for the screen

function App() {
  return (
    <div className="App">
      <SignUp />
    </div>
  );
}

export default App;
