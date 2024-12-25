// src/components/NotificationBell.jsx
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Animation for the bell
const keyframesFill = keyframes`
  0% {
    opacity: 0;
  }

  25% {
    transform: rotate(25deg);
  }

  50% {
    transform: rotate(-20deg) scale(1.2);
  }

  75% {
    transform: rotate(15deg);
  }
`;

const Container = styled.label`
  --color: #a5a5b0;
  --size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-size: var(--size);
  user-select: none;
  fill: var(--color);
`;

const BellRegular = styled.svg`
  position: absolute;
  animation: ${keyframesFill} 0.5s;
`;

const BellSolid = styled.svg`
  position: absolute;
  display: none;
  animation: ${keyframesFill} 0.5s;
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const NotificationBell = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    if (panelOpen) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [panelOpen]);

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };

  return (
    <Container onClick={togglePanel}>
      <Input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <BellRegular
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 448 512"
      >
        <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
      </BellRegular>
      <BellSolid
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 448 512"
      >
        <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
      </BellSolid>
    </Container>
  );
};

export default NotificationBell;
