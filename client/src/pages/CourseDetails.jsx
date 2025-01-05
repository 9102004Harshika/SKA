// import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { Button } from "../ui/button";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { useState } from "react";
import { courseMaterialConfig } from "../config/index.js";
import { LuTvMinimalPlay } from "react-icons/lu";
import {
  FaInfoCircle,
  FaBook,
  FaFileAlt,
  FaChalkboardTeacher,
  FaPhoneAlt,
  FaUserTie,
  FaClipboardCheck,
} from "react-icons/fa"; // Import icons
import { LuNotebookPen } from "react-icons/lu";
import { MdQuiz } from "react-icons/md";
const MAX_DESCRIPTION_LENGTH = 100;
const CourseDetail = () => {
  const [review, setReview] = useState(4.5); // Set to 5 for demonstration, you can change this value
  const { notes, quizzes, instructor, videos, reviews } =
    courseMaterialConfig[0];
  const [expandedModules, setExpandedModules] = useState({});

  const toggleModule = (index) => {
    setExpandedModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const course = {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLyiFdcVtrki9Ek26RiY-vw4hgUuWyaf5BwSqHpc691zglSyZIT0E3HqtgqPDABfRJrRI&usqp=CAU",
    title: "Master ICSE Class 10 Mathematics: Conquer the Syllabus",
    class: "10th",
    board: "SSC",
    subject: "Maths",
    stream: "",
    instructor: {
      name: "Ms. Priya Rao",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLyiFdcVtrki9Ek26RiY-vw4hgUuWyaf5BwSqHpc691zglSyZIT0E3HqtgqPDABfRJrRI&usqp=CAU",
      bio: "M.Sc. Mathematics with 10+ years of teaching experience.",
    },
    studentCount: 8000,
    keyFeatures: [
      "Step-by-Step Solutions & Explanations",
      "Practice Problems & Worksheets",
      "Previous Year Question Papers with Solutions",
      "Doubt Clearing Sessions",
      "Certificate of Completion",
    ],
    totalLectures: 80,
    price: "₹1999",
    originalPrice: "₹3999",
    discount: "50% Off",
    description:
      "This comprehensive course covers the entire ICSE Class 10 Mathematics syllabus with engaging video lectures, practice problems, and expert guidance to help you achieve your academic goals.",
    topics: [
      "Algebra",
      "Geometry",
      "Trigonometry",
      "Mensuration",
      "Statistics & Probability",
    ],
    reviews: [
      {
        name: "David J.",
        comment:
          "Highly recommended! This course made math so much easier to understand.",
        stars: 5,
      },
      {
        name: "Alice T.",
        comment: "Very detailed and well-structured. Worth the price!",
        stars: 4,
      },
    ],
    quizDetails:
      "Includes chapter-wise quizzes and full-length mock tests to evaluate your understanding.",
    quizLink: "#",
    notesDescription:
      "Access detailed notes for all chapters, curated by expert educators, to help you master key concepts and topics.",
    notesLink: "#",
  };

  // Function to render stars based on review value
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Check if there's a half star

    // Render full stars
    let stars = [...Array(fullStars)].map((_, index) => (
      <FaStar key={`full-${index}`} className="text-accent" />
    ));

    // Render half star if applicable
    if (halfStars) {
      stars.push(<FaStarHalfAlt key="half" className="text-accent" />);
    }

    return stars;
  };
  const [showMoreNotes, setShowMoreNotes] = useState(false);
  const [showMoreQuizzes, setShowMoreQuizzes] = useState(false);
  const [showMoreInstructor, setShowMoreInstructor] = useState(false);

  const toggleShowMore = (setState) => setState((prev) => !prev);

  const renderDescription = (description, isExpanded, toggleExpand) => (
    <div>
      <div
        className={`overflow-hidden transition-all duration-[600ms] ease-in-out ${
          isExpanded ? "max-h-[1000px] p-1" : "max-h-[60px] p-0"
        }`}
      >
        <p className="text-gray-600 text-sm md:text-sm text-md font-body w-full mt-[1px]">
          {isExpanded
            ? description
            : `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`}
        </p>
      </div>
      {description.length > MAX_DESCRIPTION_LENGTH && (
        <button
          onClick={toggleExpand}
          className={`text-primary font-header font-semibold text-md flex items-center ${
            isExpanded ? "mt-1 ml-1" : "mt-[1px]"
          }`}
        >
          {isExpanded ? (
            <>
              See Less <FaChevronUp className="ml-2 " />
            </>
          ) : (
            <>
              See More <FaChevronDown className="ml-1 " />
            </>
          )}
        </button>
      )}
    </div>
  );
  return (
    <div>
      {" "}
      <div className="relative">
        <div className="md:flex block bg-secondary">
          {/* Instructor Photo - Mobile on top */}
          <div className="md:pt-5 p-6 md:w-[40%] md:mt-[10%] w-full order-first md:order-last">
            <img
              src={course.image}
              alt="Instructor"
              className="object-fit mx-auto md:w-[500px] md:h-[300px] w-full h-full"
            />
          </div>

          {/* Header */}
          <div className="md:p-20 md:pt-14 p-6 md:w-[60%] w-full">
            <h1 className="text-3xl md:text-5xl font-bold font-header md:leading-normal leading-normal">
              {course.title}
            </h1>
            <p className="md:text-xl text-lg text-gray-500 font-body md:w-[60%] w-full mt-4">
              {course.description}
            </p>
            <p className="inline-flex items-center space-x-2 mt-4 font-bold text-xl">
              <FaUserCircle className="text-xl" />
              <span>By {course.instructor.name}</span>
            </p>
            <div className="flex gap-4 mt-4">
              <div className="bg-background md:px-[2%] px-[5%] py-[2%] md:py-[1%] md:text-xl text-lg rounded-full">
                <p>Notes</p>
              </div>
              <div className="bg-background md:px-[2%] px-[5%] py-[2%] md:py-[1%] text-lg rounded-full">
                <p>Quizzes</p>
              </div>
              <div className="bg-background md:px-[2%] px-[5%] py-[2%] md:py-[1%] md:text-xl text-lg rounded-full">
                <p>Videos</p>
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="course"
                text="Buy Now"
                type="submit"
                className="md:w-fit"
              />
              <p className="text-gray-500 text-lg font-bold">
                {course.studentCount} Students Enrolled
              </p>
            </div>
          </div>
        </div>

        {/* features */}
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
              {renderStars(review)} {/* Dynamically renders stars */}
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
      </div>
      <div>
        {/* Sticky Navbar */}
        <div className=" md:pt-10 md:pl-[200px] md:pr-[200px] pt-10 pl-[100px] pr-[100px] md:text-xl text-lg font-bold font-header">
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
      </div>
      {/* About Section */}
      <div
        id="about-section"
        className="md:flex pt-10 pl-[20px] md:pl-[110px] md:pt-20 md:gap-[200px] pb-20"
      >
        <div>
          <h1 className="md:text-3xl text-3xl font-bold font-header md:leading-normal leading-normal">
            About the Course :
          </h1>
          <p className="md:text-xl text-md text-gray-500 font-body md:w-[500px] w-full mt-4">
            {course.description}
          </p>
        </div>
        <div>
          <h1 className="text-3xl md:text-3xl md:mt-0 mt-10 font-bold font-header md:leading-normal leading-normal">
            Topics Covered :
          </h1>
          <div className="flex flex-wrap">
            {course.topics.map((topic, index) => (
              <div
                key={index}
                className="md:w-1/2 w-full flex items-center mt-4"
              >
                <IoMdCheckmark className="text-accent text-xl mr-2" />{" "}
                {/* Checkmark icon */}
                <p className="md:text-xl text-md text-gray-500 font-body">
                  {topic}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Courses Section */}
      <div
        id="module-section"
        className="md:block pt-5 pl-[20px] md:pl-[110px] md:pt-10 md:gap-[200px] pb-20"
      >
        <div>
          <h1 className="md:text-3xl text-3xl font-bold font-header md:leading-normal leading-normal">
            There are {videos.length} modules in this course
          </h1>
          <p className="md:text-xl text-md text-gray-500 font-body md:w-[900px] w-full mt-4">
            {course.description}
          </p>
        </div>

        {videos && videos.length > 0 ? (
          <div className="md:space-y-6 md:mt-10 md:pr-[500px] mt-5 space-y-10 pr-10">
            {videos.map((video, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-secondary rounded-sm shadow-xl hover:shadow-2xl  transition-shadow"
              >
                {/* Video Details */}
                <div className="space-y-3 p-2 w-full">
                  <p className="text-xl font-semibold font-header text-primary">
                    {video.title}
                  </p>
                  <div className="flex gap-5">
                    {" "}
                    <p className="font-bold text-gray-500">
                      Module {index + 1}
                    </p>
                    <p className="font-bold text-gray-500">
                      {video.time} to complete
                    </p>
                  </div>
                  {expandedModules[index] && (
                    <div className="flex gap-[20px] flex-wrap">
                      <a
                        href={video.link}
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

                {/* Toggle Button */}
                <button
                  onClick={() => toggleModule(index)}
                  className="text-xl p-2  text-primary rounded-full  transition-all"
                >
                  {expandedModules[index] ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No video details available.</p>
        )}
      </div>
      {/* NOtes and Quiz */}
      <div
        id="quizAndNotes-section"
        className="md:block flex flex-col pt-10 pl-[10px] md:pl-[110px] md:pt-20 md:gap-[200px] pb-20 md:pr-20 pr-5"
      >
        <div>
          <h1 className="md:text-3xl text-3xl font-bold font-header md:leading-normal leading-normal">
            Notes And Quizzes
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:mt-10 mt-10">
          {/* Notes Section */}
          <div
            className="p-6 rounded-sm  bg-secondary hover:shadow-2xl transition-shadow"
            style={{ boxShadow: "0px 15px 50px -5px rgb(184, 169, 169)" }}
          >
            <h3 className="text-xl font-semibold mb-4 text-primary flex items-center font-header tracking-wider">
              <FaBook className="mr-2" />
              Notes
            </h3>
            {notes && notes.name ? (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                  {notes.image && (
                    <div className="w-44 aspect-w-4 aspect-h-3 flex-shrink-0">
                      <img
                        src={notes.image}
                        alt={notes.name}
                        className="w-full h-full object-cover rounded-sm shadow-2xl transition-all duration-300 ease-in-out"
                      />
                    </div>
                  )}
                  <div className="flex flex-col space-y-4">
                    <p className="text-xl font-header font-bold">
                      {notes.name}
                    </p>
                    {renderDescription(
                      notes.description || "No description provided",
                      showMoreNotes,
                      () => toggleShowMore(setShowMoreNotes)
                    )}
                    {notes.link ? (
                      <a
                        href={notes.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-accent text-background px-4 py-2 rounded-md text-center font-semibold hover:bg-primary inline-block w-fit"
                      >
                        <LuNotebookPen className="inline-block mr-2" />
                        View Notes
                      </a>
                    ) : (
                      <p className="text-gray-500">No link available</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No notes details available.</p>
            )}
          </div>

          {/* Quizzes Section */}
          <div
            className="p-6 rounded-sm  bg-secondary hover:shadow-2xl transition-shadow"
            style={{ boxShadow: "0px 15px 50px -5px rgb(184, 169, 169)" }}
          >
            <h3 className="text-xl font-semibold mb-4 text-primary flex items-center font-header tracking-wider">
              <FaClipboardCheck className="mr-2" />
              Quizzes
            </h3>
            {quizzes && quizzes.name ? (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                  {quizzes.image && (
                    <div className="w-44 aspect-w-4 aspect-h-3 flex-shrink-0">
                      <img
                        src={quizzes.image}
                        alt={quizzes.name}
                        className="w-full h-full object-cover rounded-md shadow-sm transition-all duration-300 ease-in-out"
                      />
                    </div>
                  )}
                  <div className="flex flex-col space-y-4 flex-grow">
                    <p className="text-xl font-header font-bold">
                      {quizzes.name}
                    </p>
                    {renderDescription(
                      quizzes.description || "No description provided",
                      showMoreQuizzes,
                      () => toggleShowMore(setShowMoreQuizzes)
                    )}
                    {quizzes.link ? (
                      <a
                        href={quizzes.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-accent text-background px-4 py-2 rounded-md text-center font-semibold hover:bg-primary inline-block w-fit"
                      >
                        <MdQuiz className="inline-block mr-2" />
                        Take Quiz
                      </a>
                    ) : (
                      <p className="text-gray-500">No link available.</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No quiz details available.</p>
            )}
          </div>
        </div>
      </div>
      {/* Instructor */}
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
          {instructor && instructor.name ? (
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0">
              {instructor.photo ? (
                <img
                  src={instructor.photo}
                  alt={instructor.name}
                  className="md:w-28 md:h-28  w-48 h-48 rounded-full object-cover border-4 border-primary transition-all duration-300 ease-in-out"
                />
              ) : (
                <div className="w-28 h-28 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">N/A</span>
                </div>
              )}
              <div className="md:ml-6 text-justify md:text-left flex-grow">
                <p className="text-3xl font-bold font-header tracking-wider text-primary">
                  {instructor?.name}
                </p>
                <p className="text-lg text-primary mt-1">
                  {instructor?.role || "Instructor Role"}
                </p>
                <p className="font-bold font-header mt-1">
                  {instructor?.education}
                </p>
                <p className="mb-1 font-bold font-header text-gray-600 mt-1">
                  {instructor?.experience}
                </p>
                {renderDescription(
                  instructor?.bio || "No bio available",
                  showMoreInstructor,
                  () => toggleShowMore(setShowMoreInstructor)
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No instructor details available.</p>
          )}
        </div>
      </div>
      {/* Review and Rating */}
      <div
        id="review-section"
        className="md:block flex flex-col pt-10 pl-[20px] md:pl-[110px] md:pt-20 md:pr-20 pr-5 gap-8"
      >
        <div>
          <h1 className="md:text-3xl text-3xl flex items-center gap-4 font-bold font-header md:leading-normal leading-normal">
            Learner Review
          </h1>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-sm p-4 flex flex-col gap-2 w-full"
              style={{ boxShadow: "0px 15px 50px -5px rgb(184, 169, 169)" }}
            >
              {/* Reviewer Name */}
              <h2 className="text-xl font-bold font-header text-primary">
                {review.reviewerName}
              </h2>

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < review.rating ? "text-accent" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Review Comment */}
              <p className="text-md text-gray-500 font-body">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
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

export default CourseDetail;
