import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/login/Login";
import RegisterPage from './pages/register/Register'
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* <Navbar /> */}
        <main className="flex-grow">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
