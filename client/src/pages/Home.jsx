import React from "react";
import Carousel from "../components/Carousel";
import Navbar from "../components/Navbar";
import CourseCarousel from "../components/CourseCarousel";
import { courses } from "../config";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      {/* 
      <h1>Resume wheres left...(Videos Pending) </h1>
      <h1>Top Picks For you...(Courses shown as carousel) </h1>
      <h1>One Shot Videos... (Videos) </h1>
      <h1>Small Videos... (Videos) </h1>
      <h1>Featured Courses... (Courses shown as carousel)</h1> */}
      <h2 className="text-2xl font-bold text-primary mt-16 mb-10 text-center">
        Top Picks For You
      </h2>
      <CourseCarousel courses={courses} />
    </div>
  );
};

export default Home;
