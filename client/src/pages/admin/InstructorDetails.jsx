import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const InstructorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructorDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/instructor/get/${id}`
        );
        setInstructor(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching instructor details");
        setLoading(false);
      }
    };

    fetchInstructorDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this instructor?")) {
      try {
        await axios.delete(`http://localhost:5000/api/instructor/delete/${id}`);
        navigate("/admin/instructors");
      } catch (error) {
        setError("Error deleting instructor");
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/admin/instructor/edit/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!instructor) return <div>Instructor not found</div>;

  return (
    <div className="instructor-details">
      <div className="container" style={{ padding: "2rem" }}>
        <button
          onClick={() => navigate("/admin/instructor")}
          style={{
            marginBottom: "1rem",
            padding: "0.5rem 1rem",
            background: "#f0f0f0",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ← Back to Instructors
        </button>

        <div
          className="content"
          style={{
            background: "white",
            borderRadius: "10px",
            padding: "2rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            className="header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <div>
              <h1 style={{ marginBottom: "1rem" }}>
                {instructor.user.fullName}
              </h1>
              <img
                src={instructor.photo}
                alt={instructor.user.fullName}
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "1rem",
                }}
              />
            </div>
            <div className="actions" style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={handleUpdate}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="details" style={{ marginTop: "2rem" }}>
            <div className="detail-item" style={{ marginBottom: "1rem" }}>
              <h3>Education</h3>
              <p>{instructor.education}</p>
            </div>
            <div className="detail-item" style={{ marginBottom: "1rem" }}>
              <h3>Experience</h3>
              <p>{instructor.experience} years</p>
            </div>
            <div className="detail-item" style={{ marginBottom: "1rem" }}>
              <h3>Bio</h3>
              <p>{instructor.bio}</p>
            </div>
            <div className="detail-item" style={{ marginBottom: "1rem" }}>
              <h3>Contact Information</h3>
              <p>Email: {instructor.user.email}</p>
              <p>Phone: {instructor.phone || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetails;
