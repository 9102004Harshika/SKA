

import React from 'react';
import styled from 'styled-components';

const CircularProgress = ({ progress}) => {
  const maxStrokeOffset = {
    body1: 402,
    body2: 465,
    body3: 339,
  };

  const adjustedStrokeOffset = (offset, progress) => {
    const roundedProgress = Math.round(progress);
    if (roundedProgress === 100) {
      return offset * (1 - roundedProgress / 100) + 22;
    }
    return offset * (1 - roundedProgress / 100);
  };

  const roundedProgress = Math.round(progress);

  return (
    <StyledWrapper progress={roundedProgress}>
      <svg xmlns="http://www.w3.org/2000/svg" height="200px" width="200px" viewBox="0 0 200 200" className="pencil">
        <g transform="translate(100,100)">
          <g fill="none" className="pencil__rotate" style={{ transform: `rotate(${(roundedProgress / 100) * 360}deg)` }}>
            <circle transform="rotate(-90)" strokeDashoffset={adjustedStrokeOffset(maxStrokeOffset.body1, roundedProgress)} strokeDasharray="402.12 402.12" strokeWidth={30} stroke="hsl(223,90%,50%)" r={64} className="pencil__body1" />
            <circle transform="rotate(-90)" strokeDashoffset={adjustedStrokeOffset(maxStrokeOffset.body2, roundedProgress)} strokeDasharray="464.96 464.96" strokeWidth={10} stroke="hsl(223,90%,60%)" r={74} className="pencil__body2" />
            <circle transform="rotate(-90)" strokeDashoffset={adjustedStrokeOffset(maxStrokeOffset.body3, roundedProgress)} strokeDasharray="339.29 339.29" strokeWidth={10} stroke="hsl(223,90%,40%)" r={54} className="pencil__body3" />
          </g>
          
          <g transform={`rotate(${(roundedProgress / 100) * 360 - 90}) translate(49,-30)`} className="pencil__point">
            <polygon points="15 0,30 30,0 30" fill="hsl(33,90%,70%)" />
            <polygon points="15 0,6 30,0 30" fill="hsl(33,90%,50%)" />
            <polygon points="15 0,20 10,10 10" fill="hsl(223,10%,10%)" />
          </g>
          
          {/* Eraser added to the body itself */}
          
        </g>
        <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fontSize="20px" fontWeight="bold" fill="hsl(223,90%,20%)">
          {roundedProgress}%
        </text>
      </svg>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .pencil {
    display: block;
    width: 10em;
    height: 10em;
  }
`;

export default CircularProgress;