// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // Restrict /admin routes if user is not admin
  if (location.pathname.startsWith("/admin") && role !== "admin") {
    return <Navigate to="/unauth" replace />;
  }

  return children;
};

export default ProtectedRoute;
