import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaChalkboardTeacher,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { Button } from "../ui/button";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import { PiStudent } from "react-icons/pi";
import { CgSandClock } from "react-icons/cg";
import { GoStarFill } from "react-icons/go";
const CourseDetailPage = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null); // State to store course details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [activeTab, setActiveTab] = useState("About Us");
  const [expandedModules, setExpandedModules] = useState({});
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
  const reviewSectionConfig = {
    reviews: [
      {
        reviewerName: "John Doe",
        rating: 4,
        comment: "Great course! Very informative.",
      },
      {
        reviewerName: "Jane Smith",
        rating: 5,
        comment: "Excellent content, I learned a lot!",
      },
      {
        reviewerName: "Alex Johnson",
        rating: 3,
        comment: "Good, but could be more detailed in some areas.",
      },
    ],
  };

  // const totalLectures = course.modules?.length || 0;
  // const totalEstimatedTime = ; // Ensure the time is formatted to 2 decimal places

  const toggleShowMore = (setter) => setter((prev) => !prev);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-0">
      <Navbar/>
      <div className="course-page">
         <div className="hero-section">
           <div className="content">
             <p className="breadcrumb font-body mb-5">Home &gt; Education &gt; (Hons) Business and Management</p>
             <h1 className="font-header ">(Hons) Business and Management</h1>
             <p className="description font-body">
               This (Hons) Business and Management BSc course from University of Essex Online will
               help you adapt to the ever-changing world of business. We'll examine a range of
               real-world business examples and use them to develop the broad skillset that a good
               manager should be able to draw from.
             </p>
             <div className="metadata flex gap-10 font-body">
             <p className="inline-flex items-center gap-4">
       <span className="text-3xl"><FaChalkboardTeacher /></span>
       <span>Instructor: John Doe</span>
     </p>
               <p className="inline-flex items-center gap-2"> <span className="text-3xl"><PiStudent/></span> 20,000+ Learners</p>
               <p className="inline-flex items-center gap-2"><span className="text-3xl"><CgSandClock/> </span>Duration: 3 months</p>
             </div>
             <div className="ratings font-body flex gap-4">
               <span className="text-[#f4a261] inline-flex items-center gap-2 text-xl"> 4.8 <GoStarFill/></span>
               <p className="">(1,249 ratings)  </p>
                   <p>2,945 students </p>
             </div>
           </div>
            <div className="card">
             <img
               src="https://wallpapercave.com/wp/wp2417737.jpg"
               alt="Course"
               className="course-image"
             />
             <h3 className="font-bold font-body text-primary mt-[-10px] ml-[-60px] ">Project Management Professional</h3>
             <ul className="pt-2 ">
               <li className="flex justify-between ml-1 mr-2 mb-2 text-gray-700" >
                 <p >Live sessions:</p> <p>70 hrs</p></li>
               <li className="flex justify-between ml-1 mr-2  mb-2 text-gray-700">
                 <p>Questions:</p><p>200+</p> </li>
               <li className="flex justify-between ml-1 mr-2  mb-2 text-gray-700">
                 <p>Passing grade:</p><p>60%</p> </li>
               <li className="flex justify-between ml-1 mr-2  mb-2 text-gray-700">
                 <p>Format:</p> <p>MCQ</p></li>
             </ul>
             {/* <button className="enroll-button">Enroll Now</button> */}
             <Button text="Enroll Now" size="lg" variant="primary"  />
           
           </div> 
         </div>
         <div className="tabs font-body font-bold">
       <ul>
         {["About Us", "Modules", "Quiz & Notes", "Instructor", "Reviews"].map(tab => (
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
     
          <div className="about-section">
           <h2 className="font-header text-primary ">About Us</h2>
           <p className="font-body text-gray-500">
             This (Hons) Business and Management BSc course from University of Essex Online will help
             you adapt to the ever-changing world of business. We'll examine a range of real-world
             business examples and use them to develop the broad skillset that a good manager should
             be able to draw from.
           </p>
         </div> 
       </div>

    </div>
  );
};

export default CourseDetailPage;
