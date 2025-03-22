import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUniversity, FaFilePdf } from "react-icons/fa";
import { IoBook } from "react-icons/io5";

const NoteCard = ({ note, onViewDetails }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/app/notes/${note._id}`)}
      className="bg-background border border-primary shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:rounded-lg  hover:scale-105 hover:brightness-95 cursor-pointer flex flex-col justify-between"
    >
      <div className="pb-4">
        <img
          src={note.coverImageUrl}
          alt={note.title}
          className="w-full h-72 object-cover object-top"
        />
        <div className="px-4 pt-4">
          <h2 className="text-lg font-semibold font-header text-secondary mb-1">
            {note.title} ({note.subject})
          </h2>
          <div className="text-sm text-tertiary">
            <div className="flex items-center gap-1">
              <FaUniversity className="text-tertiary" />
              <span>Board: {note.board.split("(").pop().replace(")", "")}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaFilePdf className="text-tertiary" />
              <span>Class: {note.classFor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
