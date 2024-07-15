// src/App.js
import React, { useEffect } from "react";
import { Main, Dashboard } from "./components";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { apiConfig } from "./Services/GlobalApi";

const App = () => {
  const location = useLocation();
  // Check if the current path starts with "/dashboard"
  const isAdminPath = location.pathname.startsWith("/dashboard");

 useEffect(() => {
    const incrementVisitCount = async () => {
      try {
        // Check if the visit has already been counted
        if (!sessionStorage.getItem('visitCounted')) {
          // Call the API to increment the visit count
          const response = await axios.post(`${apiConfig.Base_Url}api/visitors/increment`);
          console.log('Visit count incremented:', response.data);
          // Set a flag in sessionStorage to indicate that the visit has been counted
          sessionStorage.setItem('visitCounted', 'true');
        }
      } catch (error) {
        console.error('Error incrementing visit count:', error);
        // Handle error but do not prevent site loading
      }
    };

    incrementVisitCount();
  }, []);

  return <div className="App">{isAdminPath ? <Dashboard /> : <Main />}</div>;
};

const AppWrapper = () => (
  <Router>
    <Routes>
      <Route path="*" element={<App />} />
    </Routes>
  </Router>
);

export default AppWrapper;
