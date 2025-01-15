import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaChalkboardTeacher,
  FaStar,
  FaStarHalfAlt,
  FaChevronUp,
  FaChevronDown,
  FaPhoneAlt,
  FaArrowRight,
} from "react-icons/fa";
import { Button } from "../ui/button";
import Navbar from "../components/Navbar";
import { PiStudent } from "react-icons/pi";
import { CgSandClock } from "react-icons/cg";
import { GoStarFill } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";
import { PiVideoCameraFill } from "react-icons/pi";
import { GoClock } from "react-icons/go";
import sir from "../images/sir.png"
import { LuTvMinimalPlay } from "react-icons/lu";
import React from "react";

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
        <div className="hero-section flex-grow">
  <div className="content">
    <p className="breadcrumb font-body mb-5 ">
      Home &gt; Education &gt; (Hons) Business and Management
    </p>
    <h1 className="font-header ">{course.courseTitle}</h1>
    <p className="description font-body">{course.courseDescription}</p>
     {/* Price Section */}
     <div className="price-section font-body flex gap-4">
      <p className="md:text-5xl text-xl  font-bold text-accent">₹{course.discountedPrice}</p>
      <p className="md:text-3xl text-xl text-gray-500 line-through">₹{course.originalPrice}</p>
      <p className="md:text-2xl  text-lg ">( {course.discountPercentage}% off )</p>
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

    <div className="ratings font-body flex gap-4">
      <span className="text-[#f4a261] inline-flex items-center gap-2 text-xl">
        4.8 <GoStarFill />
      </span>
      <p>(1,249 ratings)</p>
      <p>{course.studentCount} Students Enrolled</p>
    </div>

   
  </div>
</div>

          {/* tabs section */}
          <div
            className={`tabs  font-body font-bold ${
              isSticky ? "sticky-tabs" : ""
            }`}
          >
            <ul>
              {[
                "About",
                "Modules",
                "Quiz & Notes",
                "Instructor",
                "Reviews",
              ].map((tab) => (
                <li
                  key={tab}
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => {
                    setActiveTab(tab)
                     document
                     .getElementById(`${tab}`)
                     .scrollIntoView({ behavior: "smooth" })
                    }
                    }
                >
                  {tab}
                  {(activeTab === tab )&& (
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
            <p className="font-body text-gray-500 w-[62%] p-10 indent-[40px] leading-8">
              This (Hons) Business and Management BSc course from University of
              Essex Online will help you adapt to the ever-changing world of
              business. We'll examine a range of real-world business examples
              and use them to develop the broad skillset that a good manager
              should be able to draw from.
            </p>
          </div>
          {/* Topics covered section */}
          <div className="topics pt-[20px] pl-20 ml-5">
            <h2 className="font-header text-primary text-4xl  ">
              Topics Covered
            </h2>
            <ul className="font-body text-gray-500 grid grid-cols-2 md:gap-y-4  w-[62%] text-xl p-10">
              {course.topicsCovered.map((topic, index) => (
                <li key={index} className="flex items-center gap-2">
                  <IoMdCheckmark className="text-accent" /> {/* Tick icon */}
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
            <p className="font-body text-gray-500  w-[62%] pt-3 pl-10 leading-8 indent-[40px]">
              {course.courseDescription}
            </p>
            <p className="pl-[70px] pt-5 flex gap-2 inline-flex items-center text-center">
              <span className="inline-flex items-center text-center font-body text-gray-500 gap-2">
                <PiVideoCameraFill className="text-lg" />
                {course.modules.length} Lectures
              </span>
              <span className="inline-flex items-center text-center font-body text-gray-500 gap-2">
                <GoClock />
                {totalEstimatedTime} hours
              </span>
            </p>
            {course.modules && course.modules.length > 0 ? (
              <div className="moduleDetails md:space-y-6 md:mt-10 md:pr-[650px] mt-5 space-y-10 pr-10 md:pl-[65px]">
                {course.modules.map((module, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-primary  shadow-xl hover:shadow-2xl transition-shadow"
                  >
                    {/* Module Details */}
                    <div className="space-y-3 p-2 w-full">
                      <p className="text-xl  font-semibold font-header text-background">
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
                            className="inline-flex items-center bg-secondary text-primary px-4 py-2 rounded-sm w-fit  hover:bg-accent hover:text-background transition-colors mt-2"
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
              <p className="text-gray-500">No module details available.</p>
            )}
          </div>
          {/* demo video section */}
          <div className="demo pl-20 ml-5  mr-[520px] mt-20">
            <div className="w-full md:flex block justify-between pr-10 bg-[#f7f9fa] pl-10 pb-20 pt-20 ">
              <div>
                {" "}
                <h2 className="font-header text-primary text-4xl  ">
                  Glimpse of the course
                </h2>
                <p className="w-[300px] pt-10 text-gray-500">
                  This is the demo video presented by our esteemed instructor,
                  offering a glimpse into the course content and teaching
                  approach.
                </p>
                <div className="md:inline-flex hidden items-center pt-5 space-x-2 hover:space-x-4 hover:cursor-pointer">
                  <span >See the demo </span>
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
              <p className="font-body text-gray-500 w-[62%] p-10 indent-[40px] leading-8">
                Enrolling in this course comes with a range of perks designed to
                enhance your learning experience. From interactive quizzes to
                comprehensive study materials, you’ll have everything you need
                to succeed.
              </p>
              <div className="md:flex block md:gap-10  pl-10">
                {/* Notes Card (Book Design) */}
                <div className="notesCard relative md:w-[300px] md:h-[200px] w-[250px] h-[180px] bg-[#f4a261] rounded-lg shadow-lg p-5 flex flex-col justify-center items-start transform hover:scale-105 transition duration-300">
                  <div className="absolute top-0 left-0 md:w-[290px] md:h-[190px] w-[240px] h-[170px] bg-white rounded-lg border-[4px] border-gray-300 shadow-inner transform rotate-[-2deg]"></div>
                  <div className="absolute top-[5px] left-[5px] md:w-[280px] md:h-[180px] w-[230px] h-[160px] bg-background rounded-lg shadow-inner border-[2px] border-gray-300"></div>
                  <h3 className="relative font-header md:text-2xl text-xl text-primary z-10">
                    📚 Notes
                  </h3>
                  <p className="relative font-body md:text-md text-gray-700 z-10 ">
                    Access detailed and structured notes to help you master the
                    course content at your own pace.
                  </p>
                  <div className="absolute top-2 right-2 text-xs bg-background px-2 py-1 rounded-md shadow-md font-bold z-10">
                    <span className="uppercase text-gray-500">Bookmark</span>
                  </div>
                </div>

                {/* Quiz Card (Question Mark Style) */}
                <div className="quizCard relative md:w-[300px] md:h-[200px] w-[250px] h-[180px] bg-[#f4a261] rounded-lg shadow-lg p-5 flex flex-col justify-center items-start transform hover:scale-105 transition duration-300">
                  <div className="absolute top-0 left-0 md:w-[290px] md:h-[190px] w-[240px] h-[170px] bg-white rounded-lg border-[4px] border-gray-300 shadow-inner transform rotate-[-2deg]"></div>
                  <div className="absolute top-[5px] left-[5px] md:w-[280px] md:h-[180px] w-[230px] h-[160px]  bg-background rounded-lg shadow-inner border-[2px] border-gray-300"></div>
                  <h3 className="relative font-header md:text-2xl text-xl text-primary z-10">
                    ❓ Quiz
                  </h3>
                  <p className="relative font-body  md:text-md text-gray-700 z-10">
                    Test your knowledge with engaging quizzes designed to
                    reinforce your learning.
                  </p>
                  <div className="absolute top-2 right-2 text-xs bg-background px-2 py-1 rounded-md shadow-md font-bold z-10">
                    <span className="uppercase text-gray-500">Bookmark</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      {/* instructor sectytion */}
      <div id="Instructor" className="instructor pt-[95px] px-10 md:px-20 lg:px-32">
  <h2 className="font-header text-primary text-4xl text-center md:text-left ">
    Know Our Instructor
  </h2>

  <div className="flex flex-col md:flex-row gap-10 mt-10 md:ml-[-10px]  items-center md:items-start">
    {/* Instructor Image */}
    <div className="w-[250px] h-[250px] overflow-hidden md:ml-[-10px] ml-[-500px] rounded-full shadow-2xl flex-shrink-0 border-2 border-primary ">
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
        <span className="text-sm text-gray-500 ml-2">
          ( {course.instructor.education} | {course.instructor.experience} years )
        </span>
      </p>

      {/* Role */}
      <p className="text-xl text-gray-500 font-semibold">
        {course.instructor.role}
      </p>

      {/* Bio */}
      <p className="font-body text-gray-500 leading-7  md:w-[72%] w-[42%]">
        {course.instructor.bio}
      </p>
    </div>
  </div>
</div>

           {/* Reviews section */}
           <div className="pt-[50px] pl-20 ml-5 z-0">
           <div className="pt-[50px]  ml-5"
           ><h2 className="font-header text-primary text-4xl">
                Leaner Review
              </h2></div>
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
                <p className="text-gray-700 mb-6">
                  We're here to help! Feel free to reach out to us for any
                  queries or support.
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
        {/* Card Section */}
        
        <div
          className={`card md:block hidden  ${
            isFixed
              ? "is-fixed fixed top-[25px] right-0 w-[50%]  transform transition-all duration-500  flex-grow"
              : "absolute top-[460px] right-0 transform translate-y-[-50%] transition-all duration-500 flex-grow"
          } ${isScrolled ? "fade-out" : ""}`}
        >
          {!isFixed && (
            <img
              src="https://wallpapercave.com/wp/wp2417737.jpg"
              alt="Course"
              className="course-image"
            />
          )}
          <h3
            className={`font-bold font-body text-primary mt-[-10px] ml-[-60px] ${
              isFixed ? "text-lg mt-0 pl-[55px] " : ""
            }`}
          >
            Project Management Professional
          </h3>
          <ul className={`pt-2 ${isFixed ? "text-sm space-y-8 pt-6" : ""}`}>
            {[
              { label: "Class", value: `${course.class}th` },
              { label: "Board", value: `${course.board}` },
              { label: "Stream", value:`${course.stream}` },
              { label: "Subject", value:`${course.subject}`},
              isFixed && {
                label: "Price",
                value: (
                  <>
                    <span className="text-primary mr-2">{`₹${course.discountedPrice}`}</span>{" "}
                    <span className="line-through text-gray-500 mr-2">{`₹${course.originalPrice}`} </span>
                    <span className="text-sm text-accent">({course.discountPercentage}% off)</span>
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
                <p className={item.isBold ? "font-bold text-primary" : ""}>{item.label}</p>
                <p className={item.isBold ? "font-bold text-primary" : ""}>{item.value}</p>
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
    </div>
  );
};

export default CourseDetailPage;
