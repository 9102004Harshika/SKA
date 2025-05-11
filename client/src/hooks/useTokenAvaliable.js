import { useState, useEffect } from "react";

export const useTokenAvailable = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if(!token){
      setIsAvailable(false)
    }
  }, []);
  return isAvailable;
};
