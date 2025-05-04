import { toast } from "../../components/use-toast";

export const handleLogout = (navigate) => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("role");

  toast({
    title: "Logged Out",
    description: "You have been successfully logged out.",
    variant: "success",
  });

  navigate("/login");
};
