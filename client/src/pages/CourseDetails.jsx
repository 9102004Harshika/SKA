import React from "react";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import {Button} from '../ui/button'
const CourseDetail = () => {
  const course = {
    image: "https://i.ytimg.com/vi/epL51ythcJg/maxresdefault.jpg",
    title: "Master ICSE Class 10 Mathematics: Conquer the Syllabus",
    instructor: {
      name: "Ms. Priya Rao",
      photo: "https://via.placeholder.com/100",
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

  return (
    <div className="md:flex block">
      {/* Header */}
      <div className="md:p-20 p-6 md:w-[60%] w-full">
        <h1 className="text-3xl md:text-5xl font-bold font-header md:leading-normal leading-normal">{course.title}</h1>
        <p className="md:text-xl text-lg text-gray-500 font-body md:w-[60%] w-full mt-4">{course.description}</p>
        <p className="inline-flex items-center space-x-2 mt-4 font-bold text-xl">
  <FaUserCircle className="text-xl" />
  <span>By {course.instructor.name}</span>
</p>
<div className="flex gap-4 mt-4">
 <div className="bg-white md:px-[2%] px-[5%] py-[2%] md:py-[1%] md:text-xl text-lg rounded-full"><p>Notes</p></div>
 <div className="bg-white md:px-[2%] px-[5%] py-[2%] md:py-[1%] text-lg rounded-full"><p>Quizzes</p></div>
 <div className="bg-white md:px-[2%] px-[5%] py-[2%] md:py-[1%] md:text-xl text-lg rounded-full"><p>Videos</p></div>
  </div>
  <div className="mt-4 ">
    <Button variant="primary" text="Buy Now" type="submit" className="md:w-[20%]" />
    <p className="text-gray-500 text-lg font-bold"> {course.studentCount} Students Enrolled</p>
  </div>
<div></div>
      </div>

      <div className="md:pt-20 p-6 md:w-[30%] md:mt-[10%] w-full">
  <img
    src={course.instructor.photo}
    alt="Instructor"
    style={{ width: '500px', height: '300px' }}  // Set width and height for a rectangle
    className="object-cover mx-auto" 
  />
</div>

    </div>
  );
};

export default CourseDetail;
