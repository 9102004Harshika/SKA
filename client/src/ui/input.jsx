import * as React from "react";

const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    const [active, setActive] = React.useState(false);

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
        <input
          type={type}
          className={`input-field ${className}`}
          style={{
            width: "100%",
            height: "40px",
            border: "none",
            borderBottom: active
              ? "2px solid hsl(205 ,100% ,85.88%)" // Highlighted bottom border
              : "1px solid #000080", // Normal bottom border
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
          onBlur={() => setActive(false)}
          ref={ref}
          {...props}
        />
        <span
          style={{
            content: '""',
            position: "absolute",
            top: "0",
            left: "0",
            width: "2px",
            height: "2px",
            backgroundColor: "transparent",
          }}
        ></span>
        <span
          style={{
            content: '""',
            position: "absolute",
            right: "0",
            bottom: "0",
            width: "4px",
            height: "4px",
            backgroundColor: active ? "#fff" : "transparent",
            transition: "all 0.2s ease",
          }}
        ></span>
        <span
          className="input-sl"
          style={{
            display: "block",
            position: "absolute",
            top: "0",
            bottom: "-1px",
            left: "-8px",
            width: active ? "calc(100% + 16px)" : "0",
            backgroundColor: "hsl(205 ,100% ,85.88%)",
            transform: "skew(-15deg)",
            transition: "all 0.2s ease",
          }}
        ></span>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
