import React from "react";
import Carousel from "../components/Carousel";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Carousel />

      <h1>Top Picks For you...</h1>
      <h1>One Shot Videos...</h1>
      <h1>Suggested Videos...</h1>
    </div>
  );
};

export default Home;
