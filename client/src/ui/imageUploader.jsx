
import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

// Floating Animation for the Logo (Continuous)
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const slide = keyframes`
  0%, 100% { bottom: -35px; }
  25%, 75% { bottom: -2px; }
  20%, 80% { bottom: 2px; }
`;

const rotate = keyframes`
  0% { transform: rotate(-15deg); }
  25%, 75% { transform: rotate(0deg); }
  100% { transform: rotate(25deg); }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  background: linear-gradient(135deg, hsl(266, 100%, 13%), hsl(268, 82%, 27%));
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  width: 160px;
  height: 92px;
  position: relative;
  cursor: pointer;
  overflow: visible;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  transition: border-color 0.3s ease, background 0.3s ease;

  ${(props) =>
    props.isDragOver &&
    css`
      border-color: hsl(41, 100%, 62%);
      background: linear-gradient(135deg, hsl(268, 82%, 27%), hsl(266, 100%, 13%));
    `}
`;

const ImageIcon = styled.div`
  width: 64px;
  height: 64px;
  position: absolute;
  top: -25px;
  background: hsl(0, 0%, 98%);
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: ${float} 2.5s infinite ease-in-out; /* Continuous floating */

  &:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 40px;
    transform: rotate(45deg) translate(30%, 40%);
    background: hsl(41, 100%, 62%);
    box-shadow: 32px -34px 0 5px hsla(31, 100%, 62%, 73%);
    animation: ${slide} 2s infinite ease-in-out alternate;
  }

  &:after {
    content: "";
    position: absolute;
    left: 10px;
    top: 10px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: hsla(47, 100%, 62%, 92%);
    transform-origin: 35px 145px;
    animation: ${rotate} 2s infinite ease-in-out;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  font-size: 0.9em;
  color: hsl(0, 0%, 98%);
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 350ms ease;
  display: inline-block;
  width: 100%;
  padding: 8px 20px;
  margin-top: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const ImageUploader = ({ label, onChange, ...props }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

const handleFile = (file) => {
  if (file && file.type.startsWith("image/")) {
    const url = URL.createObjectURL(file);
    setFileUrl(url);          // for preview
    onChange && onChange(file); // send actual File object
  } else {
    alert("Only image files are allowed!");
  }
};


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) handleFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <Container
      isDragOver={isDragOver}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <ImageIcon />
      <FileLabel>
        <FileInput
        name="coverImage" 
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          {...props}
        />
        {label || "Choose Image"}
      </FileLabel>
      {fileUrl && (
        <p style={{ color: "#f5f5db", fontSize: "12px" }}>File Selected!</p>
      )}
    </Container>
  );
};

export default ImageUploader;
