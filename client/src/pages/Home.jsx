import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";
import Slider from "../ui/slider";
import CourseCard from "../components/CourseCard";
import NoteCard from "../components/NotesCard";
import Notes from "../ui/illustrations/notes.svg";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

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
          axios.get("http://localhost:5000/api/courses/getAll"),
          axios.get("http://localhost:5000/api/notes/getFree"),
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
      <div className="mb-24">
        <Carousel />
      </div>

      {/* Featured Courses */}
      <div className="mb-20">
        <h1 className="font-semibold font-header text-4xl tracking-wide text-center mb-8">
          Featured Courses
        </h1>
        <Slider items={courses} CardComponent={CourseCard} />
      </div>

      {/* One Shot Courses */}
      {oneShotCourses.length > 0 && (
        <div className="mb-20">
          <h1 className="font-semibold font-header text-4xl tracking-wide text-center mb-8">
            One Shot Videos
          </h1>
          <Slider items={oneShotCourses} CardComponent={CourseCard} />
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
