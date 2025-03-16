import React from "react";
import styled, { keyframes } from "styled-components";

const cover = keyframes`${`from, 5%, 45%, 55%, 95%, to {
  animation-timing-function: ease-out;
  background-color: var(--primary-l);
}
10%, 40%, 60%, 90% {
  animation-timing-function: ease-in;
  background-color: var(--primary-d);
}`}`;

const shadow = keyframes`${`from, 10.01%, 20.01%, 30.01%, 40.01% {
  animation-timing-function: ease-in;
  transform: translate3d(0,0,1px) scaleY(0) rotateY(0);
}
5%, 15%, 25%, 35%, 45%, 55%, 65%, 75%, 85%, 95% {
  animation-timing-function: ease-out;
  transform: translate3d(0,0,1px) scaleY(0.2) rotateY(90deg);
}`}`;

const BookContainer = styled.div`
  background-color: hsl(266, 100%, 13%);
  border-radius: 0.25em;
  box-shadow: 0 0.25em 0.5em hsla(0, 0%, 0%, 0.3),
    0 0 0 0.25em hsl(266, 100%, 13%) inset;
  padding: 0.25em;
  perspective: 37.5em;
  position: relative;
  width: 8em;
  height: 6em;
  transform: translate3d(0, 0, 0);
  transform-style: preserve-3d;
  animation: ${cover} 7s ease-in-out infinite;
`;

const PageShadow = styled.div`
  position: absolute;
  left: 0.25em;
  width: calc(50% - 0.25em);
  animation: ${shadow} 7s ease-in-out infinite;
  background-image: linear-gradient(-45deg, hsla(0, 0%, 0%, 0) 50%, hsla(0, 0%, 0%, 0.3) 50%);
  filter: blur(0.25em);
  top: calc(100% - 0.25em);
  height: 3.75em;
  transform: scaleY(0);
  transform-origin: 100% 0%;
`;

const Page = styled.div`
  position: absolute;
  left: 0.25em;
  width: calc(50% - 0.25em);
  background-color: var(--white);
  background-image: linear-gradient(90deg, hsla(var(--hue), 10%, 90%, 0) 87.5%, hsl(var(--hue), 10%, 90%));
  height: calc(100% - 0.5em);
  transform-origin: 100% 50%;
`;

const Book = () => {
  return (
    <BookContainer>
      <PageShadow />
      <Page />
      <Page className="book__pg book__pg--2" />
      <Page className="book__pg book__pg--3" />
      <Page className="book__pg book__pg--4" />
      <Page className="book__pg book__pg--5" />
    </BookContainer>
  );
};

export default Book;
