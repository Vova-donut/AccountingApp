// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
// If you don’t have index.css, delete this next line.
// Otherwise create an empty src/index.css file.
import "./index.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
