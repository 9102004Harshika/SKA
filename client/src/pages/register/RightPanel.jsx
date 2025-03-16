import React from "react";
import logo from "../../images/logo.png";

function RightPanel() {
  return (
    <div className="text-center flex flex-col justify-center p-16 text-background">
      <img src={logo} alt="Logo" className="mb-6 w-32 h-32 mx-auto" />
      <h1 className="text-4xl text-accent font-highlight font-bold mb-4">
        Join a Big Change!
      </h1>
      <p className="text-lg">
        "Learning is the passport to the future, for tomorrow belongs to those
        who prepare for it today." <br />
        <span className="font-semibold">- Rahul Singh</span>
      </p>
    </div>
  );
}

export default RightPanel;
