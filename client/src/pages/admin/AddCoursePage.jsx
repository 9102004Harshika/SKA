import React from "react";
import TextInput from "../../ui/textInput";
import TextAreaInput from "../../ui/textarea";
import FileUploader from "../../ui/fileUploader";

const AddCoursePage = () => {
  return (
    <div className="mx-10">
      <h2 className="mb-10 font-header text-3xl font-semibold text-center">
        Create New Course
      </h2>
      <div className="space-y-6 mx-10"> {/* Applied mx-10 to inputs */}
        <TextInput label="Name" type="text" />
        <TextInput label="Tutor" type="text" />
        <TextInput label="Videos" type="number" />
        <TextAreaInput label="Description" type="text" />
        <TextAreaInput label="Course Description" name="courseDescription" required />
        <TextAreaInput label="About Course" name="aboutCourse" required />
        <FileUploader label="Videos" />
      </div>
    </div>
  );
};

export default AddCoursePage;
