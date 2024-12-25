import { notificationItems } from '../config'; // Assuming you have notificationItems in your config
import React from 'react';
import styled from 'styled-components';
import { navigationLinksMoreItems } from '../config';
import { useNavigate } from 'react-router-dom';
const DropDown = () => {
  return (
    <StyledWrapper>
      
      <div className='input'>
        {
            navigationLinksMoreItems.map((item,index)=>(
               <button className={item.label === 'Logout' ? 'logout' : 'value'}>
                <a className='svg'>{item.icon}</a>
                <a href={item.link}>{item.label}</a>
                
               </button>
            ))
        }
      </div>
    </StyledWrapper>
  );
}



const NotificationDropDown = () => {
  const navigate=useNavigate()
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
            <button className="view-more" onClick={()=>navigate('/#')}>View All</button>
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
    background-color:hsl(205 ,100%, 85.88%);
    justify-items:center;
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
    color: #000080;
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
    border: 2px solid #hsl(205 ,100% ,85.88%);
    background-color:#000080;
    color: hsl(60, 56% ,91%);
  }

  .value:focus,
  .value:hover {
    background-color: hsl(205 ,100% ,85.88%);
    color:#000080;
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
    background-color: hsl(26.53 ,86.98% ,66.86%);
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
    margin-top:3px;
  }

   .logout {
    font-size: 15px;
    background-color: transparent;
    border: none;
    padding: 10px;
    color: #000080;
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
    border: 2px solid #hsl(205 ,100% ,85.88%);
    background-color:red;
    color: hsl(60, 56% ,91%);
  }

  .logout:focus,
  .logout:hover {
    background-color: hsl(205 ,100% ,85.88%);
    color:#000080;
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
    background-color: hsl(26.53 ,86.98% ,66.86%);
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
    margin-top:3px;
    margin-left:2px;
  }

    

  .input:hover > :not(.value:hover, .logout:hover)  {
    transition: 100ms;
    filter: blur(1px);
    transform: scale(0.95, 0.95);
  }

  /* Styles for the dropdown */
  .dropdown-container {
    background-color: #f5f2dc;
    width: 300px;
    padding: 16px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px;
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
    border-bottom: 2px solid #f0f0f0;
  }

  .header p {
    font-weight: bold;
    font-size: 18px;
    color: #333;
  }

  .mark-as-read {
    font-size: 14px;
    padding: 5px 12px;
    border-radius: 5px;
    background-color: #000080;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .mark-as-read:hover {
    background-color: #b7e1ff;
    color: #000080;
  }

  .notifications {
    margin-top: 15px;
  }

  .notification-item {
    display: flex;
    align-items: flex-start;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    color: #000080;
    transition: background-color 0.3s ease, color 0.3s ease;
    transition :1s;
  }

  .notification-item:hover {
    background-color: #000080;
    color: #f5f2dc;
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
    color: #666;
    margin-top: 5px;
    line-height: 1.4;
    transition: color 0.3s ease;
  }

  .notification-item:hover .notification-description {
    color: #f5f2dc;
  }

  .view-more-container {
    display: flex;
    margin-top: 10px;
    justify-content:center
  }

  .view-more {
    font-size: 14px;
    padding: 5px 12px;
    border-radius: 5px;
    color: #000080;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .view-more:hover {
    background-color: #000080;
    color: #f5f2dc;
  }`;
export  {DropDown,NotificationDropDown};
