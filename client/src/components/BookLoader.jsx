import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="book">
          <div className="page" />
          <div className="page page2" />
        </div>
        
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
 display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  .loader {
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    --book-color:  hsl(266 ,100% ,13%);
    --book-cover-color:hsl(41 ,100%, 62%) ;
  }
  .book {
    width: 150px;
    height: 13px;
    background-color:var(--book-cover-color);
    border-bottom: 2px solid var(--book-color);
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    position: relative;
  }
  .page {
    width: 50%;
    height: 2px;
    background-color: var(--book-cover-color);
    //background-color: hsl(268 ,82% ,27%);
    animation: paging 0.7s ease-out infinite;
    transform-origin: left;
  }
  .page2 {
    width: 50%;
    height: 2px;
    background-color:var(--book-cover-color);
    //background-color: hsl(268 ,82% ,27%);
    animation: paging 0.8s ease-out infinite;
    transform-origin: left;
    position: absolute;
  }
  @keyframes paging {
    10% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(-180deg);
    }
  }`;

export default Loader;

