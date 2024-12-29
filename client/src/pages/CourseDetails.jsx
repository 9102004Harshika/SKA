


// import React, { useState } from "react";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { Button } from '../ui/button';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { useState } from "react";
import { FaInfoCircle, FaBook, FaFileAlt, FaChalkboardTeacher } from "react-icons/fa"; // Import icons
const CourseDetail = () => {
  const [review, setReview] = useState(4.5); // Set to 5 for demonstration, you can change this value

  const course = {
    image: "https://i.ytimg.com/vi/epL51ythcJg/maxresdefault.jpg",
    title: "Master ICSE Class 10 Mathematics: Conquer the Syllabus",
    class:'11th',
    board:"SSC",
    subject:"Maths",
    stream:"Science",
    instructor: {
      name: "Ms. Priya Rao",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLyiFdcVtrki9Ek26RiY-vw4hgUuWyaf5BwSqHpc691zglSyZIT0E3HqtgqPDABfRJrRI&usqp=CAU",
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

  return (
   <div> <div className="relative">
   <div className="md:flex block bg-secondary">
  {/* Instructor Photo - Mobile on top */}
  <div className="md:pt-5 p-6 md:w-[30%] md:mt-[10%] w-full order-first md:order-last">
    <img
      src={course.instructor.photo}
      alt="Instructor"
      className="object-fit mx-auto  md:w-[500px] md:h-[300px] w-[250px] h-[250px] "
    />
  </div>

  {/* Header */}
  <div className="md:p-20 p-6 md:w-[60%] w-full">
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
      <Button variant="primary" text="Buy Now" type="submit" className="md:w-[20%]" />
      <p className="text-gray-500 text-lg font-bold">
        {course.studentCount} Students Enrolled
      </p>
    </div>
  </div>
</div>

   {/* features */}
   <div className="absolute bottom-0 w-full md:py-4 z-10 bg-background mx-auto p-6 rounded-sm shadow-2xl md:mt-4 mt-[70px] flex justify-between hidden md:flex" 
  style={{
    maxWidth: '1000px',
    boxShadow: "0px 15px 50px -5px rgb(184, 169, 169), -5px -0px 20px 0px rgb(184, 169, 169)", 
    paddingBottom: '20px', 
    zIndex: 10, 
    position: 'relative', 
    top: '-70px'
  }}>
  
  {/* Content for medium screens and up */}
  <div className="text-center w-full sm:w-[22%] border-r border-gray-300 last:border-0">
    <h2 className="text-xl font-bold font-header tracking-wider">Review</h2>
    <p className="text-lg text-gray-700 inline-flex mt-4">
      {renderStars(review)} {/* Dynamically renders stars */}
    </p>
  </div>
  
  <div className="text-center w-full sm:w-[22%] border-r border-gray-300 last:border-0">
    <h2 className="text-2xl font-bold font-header tracking-wider">Class</h2>
    <p className="text-lg text-gray-700 mt-2">{course.class}</p> {/* Dynamically displays class */}
  </div>
  
  <div className="text-center w-full sm:w-[22%] border-r border-gray-300 last:border-0">
    <h2 className="text-xl font-bold font-header tracking-wider">Board</h2>
    <p className="text-lg text-gray-700 mt-3">{course.board}</p> {/* Dynamically displays board */}
  </div>
  
  <div className="text-center w-full sm:w-[22%] border-r border-gray-300 last:border-0">
    <h2 className="text-xl font-bold font-header tracking-wider">Subject</h2>
    <p className="text-lg text-gray-700 mt-3">{course.subject}</p> {/* Dynamically displays subject */}
  </div>
  
  {/* Conditionally render the "Stream" for class 11th or 12th */}
  {(course.class === '11th' || course.class === '12th') && (
    <div className="text-center w-full sm:w-[22%] last:border-0">
      <h2 className="text-xl font-bold font-header tracking-wider">Stream</h2>
      <p className="text-lg text-gray-700 mt-3">{course.stream}</p> {/* Dynamically displays stream */}
    </div>
  )}

</div>


 </div>
<div>
  {/* Sticky Navbar */}
  <div className="  md:pt-10 md:pl-[200px] md:pr-[200px] pt-10 pl-[100px] pr-[100px]   md:text-xl text-lg font-bold font-header">
 <div className="flex md:gap-[100px] gap-[50px] items-center pb-5 border-b-4 border-gray-300 justify-center">
 <button className="flex flex-col items-center">
    <h1 className="hidden md:block">About</h1> {/* Show text on larger screens */}
    <FaInfoCircle className="block md:hidden text-xl" /> {/* Show icon on smaller screens */}
  </button>
  <button className="flex flex-col items-center">
    <h1 className="hidden md:block">Courses</h1>
    <FaBook className="block md:hidden text-xl" />
  </button>
  <button className="flex flex-col items-center">
    <h1 className="hidden md:block">Quiz/Notes</h1>
    <FaFileAlt className="block md:hidden text-xl" />
  </button>
  <button className="flex flex-col items-center">
    <h1 className="hidden md:block">Instructor</h1>
    <FaChalkboardTeacher className="block md:hidden text-xl" />
  </button>
  <button className="flex flex-col items-center">
    <h1 className="hidden md:block">Review</h1>
    <FaStar className="block md:hidden text-xl" />
  </button>
    </div>
    </div>
 
</div>
{/* About Section */}
<div className="md:flex pt-10 pl-[20px] md:pl-[110px] md:pt-20 md:gap-[200px] pb-20">
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
      <IoMdCheckmark className="text-primary text-xl mr-2" /> {/* Checkmark icon */}
      <p className="md:text-xl text-md text-gray-500 font-body">{topic}</p>
    </div>
  ))}
</div>

  </div>
  
</div>
 <div></div>
 </div>
  );
};

export default CourseDetail;
