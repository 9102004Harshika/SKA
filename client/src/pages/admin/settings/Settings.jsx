import React from "react";
import CarouselSettings from "./CarouselSettings";

const Settings = () => {
  return (
    <div className="space-y-8 px-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-wide font-header">
          Settings
        </h1>
      </div>

      <div className="space-y-8 max-w-6xl">
        <CarouselSettings />

        {/* Future settings sections can be added here */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            General Settings
          </h3>
          <p className="text-gray-600 text-sm">More settings coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
