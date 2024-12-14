import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/LandingPage";
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/register/Register";
import Enrollment from "./pages/Enrollment";
import { Toaster } from "./components/Toaster"; // Import the Toaster component
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Carousel from "./components/Carousel";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* <Navbar /> */}
        <main className="flex-grow">
          {/* This ensures toasts are shown across all pages */}
          <Toaster />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/enrollment" element={<Enrollment />} />
            <Route path='/forgotPassword' element={<ForgotPassword/>}/>
            <Route path='/carousel' element={<Carousel/>}/>
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
