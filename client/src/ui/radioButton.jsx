import React from 'react';
import styled from 'styled-components';

const RadioButton = ({ name, options, checked, onChange }) => {
  return (
    <StyledWrapper>
      <div className="radio-input">
        {options.map((option, index) => (
          <div key={index} className="radio-b">
            <input
              type="radio"
              className="radio-b__input"
              id={`radio${index}`}
              name={name} // Use the 'name' prop for grouping radio buttons
              value={option.value}
              checked={checked === option.value} // Bind checked state
              onChange={onChange} // Pass onChange to update parent state
            />
            <label className="radio-b__label" htmlFor={`radio${index}`}>
              <div className="radio-b__custom">
                <span className="radio-b__custom-fill" />
              </div>
              <span className="radio-b__text">{option.text}</span>
            </label>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .radio-input {
    display: flex;
    gap: 16px; /* Space between the radio buttons */
    flex-wrap: wrap; /* Allow wrapping of radio buttons */
  }

  .radio-b {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .radio-b__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .radio-b__label {
    display: flex;
    align-items: center;
    gap: 12px; /* Space between the circle and the text */
    font-size: 15px;
    color: #000080;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .radio-b__custom {
    position: relative;
    width: 26px;
    height: 26px;
    border: 2px solid #000080;
    border-radius: 15%;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .radio-b__custom-fill {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 10px;
    background: linear-gradient(180deg, rgba(244,162,97,1) 41%, rgba(183,225,255,1) 100%);
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  }

  .radio-b__input:checked + .radio-b__label .radio-b__custom-fill {
    width: 26px;
    height: 26px;
    transition: all 0.3s ease;
  }

  .radio-b__input:checked + .radio-b__label .radio-b__custom {
    border: none; /* Remove black border when checked */
    transition: all 0.3s ease; /* Smooth transition */
  }

  .radio-b__input:hover + .radio-b__label .radio-b__custom {
    transform: scale(0.85);
    color: linear-gradient(0deg, rgba(0, 230, 118, 1) 0%, rgba(255, 215, 0, 1) 100%);
  }

  .radio-b__text {
    font-size: 15px;
    color: #000080;
    font-weight: 600;
    white-space:nowrap
  }

  /* For laptops and above (screens above 768px), display 3 radio buttons in one line */
  @media (min-width: 768px) {
    .radio-b {
      width: calc(28.33% - 10px); /* Each radio button takes up 1/3 of the space */
    }
  }

  /* For smaller screens (below 768px), show 2 radio buttons per line */
  @media (max-width: 768px) {
    .radio-b {
      width: calc(50% - 8px); /* Each radio button takes up 50% of the space */
      margin-bottom: 10px; /* Add some space between rows */
    }
  }
`;

export { RadioButton };


;
