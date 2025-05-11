import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const useTokenValidate = () => {
  const [isValid, setIsValid] = useState(true); // initial value set to true

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp > currentTime) {
          setIsValid(true); // token is valid
        } else {
          setIsValid(false); // token expired
        }
      } catch (err) {
        setIsValid(false); // decoding failed
      }
    } else {
      setIsValid(false); // no token found
    }
  }, []);

  return isValid;
};
