import { useEffect, useState } from "react";

const useFacebookLogin = (appId, permissions = ["public_profile", "email"]) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize the Facebook SDK
    if (window.FB) {
      window.FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });
    }
  }, [appId]);

  const Login = (scope = permissions) => {
    setLoading(true);
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          window.FB.api("/me?fields=name,email", (userInfo) => {
            setUser(userInfo);  // Store the user's info in state
            setLoading(false);
          });
        } else {
          setError("Facebook login failed");
          setLoading(false);
        }
      },
      { scope: scope.join(",") }  // Pass the permissions as comma-separated string
    );
  };

  const logout = () => {
    window.FB.logout((response) => {
      setUser(null);
      setError(null);
    });
  };

  return {
    user,
    loading,
    error,
    Login,
    logout,
  };
};

export default useFacebookLogin;
