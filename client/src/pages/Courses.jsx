import React from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";

const pages = [
  {
    title: "Website Root",
    description: "First Item",
    link: "#",
    isActive: false,
  },
  {
    title: "Page Depth 02",
    description: "Second Item",
    link: "#",
    isActive: false,
  },
  {
    title: "Page Depth 03",
    description: "Third Item",
    link: "#",
    isActive: false,
  },
  {
    title: "Page Depth 04",
    description: "Fourth Item",
    link: "#",
    isActive: false,
  },
  { title: "Page Depth 05", link: "#", isActive: true },
];

const Courses = () => {
  return (
    <div>
      ReactDOM.render(
      <Breadcrumb pages={pages} />, document.getElementById('root'));
    </div>
  );
};

export default Courses;
