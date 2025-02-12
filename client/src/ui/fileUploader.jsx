import React from "react";
import styled, { keyframes } from "styled-components";

// Floating animation for folder
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Container = styled.div`
  --transition: 350ms;
  --folder-W: 90px; /* More compact */
  --folder-H: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  background: linear-gradient(135deg, #b7e1ff, #000080);
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  height: calc(var(--folder-H) * 1.7);
  width: 160px; /* Slightly increased width */
  position: relative;
`;

const Folder = styled.div`
  position: absolute;
  top: -15px;
  left: calc(50% - 45px);
  animation: ${float} 2.5s infinite ease-in-out; /* Floating animation */
  transition: transform var(--transition) ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const BackCover = styled.div`
  position: absolute;
  width: var(--folder-W);
  height: var(--folder-H);
  background: linear-gradient(135deg, #ffcf5c, #ffb347);
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  z-index: 0;
  transition: transform var(--transition);

  ${Container}:hover & {
    transform: rotateX(-10deg);
  }
`;

const FrontSide = styled.div`
  position: absolute;
  transition: transform var(--transition);
  transform-origin: bottom center;
  z-index: 2;

  ${Container}:hover & {
    transform: rotateX(-35deg) skewX(10deg);
  }
`;

const Tip = styled.div`
  background: linear-gradient(135deg, #ff9a56, #ff6f56);
  width: 60px;
  height: 12px;
  border-radius: 8px 8px 0 0;
  position: absolute;
  top: -6px;
  z-index: 3;
`;

const Cover = styled.div`
  background: linear-gradient(135deg, #ffe563, #ffc663);
  width: var(--folder-W);
  height: var(--folder-H);
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
`;

const FileLabel = styled.label`
  font-size: 0.9em;
  color: #f5f5db;
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background var(--transition) ease;
  display: inline-block;
  width: 100%;
  padding: 8px 20px;
  margin-top: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileUploader = () => {
  return (
    <Container>
      <Folder>
        <FrontSide>
          <Tip />
          <Cover />
        </FrontSide>
        <BackCover />
      </Folder>
      <FileLabel>
        <FileInput type="file" />
        Choose a file
      </FileLabel>
    </Container>
  );
};

export default FileUploader;
