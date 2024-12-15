import React from "react";
import logo from "./../../images/logo.jpg";

function LeftPanel() {
  return (
    <div className="text-center flex flex-col justify-center p-16 text-background">
      <img src={logo} alt="Logo" className="mb-6 w-32 h-32 mx-auto" />
      <h1 className="text-4xl font-highlight font-bold mb-4">Welcome Back!</h1>
      <p className="text-lg">
        "The journey of a thousand miles begins with a single step." <br />
        <span className="font-semibold">- Rahul Singh</span>
      </p>
    </div>
  );
}

export default LeftPanel;
