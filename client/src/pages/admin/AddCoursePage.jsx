import React from "react";
import TextInput from "../../ui/textInput";
import TextAreaInput from "../../ui/textarea";
import FileUploader from "../../ui/fileUploader";

const AddCoursePage = () => {
  return (
    <div className="my-2">
      <h2 className="mb-10 font-header text-3xl font-semibold text-center ">
        Create New Course
      </h2>
      <TextInput label="Name" type="text" />
      <TextInput label="Tutor" type="text" />
      <TextInput label="Videos" type="number" />
      <TextAreaInput label="Description" type="text" />
      <TextAreaInput
        label="Course Description"
        name="courseDescription"
        // value={courseData.courseDescription}
        // onChange={handleChange}
        className=""
        required
      />
      <TextAreaInput
        label="About Course"
        name="aboutCourse"
        // value={courseData.aboutCourse}
        // onChange={handleChange}
        className=""
        required
      />
      <FileUploader label="Videos" />
    </div>
  );
};

export default AddCoursePage;
