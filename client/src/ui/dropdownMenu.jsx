import { notificationItems } from "../config";
import React from "react";
import styled from "styled-components";
import { navigationLinksMoreItems } from "../config";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../logic/logout/logout";

const DropDown = () => {
  return (
    <StyledWrapper>
      <div className="input">
        {navigationLinksMoreItems.map((item, index) => {
          if (item.label === "Logout") {
            return (
              <button key={index} className="logout" onClick={handleLogout}>
                <span className="svg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          }

          return (
            <button key={index} className="value">
              <span className="svg">{item.icon}</span>
              <a href={item.link}>{item.label}</a>
            </button>
          );
        })}
      </div>
    </StyledWrapper>
  );
};

const NotificationDropDown = () => {
  const navigate = useNavigate();
  // Define a limit for visible notifications
  const visibleLimit = 3;
  const visibleNotifications = notificationItems.slice(0, visibleLimit);
  const hasMore = notificationItems.length > visibleLimit;

  return (
    <StyledWrapper>
      <div className="dropdown-container">
        {/* Dropdown Header */}
        <div className="header">
          <p>Notifications</p>
          <button className="mark-as-read">Mark as Read</button>
        </div>

        {/* Notifications List */}
        <div className="notifications">
          {visibleNotifications.map((item, index) => (
            <div key={index} className="notification-item">
              <div className="notification-icon">{item.icon}</div>
              <div className="notification-content">
                <a href={item.link} className="notification-link">
                  {item.title}
                </a>
                <p className="notification-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* "View More" Button */}
        {hasMore && (
          <div className="view-more-container">
            <button className="view-more" onClick={() => navigate("/#")}>
              View All
            </button>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  .input {
    display: flex;
    flex-direction: column;
    width: 200px;
    background-color: hsl(0, 0%, 98%);
    justify-items: center;
    border-radius: 10px;
    transition: 1s;
    padding: 10px;
    overflow: hidden;
  }

  .value {
    font-size: 15px;
    background-color: transparent;
    border: none;
    padding: 10px;
    color: hsl(266, 100%, 13%);
    display: flex;
    position: relative;
    gap: 5px;
    cursor: pointer;
    border-radius: 10px;
    transition: 1s;
    box-sizing: border-box;
  }

  .value:not(:active):hover,
  .value:focus {
    display: flex;
    box-sizing: border-box;
    border: 2px solid hsl(268, 82%, 27%);
    background-color: hsl(266, 100%, 13%);
    color: hsl(0, 0%, 98%);
  }

  .value:focus,
  .value:hover {
    background-color: hsl(268, 82%, 27%);
    color: hsl(266, 100%, 13%);
    outline: none;
    margin-left: 17px;
  }

  .value::before {
    content: "";
    position: absolute;
    top: 5px;
    left: -15px;
    width: 5px;
    height: 80%;
    background-color: hsl(41, 100%, 62%);
    border-radius: 5px;
    opacity: 0;
    transition: 1s;
  }

  .value:focus::before,
  .value:hover::before {
    opacity: 1;
  }

  .value .svg {
    width: 20px;
    margin-top: 3px;
  }

  .logout {
    font-size: 15px;
    background-color: transparent;
    border: none;
    padding: 10px;
    color: hsl(266, 100%, 13%);
    display: flex;
    position: relative;
    gap: 5px;
    cursor: pointer;
    border-radius: 10px;
    transition: 1s;
    box-sizing: border-box;
  }

  .logout:not(:active):hover,
  .logout:focus {
    display: flex;
    box-sizing: border-box;
    border: 2px solid hsl(0, 100%, 50%);
    background-color: hsl(0, 100%, 50%);
    color: hsl(60, 56%, 91%);
  }

  .logout:focus,
  .logout:hover {
    background-color: hsl(268, 82%, 27%);
    color: hsl(266, 100%, 13%);
    outline: none;
    margin-left: 17px;
  }

  .logout::before {
    content: "";
    position: absolute;
    top: 5px;
    left: -15px;
    width: 5px;
    height: 80%;
    background-color: hsl(0, 100%, 50%);
    border-radius: 5px;
    opacity: 0;
    transition: 1s;
  }

  .logout:focus::before,
  .logout:hover::before {
    opacity: 1;
  }

  .logout .svg {
    width: 20px;
    margin-top: 3px;
    margin-left: 2px;
  }

  .input:hover > :not(.value:hover, .logout:hover) {
    transition: 100ms;
    filter: blur(1px);
    transform: scale(0.95, 0.95);
  }

  /* Styles for the dropdown */
  .dropdown-container {
    background-color: hsl(0, 0%, 98%);
    width: 300px;
    padding: 16px;
    border-radius: 10px;

    max-height: 400px;
    overflow-y: auto;
    transition: 1s;
    padding: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 2px solid hsl(0, 0%, 98%);
  }

  .header p {
    font-weight: bold;
    font-size: 18px;
    color: hsl(0, 0%, 31%);
  }

  .mark-as-read {
    font-size: 14px;
    padding: 5px 12px;
    border-radius: 5px;
    background-color: hsl(266, 100%, 13%);
    color: hsl(0, 0%, 98%);
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .mark-as-read:hover {
    background-color: hsl(268, 82%, 27%);
    color: hsl(0, 0%, 98%);
  }

  .notifications {
    margin-top: 15px;
  }

  .notification-item {
    display: flex;
    align-items: flex-start;
    padding: 10px 0;
    border-bottom: 1px solidhsl(0, 0%, 98%);
    color: hsl(266, 100%, 13%);
    transition: background-color 0.3s ease, color 0.3s ease;
    transition: 1s;
  }

  .notification-item:hover {
    background-color: hsl(266, 100%, 13%);
    color: hsl(0, 0%, 98%);
    border-radius: 10px;
    padding: 10px;
  }

  .notification-icon {
    font-size: 20px;
    margin-right: 10px;
    margin-top: 2px;
  }

  .notification-content {
    display: flex;
    flex-direction: column;
  }

  .notification-link {
    text-decoration: none;
    font-size: 14px;
    font-weight: bold;
    color: inherit;
    transition: color 0.3s ease;
  }

  .notification-description {
    font-size: 12px;
    color: hsl(0, 0%, 31);
    margin-top: 5px;
    line-height: 1.4;
    transition: color 0.3s ease;
  }

  .notification-item:hover .notification-description {
    color: hsl(0, 0%, 98%);
  }

  .view-more-container {
    display: flex;
    margin-top: 10px;
    justify-content: center;
  }

  .view-more {
    font-size: 14px;
    padding: 5px 12px;
    border-radius: 5px;
    color: hsl(266, 100%, 13%);
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .view-more:hover {
    background-color: hsl(266, 100%, 13%);
    color: hsl(0, 0%, 98%);
  }
`;
export { DropDown, NotificationDropDown };
