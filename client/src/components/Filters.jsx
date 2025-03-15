import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Checkbox } from "../ui/checkBox";
import gsap from "gsap";

const Filters = ({ notes, selectedFilters, setSelectedFilters }) => {
  const boards = ["MSBSHSE", "IGCSE", "ICSE", "CBSE", "IB"];
  const getClassOptions = (selectedBoards) => {
    const classOptions = new Set();
    selectedBoards.forEach((board) => {
      switch (board) {
        case "IGCSE":
        case "IB":
          ["7th", "8th", "9th", "10th", "11th", "12th"].forEach((cls) =>
            classOptions.add(cls)
          );
          break;
        case "CBSE":
        case "MSBSHSE":
          ["9th", "10th", "11th", "12th"].forEach((cls) =>
            classOptions.add(cls)
          );
          break;
        case "ICSE":
          ["8th", "9th", "10th", "11th", "12th"].forEach((cls) =>
            classOptions.add(cls)
          );
          break;
      }
    });
    return Array.from(classOptions);
  };

  const [filterVisibility, setFilterVisibility] = useState({
    subject: false,
    classFor: false,
    board: false,
  });

  const refs = {
    board: useRef(null),
    classFor: useRef(null),
    subject: useRef(null),
  };

  useEffect(() => {
    Object.keys(refs).forEach((key) => {
      if (filterVisibility[key]) {
        gsap.to(refs[key].current, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(refs[key].current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    });
  }, [filterVisibility]);

  const toggleFilterVisibility = (filterType) => {
    setFilterVisibility((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  const handleCheckboxChange = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: { ...prev[type], [value]: !prev[type][value] },
    }));
  };

  const isFilterApplied = (type) =>
    selectedFilters[type] &&
    Object.values(selectedFilters[type]).some((checked) => checked);

  return (
    <aside className="w-72 h-[200vh] bg-background border-r-[1px] border-slate-400 p-6 hidden lg:flex flex-col">
      {/* Board Filter */}
      <div className="mt-8">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleFilterVisibility("board")}
        >
          <h2 className="font-header text-accent text-xl font-bold capitalize">
            Board
          </h2>
          {filterVisibility.board ? (
            <FaMinus className="text-primary" />
          ) : (
            <FaPlus className="text-primary" />
          )}
        </div>
        <div
          ref={refs.board}
          className="overflow-hidden h-0 opacity-0 mt-2 ml-4"
        >
          {boards.map((value, index) => (
            <Checkbox
              key={index}
              text={
                <div className="flex flex-col items-start md:flex-row md:items-center gap-1">
                  {value}
                </div>
              }
              checked={selectedFilters.board[value] || false}
              onChange={() => handleCheckboxChange("board", value)}
            />
          ))}
        </div>
      </div>

      {/* Class Filter */}
      <div className="mt-8">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleFilterVisibility("classFor")}
        >
          <h2 className="font-header text-accent text-xl font-bold capitalize">
            Class
          </h2>
          {filterVisibility.classFor ? (
            <FaMinus className="text-primary" />
          ) : (
            <FaPlus className="text-primary" />
          )}
        </div>
        {filterVisibility.classFor && !isFilterApplied("board") && (
          <p className="text-gray-500 italic mt-2">Please select board</p>
        )}
        <div
          ref={refs.classFor}
          className="overflow-hidden h-0 opacity-0 mt-2 ml-4"
        >
          {isFilterApplied("board") &&
            getClassOptions(
              Object.keys(selectedFilters.board).filter(
                (b) => selectedFilters.board[b]
              )
            ).map((value, index) => (
              <Checkbox
                key={index}
                text={
                  <div className="flex flex-col items-start md:flex-row md:items-center gap-1">
                    {value}
                  </div>
                }
                checked={selectedFilters.classFor[value] || false}
                onChange={() => handleCheckboxChange("classFor", value)}
              />
            ))}
        </div>
      </div>

      {/* Subject Filter */}
      <div className="mt-8">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleFilterVisibility("subject")}
        >
          <h2 className="font-header text-accent text-xl font-bold capitalize">
            Subject
          </h2>
          {filterVisibility.subject ? (
            <FaMinus className="text-primary" />
          ) : (
            <FaPlus className="text-primary" />
          )}
        </div>
        {filterVisibility.subject && !isFilterApplied("classFor") && (
          <p className="text-gray-500 italic mt-2">Please select class</p>
        )}
        <div
          ref={refs.subject}
          className="overflow-hidden h-0 opacity-0 mt-2 ml-4"
        >
          {isFilterApplied("classFor") &&
            [...new Set(notes.map((note) => note.subject))].map(
              (value, index) => (
                <Checkbox
                  key={index}
                  text={
                    <div className="flex flex-col items-start md:flex-row md:items-center gap-1">
                      {value}
                    </div>
                  }
                  checked={selectedFilters.subject[value] || false}
                  onChange={() => handleCheckboxChange("subject", value)}
                />
              )
            )}
        </div>
      </div>
    </aside>
  );
};

export default Filters;
