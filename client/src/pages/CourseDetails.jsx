import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaChalkboardTeacher,
  FaStar,
  FaStarHalfAlt,
  FaChevronUp,
  FaChevronDown,
  FaPhoneAlt,
  FaArrowRight,
  FaInfoCircle,
  FaStickyNote,
} from "react-icons/fa";
import { FaQuestion, FaBook } from "react-icons/fa6";

import styled from "styled-components";
import { Button } from "../ui/button";
import { PiStudent } from "react-icons/pi";
import { CgSandClock } from "react-icons/cg";
import { GoStarFill } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";
import { PiVideoCameraFill } from "react-icons/pi";
import { GoClock } from "react-icons/go";
import sir from "../images/sir.png";
import { LuTvMinimalPlay } from "react-icons/lu";
import React from "react";
const StyledWrapper = styled.div`
  .course-page {
    font-family: Arial, sans-serif;
  }

  .hero-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: linear-gradient(
        to right,
        #333 0%,
        rgb(24, 32, 83) 45%,
        /* Deep blue in the middle */ rgba(32, 43, 88, 0.85) 65%,
        /* Semi-transparent blue towards the right */ transparent 100%
          /* Fading out to transparent white */
      ),
    background-size: cover; /* Ensures image covers the full section */
    background-repeat: no-repeat;
    background-position: center; /* Centers the image */
    color: white;
    padding: 2rem;
    height: 550px; /* Adjust height as needed */
    width: 100vw;
  }

  .content {
    max-width: 60%;
    padding-left: 5%;
  }

  .breadcrumb {
    font-size: 0.9rem;
    color: #ccc;
  }

  h1 {
    font-size: 3.5rem;
    line-height: 4rem;
    margin-bottom: 10px;
  }

  .description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.8rem;
    width: 80%;
  }

  .metadata {
    font-size: 18px;
    margin-bottom: 1rem;
  }

  .ratings {
    font-size: 1rem;
  }

  .card {
    background: hsl(0, 0%, 98%);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5), 0 5px 10px rgba(0, 0, 0, 0.6);
    padding: 1rem;
    max-width: 350px;
    text-align: center;
    margin-right: 80px;
    z-index: 50;
    transition: box-shadow 0.3s ease-in-out;
  }
  .course-image {
    width: 100%;
    margin-bottom: 1rem;
  }

  .enroll-button {
    background: black;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    margin-top: 1rem;
  }

  .tabs {
    background: hsl(0, 0%, 98%);
    padding-left: 7%;
    padding-top: 2%;
    font-size: large;
    display: flex;
    padding-bottom: 0.11%;
  }
  .price-section {
    display: flex;
    gap: 16px; /* Space between the prices */
    align-items: center; /* Vertically center the prices */
    margin-top: -10px;
    margin-bottom: 10px;
  }

  .tabs ul {
    list-style: none;
    display: flex;
    gap: 4rem;
    cursor: pointer;
  }

  .active-tab-hr {
    border: 0;
    height: 4px; /* Set height for the hr line */
    background-color: hsl(266, 100%, 13%); /* Set your preferred border color */
    width: 80%; /* Adjust the width of the hr line */
    margin-top: 20px; /* Space between the tab and hr line */
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .fade-out {
    animation: fadeOut 0.1s ease-out forwards;
    opacity: 0;
  }

  .card.is-fixed {
    box-shadow: 0 2px 3px rgba(73, 72, 72, 0.5),
      0 2px 3px rgba(104, 103, 103, 0.6);
    animation: fadeIn 0.5s ease-out forwards;
  }

  .tabs {
    background: hsl(0, 0%, 98%);
    z-index: 10;
  }

  .sticky-tabs {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    background: hsl(266, 100%, 13%);
    color: hsl(0, 0%, 98%);
    padding-bottom: 2px;
  }

  .active-tab-hr {
    border: 1px solid hsl(266, 100%, 13%);
    width: 100%;
  }
  .active-stickytab-hr {
    border: 1px solid hsl(0, 0%, 98%);
    background-color: hsl(0, 0%, 98%);
    width: 100%;
  }

  @media (max-width: 430px) {
    .course-page {
      overflow-x: hidden;
    }

    .breadcrumb {
      font-size: 0.7rem;
      flex-wrap: nowrap;
      white-space: nowrap;
      margin-left: -10px;
    }

    h1 {
      font-size: 1.8rem;
      display: flex;
      width: 275px;
      line-height: 2.5rem;
      margin-bottom: 10px;
      margin-left: -10px;
      flex-grow: 1; /* Ensures it expands */
    }

    .hero-section {
      height: 500px;
      background-image: none;
      flex-grow: 1;
    }

    .description {
      font-size: 0.7rem;
      margin-bottom: 1.5rem;
      line-height: 1.8rem;
      width: 250px;
      flex-grow: 1;
    }

    .price-section {
      margin-top: -10px;
      white-space: nowrap;
      gap: 10px;
      font-size: small;
      flex-grow: 1;
    }

    .metadata {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      font-size: small;
      display: none;
      flex-grow: 1;
    }

    .ratings {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      max-width: 100%;
      margin-top: 20px;
      flex-grow: 1;
    }

    .ratings > *:nth-child(3),
    .metadata > *:nth-child(5) {
      flex-basis: 100%;
    }

    .about,
    .topics,
    .modules,
    .demo,
    .notes,
    .review {
      margin-left: -70px;
      flex-grow: 1;
    }

    .about h2,
    .topics h2,
    .demo h2,
    .instructor h2,
    .review h2 {
      font-size: 1.5rem;
      line-height: 2rem;
      flex-grow: 1;
    }

    .review h2 {
      margin-left: -30px;
    }

    .modules h2,
    .notes h2 {
      font-size: 1.5rem;
      line-height: 2rem;
      width: 30%;
    }

    .about p,
    .notes p {
      width: 37%;
      text-indent: 10px;
      margin-left: -30px;
      margin-top: -20px;
      font-size: small;
      line-height: 1.8rem;
      flex-grow: 1;
    }

    .tabs ul {
      gap: 3rem;
      flex-grow: 1;
    }

    .topics ul {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      font-size: small;
      margin-top: -20px;
      flex-grow: 1;
    }

    .topics {
      margin-top: -20px;
      flex-grow: 1;
    }

    .sticky-tabs {
      margin-left: -10px;
    }

    .sticky-tabs ul {
      padding: 5px;
    }

    .active-stickytab-hr {
      padding-bottom: 0px;
      margin-bottom: -10px;
    }

    .modules p {
      font-size: small;
      text-indent: 0px;
      width: 33%;
      margin-left: -35px;
      flex-grow: 1;
    }

    .notes p {
      font-size: small;
      text-indent: 0px;
      width: 40%;
      margin-left: -55px;
      flex-grow: 1;
    }

    .notesCard,
    .quizCard {
      margin-left: -55px;
      flex-grow: 1;
    }

    .moduleDetails {
      width: 33%;
      flex-grow: 1;
    }

    .moduleDetails p {
      margin-left: 0px;
    }

    .moduleDetails a {
      padding: 5px;
      font-size: small;
    }

    .demo {
      font-size: small;
      flex-grow: 1;
    }

    .demo p {
      margin-top: -30px;
      margin-left: -25px;
      line-height: 2rem;
      width: 80%;
    }

    .demo h2 {
      margin-left: -25px;
      margin-top: -30px;
    }

    .demo iframe {
      margin-top: 10px;
      height: 250px;
      width: 350px;
      margin-left: -30px;
    }

    .notes h2 {
      margin-left: -20px;
    }

    .notesCard p,
    .quizCard p {
      width: 75%;
      margin-left: 10px;
      margin-top: 10px;
    }

    .quizCard {
      margin-top: 20px;
    }

    .instructor h2 {
      margin-left: -690px;
    }

    .instructor p {
      margin-left: -20px;
      width: 31%;
      flex-grow: 1;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .hero-section {
      width: 100%;
    }
    .not-fixed {
      margin-right: -450px;
    }
  }
`;
const CourseDetailPage = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null); // State to store course details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("About Us");
  const [expandedModules, setExpandedModules] = useState({});
  const navigate = useNavigate();
  const [scrollDirection, setScrollDirection] = useState("up");
  const toggleModule = (index) => {
    setExpandedModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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

  useEffect(() => {
    // Fetch course details from the server
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}api/courses/${id}`
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
  const [isFixed, setIsFixed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set isFixed based on scroll position
      setIsFixed(currentScrollY > 450);

      // Set isScrolled to true only if scrolling down beyond 450px
      if (currentScrollY > 300 && currentScrollY > lastScrollY) {
        setIsScrolled(true); // Scrolling down beyond 450px
      } else {
        setIsScrolled(false); // Not scrolling down beyond 450px or scrolling up
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll handling logic
  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 450);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  function truncateCourseTitle(title) {
    if (!title) return "";

    const words = title.trim().split(" ").slice(0, 6);

    if (words.length === 6) {
      const lastWord = words[5];
      words[5] = lastWord.length > 8 ? lastWord.slice(0, 7) + "…" : lastWord;
    }

    return words.join(" ");
  }

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  const totalEstimatedTime = course.modules.reduce((sum, module) => {
    // Parse the estimatedTime as a number and add it to the sum
    const estimatedTimeNumber = parseFloat(module.estimatedTime) || 0;
    return sum + estimatedTimeNumber;
  }, 0);

  return (
    <StyledWrapper className="space-y-0">
      <div className="course-page flex">
        <div className="course-content flex-1">
          <div
            className="hero-section flex-grow"
            style={{
              backgroundImage: course?.courseImage
                ? `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(29,0,66,1) 35%, rgba(64,12,124,0.5214679621848739) 100%),
             url("${course.courseImage}")`
                : "none",
              backgroundSize: "150%", // Zoomed-out effect
              backgroundPosition: "center", // Center the image
            }}
          >
            <div className="content">
              <p className="breadcrumb font-body mb-5 ">
                <a href="/app">Home</a> &gt; <a href="/app/courses">Courses</a>{" "}
                &gt; {course.courseTitle}
              </p>
              <h1 className="font-header ">{course.courseTitle}</h1>
              <p className="description font-body">
                {course.courseDescription}
              </p>
              {/* Price Section */}
              <div className="price-section font-body flex gap-4">
                <p className="md:text-5xl text-xl  font-bold text-accent">
                  ₹{course.discountedPrice}
                </p>
                <p className="md:text-3xl text-xl text-gray-200 line-through">
                  ₹{course.originalPrice}
                </p>
                <p className="md:text-2xl  text-lg ">
                  ( {course.discountPercentage}% off )
                </p>
              </div>
              <div className="metadata flex gap-10 font-body">
                <p className="inline-flex items-center gap-4">
                  <span className="md:text-3xl text-xl">
                    <FaChalkboardTeacher />
                  </span>
                  <span>Instructor: John Doe</span>
                </p>
                <p className="inline-flex items-center gap-2">
                  <span className="md:text-3xl text-xl">
                    <PiStudent />
                  </span>
                  20,000+ Learners
                </p>
                <p className="inline-flex items-center gap-2">
                  <span className="md:text-3xl text-xl">
                    <CgSandClock />
                  </span>
                  Duration: 3 months
                </p>
              </div>

              <div className="ratings font-body flex flex-wrap sm:flex-nowrap items-center gap-2 text-sm sm:text-base">
                <p className="text-accent inline-flex items-center gap-1 sm:gap-2 text-lg sm:text-xl">
                  4.8 <GoStarFill />
                </p>
                <p className="whitespace-nowrap">(1,249 ratings)</p>
                <p className="whitespace-nowrap">
                  {course.studentCount} Students Enrolled
                </p>
              </div>
            </div>
          </div>

          {/* tabs section */}
          <div
            className={`tabs font-body md:block hidden text-sm -ml-[50px] font-bold ${
              isSticky ? "sticky-tabs " : ""
            }`}
          >
            <ul className="gap-1 md:gap-2 ">
              {[
                { name: "About", icon: <FaInfoCircle size={20} /> },
                { name: "Modules", icon: <FaBook size={20} /> },
                { name: "Quiz & Notes", icon: <FaStickyNote size={20} /> },
                { name: "Instructor", icon: <FaChalkboardTeacher size={20} /> },
                { name: "Reviews", icon: <FaStar size={20} /> },
              ].map((tab) => (
                <li
                  key={tab.name}
                  className={activeTab === tab.name ? "active" : ""}
                  onClick={() => {
                    setActiveTab(tab.name);
                    document
                      .getElementById(`${tab.name}`)
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="tab-icon block md:hidden  ">{tab.icon}</span>
                  <span className="tab-name hidden sm:block mb-2">
                    {tab.name}
                  </span>
                  {activeTab === tab.name && (
                    <hr
                      className={`active-tab-hr ${
                        isSticky ? "active-stickytab-hr " : ""
                      }`}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* About US Section */}
          <div id="About" className="about pt-[50px] pl-20 ml-5">
            <h2 className="font-header text-primary text-4xl ">About Course</h2>
            <p className="font-body text-tertiary w-[62%] p-10 indent-[40px] leading-8">
              {course.aboutCourse}
            </p>
          </div>
          {/* Topics covered section */}
          <div className="topics pt-[20px] pl-20 ml-5">
            <h2 className="font-header text-primary text-4xl  ">
              Topics Covered
            </h2>
            <ul className="font-body text-tertiary grid grid-cols-2 md:gap-y-4  w-[62%] text-xl p-10">
              {course.topicsCovered.map((topic, index) => (
                <li key={index} className="flex items-center gap-2">
                  <IoMdCheckmark className="text-accent" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* modules section */}
          <div id="Modules" className="modules pt-[20px] pl-20 ml-5">
            <h2 className="font-header text-primary text-4xl  ">
              There are {course.modules.length} modules in this course
            </h2>
            <p className="font-body text-tertiary  w-[62%] pt-3 pl-10 leading-8 indent-[40px]">
              {course.courseDescription}
            </p>
            <p className="pl-[70px] pt-5 gap-2 inline-flex items-center text-center">
              <span className="inline-flex items-center text-center font-body text-tertiary gap-2">
                <PiVideoCameraFill className="text-lg" />
                {course.modules.length} Lectures
              </span>
              <span className="inline-flex items-center text-center font-body text-tertiary gap-2">
                <GoClock />
                {totalEstimatedTime} hours
              </span>
            </p>
            {course.modules && course.modules.length > 0 ? (
              <div className="moduleDetails md:space-y-6 md:mt-10 md:pr-[650px]  mt-5 space-y-10 pr-10  md:pl-[65px]">
                {course.modules.map((module, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-primary  shadow-xl hover:shadow-2xl transition-shadow"
                  >
                    {/* Module Details */}
                    <div className="space-y-3 p-2 md:w-full w-screen ">
                      <p className="text-xl font-semibold font-header text-accent">
                        {module.name}
                      </p>
                      <div className="flex gap-5">
                        <p className="font-bold text-background">
                          Module {index + 1}
                        </p>
                        <p className="font-bold text-background">
                          {module.estimatedTime} hours
                        </p>
                      </div>
                      {expandedModules[index] && (
                        <div className="flex gap-[20px] flex-wrap">
                          <a
                            onClick={() => {
                              navigate(`/app/videoPlayer `, {
                                state: {
                                  src: module.videoLink,
                                  title: module.name,
                                  moduleNumber: index + 1,
                                },
                              });
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-accent text-primary px-4 py-2  w-fit  hover:bg-accent hover:text-background transition-colors mt-2"
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
                      className="text-xl p-2 text-background rounded-full transition-all"
                    >
                      {expandedModules[index] ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-tertiary">No module details available.</p>
            )}
          </div>
          {/* demo video section */}
          <div className="demo pl-20 ml-5  mr-[520px] mt-20">
            <div className="w-full md:flex block justify-between pr-10 bg-background pl-10 pb-20 pt-20 ">
              <div>
                {" "}
                <h2 className="font-header text-primary text-4xl  ">
                  Glimpse of the course
                </h2>
                <p className="w-[300px] font-body pt-10 text-tertiary">
                  This is the demo video presented by our esteemed instructor,
                  offering a glimpse into the course content and teaching
                  approach.
                </p>
                <div className="md:inline-flex hidden items-center mt-3 p-3 rounded-full space-x-2 hover:space-x-4 hover:cursor-pointer ">
                  <span>See the demo </span>
                  <span>
                    <FaArrowRight />
                  </span>
                </div>
              </div>
              <iframe
                width="500" // Adjusted width to 500px
                height="281"
                src="https://www.youtube.com/embed/QphgAccZnik?si=SEhMVV8bKddDQ1Bh" // Replace with your actual video link
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Demo Video"
              ></iframe>
            </div>
          </div>
          {/* notes and quizzes section */}
          <div id="Quiz & Notes" className="notes pt-[50px] pl-20 ml-5 z-0">
            <div className="pt-[50px]  ml-5">
              <h2 className="font-header text-primary text-4xl">
                Perks of enrolling in the course
              </h2>
              <p className="font-body text-tertiary w-[62%] p-10 indent-[40px] leading-8">
                Enrolling in this course comes with a range of perks designed to
                enhance your learning experience. From interactive quizzes to
                comprehensive study materials, you'll have everything you need
                to succeed.
              </p>
              <div className="md:flex block md:gap-10  pl-10">
                {/* Notes Card (Book Design) */}
                <div
                  className="notesCard relative md:w-[300px] md:h-[200px] w-[250px] h-[180px] bg-tertiary  shadow-lg p-5 flex flex-col justify-center items-start transform hover:scale-105 transition duration-300"
                  onClick={() => navigate(`/app/notes/${course.notes._id}`)}
                >
                  <div className="absolute top-0 left-0 md:w-[290px] md:h-[190px] w-[240px] h-[170px] bg-background  border-[4px] border-accent shadow-inner transform rotate-[-3deg]"></div>
                  <div className="absolute top-[5px] left-[5px] md:w-[280px] md:h-[180px] w-[230px] h-[160px] bg-background shadow-inner border-[2px] border-accent"></div>
                  <h3 className="relative flex gap-2 items-center font-header md:text-2xl text-xl text-primary z-10">
                    <FaBook className="text-tertiary" /> Notes
                  </h3>
                  <p className="relative font-body md:text-md text-tertiary z-10 ">
                    Access detailed and structured notes to help you master the
                    course content at your own pace.
                  </p>
                  <div className="absolute top-2 right-2 text-xs bg-tertiary px-2 py-1 rounded-md shadow-md font-bold z-10">
                    <span className="uppercase text-accent">Open Pdf</span>
                  </div>
                </div>

                {/* Quiz Card (Question Mark Style) */}
                <div className="quizCard relative md:w-[300px] md:h-[200px] w-[250px] h-[180px] bg-accent  shadow-lg p-5 flex flex-col justify-center items-start transform hover:scale-105 transition duration-300">
                  <div className="absolute top-0 left-0 md:w-[290px] md:h-[190px] w-[240px] h-[170px] bg-background  border-[4px] border-tertiary shadow-inner transform rotate-[-3deg]"></div>
                  <div className="absolute top-[5px] left-[5px] md:w-[280px] md:h-[180px] w-[230px] h-[160px]  bg-background shadow-inner border-[2px] border-tertiary"></div>
                  <h3 className="relative font-header md:text-2xl flex gap-1 items-center text-xl text-primary z-10">
                    <FaQuestion className="text-accent" /> Quiz
                  </h3>
                  <p className="relative font-body  md:text-md text-tertiary z-10">
                    Test your knowledge with engaging quizzes designed to
                    reinforce your learning.
                  </p>
                  <div className="absolute top-2 right-2 text-xs bg-accent px-2 py-1 rounded-md shadow-md  font-bold z-10">
                    <span className="uppercase text-primary">Start Quiz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* instructor section */}
          <div
            id="Instructor"
            className="instructor pt-[95px] px-10 md:px-20 lg:px-32"
          >
            <h2 className="font-header text-primary text-4xl text-center md:text-left ">
              Know Our Instructor
            </h2>

            <div className="flex flex-col md:flex-row gap-10 mt-10 md:ml-[-10px]  items-center md:items-start">
              {/* Instructor Image */}
              <div
                className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] overflow-hidden rounded-full shadow-2xl flex-shrink-0 border-2 border-primary 
                ml-[-750px] md:ml-[-10px]"
              >
                <img
                  src={sir} // Replace with the instructor's image URL
                  alt="Instructor"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Instructor Details */}
              <div className="space-y-4 md:w-2/3">
                {/* Name and Education */}
                <p className="text-2xl font-semibold font-header text-primary">
                  {course.instructor.name}
                  <br className="md:hidden" />
                  <span className="text-sm text-gray-500 md:ml-2 ml-[-1px]">
                    ( {course.instructor.education} |{" "}
                    {course.instructor.experience} years )
                  </span>
                </p>

                {/* Role */}
                <p className="text-xl text-tertiary font-semibold">
                  {course.instructor.role}
                </p>

                {/* Bio */}
                <p className="font-body text-tertiary leading-7  md:w-[72%] w-[35%]">
                  {course.instructor.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews section */}
          <div className="review pt-[50px] pl-20 ml-5 z-0">
            <div className="pt-[50px]  ml-8">
              <h2 className="font-header text-primary text-4xl">
                Leaner Review
              </h2>
            </div>
          </div>
          {/* queries section */}
          <div className="pt-[50px] pb-10 pr-[650px] pl-20">
            <div
              className="p-6 rounded-sm mt-8 bg-background"
              style={{ boxShadow: "0px 15px 50px -5px rgb(184, 169, 169)" }}
            >
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Have Any Questions?
              </h3>
              <p className="text-tertiary mb-6">
                We're here to help! Feel free to reach out to us for any queries
                or support.
              </p>
              <a
                href="tel:+1234567890"
                className="inline-flex  font-body items-center bg-accent text-primary px-6 py-3 rounded-md font-semibold hover:underline underline-offset-4 transition-colors shadow-md"
              >
                <FaPhoneAlt className="mr-2" />
                Call Us: +91 93426 75932
              </a>
            </div>
          </div>
        </div>
        {/* Card Section */}

        <div
          className={`card md:block hidden  ${
            isFixed
              ? "is-fixed fixed top-[25px] right-0 w-[50%]  transform transition-all duration-500  flex-grow"
              : "not-fixed absolute top-[460px] right-0 transform translate-y-[-50%] transition-all duration-500 flex-grow"
          } ${isScrolled ? "fade-out" : ""}`}
        >
          {!isFixed && (
            <img
              src={course.courseImage}
              alt="Course"
              className="course-image"
            />
          )}
          <h3
            className={`font-bold font-body text-primary mt-[-10px]  ${
              isFixed ? "text-lg mt-0 pl-[55px]" : ""
            }`}
          >
            {truncateCourseTitle(course.courseTitle)}
          </h3>

          <ul className={`pt-2 ${isFixed ? "text-sm space-y-8 pt-6" : ""}`}>
            {[
              { label: "Class", value: `${course.class}` },
              { label: "Board", value: `${course.board}` },
              { label: "Stream", value: `${course.stream}` },
              { label: "Subject", value: `${course.subject}` },
              isFixed && {
                label: "Price",
                value: (
                  <>
                    <span className="text-primary mr-2">{`₹${course.discountedPrice}`}</span>{" "}
                    <span className="line-through text-tertiary mr-2">
                      {`₹${course.originalPrice}`}{" "}
                    </span>
                    <span className="text-sm text-accent">
                      ({course.discountPercentage}% off)
                    </span>
                  </>
                ),
                isBold: true,
              },
            ].map((item, index) => (
              <li
                key={index}
                className={`flex justify-between ml-1 mr-2 mb-2 text-gray-700 ${
                  isFixed ? "text-base" : ""
                }`}
              >
                <p className={item.isBold ? "font-bold text-primary" : ""}>
                  {item.label}
                </p>
                <p className={item.isBold ? "font-bold text-primary" : ""}>
                  {item.value}
                </p>
              </li>
            ))}
          </ul>
          <Button
            text="Enroll Now"
            size={isFixed ? "sm" : "lg"}
            variant="primary"
            className={isFixed ? "mt-[30px]" : ""}
          />
        </div>
      </div>
    </StyledWrapper>
  );
};
export default CourseDetailPage;
