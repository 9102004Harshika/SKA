import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaBook,
  FaChalkboardTeacher,
  FaFileAlt,
  FaInfoCircle,
  FaStar,
  FaUserCircle,
  FaChevronDown,
  FaChevronUp,
  FaUserTie,
  FaPhoneAlt,
} from "react-icons/fa";
import { Button } from "../ui/button";
import { LuTvMinimalPlay } from "react-icons/lu";

const CourseDetailPage = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null); // State to store course details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [expandedModules, setExpandedModules] = useState({});
  const toggleModule = (index) => {
    setExpandedModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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

  const renderDescription = (text, showMore, toggleShowMore) => {
    const previewLength = 100;
    if (text.length <= previewLength) return <p>{text}</p>;
    return (
      <p>
        {showMore ? text : `${text.substring(0, previewLength)}...`}
        <button
          className="text-blue-500 ml-2 underline"
          onClick={toggleShowMore}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </p>
    );
  };

  const toggleShowMore = (setter) => setter((prev) => !prev);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="md:flex block bg-secondary items-start">
          {/* Instructor Photo - Mobile on top */}
          <div className="md:w-[40%] w-full p-6 md:p-10 order-first md:order-last">
            <img
              src={course.courseImage}
              alt="Instructor"
              className="object-contain mx-auto rounded-lg shadow-md md:w-[500px] md:h-[300px] w-full h-auto"
            />
          </div>

          {/* Header Section */}
          <div className="md:w-[60%] w-full p-6 md:p-10">
            <h1 className="text-4xl md:text-5xl font-bold font-header leading-snug text-primary">
              {course.courseTitle}
            </h1>
            <p className="md:text-xl text-lg text-gray-600 font-body mt-4">
              {course.courseDescription}
            </p>
            <div className="inline-flex items-center space-x-2 mt-6">
              <FaUserCircle className="text-2xl text-primary" />
              <span className="text-lg text-gray-700 font-medium">
                By {course.instructor.name}
              </span>
            </div>

            {/* Features */}
            <div className="flex gap-4 mt-6">
              {course.keyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-background px-6 py-2 text-lg rounded-full shadow-md"
                >
                  {feature}
                </div>
              ))}
            </div>

            {/* Price Details */}
            <div className="mt-6">
              <p className="text-lg">
                <strong>Original Price:</strong> ${course.originalPrice}
                <br />
                <strong>Discounted Price:</strong> ${course.discountedPrice}
                <br />
                <strong>Discount Percentage:</strong>{" "}
                {course.discountPercentage.toFixed(2)}% off
              </p>
            </div>

            {/* Action Button and Students Enrolled */}
            <div className="mt-6 flex items-center">
              <Button
                variant="course"
                text="Buy Now"
                type="submit"
                className="w-fit px-8 py-3 text-lg font-bold"
              />
              <p className="text-gray-500 text-lg font-medium mt-2">
                {course.studentCount} Students Enrolled
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div
        className="absolute bottom-0 w-full md:py-4 z-10 bg-background mx-auto p-6 rounded-sm shadow-2xl md:mt-4 mt-[70px] justify-between hidden md:flex"
        style={{
          maxWidth: "1000px",
          boxShadow:
            "0px 15px 50px -5px rgb(184, 169, 169), -5px -0px 20px 0px rgb(184, 169, 169)",
          paddingBottom: "20px",
          zIndex: 10,
          position: "relative",
          top: "-70px",
        }}
      >
        {/* Content for medium screens and up */}
        <div className="text-center w-full sm:w-[22%] border-r border-gray-300 last:border-0">
          <h2 className="text-xl font-bold font-header tracking-wider">
            Review
          </h2>
          <p className="text-lg text-gray-700 inline-flex mt-4">
            {/* {renderStars(review)} Dynamically renders stars */}
          </p>
        </div>

        <div className="text-center w-full sm:w-[22%] border-r border-gray-300 last:border-0">
          <h2 className="text-2xl font-bold font-header tracking-wider">
            Class
          </h2>
          <p className="text-lg text-gray-700 mt-2">{course.class}</p>{" "}
          {/* Dynamically displays class */}
        </div>

        <div className="text-center w-full sm:w-[22%] border-r border-gray-300 last:border-0">
          <h2 className="text-xl font-bold font-header tracking-wider">
            Board
          </h2>
          <p className="text-lg text-gray-700 mt-3">{course.board}</p>{" "}
          {/* Dynamically displays board */}
        </div>

        <div className="text-center w-full sm:w-[22%] border-r border-gray-300 last:border-0">
          <h2 className="text-xl font-bold font-header tracking-wider">
            Subject
          </h2>
          <p className="text-lg text-gray-700 mt-3">{course.subject}</p>{" "}
          {/* Dynamically displays subject */}
        </div>

        {/* Conditionally render the "Stream" for class 11th or 12th */}
        {(course.class === "11th" || course.class === "12th") && (
          <div className="text-center w-full sm:w-[22%] last:border-0">
            <h2 className="text-xl font-bold font-header tracking-wider">
              Stream
            </h2>
            <p className="text-lg text-gray-700 mt-3">{course.stream}</p>{" "}
            {/* Dynamically displays stream */}
          </div>
        )}
      </div>

      <div>
        {/* Sticky Navbar */}
        <div className="md:pt-10 md:pl-[200px] md:pr-[200px] pt-10 pl-[100px] pr-[100px] md:text-xl text-lg font-bold font-header">
          <div className="flex md:gap-[100px] gap-[50px] items-center pb-5 border-b-4 border-gray-300 justify-center">
            <button
              className="flex flex-col items-center"
              onClick={() =>
                document
                  .getElementById("about-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <h1 className="hidden md:block">About</h1>{" "}
              {/* Show text on larger screens */}
              <FaInfoCircle className="block md:hidden text-xl" />{" "}
              {/* Show icon on smaller screens */}
            </button>
            <button
              className="flex flex-col items-center"
              onClick={() =>
                document
                  .getElementById("module-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <h1 className="hidden md:block">Modules</h1>
              <FaBook className="block md:hidden text-xl" />
            </button>
            <button
              className="flex flex-col items-center"
              onClick={() =>
                document
                  .getElementById("quizAndNotes-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <h1 className="hidden md:block">Quiz/Notes</h1>
              <FaFileAlt className="block md:hidden text-xl" />
            </button>
            <button
              className="flex flex-col items-center"
              onClick={() =>
                document
                  .getElementById("instructor-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <h1 className="hidden md:block">Instructor</h1>
              <FaChalkboardTeacher className="block md:hidden text-xl" />
            </button>
            <button
              className="flex flex-col items-center"
              onClick={() =>
                document
                  .getElementById("review-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <h1 className="hidden md:block">Review</h1>
              <FaStar className="block md:hidden text-xl" />
            </button>
          </div>
        </div>

        {/* Other Sections */}
        <div id="about-section">{/* About Section Content */}</div>
        <div id="module-section">
          {/* Modules Section */}
          <div
            id="module-section"
            className="md:block pt-5 pl-[20px] md:pl-[110px] md:pt-10 md:gap-[200px] pb-20"
          >
            <div>
              <h1 className="md:text-3xl text-3xl font-bold font-header md:leading-normal leading-normal">
                There are {course.modules.length} modules in this course
              </h1>
              <p className="md:text-xl text-md text-gray-500 font-body md:w-[900px] w-full mt-4">
                {course.moduledescription}
              </p>
            </div>
            <ul className="md:space-y-6 md:mt-10 md:pr-[500px] mt-5 space-y-10 pr-10">
              {course.modules.map((module, index) => (
                <li key={module._id} className="space-y-2">
                  <div className="flex justify-between items-center p-4 bg-secondary rounded-sm shadow-xl hover:shadow-2xl transition-shadow">
                    {/* Module Details */}
                    <div className="space-y-3 p-2 w-full">
                      <p className="text-xl font-semibold font-header text-primary">
                        {module.name}
                      </p>
                      <div className="flex gap-5">
                        {" "}
                        <p className="font-bold text-gray-500">
                          Module {index + 1}
                        </p>
                        <p className="font-bold text-gray-500">
                          {module.estimatedTime} hours to complete
                        </p>
                      </div>
                      {expandedModules[index] && (
                        <div className="flex gap-[20px] flex-wrap">
                          <a
                            href={module.videoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-accent text-background px-4 py-2 rounded-md w-fit font-semibold hover:bg-primary transition-colors mt-2"
                          >
                            <LuTvMinimalPlay className="mr-2" />
                            Watch Video
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Toggle Button for expansion */}
                    <button
                      onClick={() => toggleModule(index)}
                      className="text-xl p-2 text-primary rounded-full transition-all"
                    >
                      {expandedModules[index] ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  </div>

                  {/* Expandable content */}
                  {expandedModules[index] && (
                    <div className="flex gap-[20px] flex-wrap mt-4">
                      <p className="text-gray-500">{module.description}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div id="quizAndNotes-section">{/* Quiz/Notes Section Content */}</div>
        <div id="instructor-section">{/* Instructor Section Content */}</div>
        <div id="review-section">{/* Review Section Content */}</div>
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
            <strong>Category:</strong> {course.category}
          </li>
          <li>
            <strong>Total Lectures:</strong> {course.totalLectures}
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
            <strong>Topics Covered:</strong> {course.topicsCovered.join(", ")}
          </li>
        </ul>
      </div>

      <div
        id="instructor-section"
        className="md:block pt-5 pl-[10px] md:pl-[110px] md:pt-10 md:gap-[200px] pb-20 md:pr-20 pr-5"
      >
        <div>
          <h1 className="md:text-3xl text-3xl flex items-center gap-4 font-bold font-header md:leading-normal leading-normal">
            <FaUserTie className="text-primary" /> Meet Our Instructor
          </h1>
        </div>
        <div
          className="p-6 rounded-sm mt-8 bg-secondary"
          style={{ boxShadow: "0px 15px 50px -5px rgb(184, 169, 169)" }}
        >
          {course?.instructor && course.instructor.name ? (
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0">
              {course.instructor.photo ? (
                <img
                  src={course.instructor.photo}
                  alt={course.instructor.name}
                  className="md:w-28 md:h-28 w-48 h-48 rounded-full object-cover border-4 border-primary transition-all duration-300 ease-in-out"
                />
              ) : (
                <div className="w-28 h-28 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">N/A</span>
                </div>
              )}
              <div className="md:ml-6 text-justify md:text-left flex-grow">
                <p className="text-3xl font-bold font-header tracking-wider text-primary">
                  {course.instructor.name}
                </p>
                <p className="text-lg text-primary mt-1">
                  {course.instructor.role || "Instructor Role"}
                </p>
                <p className="font-bold font-header mt-1">
                  {course.instructor.education}
                </p>
                <p className="mb-1 font-bold font-header text-gray-600 mt-1">
                  {course.instructor.experience} years of experience
                </p>
                {renderDescription(
                  course.instructor.bio || "No bio available",
                  course.showMoreInstructor,
                  () => toggleShowMore(setCourse.showMoreInstructor)
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No instructor details available.</p>
          )}
        </div>
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

      {/* Queries */}
      <div className="md:block pt-5 pl-[10px] md:pl-[110px] md:pt-10 md:gap-[200px] pb-20 md:pr-20 pr-5">
        <div
          className="p-6 rounded-sm mt-8 bg-background"
          style={{ boxShadow: "0px 15px 50px -5px rgb(184, 169, 169)" }}
        >
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Have Any Questions?
          </h3>
          <p className="text-gray-700 mb-6">
            We're here to help! Feel free to reach out to us for any queries or
            support.
          </p>
          <a
            href="tel:+1234567890"
            className="inline-flex items-center bg-accent text-white px-6 py-3 rounded-md font-semibold hover:bg-primary transition-colors shadow-md"
          >
            <FaPhoneAlt className="mr-2" />
            Call Us: +91 93426 75932
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
