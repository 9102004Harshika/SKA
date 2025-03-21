import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";
import Slider from "../ui/slider";
import CourseCard from "../components/CourseCard";
import NoteCard from "../components/NotesCard";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [oneShotCourses, setOneShotCourses] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // Filter "One Shot" category
        const filteredOneShot = courseData.filter(
          (course) => course.category === "One Shot"
        );
        setOneShotCourses(filteredOneShot);

        // Set Notes Data
        setNotes(notesData.slice(0, 12)); // Limit to 12 notes

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      {notes.length > 0 && (
        <div className="mb-20">
          <h1 className="font-semibold font-header text-4xl tracking-wide text-center mb-8">
            Featured Notes
          </h1>
          {/* <Slider items={notes} CardComponent={NoteCard} />  */}
        </div>
      )}
    </div>
  );
};

export default Home;
