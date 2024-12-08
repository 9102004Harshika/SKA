






import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Select = ({ menuTitle, submenuItems, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState(menuTitle);
  const [isOpen, setIsOpen] = useState(false); // Track if the submenu is open
  const dropdownRef = useRef(null); // Reference to the dropdown menu

  const handleSelect = (item) => {
    setSelectedItem(item);
    if (onSelect) {
      onSelect(item); // Send the selected item to the parent component
    }
    setIsOpen(false); // Close the submenu after selection
  };

  const handleToggle = () => {
    setIsOpen(!isOpen); // Toggle the submenu on click
  };

  // Close the submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledWrapper ref={dropdownRef}>
      <div className="menu">
        <div className="item">
          <button type="button" className="link" onClick={handleToggle}>
            <span>{selectedItem}</span>
            <svg viewBox="0 0 360 360" xmlSpace="preserve">
              <g id="SVGRepo_iconCarrier">
                <path
                  id="XMLID_225_"
                  d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 
                  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 
                  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                />
              </g>
            </svg>
          </button>
          {/* Show submenu based on isOpen */}
          {isOpen && (
            <div className="submenu">
              {submenuItems.map((item, index) => (
                <div
                  key={index}
                  className="submenu-item"
                  onClick={() => handleSelect(item)}
                >
                  <a href="#" className="submenu-link">
                    {item}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .menu {
    font-size: 14px;
    font-weight: bold;
    line-height: 1.6;
    color: #000080;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style: none;
    border-bottom: 1px solid #000080;
    text-align: center;
  }

  .menu a {
    text-decoration: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .menu .link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 0px;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu .link span {
    text-align: left;
  }

  .menu .link svg {
    width: 16px;
    height: 16px;
    fill: #000080;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu .item {
    position: relative;
  }

  .menu .item .submenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border-radius: 0 0 16px 16px;
    overflow: hidden;
    border: 1px solid #cccccc;
    background-color: hsl(60, 56%, 91%);
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.56), 0 4px 6px rgba(0, 0, 0, 0.56);
    z-index: 1;
  }

  .submenu .submenu-item {
    width: 100%;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-link {
    display: block;
    padding: 12px 24px;
    width: 100%;
    position: relative;
    text-align: center;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-link::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%; /* Start with no background */
    height: 100%;
    background-color: hsl(26.53, 86.98%, 66.86%);
    z-index: -1;
    transition: width 0.48s cubic-bezier(0.23, 1, 0.32, 1); /* Smooth transition */
  }

  .submenu .submenu-link:hover::before,
  .submenu .submenu-link:focus::before, /* Add support for focus */
  .submenu .submenu-link:active::before { /* Add support for touch interaction */
    width: 100%; /* Animate background to full width */
  }

  .submenu .submenu-link:hover,
  .submenu .submenu-link:focus,
  .submenu .submenu-link:active {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    .menu .link,
    .submenu .submenu-link {
      padding: 12px 16px; /* Adjust padding for smaller screens */
    }

    .submenu .submenu-link::before {
      width: 0%; /* Ensure smooth animation on smaller screens */
    }

    .submenu .submenu-link:hover::before,
    .submenu .submenu-link:focus::before,
    .submenu .submenu-link:active::before {
      width: 100%; /* Full animation on hover/tap */
    }
  }
`;





export default Select;
