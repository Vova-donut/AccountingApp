import React from "react";
import "./App.css";
import EmailVerification from "./EmailVerification";
import ForgotPassword from "./ForgotPassword";

function App() {
  return (
    <div className="App">
      {/* Show only one screen at a time */}
      {/* <EmailVerification /> */}
      <ForgotPassword />
    </div>
  );
}

export default App;
