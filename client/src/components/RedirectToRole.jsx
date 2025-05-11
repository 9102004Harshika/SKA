// src/components/RedirectToRole.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Landing from "../pages/LandingPage"; // ✅ Import Landing
import { useTokenAvailable } from "../hooks/useTokenAvaliable";
import { useTokenValidate } from "../hooks/useTokenValidate";

const RedirectToRole = () => {
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false); // Prevent unnecessary rerender
  const isAvailable=useTokenAvailable();
  const isValid=useTokenValidate();
  useEffect(() => {
    const role = sessionStorage.getItem("role");

    if (isAvailable && isValid && role) {
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/app");
      }
      setRedirected(true);
    }
  }, [navigate]);

  // If redirected, render nothing
  if (redirected) return null;

  // ❗ If no token → show Landing page
  return <Landing />;
};

export default RedirectToRole;
