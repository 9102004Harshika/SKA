import TextInput from "../../ui/textInput";

function CourseAdminDashboard() {
  return (
    <div className="flex-1 p-6" id="coursedashboard">
      <input
        type="text"
        placeholder="Search courses..."
        className="w-full p-3 border border-gray-300 rounded-md mb-4"
      />
      <div className="flex gap-2 mb-4">
        <button className="px-4 py-2 bg-gray-200 rounded-md">All</button>
        <button className="px-4 py-2 bg-gray-200 rounded-md">Popular</button>
        <button className="px-4 py-2 bg-gray-200 rounded-md">New</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Course Title</h3>
          <p className="text-sm text-gray-600">
            Course description goes here...
          </p>
        </div>
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Course Title</h3>
          <p className="text-sm text-gray-600">
            Course description goes here...
          </p>
        </div>
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Course Title</h3>
          <p className="text-sm text-gray-600">
            Course description goes here...
          </p>
        </div>
        <div>
          <TextInput label="Name" type="text" />
        </div>
      </div>
    </div>
  );
}

export default CourseAdminDashboard;
