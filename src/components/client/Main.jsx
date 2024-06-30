import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import StickyNavbar from "./StickyNavbar";
import Home from "./Home";
import Signin from "./Signin";
import Signup from "./Signup";
import Darshan from "./Darshan";
import LiveDarshan from "./LiveDarshan";
import FooterWithSocialLinks from "./FooterWithSocialLinks";
import EventGallery from "./EventGallery";
import ContactUs from "./ContactUs";
import ForgotPassword from "./ForgotPassword";
import DefaultGallery  from "./DefaultGallery";
import RoomBooking from "./RoomBooking";
import Trustee from "./Trustee";

const MainContent = () => {
  const location = useLocation();

  // Conditionally apply padding and margin only if not on the home page
  const isHome = location.pathname === "/" || location.pathname === "/home";

  return (
    <div className={isHome ? "" : "pt-20 mt-10"}>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/darshan" element={<Darshan />} />
        <Route path="/livedarshan" element={<LiveDarshan />} />
        <Route path="/events" element={<EventGallery />} />
        <Route path="/footer" element={<FooterWithSocialLinks />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/gallery" element={<DefaultGallery />} />
        <Route path="/room-booking" element={<RoomBooking />} />
        <Route path="/trustee" element={<Trustee />} />
      </Routes>
    </div>
  );
};

const Main = () => {
  return (
 
      <div className="relative">
        <div className="fixed top-0 w-full z-50">
          <StickyNavbar />
        </div>
        <MainContent />
      </div>
   
  );
};

export default Main;
