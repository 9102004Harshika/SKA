import TextInput from "../../ui/textInput";

function CourseAdminDashboard() {
  return (
    <div className="flex-1 p-6 mx-10 " id="coursedashboard">
      <input
        type="text"
        placeholder="Search courses..."
        className="w-full p-3 border border-gray-300 rounded-md mb-4"
      />
      <div className="flex gap-2 mb-4">
        <button className="px-4 py-2 bg-secondary rounded-md">All</button>
        <button className="px-4 py-2 bg-secondary rounded-md">Popular</button>
        <button className="px-4 py-2 bg-secondary rounded-md">New</button>
      </div>
    </div>
  );
}

export default CourseAdminDashboard;
