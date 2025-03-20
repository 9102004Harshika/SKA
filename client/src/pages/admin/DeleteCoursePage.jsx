import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { deleteFile } from "../../logic/course/deleteCourse";

const DeleteCourse = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/courses/get"
        );
        setCourses(response.data);
      } catch (err) {
        setError("Failed to fetch notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDeleteClick = (note) => {
    setSelectedCourse(note);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCourse) {
      deleteFile(selectedCourse, setCourses);
      setIsModalOpen(false);
    }
  };

  const filteredNotes = courses.filter((course) =>
    course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="md:ml-8">
      <h2 className="text-3xl font-header font-semibold md:tracking-wide text-center mb-6">
        Delete Course
      </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by notes title..."
        className="w-full p-3 border border-primary bg-background focus:border-accent outline-none rounded-sm mb-6"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-error">{error}</p>
      ) : filteredNotes.length === 0 ? (
        <p className="text-tertiary">No courses found.</p>
      ) : (
        <div className="overflow-x-auto rounded-sm overflow-hidden">
          <table className="min-w-full border-collapse border border-primary rounded-sm">
            <thead>
              <tr className="border-primary">
                <th className="border bg-accent border-primary p-3 text-left">
                  Title
                </th>
                <th className="border bg-accent border-primary p-3 text-center">
                  Class
                </th>
                <th className="border bg-accent border-primary p-3 text-center">
                  Board
                </th>
                <th className="border bg-accent border-primary p-3 text-left">
                  Subject
                </th>
                {/* <th className="border bg-accent border-primary p-3 text-center">
                  Time
                </th> */}
                <th className="border bg-accent border-primary p-3 text-center">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredNotes.map((course) => (
                <tr key={course._id} className="hover:border-accent">
                  <td className="border border-primary p-3">
                    {course.courseTitle}
                  </td>
                  <td className="border border-primary p-3 text-center">
                    {course.class}
                  </td>
                  <td className="border border-primary p-3 text-center">
                    {course.board}
                  </td>
                  <td className="border border-primary p-3 text-left">
                    {course.subject}
                  </td>
                  {/* <td className="border border-primary p-3 text-center">
                    {new Date(course.createdOn).toLocaleString()}
                  </td> */}
                  <td className="border border-primary p-3 text-center">
                    <button
                      onClick={() => handleDeleteClick(course)}
                      className="px-4 py-2 bg-accent text-background rounded-md hover:bg-red-600"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-background p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-primary"
            >
              <AiOutlineClose size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this Notes?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-background rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteCourse;
