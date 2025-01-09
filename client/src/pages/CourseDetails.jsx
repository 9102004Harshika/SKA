
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaChalkboardTeacher, FaStar, FaStarHalfAlt,FaChevronUp,FaChevronDown } from "react-icons/fa";
import { Button } from "../ui/button";
import Navbar from "../components/Navbar";
import { PiStudent } from "react-icons/pi";
import { CgSandClock } from "react-icons/cg";
import { GoStarFill } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";
import { PiVideoCameraFill } from "react-icons/pi";
import { GoClock } from "react-icons/go";
import { BsDot } from "react-icons/bs";
import {LuTvMinimalPlay} from 'react-icons/lu'
const CourseDetailPage = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null); // State to store course details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("About Us");
  const [expandedModules, setExpandedModules] = useState({});
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
          `http://localhost:5000/api/courses/677a6c05a7beeb41b17315c9`
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

  // Scroll handling logic
  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

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

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  const totalEstimatedTime = course.modules.reduce((sum, module) => {
    // Parse the estimatedTime as a number and add it to the sum
    const estimatedTimeNumber = parseFloat(module.estimatedTime) || 0;
    return sum + estimatedTimeNumber;
  }, 0);
  
  return (
    <div className="space-y-0">
      <Navbar />
      <div className="course-page flex">
        <div className="course-content flex-1">
          <div className="hero-section">
            <div className="content">
              <p className="breadcrumb font-body mb-5">
                Home &gt; Education &gt; (Hons) Business and Management
              </p>
              <h1 className="font-header ">{course.courseTitle}</h1>
              <p className="description font-body">
                {/* This (Hons) Business and Management BSc course from University of Essex Online will
                help you adapt to the ever-changing world of business. We'll examine a range of
                real-world business examples and use them to develop the broad skillset that a good
                manager should be able to draw from. */}{course.courseDescription}
              </p>
              <div className="metadata flex gap-10 font-body">
                <p className="inline-flex items-center gap-4">
                  <span className="text-3xl">
                    <FaChalkboardTeacher />
                  </span>
                  <span>Instructor: John Doe</span>
                </p>
                <p className="inline-flex items-center gap-2">
                  {" "}
                  <span className="text-3xl">
                    <PiStudent />
                  </span>{" "}
                  20,000+ Learners
                </p>
                <p className="inline-flex items-center gap-2">
                  <span className="text-3xl">
                    <CgSandClock />{" "}
                  </span>
                  Duration: 3 months
                </p>
              </div>
              <div className="ratings font-body flex gap-4">
                <span className="text-[#f4a261] inline-flex items-center gap-2 text-xl">
                  {" "}
                  4.8 <GoStarFill />
                </span>
                <p className="">(1,249 ratings) </p>
                <p>2,945 students </p>
              </div>
            </div>
          </div>
          <div className="tabs font-body font-bold">
            <ul>
              {["About Us", "Modules", "Quiz & Notes", "Instructor", "Reviews"].map((tab) => (
                <li
                  key={tab}
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  {activeTab === tab && <hr className="active-tab-hr" />} {/* Add <hr> for active tab */}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-[50px] pl-20 ml-5">
            <h2 className="font-header text-primary text-4xl ">About Us</h2>
            <p className="font-body text-gray-500 w-[62%] p-10 indent-[40px] leading-8">
              This (Hons) Business and Management BSc course from University of Essex Online will help
              you adapt to the ever-changing world of business. We'll examine a range of real-world
              business examples and use them to develop the broad skillset that a good manager should
              be able to draw from.
            </p>
          </div>
          <div className="pt-[20px] pl-20 ml-5">
            <h2 className="font-header text-primary text-4xl  ">Topics Covered</h2>
            <ul className="font-body text-gray-500 grid grid-cols-2 gap-y-4 w-[62%] text-xl p-10">
    {course.topicsCovered.map((topic, index) => (
      <li key={index} className="flex items-center gap-2">
        <IoMdCheckmark className="text-accent" /> {/* Tick icon */}
        <span>{topic}</span>
      </li>
    ))}
  </ul>
          </div>
          <div className="pt-[20px] pl-20 ml-5">
            <h2 className="font-header text-primary text-4xl  ">There are {course.modules.length} modules in this course</h2>
            <p className="font-body text-gray-500  w-[62%] pt-3 pl-10 leading-8 indent-[40px]">{course.courseDescription}</p>
            <p className="pl-[70px] pt-5 flex gap-2 inline-flex items-center text-center">
              <span className="font-body text-gray-500"><BsDot/></span>
  <span className="inline-flex items-center text-center font-body text-gray-500 gap-2">
    <PiVideoCameraFill className="text-lg" />
    {course.modules.length} Lectures
  </span>
  <span className="font-body text-gray-500"><BsDot/></span>
  <span className="inline-flex items-center text-center font-body text-gray-500 gap-2">
    <GoClock />
    {totalEstimatedTime} hours
  </span>
</p>
{course.modules && course.modules.length > 0 ? (
  <div className="md:space-y-6 md:mt-10 md:pr-[650px] mt-5 space-y-10 pr-10 md:pl-[65px]">
    {course.modules.map((module, index) => (
      <div
        key={index}
        className="flex justify-between items-center p-4 bg-primary  shadow-xl hover:shadow-2xl transition-shadow"
      >
        {/* Module Details */}
        <div className="space-y-3 p-2 w-full">
          <p className="text-xl font-semibold font-header text-background">
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
                href={module.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-secondary text-primary px-4 py-2 rounded-md w-fit font-semibold hover:bg-primary transition-colors mt-2"
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
          {expandedModules[index] ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
    ))}
  </div>
) : (
  <p className="text-gray-500">No module details available.</p>
)}
          </div>
          <div className="pt-[50px] pl-20 ml-5">
            <h2 className="font-header text-primary text-4xl ">Demo Video</h2>
            <div className="w-full flex  mt-5  pl-10">
    <iframe
     width="500"  // Adjusted width to 500px
     height="281"
   
      src="https://www.youtube.com/embed/QphgAccZnik?si=SEhMVV8bKddDQ1Bh"  // Replace with your actual video link
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Demo Video"
    ></iframe>
  </div>
          </div>
         
        </div>
        {/* Card Section */}
        <div
  className={`card fixed top-[460px] right-0 transform translate-y-[-50%] transition-transform duration-500 ${
    scrollDirection === "down" ? "translate-y-96" : "translate-y-0"
  }`}
>
  <img
    src="https://wallpapercave.com/wp/wp2417737.jpg"
    alt="Course"
    className="course-image"
  />
  <h3 className="font-bold font-body text-primary mt-[-10px] ml-[-60px] ">
    Project Management Professional
  </h3>
  <ul className="pt-2 ">
    <li className="flex justify-between ml-1 mr-2 mb-2 text-gray-700">
      <p>Live sessions:</p> <p>70 hrs</p>
    </li>
    <li className="flex justify-between ml-1 mr-2  mb-2 text-gray-700">
      <p>Questions:</p>
      <p>200+</p>{" "}
    </li>
    <li className="flex justify-between ml-1 mr-2  mb-2 text-gray-700">
      <p>Passing grade:</p>
      <p>60%</p>{" "}
    </li>
    <li className="flex justify-between ml-1 mr-2  mb-2 text-gray-700">
      <p>Format:</p> <p>MCQ</p>
    </li>
  </ul>
  <Button text="Enroll Now" size="lg" variant="primary" />
</div>

      </div>
    </div>
  );
};

export default CourseDetailPage;
