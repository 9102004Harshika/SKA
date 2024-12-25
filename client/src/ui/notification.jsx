import React from 'react';
import styled from 'styled-components';

const Notification = ({ onClick, count }) => {
  return (
    <StyledWrapper>
      <div className="notification" onClick={onClick}>
        <div className="bell-container">
          <div className="bell" />
        </div>
        <button className="group relative">
          {/* Notification Count Badge */}
          {count > 0 && (
            <div className="absolute -right-3 -top-5 z-10">
              <div className="flex h-5 w-5 items-center justify-center">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B7E1FF] opacity-75"
                ></span>
                <span
                  className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#B7E1FF] text-[10px] font-bold text-[#000080]"
                >
                  {count}
                </span>
              </div>
            </div>
          )}
        </button>
      </div>
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`
  /* Making bell shape with one div */
  .bell {
    border: 2.17px solid white;
    border-radius: 10px 10px 0 0;
    width: 15px;
    height: 17px;
    background: transparent;
    display: block;
    position: relative;
    top: -3px;
  }
  .bell::before,
  .bell::after {
    content: "";
    background: white;
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 2.17px;
  }
  .bell::before {
    top: 100%;
    width: 20px;
  }
  .bell::after {
    top: calc(100% + 4px);
    width: 7px;
  }

  /* Container main styling */
  .notification {
    background: transparent;
    border: none;
    padding: 15px 15px;
    border-radius: 50px;
    cursor: pointer;
    transition: 300ms;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Notifications number with before */
  
  /* Container background hover effect */
  .notification:hover {
    background: rgba(170, 170, 170, 0.062);
  }

  /* Container animations */
  .notification:hover > .bell-container {
    animation: bell-animation 650ms ease-out 0s 1 normal both;
  }

  /* Bell ring and scale animation */
  @keyframes bell-animation {
    20% {
      transform: rotate(15deg);
    }
    40% {
      transform: rotate(-15deg);
      scale: 1.1;
    }
    60% {
      transform: rotate(10deg);
      scale: 1.1;
    }
    80% {
      transform: rotate(-10deg);
    }
    0%,
    100% {
      transform: rotate(0deg);
    }
  }
`;

export { Notification };
