import React from "react";
import TextInput from "../../ui/textInput";
import TextAreaInput from "../../ui/textarea";
import FileUploader from "../../ui/fileUploader";

const AddCoursePage = () => {
  return (
    <div>
      <TextInput label="Name" type="text" />
      <TextAreaInput label="Description" type="text" />
      <TextInput label="Tutor" type="text" />
      <TextInput label="Videos" type="number" />
      <FileUploader label="Videos" />
    </div>
  );
};

export default AddCoursePage;
