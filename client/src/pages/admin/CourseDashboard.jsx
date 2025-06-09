// import TextInput from "../../ui/textInput";

// function CourseAdminDashboard() {
//   return (
//     <div className="flex-1 p-6 mx-10 " id="coursedashboard">
//       <input
//         type="text"
//         placeholder="Search courses..."
//         className="w-full p-3 border border-gray-300 rounded-md mb-4"
//       />
//       <div className="flex gap-2 mb-4">
//         <button className="px-4 py-2 bg-secondary rounded-md">All</button>
//         <button className="px-4 py-2 bg-secondary rounded-md">Popular</button>
//         <button className="px-4 py-2 bg-secondary rounded-md">New</button>
//       </div>
//     </div>
//   );
// }

// export default CourseAdminDashboard;


import React, { useState, useEffect } from "react";

// Mock course data (replace with real fetch later)
const mockCourses = [
  { id: 1, title: "React Basics", category: "Popular" },
  { id: 2, title: "Advanced Node.js", category: "New" },
  { id: 3, title: "MERN Stack", category: "Popular" },
  { id: 4, title: "Python for Beginners", category: "New" },
];

function CourseAdminDashboard() {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("Dashboard");

  const filteredCourses = courses.filter(course => {
    const matchesFilter =
      filter === "All" || course.category === filter;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const tabList = ["Dashboard", "Add Course", "Edit Course", "Delete Course"];
  const filterButtons = ["All", "Popular", "New"];

  return (
    <div className="flex-1 p-6 mx-10" id="coursedashboard">
      {/* Top Tabs */}
      <div className="flex gap-4 mb-6">
        {tabList.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === tab
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search courses..."
        className="w-full p-3 border border-gray-300 rounded-md mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {filterButtons.map(btn => (
          <button
            key={btn}
            onClick={() => setFilter(btn)}
            className={`px-4 py-2 rounded-md ${
              filter === btn ? "bg-secondary text-white" : "bg-gray-100"
            }`}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            className="p-4 border border-gray-300 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-600">{course.category}</p>
          </div>
        ))}
        {filteredCourses.length === 0 && (
          <p className="text-gray-500">No courses found.</p>
        )}
      </div>
    </div>
  );
}

export default CourseAdminDashboard;
