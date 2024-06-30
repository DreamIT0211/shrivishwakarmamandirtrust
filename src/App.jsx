// src/App.js
import React from "react";
import { Main, Dashboard } from "./components";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

const App = () => {
  const location = useLocation();

  // Check if the current path starts with "/dashboard"
  const isAdminPath = location.pathname.startsWith("/dashboard");

  return (
    <div className="App">
      {isAdminPath ? <Dashboard /> : <Main />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <Routes>
      <Route path="*" element={<App />} />
    </Routes>
  </Router>
);

export default AppWrapper;
