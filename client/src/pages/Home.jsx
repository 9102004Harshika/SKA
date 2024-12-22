import React from "react";
import Carousel from "../components/Carousel";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Carousel />

      <h1>Resume wheres left...(Videos Pending) </h1>
      <h1>Top Picks For you...(Courses shown as carousel) </h1>
      <h1>One Shot Videos... (Videos) </h1>
      <h1>Small Videos... (Videos) </h1>
      <h1>Featured Courses... (Courses shown as carousel)</h1>
    </div>
  );
};

export default Home;
