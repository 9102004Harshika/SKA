import React, { useState } from "react";
import axios from "axios"; // Ensure axios is installed for API calls

function QuizAndNotesDetails() {
  // State for each form
  const [noteData, setNoteData] = useState({
    name: "",
    description: "",
    image: "",
    link: "",
    private: "",
  });

  const [instructorData, setInstructorData] = useState({
    name: "",
    photo: "",
    bio: "",
    education: "",
    role: "",
    experience: "",
  });

  const [quizData, setQuizData] = useState({
    name: "",
    description: "",
    image: "",
    link: "",
    private: "",
  });

  // Handle input changes
  const handleNoteChange = (e) =>
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  const handleInstructorChange = (e) =>
    setInstructorData({ ...instructorData, [e.target.name]: e.target.value });
  const handleQuizChange = (e) =>
    setQuizData({ ...quizData, [e.target.name]: e.target.value });

  // Handle form submissions (this can be extended to handle actual API calls)
  const handleSubmitNote = async (e) => {
    e.preventDefault();
    console.log("Note Data Submitted:", noteData);

    // Example of making an API call with axios
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/notes/add`,
        noteData
      );
      console.log("Note Data Inserted Successfully:", response.data);
      // Reset the form after successful submission
      setNoteData({
        name: "",
        description: "",
        image: "",
        link: "",
        private: "",
      });
    } catch (error) {
      console.error("Error inserting note data:", error);
    }
  };

  const handleSubmitInstructor = async (e) => {
    e.preventDefault();
    console.log("Instructor Data Submitted:", instructorData);

    // Example of making an API call with axios
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/instructors/add`,
        instructorData
      );
      console.log("Instructor Data Inserted Successfully:", response.data);
      // Reset the form after successful submission
      setInstructorData({
        name: "",
        photo: "",
        bio: "",
        education: "",
        role: "",
        experience: "",
      });
    } catch (error) {
      console.error("Error inserting instructor data:", error);
    }
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    console.log("Quiz Data Submitted:", quizData);

    // Example of making an API call with axios
    try {
      const response = await axios.post(
         `${process.env.REACT_APP_API_BASE_URL}api/quizzes/add`,
        quizData
      );
      console.log("Quiz Data Inserted Successfully:", response.data);
      // Reset the form after successful submission
      setQuizData({
        name: "",
        description: "",
        image: "",
        link: "",
        private: "",
      });
    } catch (error) {
      console.error("Error inserting quiz data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Insert Data</h1>

        {/* Notes Form */}
        <form onSubmit={handleSubmitNote} className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700">Notes Form</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              value={noteData.name}
              onChange={handleNoteChange}
              className="input"
              placeholder="Note Name"
              required
            />
            <textarea
              name="description"
              value={noteData.description}
              onChange={handleNoteChange}
              className="textarea"
              placeholder="Description"
              required
            />
            <input
              type="text"
              name="image"
              value={noteData.image}
              onChange={handleNoteChange}
              className="input"
              placeholder="Image URL"
            />
            <input
              type="text"
              name="link"
              value={noteData.link}
              onChange={handleNoteChange}
              className="input"
              placeholder="Link"
            />
            <input
              type="text"
              name="private"
              value={noteData.private}
              onChange={handleNoteChange}
              className="input"
              placeholder="Private"
            />
            <button type="submit" className="btn">
              Submit Note
            </button>
          </div>
        </form>

        {/* Instructor Form */}
        <form onSubmit={handleSubmitInstructor} className="space-y-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-700">
            Instructor Form
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              value={instructorData.name}
              onChange={handleInstructorChange}
              className="input"
              placeholder="Instructor Name"
              required
            />
            <input
              type="text"
              name="photo"
              value={instructorData.photo}
              onChange={handleInstructorChange}
              className="input"
              placeholder="Photo URL"
            />
            <textarea
              name="bio"
              value={instructorData.bio}
              onChange={handleInstructorChange}
              className="textarea"
              placeholder="Bio"
            />
            <input
              type="text"
              name="education"
              value={instructorData.education}
              onChange={handleInstructorChange}
              className="input"
              placeholder="Education"
            />
            <input
              type="text"
              name="role"
              value={instructorData.role}
              onChange={handleInstructorChange}
              className="input"
              placeholder="Role"
            />
            <input
              type="number"
              name="experience"
              value={instructorData.experience}
              onChange={handleInstructorChange}
              className="input"
              placeholder="Experience"
            />
            <button type="submit" className="btn">
              Submit Instructor
            </button>
          </div>
        </form>

        {/* Quiz Form */}
        <form onSubmit={handleSubmitQuiz} className="space-y-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-700">Quiz Form</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              value={quizData.name}
              onChange={handleQuizChange}
              className="input"
              placeholder="Quiz Name"
              required
            />
            <textarea
              name="description"
              value={quizData.description}
              onChange={handleQuizChange}
              className="textarea"
              placeholder="Description"
              required
            />
            <input
              type="text"
              name="image"
              value={quizData.image}
              onChange={handleQuizChange}
              className="input"
              placeholder="Image URL"
            />
            <input
              type="text"
              name="link"
              value={quizData.link}
              onChange={handleQuizChange}
              className="input"
              placeholder="Link"
            />
            <input
              type="text"
              name="private"
              value={quizData.private}
              onChange={handleQuizChange}
              className="input"
              placeholder="Private"
            />
            <button type="submit" className="btn">
              Submit Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuizAndNotesDetails;
