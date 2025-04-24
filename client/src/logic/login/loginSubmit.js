import { toast } from "../../components/use-toast";
import { loginForm } from "../../config/index";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
export const handleSubmit = async (e, formData, navigate) => {
  e.preventDefault();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let isValid = true;

  for (const field of loginForm) {
    const value = formData[field.name] || "";
    if (field.required && !value) {
      toast({
        title: "Field Left Empty",
        description: `Your ${field.label} field is empty. Please fill it to proceed.`,
        variant: "destructive",
      });
      isValid = false;
      break;
    }

    if (field.name === "email" && !emailRegex.test(value)) {
      toast({
        title: "Invalid Email",
        description:
          "The email address you entered is invalid. Please try again.",
        variant: "destructive",
      });
      isValid = false;
      break;
    }
  }

  if (!isValid) return;

  try {
    const response = await axios.post("http://localhost:5000/api/login", {
      ...formData,
      loginMode: "email",
    });

    if (response.status === 200) {
      const { user, token } = response.data;
      sessionStorage.setItem("token", token);

      if (!user.isEnrolled) {
        toast({
          title: "Enrollment Required",
          description:
            "You are not enrolled. Please complete the enrollment process.",
          variant: "destructive",
        });
        navigate(`/enrollment?userEmail=${formData.email}`);
      } else {
        toast({
          title: "Login Successful",
          description: "You have logged in successfully! Welcome back.",
          variant: "success",
        });
        navigate("/app");
      }
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast({
        title: "Login Failed",
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

export const GoogleLogin = (navigate) => {
  return useGoogleLogin({
    client_id:
      "186528455819-lv45ts5lvieg87p536o2ka61qd5uaprc.apps.googleusercontent.com",
    scope: "openid email profile",
    ux_mode: "popup",
    flow: "implicit",
    onSuccess: async (response) => {
      console.log("Google Login Success:", response);
      const accessToken = response.access_token;
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await userInfo.json();
      console.log("User Info:", data);

      const userData = {
        fullName: data.name,
        email: data.email,
        password: null,
      };

      try {
        const res = await axios.post("http://localhost:5000/api/login", {
          ...userData,
          loginMode: "google",
        });

        if (res.status === 200) {
          const { user, token } = res.data;
          sessionStorage.setItem("token", token);

          if (!user.isEnrolled) {
            toast({
              title: "Enrollment Required",
              description:
                "You are not enrolled. Please complete the enrollment process.",
              variant: "destructive",
            });
            navigate(`/enrollment?userEmail=${userData.email}`);
          } else {
            toast({
              title: "Login Successful",
              description: "You have logged in successfully! Welcome back.",
              variant: "success",
            });
            navigate("/app");
          }
        } else {
          toast({
            title: "Login Failed",
            description: "An error occurred during login. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast({
            title: "Login Failed",
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
    },
    onError: (error) => {
      console.log("Login Failed:", error);
    },
  });
};
