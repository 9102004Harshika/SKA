import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { IoBook } from "react-icons/io5";
import { FaUser, FaBook, FaChalkboardTeacher, FaSchool } from "react-icons/fa";

const NotesDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/notes/${id}`
        );
        setNote(response.data);
      } catch (err) {
        setError("Failed to fetch note details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) return <p className="text-center text-primary">Loading...</p>;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center text-error mt-10">
        <MdOutlineReportGmailerrorred className="text-4xl text-error mb-2" />
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="mx-auto p-6 mt-6 flex flex-col justify-between md:flex-row items-start gap-10">
      {/* Book Cover Image */}
      <div className="w-full md:w-1/4 flex justify-center items-start border-2 border-accent rounded-lg">
        <img
          src={note.coverImageUrl}
          alt={note.title}
          className="w-64 h-96 md:w-72 md:h-[28rem] object-contain"
        />
      </div>

      {/* Notes Details */}
      <div className="w-full md:w-2/3 flex flex-col text-primary">
        <h1 className="text-3xl font-header text-primary font-bold">
          {note.title}
        </h1>
        <div className="flex items-center my-2">
          <span>
            By <strong>{note.writtenBy}</strong>
          </span>
        </div>
        <p className="">{note.description}</p>

        {/* Inline Details Row */}
        <div className="mt-4 flex flex-wrap gap-6 text-lg">
          <div className="flex items-center gap-2 bg-secondary p-2 rounded-3xl">
            <FaBook className="text-primary" />
            <span>
              Subject: <strong>{note.subject}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 bg-secondary p-2 rounded-3xl">
            <FaChalkboardTeacher className="text-primary" />
            <span>
              Class: <strong>{note.classFor}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 bg-secondary p-2 rounded-3xl">
            <FaSchool className="text-primary" />
            <span>
              Board: <strong>{note.board}</strong>
            </span>
          </div>
        </div>

        {/* Last Updated */}
        <p className="mt-4 text-gray-600 text-sm">
          Last Updated:{" "}
          <span className="font-semibold">
            {new Date(note.createdOn).toLocaleDateString()}
          </span>
        </p>

        {/* Open PDF Button */}
        {note.pdfUrl && (
          <div className="mt-6">
            <button
              onClick={() => setShowPdf(true)}
              className="bg-primary text-white px-3 py-2 rounded flex items-center gap-2 shadow-md hover:bg-opacity-90 transition"
            >
              <IoBook /> Open Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesDetail;
