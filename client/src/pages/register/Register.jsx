import React from "react";

function RegisterPage() {
  const handleGoogleSignup = () => {
    console.log("Sign Up with Google clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      {/* Main Content */}
      <div className="w-full max-w-screen-lg flex flex-col items-center justify-center h-full">
        {/* Registration Form */}
        <div className="w-full md:w-1/2 bg-card text-card-foreground  p-8 shadow-lg rounded-lg flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-center mb-6">Register</h2>
          <form className="w-full max-w-md">
            {/* Full Name Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-muted rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-muted rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-muted rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-muted rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Re-enter your password"
                required
              />
            </div>

            {/* Additional Links */}
            <div className="my-4 text-center">
              <p className="text-sm">
                Already have an account?{" "}
                <a href="/" className="text-accent hover:underline">
                  Login here
                </a>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-background py-2 px-4 rounded-lg shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center w-full my-4">
            <hr className="flex-grow border-t border-muted" />
            <span className="mx-2 text-sm text-muted-foreground">
              Or sign up with
            </span>
            <hr className="flex-grow border-t border-muted" />
          </div>

          {/* Google Sign-Up Button */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center border border-muted rounded-lg py-2 px-4 bg-transparent hover:bg-gray-100 focus:ring-2 focus:ring-muted focus:outline-none"
          >
            <img
              src="https://th.bing.com/th/id/OIP.AUmnbiLoI6qsNjlDmrJ3CwHaH5?rs=1&pid=ImgDetMain"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            <span className="text-sm font-medium text-muted-foreground">
              Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
