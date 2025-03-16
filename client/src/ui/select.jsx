import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Select = ({ menuTitle, submenuItems, onSelect, value }) => {
  const [selectedItem, setSelectedItem] = useState(menuTitle);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (value) {
      setSelectedItem(value);
    }
  }, [value]);

  const handleSelect = (item) => {
    setSelectedItem(item);
    if (onSelect) {
      onSelect(item);
    }
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClear = () => {
    setSelectedItem(menuTitle);
    if (onSelect) {
      onSelect(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledWrapper ref={dropdownRef}>
      {selectedItem !== menuTitle && (
        <div className="menu-title">{menuTitle}</div>
      )}
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
              {/* <div className="submenu-item clear-option" onClick={handleClear}>
                <a href="#" className="submenu-link">Clear Selection</a>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .menu-title {
    font-size: 12px;
    font-weight: bold;
    color: #1d0042;
    margin-bottom: 4px;
    text-transform: uppercase;
  }

  .menu {
    font-size: 14px;
    font-weight: bold;
    color: #1d0042;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #1d0042;
    text-align: center;
  }

  .menu .link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 8px 0px;
    border-radius: 16px;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu .link span {
    text-align: left;
  }

  .menu .link svg {
    width: 16px;
    height: 16px;
    fill: #1d0042;
  }

  .menu .item {
    position: relative;
  }

  .menu .item .submenu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border-radius: 0 0 16px 16px;
    border-top: 1px solid #1d0042;
    background-color: hsl(60, 56%, 91%);
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.56), 0 4px 6px rgba(0, 0, 0, 0.56);
    z-index: 1;
    max-height: 200px;
    overflow-y: auto;
  }

  .submenu .submenu-item {
    width: 100%;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-link {
    display: block;
    padding: 12px 24px;
    text-align: center;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-link:hover {
    background-color: hsl(26.53, 86.98%, 66.86%);
    color: #fff;
  }

  .submenu .clear-option {
    border-top: 1px solid #1d0042;
    background-color: #f8f8f8;
  }

  .submenu .clear-option:hover {
    background-color: red;
    color: white;
  }

  @media (max-width: 768px) {
    .menu .link {
      padding: 12px 16px;
    }
  }
`;

export default Select;
