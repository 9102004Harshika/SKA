import React from "react";
import styled from "styled-components";

const InputGroup = styled.div`
  font-family: "Segoe UI", sans-serif;
  margin: 1em 0;
  position: relative;
`;

const Input = styled.input`
  font-size: 100%;
  padding: 0.8em;
  outline: none;
  border: 2px solid rgb(200, 200, 200);
  background-color: transparent;
  border-radius: 10px;
  width: 100%;
  transition: border-color 0.3s ease;

  &:focus,
  &:valid {
    border-color: #000080;
  }
`;

const Label = styled.label`
  font-size: 100%;
  position: absolute;
  left: 0;
  padding: 0.8em;
  margin-left: 0.5em;
  pointer-events: none;
  transition: all 0.3s ease;
  color: #000080;

  ${Input}:focus ~ &,
  ${Input}:valid ~ & {
    transform: translateY(-50%) scale(0.9);
    margin: 0;
    margin-left: 1.3em;
    padding: 0.4em;
    background-color: #f5f5db;
  }
`;

const TextInput = ({ label, ...props }) => {
  return (
    <InputGroup>
      <Input {...props} required autoComplete="off" />
      <Label>{label}</Label>
    </InputGroup>
  );
};

export default TextInput;
