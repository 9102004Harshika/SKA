import React,{useState} from "react";
import TextInput from "../../ui/textInput";
import ImageUploader from "../../ui/imageUploader";
import VideoUploader from "../../ui/videoUploader";
import TextAreaInput from "../../ui/textarea";
import useUpdateCourse from "../../logic/course/updateCourse";
import { Button } from "../../ui/button";
import Select from "../../ui/select";
import {
  boards,
  category,
  getClassOptions,
  getSubjects,
  streams,
} from "../../config";
import Modal from "../../components/Modal";

const EditCoursesPage = () => {
  const { course, setCourse, deleteFile,handleSubmit,handleChange,loading, progress  } = useUpdateCourse();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[isImageRemoved,setImageRemoved]=useState(false);
  const[isVideoRemoved,setVideoRemoved]=useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleModuleChange = (index, e) => {
    const updatedModules = [...course.modules];
    updatedModules[index] = {
      ...updatedModules[index],
      [e.target.name]: e.target.value,
    };
    setCourse({ ...course, modules: updatedModules });
  };
  const addModule = () => {
    setCourse((prev) => ({
      ...prev,
      modules: [...prev.modules, { name: "", estimatedTime: "", videoLink: "" }],
    }));
  };
  
  const removeModule = () => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.slice(0, -1), // Remove last module
    }));
  };
  

  const handleVideoChange = (index, file) => {
    setCourse((prev) => {
      const updatedModules = [...prev.modules];
      updatedModules[index].videoLink = file; // Save video file link
      return { ...prev, modules: updatedModules };
    });
  };
  
  const handleRemoveVideo = (index) => {
    setVideoRemoved(true)
    setCourse((prev) => {
      const updatedModules = [...prev.modules];
      deleteFile(updatedModules[index].videoLink);
      updatedModules[index].videoLink = "";
      return { ...prev, modules: updatedModules };
    });
  };
  
  return (
    <div className="mx-10 font-body">
      <h2 className="mb-10 font-header text-3xl md:tracking-wide font-semibold text-center">
        Edit This Course
      </h2>
      <div className="space-y-6 mx-10">
        <form onSubmit={(e) =>
            handleSubmit(
              e,
              isImageRemoved,
              isVideoRemoved,
              openModal,
              closeModal,
            )
          } className="flex flex-col gap-6">
          {/* Title & Description */}
          <div className="flex gap-4 items-center justify-between">
            <div className="flex-1">
              <TextInput
                type="text"
                name="courseTitle"
                value={course.courseTitle}
                label="Course Title"
                onChange={handleChange}
                required

              />
              <TextAreaInput
                name="courseDescription"
                value={course.courseDescription}
                onChange={handleChange}
                label="Course Description"
                required
              />
            </div>
            <div className="flex flex-col items-center justify-center px-4 py-2 border-2 border-primary rounded-md">
              <label className="mb-8">Cover Image</label>
              {course.courseImage ? (
                <div className="flex flex-col items-center">
                  <img
                    src={course.courseImage}
                    alt="Cover"
                    className="w-30 h-40 object-cover rounded-md"
                  />
                  <Button
                    text="Remove Image"
                    variant="secondary"
                    size="xs"
                    onClick={() => {
                      setImageRemoved(true)
                      setCourse({ ...course, courseImage: "" });
                      deleteFile(course.courseImage);
                    }}
                  />
                </div>
              ) : (
                <ImageUploader
                  label="Upload Image"
                  id="imageUpload"
                  required
                  onChange={(file) =>
                    setCourse({ ...course, courseImage: file })
                  }
                />
              )}
            </div>
          </div>

          <TextAreaInput
            name="aboutCourse"
            value={course.aboutCourse}
            onChange={handleChange}
            label="About Course"
            required
          />
          <TextAreaInput
            name="moduledescription"
            value={course.moduledescription}
            onChange={handleChange}
            label="Module Description"
            required
          />
          <TextInput
            type="text"
            name="topicsCovered"
            value={course.topicsCovered}
            onChange={handleChange}
            label="Topics Covered (comma-separated)"
            required
          />

          {/* Fields Beside VideoUploader */}
          <TextInput
            type="number"
            name="studentCount"
            value={course.studentCount}
            onChange={handleChange}
            label="Number of Students"
          />
          <div className="flex items-center justify-between space-x-4">
            <TextInput
              label="Original Price"
              type="number"
              name="originalPrice"
              value={course.originalPrice}
              onChange={handleChange}
            />
            <TextInput
              label="Discounted Price"
              type="number"
              name="discountedPrice"
              value={course.discountedPrice}
              onChange={handleChange}
            />
          </div>

          <Select
            menuTitle="Board"
            submenuItems={boards}
            value={course.board}
            onSelect={(selectedBoard) => {
              setCourse({
                ...course,
                board: selectedBoard,
                class: "",
              });
            }}
          />

<Select
  menuTitle="Class"
  submenuItems={getClassOptions(course.board)}
  value={course.class}
  onSelect={(selectedClass) => {
    setCourse({
      ...course,
      classFor: selectedClass,
      stream: selectedClass >= 11 ? "" : undefined, // Show stream dropdown without value for 11th & 12th
      subject: "",
    });
  }}
  disabled={!course.board}
/>
{parseInt(course.classFor) >= 11 && (
  <Select
    menuTitle="Stream"
    value={course.stream}
    submenuItems={streams}
    onSelect={(selectedStream) => {
      setCourse({ ...course, stream: selectedStream || "",subject: selectedStream ? course.subject : undefined,}) // Clear subject if stream is undefined or empty });
    }}
    disabled={!course.board}
  />
)}

<Select
  menuTitle="Subject"
  submenuItems={getSubjects(course.classFor, course.stream)}
  onSelect={(selectedSubject) => {
    setCourse({ ...course, subject: selectedSubject });
  }}
  disabled={!course.classFor || (course.classFor > 10 && !course.stream)} // Disable if classFor > 10 but no stream selected
  value={course.subject}
/>


          <Select
            menuTitle="Category"
            value={course.category}
            submenuItems={category}
            onSelect={(selectedCategory) => {
              setCourse({ ...course, category: selectedCategory });
            }}
          />

          {/* Video Uploader & Fields Beside It */}
          <div className="">
  {course.modules.map((module, index) => (
    <div key={index} className="flex gap-6 items-center justify-between">
      {/* Video Upload Section inside each module */}
      <div className="flex flex-col items-center justify-center px-4 py-2 border-2 border-primary rounded-md">
        <label className="mb-10">Module {index + 1} Video</label>
        {module.videoLink ? (
          <div className="flex flex-col items-center">
            <video
              src={module.videoLink}
              controls
              className="w-60 h-40 rounded-md"
            />
            <Button
              text="Remove Video"
              variant="secondary"
              size="xs"
              onClick={() => handleRemoveVideo(index)}
            />
          </div>
        ) : (
          <VideoUploader
            label="Upload Video"
            id={`videoUpload-${index}`}
            required
            onChange={(file) => handleVideoChange(index, file)}
          />
        )}
      </div>

      {/* Module Inputs */}
      <div className="flex-1">
        <TextInput
          type="text"
          name="name"
          value={module.name}
          onChange={(e) => handleModuleChange(index, e)}
          label={`Module ${index + 1} Name`}
          
          required
        />
        <TextInput
          type="number"
          name="estimatedTime"
          value={module.estimatedTime}
          onChange={(e) => handleModuleChange(index, e)}
          label={`Module ${index + 1} Estimated Time`}
          required
        />
      </div>
      
    </div>
    
  ))}

  {/* Add/Remove Buttons */}
  <div className="flex gap-10 justify-center items-center mt-[-50px] mb-20">
    <Button type="button" onClick={removeModule} text="Remove Module" size="sm" variant="accent" />
    <Button type="button" onClick={addModule} text="Add Module" size="sm" variant="primary" />
  </div>
</div>

          <div className="flex justify-between mt-1 gap-6">
                     <Button
                       text="Update Course"
                       size="lg"
                       variant="primary"
                       type="submit"
                       className="w-full"
                       onClick={console.log("updated succesfully")}
                     />
                     <Button
                       text="Clear All"
                       size="lg"
                       variant="accent"
                       type="reset"
                       className="w-full"
                     />
                   </div>
        </form>
      </div>
      <Modal isOpen={isModalOpen}  progress={progress}>
            Please Wait,Course Is Updating....
                  </Modal>
    </div>
  );
};

export default EditCoursesPage;
