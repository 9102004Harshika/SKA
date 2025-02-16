import React from "react";
import TextInput from "../../ui/textInput";
import TextAreaInput from "../../ui/textarea";
import ImageUploader from "../../ui/imageUploader";
import FileUploader from "../../ui/fileUploader";
import { Button } from "../../ui/button";

const AddNotesPage = () => {
  return (
    <div className="mx-10 font-body">
      <h2 className="mb-10 font-header text-3xl font-semibold text-center">
        Create New Notes
      </h2>
      <div className="space-y-6 mx-10 ">
        <form action="" className="flex flex-col gap-6" onSubmit={(e)=>{console.log('form submitted')}}
          onReset={(e)=>{console.log('reset form')}}>
          <div className="flex gap-10">
            <div className="flex-1 flex flex-col justify-between">
              <TextInput label="Title of Notes" type="text" required />
              <TextInput label="Subject For" type="text" required />
              <TextInput label="Class For" type="number" required />
            </div>
            <div className="flex flex-col gap-10 items-center justify-center p-8 border-2 border-primary rounded-md">
              <label htmlFor="imageUpload ">Add Cover Image</label>
              <ImageUploader label="Upload Image" id="imageUpload" required />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 items-center justify-center p-8 border-2 border-primary rounded-md">
              <label htmlFor="imageUpload ">Add The PDF File</label>
              <FileUploader label="Upload PDF" id="imageUpload" required />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <TextAreaInput label="Description" name="Description" required />
              <TextInput label="Written By" type="text" required />
            </div>
          </div>
          <div className="flex justify-between mt-6 gap-6">
  <Button text="Create Notes" size="lg" variant="primary" type="submit"  className="w-full"/>
  <Button text="Clear All" size="lg" variant="accent" type="reset" className="w-full" />
</div>
        </form>
      </div>
    </div>
  );
};

export default AddNotesPage;
