import { useState, useEffect } from "react";

const useFacebookLogin = (appId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize Facebook SDK
  useEffect(() => {
    const loadFacebookSDK = () => {
      if (window.FB) return; // Prevent reloading if already initialized

      window.fbAsyncInit = () => {
        window.FB.init({
          appId: appId,
          cookie: true,
          xfbml: true,
          version: "v15.0", // Use the latest Graph API version
        });
      };

      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      script.onerror = () => setError("Failed to load Facebook SDK");
      document.body.appendChild(script);
    };

    loadFacebookSDK();
  }, [appId]);

  const Login = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!window.FB) {
        setError("Facebook SDK not loaded. Please refresh the page.");
        setLoading(false);
        return;
      }

      window.FB.login(
        (response) => {
          if (response.authResponse) {
            // Get user details
            window.FB.api("/me", { fields: "name,email" }, (userInfo) => {
              setUser({
                name: userInfo.name,
                email: userInfo.email,
                id: userInfo.id,
              });
              setLoading(false);
            });
          } else {
            setError("Facebook login cancelled or failed.");
            setLoading(false);
          }
        },
        { scope: "email,public_profile" } // Specify required permissions
      );
    } catch (err) {
      setError("An unexpected error occurred during Facebook login.");
      setLoading(false);
    }
  };

  const logout = async () => {
    setError(null);

    try {
      if (!window.FB) {
        setError("Facebook SDK not loaded.");
        return;
      }

      window.FB.logout(() => {
        setUser(null);
      });
    } catch (err) {
      setError("An error occurred during logout.");
    }
  };

  return { user, loading, error, Login, logout };
};
///
export default useFacebookLogin;
