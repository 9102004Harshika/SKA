import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";
import Slider from "../ui/slider";
import CourseCard from "../components/CourseCard";
import Notes from "../ui/illustrations/notes.svg";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SubjectSlider from "../components/SubjectSlider";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [oneShotCourses, setOneShotCourses] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, notesRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_BASE_URL}api/courses/getAll`),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}api/notes/getFree`),
        ]);

        const courseData = courseRes.data;
        const notesData = notesRes.data;
        // Featured courses (limit to 12)
        setCourses(courseData.slice(0, 12));
        setNotes(notesData);
        // Filter "One Shot" category
        const filteredOneShot = courseData.filter(
          (course) => course.category === "One Shot"
        );
        setOneShotCourses(filteredOneShot);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(notes);
  if (loading) {
    return (
      <div className="text-center text-lg font-semibold text-primary">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg font-semibold text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* <Helmet>
        <title>EcoStore – Sustainable Products</title>
        <meta
          name="description"
          content="Shop eco-friendly and sustainable products that make a difference."
        />
        <meta property="og:title" content="EcoStore" />
        <meta
          property="og:description"
          content="Sustainable shopping made easy."
        />
        <meta
          property="og:image"
          content="https://yourdomain.com/og-image.jpg"
        />
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet> */}
      <div className="mb-20">
        <Carousel />
      </div>

      <div className="mb-24 mx-8">
        <SubjectSlider />
      </div>

      {/* Featured Courses */}
      <div className="mb-20">
        <Slider
          items={courses}
          CardComponent={CourseCard}
          heading="Featured Courses"
        />
      </div>

      {/* One Shot Courses */}
      {oneShotCourses.length > 0 && (
        <div className="mb-20">
          <Slider
            items={oneShotCourses}
            CardComponent={CourseCard}
            heading="One Shot Videos"
          />
        </div>
      )}

      {/* Featured Notes */}
      <section className="flex justify-evenly p-10">
        {/* Left Side - Heading & Description */}
        <div className="flex flex-1  flex-col gap-6">
          <h1 className="text-4xl font-semibold font-header tracking-wide ">
            Notes
          </h1>
          <p className="text-justify text-tertiary  w-[600px]   ">
            Dive into our expansive library of free, meticulously curated notes
            spanning a diverse range of subjects. We've designed these resources
            to be your ultimate academic companion, transforming complex
            concepts into clear, concise, and easily digestible material.
          </p>
          <Button
            text="View Now"
            variant="accent"
            size="xs"
            className="w-fit "
            onClick={() => {
              navigate("/app/notes");
            }}
          />
        </div>

        {/* Right Side - Notes Cards */}
        <div>
          <img src={Notes} width={350} height={350} />
        </div>
      </section>
    </div>
  );
};

export default Home;
