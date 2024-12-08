import * as React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    const [active, setActive] = React.useState(false);
    const [isValid, setIsValid] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const validateInput = (value) => {
      // Add your validation logic here
      // For example, consider input valid if it's not empty
      setIsValid(value.trim().length > 0);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div
        className="input-wrapper"
        style={{
          position: "relative",
          display: "inline-block",
          width: "100%",
          marginBottom: "2px",
        }}
      >
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={`input-field ${className}`}
          style={{
            width: "100%",
            height: "35px",
            border: "none",
            borderBottom:
              active || isValid
                ? "2px solid hsl(205 ,100% ,85.88%)"
                : "1px solid #000080",
            padding: "0",
            fontSize: "14px",
            color: "#000080",
            backgroundColor: "transparent",
            fontWeight: "bold",
            outline: "none",
            transition: "all 0.15s ease",
            position: "relative",
            zIndex: 1,
          }}
          placeholder="Enter text here"
          onFocus={() => setActive(true)}
          onBlur={(e) => {
            setActive(false);
            validateInput(e.target.value);
          }}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              zIndex: 2,
              color: "#000080",
            }}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
        <span
          className="input-sl"
          style={{
            display: "block",
            position: "absolute",
            top: "0",
            bottom: "-1px",
            left: "-8px",
            width: active || isValid ? "calc(100% + 16px)" : "0",
            backgroundColor: "hsl(205 ,100% ,85.88%)",
            transform: isValid ? "none" : "skew(-15deg)",
            transition: "all 0.2s ease",
          }}
        ></span>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
