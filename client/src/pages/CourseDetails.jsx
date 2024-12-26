import React from "react";
import { FaHeart, FaShareAlt } from "react-icons/fa";

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
    <div className="bg-background text-black min-h-screen p-6 space-y-10">
      {/* Banner Section */}
      <section className="flex flex-col lg:flex-row items-center gap-6">
        {/* Text Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-primary mb-4">
            {course.title}
          </h1>
          <p className="text-lg text-accent mb-2">
            Enrolled by {course.studentCount}+ Students
          </p>
          <p className="text-xl font-bold text-secondary">
            {course.price}{" "}
            <span className="line-through text-accent text-lg">
              {course.originalPrice}
            </span>{" "}
            <span className="text-accent">{course.discount}</span>
          </p>
          <button className="mt-4 px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-secondary">
            BUY NOW
          </button>
          <div className="flex items-center gap-4 mt-4">
            <button className="text-secondary hover:text-primary">
              <FaHeart size={24} />{" "}
              <span className="text-sm">Add to Wishlist</span>
            </button>
            <button className="text-secondary hover:text-primary">
              <FaShareAlt size={24} /> <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
        {/* Image Section */}
        <img
          src={course.image}
          alt={course.title}
          className="w-96 h-54 object-cover rounded-lg shadow-md"
        />
      </section>

      {/* Instructor Details */}
      <section className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-secondary">Instructor</h2>
        <div className="flex items-center gap-4">
          <img
            src={course.instructor.photo}
            alt={course.instructor.name}
            className="w-20 h-20 rounded-full border-2 border-primary"
          />
          <div>
            <p className="text-lg font-medium text-primary">
              {course.instructor.name}
            </p>
            <p className="text-sm text-accent">{course.instructor.bio}</p>
          </div>
        </div>
      </section>

      {/* Course Description */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-secondary">
          Course Description
        </h2>
        <p className="text-sm text-black mt-4">{course.description}</p>
      </section>

      {/* Key Features */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-secondary">Key Features</h2>
        <ul className="list-disc pl-5 text-sm text-black mt-4 space-y-2">
          {course.keyFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      {/* Quizzes and Notes */}
      <section className="flex flex-col lg:flex-row gap-6">
        {/* Quizzes */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-secondary">Quizzes</h2>
          <p className="text-sm text-black mt-4">{course.quizDetails}</p>
          <a
            href={course.quizLink}
            className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-secondary"
          >
            Take a Quiz
          </a>
        </div>
        {/* Notes */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-secondary">Notes</h2>
          <p className="text-sm text-black mt-4">{course.notesDescription}</p>
          <a
            href={course.notesLink}
            className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-secondary"
          >
            View Notes
          </a>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-secondary">Reviews</h2>
        <div className="mt-4 space-y-4">
          {course.reviews.map((review, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-md bg-background"
            >
              <p className="text-sm font-medium text-primary">{review.name}</p>
              <p className="text-yellow-500">{"⭐".repeat(review.stars)}</p>
              <p className="text-sm text-black">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call Us Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-secondary">Need Help?</h2>
        <p className="text-sm text-black mt-4">For any queries, call us at:</p>
        <p className="text-lg font-bold text-primary mt-2">+91-9876543210</p>
      </section>
    </div>
  );
};

export default CourseDetail;
