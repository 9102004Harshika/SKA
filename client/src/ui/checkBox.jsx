import React from "react";
import styled from "styled-components";

const Checkbox = ({ text, checked = false, onChange }) => {
  const handleCheckboxChange = () => {
    if (onChange) {
      onChange(!checked); // Toggle the checked state
    }
  };

  return (
    <StyledWrapper>
      <label className="container">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange} // Handle change
        />
        <svg viewBox="0 0 64 64" height="1em" width="1em">
          <path
            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
            pathLength="575.0541381835938"
            className="path"
          />
        </svg>
        <span className="label">{text}</span>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  gap: 10px; /* Space between checkboxes */

  .container {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 0;
    padding: 0;
    width: 30%; /* Default to full width on small screens */
    margin-bottom: 5px;
  }

  /* For laptops and above (screens above 768px), display 3 checkboxes in one line */
  @media (min-width: 768px) {
    .container {
      width: calc(
        23.33% - 10px
      ); /* Take 33.33% of the container's width for each checkbox */
    }
  }

  /* For smaller screens (below 768px), show 2 checkboxes per line */
  @media (max-width: 768px) {
    .container {
      width: calc(40% - 5px); /* Take 50% of the container's width */
      margin-bottom: 10px;
    }
  }

  .container input {
    display: none;
  }

  .container svg {
    margin-right: 10px;
    overflow: visible;
  }

  .path {
    fill: none;
    stroke: hsl(266, 100%, 13%);
    stroke-width: 4;
    stroke-linecap: miter;
    transition: stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease;
    stroke-dasharray: 241 9999999;
    stroke-dashoffset: 0;
  }

  .container input:checked ~ svg .path {
    stroke-dasharray: 70.5096664428711 9999999;
    stroke-dashoffset: -262.2723388671875;
  }

  .label {
    font-size: 1rem;
    color: hsl(266, 100%, 13%);
    margin: 0;
    padding: 0;
    white-space: nowrap;
  }
`;

export { Checkbox };
