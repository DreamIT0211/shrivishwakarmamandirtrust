import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
  import Home from "../client/Home";
  import Signin from "../client/Signin";
  import SidebarWithBurgerMenu from './SidebarWithBurgerMenu';
  import HeroImageManagement from './HeroImageManagement';
  import LiveDarshanManagement from './LiveDarshanManagement';
  import EventManagement from './EventManagement';
  import UserManagement from './UserManagement';
  import VideoManagement from './VideoManagement';
  const MainContent = () => {

    return (
      <div className={""}>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard/heromanagement" element={<HeroImageManagement />} />
          <Route path="/dashboard/LiveDarshanManagement" element={<LiveDarshanManagement />} />
          <Route path="/dashboard/EventManagement" element={<EventManagement />} />
          <Route path="/dashboard/UserManagement" element={<UserManagement />} />
          <Route path="/dashboard/VideoManagement" element={<VideoManagement />} />
        </Routes>
      </div>
    );
  };

const Dashboard = () => {
  return (
   
    <div className="relative">
      <div className="fixed top-0 z-50 lg:ml-20">
        <SidebarWithBurgerMenu />
      </div>
      <MainContent />
    </div>
  
  )
}

export default Dashboard;
