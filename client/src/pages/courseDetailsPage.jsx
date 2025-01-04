import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetailPage = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null); // State to store course details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch course details from the server
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses/677957a740a39e88090dbc59`
        );
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch course details.");
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 font-sans space-y-8">
      <h1 className="text-4xl font-semibold">{course.courseTitle}</h1>

      {/* Course Image */}
      <img
        src={course.courseImage}
        alt={course.courseTitle}
        className="w-full max-h-80 object-cover rounded-lg"
      />

      {/* Course Description */}
      <p className="mt-4 italic text-lg">{course.courseDescription}</p>

      {/* Price Details */}
      <div>
        <h2 className="text-2xl font-semibold mt-6">Price Details</h2>
        <p className="text-lg">
          <strong>Original Price:</strong> ${course.originalPrice}
          <br />
          <strong>Discounted Price:</strong> ${course.discountedPrice}
          <br />
          <strong>Discount Percentage:</strong>{" "}
          {course.discountPercentage.toFixed(2)}%
        </p>
      </div>

      {/* Module Description */}
      <div>
        <h2 className="text-2xl font-semibold mt-6">Module Description</h2>
        <p className="py-5 rounded-md">{course.moduledescription}</p>
      </div>

      {/* Demo Video */}
      <div>
        <h2 className="text-2xl font-semibold mt-6">Demo Video</h2>
        <a
          href={course.demoVideo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary bg-secondary underline"
        >
          Watch Demo Video
        </a>
      </div>

      <hr className="my-6" />

      {/* Course Details */}
      <div>
        <h2 className="text-2xl font-semibold">Course Details</h2>
        <ul className="list-disc pl-8 space-y-2">
          <li>
            <strong>Class:</strong> {course.class}
          </li>
          <li>
            <strong>Board:</strong> {course.board}
          </li>
          <li>
            <strong>Subject:</strong> {course.subject}
          </li>
          <li>
            <strong>Stream:</strong> {course.stream}
          </li>
          <li>
            <strong>Category:</strong> {course.category}
          </li>
          <li>
            <strong>Total Lectures:</strong> {course.totalLectures}
          </li>
          <li>
            <strong>Students Enrolled:</strong> {course.studentCount}
          </li>
          <li>
            <strong>Total Estimated Time:</strong> {course.totalEstimatedTime}{" "}
            hours
          </li>
          <li>
            <strong>Last Updated:</strong>{" "}
            {new Date(course.lastUpdated).toLocaleDateString()}
          </li>
          <li>
            <strong>Key Features:</strong> {course.keyFeatures.join(", ")}
          </li>
          <li>
            <strong>Topics Covered:</strong> {course.topicsCovered.join(", ")}
          </li>
        </ul>
      </div>

      <hr className="my-6" />

      {/* Modules */}
      <div>
        <h2 className="text-2xl font-semibold">Modules</h2>
        <ul className="space-y-4">
          {course.modules.map((module) => (
            <li key={module._id} className="space-y-2">
              <strong className="text-xl">{module.name}</strong> (
              {module.estimatedTime} hours)
              <br />
              <a
                href={module.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Watch Module Video
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructor Details */}
      <div>
        <h2 className="text-2xl font-semibold">Instructor Details</h2>
        <p>
          <strong>Name:</strong> {course.instructor.name}
          <img src={course.instructor.photo} alt={course.instructor.name} />
          <br />
          <strong>Experience:</strong> {course.instructor.experience} years
        </p>
        <p>Education: {course.instructor.education}</p>
        <p>Bio: {course.instructor.bio}</p>
        <p>Role: {course.instructor.role}</p>
      </div>

      {/* Notes */}
      <div>
        <h2 className="text-2xl font-semibold">Notes</h2>
        <ul className="space-y-4">
          {course.notes && course.notes.length > 0 ? (
            course.notes.map((note) => (
              <li key={note._id}>
                <strong>{note.name}</strong>: {note.description}
                <img src={note.image} alt={note.name} />
                <br />
                <a
                  href={note.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Notes
                </a>
              </li>
            ))
          ) : (
            <p>No notes available</p>
          )}
        </ul>
      </div>

      {/* Quizzes */}
      <div>
        <h2 className="text-2xl font-semibold">Quizzes</h2>
        <ul className="space-y-4">
          {course.quizzes && course.quizzes.length > 0 ? (
            course.quizzes.map((quiz) => (
              <li key={quiz._id}>
                <strong>{quiz.name}</strong>: {quiz.description}
                <img src={quiz.image} alt={quiz.name} />
                <br />
                <a
                  href={quiz.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Take Quiz
                </a>
              </li>
            ))
          ) : (
            <p>No quizzes available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetailPage;
