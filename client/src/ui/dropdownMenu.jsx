import React from 'react';
import styled from 'styled-components';
import { navigationLinksMoreItems } from '../config';
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
    transition: 300ms;
    filter: blur(1.5px);
    transform: scale(0.95, 0.95);
  }
    

`;

export  {DropDown};
