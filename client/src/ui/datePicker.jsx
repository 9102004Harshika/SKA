import * as React from "react";
import { ReactDatez } from "react-datez";
import "react-datez/dist/css/react-datez.css";

const DatePicker = React.forwardRef(({ className, ...props }, ref) => {
  const [active, setActive] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);

  const validateDate = (value) => {
    // Check if a valid date is selected
    setIsValid(value !== "");
  };

  return (
    <div
      className="input-wrapper"
      style={{
        position: "relative",
        display: "inline-block",
        width: "100%",
        marginBottom: "20px",
      }}
    >
      <ReactDatez
        {...props}
        ref={ref}
        className={`input-field py-2 ${className}`}
        onChange={(value) => {
          props.onChange(value);
          validateDate(value);
        }}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
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
      />
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
});

DatePicker.displayName = "DatePicker";

export { DatePicker };
