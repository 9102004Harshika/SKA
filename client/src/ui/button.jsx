import React from "react";
import { cva } from "class-variance-authority";
import styled from "styled-components";

const buttonVariants = cva(
  "button", // base class name
  {
    variants: {
      size: {
        xs: "px-2 py-1 text-xs", // extra small button
        sm: "px-3 py-1 text-sm", // small button
        md: "px-4 py-2 text-base", // medium button
        lg: "px-6 py-3 text-lg", // large button
      },
      variant: {
        primary: "primary",
        secondary: "secondary",
        accent: "accent",
      },
    },
  }
);

// Styled Wrapper Component (No change needed)
const StyledWrapper = styled.div`
  .button {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border: none;
    background: none;
    color: #0f1923;
    cursor: pointer;
    position: relative;
    padding: ${({ size }) => (size === "sm" ? "5px" : "8px")};
    margin-bottom: ${({ size }) => (size === "sm" ? "2px" : "20px")};
    text-transform: capitalize;
    font-weight: bold;
    font-size: 14px;
    transition: all 0.15s ease;
    margin-top: ${({ size }) => (size === "sm" ? "0" : "0.5rem")};
    width: 100%;
  }

  .button::before,
  .button::after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    left: 0;
    height: calc(50% - 5px);
    border: 1px solid #000080;
    transition: all 0.15s ease;
  }

  .button::before {
    top: 0;
    border-bottom-width: 0;
  }

  .button::after {
    bottom: 0;
    border-top-width: 0;
  }

  .button:active,
  .button:focus {
    outline: none;
  }

  .button:active::before,
  .button:active::after {
    right: 3px;
    left: 3px;
  }

  .button:active::before {
    top: 3px;
  }

  .button:active::after {
    bottom: 3px;
  }

  .button_lg {
    position: relative;
    display: block;
    padding: 10px 20px;
    color: #fff;
    background-color: ${({ variant }) =>
      variant === "primary"
        ? "hsl(240, 100%, 25%)"
        : variant === "secondary"
        ? "hsl(205, 100% ,85.88%)"
        : "hsl(26.53 ,86.98%, 66.86%)"};
    overflow: hidden;
    box-shadow: inset 0px 0px 0px 1px transparent;
  }

  .button_lg::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 2px;
    background-color: #0f192300;
  }

  .button_lg::after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 4px;
    height: 4px;
    background-color: #0f192300;
    transition: all 0.2s ease;
  }

  .button_sl {
    display: block;
    position: absolute;
    top: 0;
    bottom: -1px;
    left: -8px;
    width: 0;
    background-color: ${({ variant }) =>
      variant === "primary"
        ? "hsl(205, 100%, 85.88%)"
        : variant === "secondary"
        ? "#000080"
        : "hsl(205, 100%, 85.88%)"};
    transform: skew(-15deg);
    transition: all 0.2s ease;
  }

  .button_text {
    position: relative;
    color: ${({ variant }) =>
      variant === "primary"
        ? "white"
        : variant === "secondary"
        ? "#000080"
        : "#000080"};
  }

  .button:hover .button_text {
    color: ${({ variant }) =>
      variant === "primary"
        ? "#000080"
        : variant === "secondary"
        ? "white"
        : "#000080"};
  }

  .button:hover .button_sl {
    width: calc(100% + 15px);
  }

  .button:hover .button_lg::after {
    background-color: ${({ variant }) =>
      variant === "secondary"
        ? "none"
        : variant === "danger"
        ? "none"
        : "none"};
  }
`;

const Button = ({
  text,
  size = "lg",
  variant = "default",
  onClick,
  type = "button",
  ...props
}) => {
  // Get the button class names based on CVA variants
  const buttonClass = buttonVariants({ size, variant });

  return (
    <StyledWrapper variant={variant}>
      {/* Pass variant prop to StyledWrapper */}
      <button
        className={`${buttonClass} button`}
        onClick={onClick} // Bind onClick handler
        type={type} // Ensure correct button type
        {...props} // Forward any additional props
      >
        <span className="button_lg">
          <span className="button_sl"></span>
          <span className="button_text">{text}</span>
        </span>
      </button>
    </StyledWrapper>
  );
};

export { Button };
