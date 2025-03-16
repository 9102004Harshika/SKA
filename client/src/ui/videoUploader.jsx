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
  background: linear-gradient(135deg, #b7e1ff, #1d0042);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  height: 100px;
  width: 160px;
  position: relative;
  margin-top: 20px;
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
  color: #fff;
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

const VideoUploader = ({ label, onChange, ...props }) => {
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        alert("Only video files are allowed!");
        return;
      }
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      onChange && onChange(url); // Pass file URL to parent
    }
  };

  return (
    <Container>
      <CameraIcon src={camera} alt="Camera Icon" />
      <FileLabel>
        <FileInput
          accept="video/*"
          type="file"
          onChange={handleFileChange}
          {...props}
        />
        {label}
      </FileLabel>
      {fileUrl && (
        <p style={{ color: "#fff", fontSize: "12px" }}>Video Selected!</p>
      )}
    </Container>
  );
};

export default VideoUploader;
