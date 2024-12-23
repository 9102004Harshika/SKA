import React from "react";

const Tooltip = ({ tooltipText }) => {
  return (
    <div className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-4 text-sm font-medium text-gray-900">
      {/* Tooltip Content */}
      <div
        className="absolute left-1/2 top-full z-50 flex -translate-x-[85%] flex-col items-center text-center text-sm text-slate-300 mt-4 opacity-0 scale-95 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0"
      >
        <div className="rounded-sm bg-secondary text-primary py-1 px-2">
          <p className="whitespace-nowrap">{tooltipText}</p>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
