import React from "react";
import styled from "styled-components";

const base = 38; // Define the base size for the breadcrumb

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 480px;
  padding: 0 40px;
`;

const BreadcrumbComponent = styled.div`
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  margin: auto;
  text-align: center;
  top: 50%;
  width: 100%;
  height: ${base * 1.5}px;
  transform: translateY(-50%);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 1), 0 4px 14px rgba(0, 0, 0, 0.7);
  z-index: 1;
  background-color: #ddd;
  font-size: 14px;
`;

const BreadcrumbItem = styled.a`
  position: relative;
  display: flex;
  flex-grow: 1;
  text-decoration: none;
  margin: auto;
  height: 100%;
  padding-left: ${base}px;
  padding-right: 0;
  color: #666;

  &:first-child {
    padding-left: ${base / 2.5}px;
  }

  &:last-child {
    padding-right: ${base / 2.5}px;
  }

  &:after {
    content: "";
    position: absolute;
    display: inline-block;
    width: ${base * 1.5}px;
    height: ${base * 1.5}px;
    top: 0;
    right: ${(base / 1.35) * -1}px;
    background-color: #ddd;
    border-top-right-radius: 5px;
    transform: scale(0.707) rotate(45deg);
    box-shadow: 1px -1px rgba(0, 0, 0, 0.25);
    z-index: 1;
  }

  &:last-child:after {
    content: none;
  }

  &.active,
  &:hover {
    background: darken(tomato, 20%);
    color: white;
  }

  &.active:after,
  &:hover:after {
    background: darken(tomato, 20%);
    color: white;
  }
`;

const BreadcrumbInner = styled.span`
  display: flex;
  flex-direction: column;
  margin: auto;
  z-index: 2;
`;

const BreadcrumbTitle = styled.span`
  font-weight: bold;
`;

const BreadcrumbDesc = styled.span`
  display: inline-block;
`;

const Breadcrumb = ({ pages }) => {
  return (
    <Container>
      <BreadcrumbComponent>
        {pages.map((page, index) => (
          <BreadcrumbItem
            key={index}
            href={page.link}
            className={page.isActive ? "active" : ""}
          >
            <BreadcrumbInner>
              <BreadcrumbTitle>{page.title}</BreadcrumbTitle>
              {page.description && (
                <BreadcrumbDesc>{page.description}</BreadcrumbDesc>
              )}
            </BreadcrumbInner>
          </BreadcrumbItem>
        ))}
      </BreadcrumbComponent>
    </Container>
  );
};

export default Breadcrumb;
