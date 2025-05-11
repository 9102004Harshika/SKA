// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTokenAvailable } from "../hooks/useTokenAvaliable";
import { useTokenValidate } from "../hooks/useTokenValidate";

const ProtectedRoute = ({ children }) => {
  const isAvailable=useTokenAvailable();
  const isValid=useTokenValidate();
  const role = sessionStorage.getItem("role");
  const location = useLocation();
  if (!isAvailable || !isValid) {
    return <Navigate to="/login" replace />;
  }
  // Restrict /admin routes if user is not admin
  if (location.pathname.startsWith("/admin") && role !== "admin") {
    return <Navigate to="/unauth" replace />;
  }

  return children;
};

export default ProtectedRoute;
