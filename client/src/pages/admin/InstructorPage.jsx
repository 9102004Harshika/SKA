import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InstructorPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}api/instructor/get/`
        );
        setInstructors(response.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, []);

  const filteredInstructors = instructors.filter((instructor) =>
    instructor.user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (instructorId) => {
    navigate(`/admin/instructor/${instructorId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Instructors</h1>
      <input
        type="text"
        placeholder="Search by full name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredInstructors.map((instructor) => (
          <div
            key={instructor._id}
            onClick={() => handleCardClick(instructor._id)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              width: "300px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={instructor.photo}
              alt={instructor.user.fullName}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <h2 style={{ margin: "10px 0" }}>{instructor.user.fullName}</h2>
            <p>
              <strong>Education:</strong> {instructor.education}
            </p>
            <p>
              <strong>Bio:</strong> {instructor.bio}
            </p>
            <p>
              <strong>Experience:</strong> {instructor.experience} years
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorPage;
