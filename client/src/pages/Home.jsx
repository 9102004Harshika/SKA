import React from "react";

const Home = () => {
  return (
    <section className="p-6 text-center">
      <h2 className="text-3xl text-primary font-bold mb-4">
        Welcome to the LMS
      </h2>
      <p className="text-lg text-accent">
        Learn and grow with our curated courses.
      </p>
      <a
        className="text-lg text-primary bg-secondary border-secondary border rounded-md p-2 mt-8 inline-block"
        href="/register"
      >
        Register Page
      </a>
      <a
        className="text-lg text-primary bg-secondary border-secondary border rounded-md p-2 mt-8 inline-block"
        href="/login"
      >
        Login Page
      </a>
    </section>
  );
};

export default Home;
