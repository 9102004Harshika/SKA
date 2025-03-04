import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { IoBook } from "react-icons/io5";
import { FaBook, FaChalkboardTeacher, FaSchool } from "react-icons/fa";
import gsap from "gsap";

const NotesDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPdf, setShowPdf] = useState(false);

  // Refs for GSAP animations
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

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

  useEffect(() => {
    if (note) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 0.3 }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.5,
          stagger: 0.2,
        }
      );

      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.8 }
      );
    }
  }, [note]);

  if (loading) return <p className="text-center text-primary">Loading...</p>;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center text-error mt-10">
        <MdOutlineReportGmailerrorred className="text-4xl text-error mb-2" />
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );

  return (
    <div
      ref={containerRef}
      className="mx-auto px-8 mt-10 mb-2 flex flex-col justify-center md:flex-row items-start gap-2"
    >
      {/* Book Cover Image */}
      <div
        ref={imageRef}
        className="w-full md:w-1/4 flex justify-center items-start rounded-lg"
      >
        <img
          src={note.coverImageUrl}
          alt={note.title}
          className="w-64 md:w-72 md:h-auto shadow-2xl object-contain"
        />
      </div>

      {/* Notes Details */}
      <div ref={textRef} className="w-full md:w-2/3 flex flex-col text-primary">
        <h1 className="text-3xl md:mt-0 mt-4 font-header text-primary font-bold">
          {note.title}
        </h1>
        <div className="flex items-center my-2">
          <span>
            By <strong>{note.writtenBy}</strong>
          </span>
        </div>

        {/* Inline Details Row */}
        <div className="mt-2 flex flex-wrap gap-2 md:gap-4 text-sm md:text-md">
          <div className="flex items-center gap-2 bg-secondary py-2 px-4 rounded-3xl">
            <FaBook className="text-primary" />
            <span>
              Subject: <strong>{note.subject}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 bg-secondary py-2 px-4 rounded-3xl">
            <FaChalkboardTeacher className="text-primary" />
            <span>
              Class: <strong>{note.classFor}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 bg-secondary py-2 px-4 rounded-3xl">
            <FaSchool className="text-primary" />
            <span>
              Board: <strong>{note.board}</strong>
            </span>
          </div>
          <p className="text-justify">{note.description}</p>
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
              ref={buttonRef}
              onClick={() => setShowPdf(true)}
              className="bg-primary text-white px-3 py-2 rounded flex items-center gap-2 shadow-md hover:bg-opacity-90 transition md:w-auto w-full justify-center"
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
