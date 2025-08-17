import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import camera from "../images/camera.png";

// Floating animation for camera
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Container = styled.div`
  --transition: 350ms;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  background: linear-gradient(135deg, hsl(266, 100%, 13%), hsl(268, 82%, 27%));
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  height: 100px;
  width: 160px;
  position: relative;
  margin-top: 20px;
  border: 2px dotted transparent; /* default dotted but invisible */
  transition: border var(--transition), background var(--transition);

  &.dragover {
    border: 2px dotted #ffc33e; /* dotted gold when dragging */
    background: rgba(255, 255, 255, 0.08);
  }

  &:hover {
    border: 2px dotted #ffc33e; /* dotted gold on hover */
  }
`;

const CameraIcon = styled.img`
  width: 90px;
  height: 90px;
  position: absolute;
  top: -50px;
  animation: ${float} 2.5s infinite ease-in-out;
  transition: transform var(--transition);

  &:hover {
    transform: scale(1.1);
  }
`;

const FileLabel = styled.label`
  font-size: 0.9em;
  color: hsl(0, 0%, 98%);
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  cursor: pointer;
  transition: background var(--transition);
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

const VideoUploader = ({ label, onChange,FileUrl, ...props }) => {
  const [fileUrl, setFileUrl] = useState(FileUrl);
  const [dragActive, setDragActive] = useState(false);

  const processFile = (file) => {
    if (!file.type.startsWith("video/")) {
      alert("Only video files are allowed!");
      return;
    }
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    onChange && onChange(url);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };
  console.log(fileUrl);
  return (
    <Container
      className={dragActive ? "dragover" : ""}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CameraIcon src={camera} alt="Camera Icon" />
      <FileLabel>
        <FileInput
          accept="video/*"
          type="file"
          onChange={handleFileChange}
          {...props}
        />
        {label || "Upload Video"}
      </FileLabel>
      {fileUrl && (
        <p style={{ color: "#fff", fontSize: "12px" }}>Video Selected!</p>
      )}
    </Container>
  );
};

export default VideoUploader;
