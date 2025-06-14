import axios from "axios";
import { toast } from "../../components/use-toast"; // Adjust path based on your structure
import { useGoogleLogin } from "@react-oauth/google";
export const handleSubmit = async (e, formData, navigate) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}api/register`,
      { ...formData, loginMode: "email" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      toast({
        title: "Registration Successful",
        description: "Congratulations! Your registration has been successfully completed.",
        variant: "success",
      });
      navigate(`/enrollment?userEmail=${formData.email}`);
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast({
        title: "Registration Failed",
        description: error.response.data.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Unexpected Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  }
};


export const GoogleRegister = (navigate) => {
    return useGoogleLogin({
      client_id: "186528455819-lv45ts5lvieg87p536o2ka61qd5uaprc.apps.googleusercontent.com",
      scope: "openid email profile",
      ux_mode: "popup",
      flow: "implicit",
      onSuccess: async (response) => {
        console.log("Login Success:", response);
  
        const accessToken = response.access_token;
        let timer;
  
        // Set up a timeout to show a warning after 2 minutes if the user hasn't navigated yet
        const showTimeoutToast = () => {
          toast({
            title: "Please wait",
            description: "It might take a little longer to complete. Please do not refresh the page.",
            variant: "warning",
          });
        };
  
        timer = setTimeout(showTimeoutToast, 30000); // 120000 ms = 2 minutes
  
        try {
          const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const data = await userInfo.json();
          console.log("User Info:", data);
  
          const userData = {
            fullName: data.name,
            email: data.email,
            password: null,
          };
  
          const res = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}api/register`,
            { ...userData, loginMode: "google" },
            { headers: { "Content-Type": "application/json" } }
          );
  
          if (res.status === 201) {
            localStorage.setItem("userEmail", userData.email);
            toast({
              title: "Registration Successful",
              description: "Congratulations! Your registration has been successfully completed.",
              variant: "success",
            });
            navigate(`/enrollment?userEmail=${userData.email}`);
          } else {
            throw new Error("Registration failed.");
          }
        } catch (error) {
          toast({
            title: "Error",
            description: error.response?.data?.message || "Something went wrong. Please try again later.",
            variant: "destructive",
          });
        } finally {
          // Clear the timeout once the navigation occurs or the request completes
          clearTimeout(timer);
        }
      },
      onError: (error) => {
        console.log("Login Failed:", error);
      },
    });
  };
