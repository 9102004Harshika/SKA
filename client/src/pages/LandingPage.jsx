import React from "react";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <section className="bg-gradient-to-b font-body from-secondary to-primary pt-12 text-center">
      <div className="container mx-auto max-w-5xl">
        {/* Header Section */}
        <h2 className="text-4xl sm:text-5xl text-primary font-header font-extrabold mb-6 leading-tight">
          Welcome to{" "}
          <span className="text-secondary underline underline-offset-4">
            Shri Kalam Academy
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          Empower your learning journey with our innovative Student LMS.
          Designed for excellence, we make your coaching experience seamless and
          efficient. Enroll today and take the first step toward your success!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a
            className="text-lg sm:text-xl text-white bg-accent border border-secondary hover:bg-secondary hover:text-white transition-colors px-6 py-3 rounded-lg shadow-lg"
            href="/register"
          >
            Register
          </a>
          <a
            className="text-lg sm:text-xl text-white bg-accent border border-secondary hover:bg-secondary hover:text-white transition-colors px-6 py-3 rounded-lg shadow-lg"
            href="/enrollment"
          >
            Enroll
          </a>
          <a
            className="text-lg sm:text-xl text-white bg-accent border border-secondary hover:bg-secondary hover:text-white transition-colors px-6 py-3 rounded-lg shadow-lg"
            href="/login"
          >
            Login
          </a>
          <a
            className="text-lg sm:text-xl text-white bg-accent border border-secondary hover:bg-secondary hover:text-white transition-colors px-6 py-3 rounded-lg shadow-lg"
            href="/app/home"
          >
            Home Page
          </a>
          <a
            className="text-lg sm:text-xl text-white bg-accent border border-secondary hover:bg-secondary hover:text-white transition-colors px-6 py-3 rounded-lg shadow-lg"
            href="/app/coursedetail"
          >
            Course Detail
          </a>
        </div>
      </div>

      {/* Feature Section */}
      <div className="mt-12 bg-background shadow-lg rounded-lg p-8 mx-auto max-w-4xl">
        <h3 className="text-3xl text-primary font-header font-bold mb-4">
          Why Choose Shri Kalam Academy?
        </h3>
        <ul className="grid sm:grid-cols-2 gap-6 text-left text-gray-700">
          <li className="flex items-start">
            <span className="text-secondary text-3xl mr-3">✓</span>
            Expert faculty with years of teaching experience.
          </li>
          <li className="flex items-start">
            <span className="text-secondary text-3xl mr-3">✓</span>
            Comprehensive study material and resources.
          </li>
          <li className="flex items-start">
            <span className="text-secondary text-3xl mr-3">✓</span>
            Personalized attention to every student.
          </li>
          <li className="flex items-start">
            <span className="text-secondary text-3xl mr-3">✓</span>
            Access to online classes and recorded lectures.
          </li>
        </ul>
      </div>
      <Footer />
    </section>
  );
};

export default Landing;
