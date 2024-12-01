import React from "react";

function LeftPanel() {
  return (
    <div className="text-center flex flex-col justify-center px-8">
      <img
        src="https://media.istockphoto.com/vectors/vector-cartoon-boy-reading-a-bookboy-having-an-idea-raised-his-hand-vector-id926748210?k=6&m=926748210&s=170667a&w=0&h=U94PeQmvVF1TV-YkLXRi7ttvxmS0o41gRc3kpeHOt2Y="
        alt="Logo"
        className="mb-6 w-32 h-32 mx-auto"
      />
      <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
      <p className="text-lg">
        "The journey of a thousand miles begins with a single step." <br />
        <span className="font-semibold">- Rahul Singh</span>
      </p>
    </div>
  );
}

export default LeftPanel;
