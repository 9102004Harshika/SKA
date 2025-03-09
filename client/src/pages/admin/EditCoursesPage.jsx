import React from 'react'
import TextInput from '../../ui/textInput' 
import ImageUploader from '../../ui/imageUploader'
import TextAreaInput from '../../ui/textarea'
import useUpdateCourse from '../../logic/course/updateCourse'
import { Button } from "../../ui/button";
const EditCoursesPage = () => {
    const {course,setCourse,deleteFile}=useUpdateCourse()
  return (
    <div  className="mx-10 font-body">
      <h2 className="mb-10 font-header text-3xl md:tracking-wide font-semibold text-center">
        Edit This Course
      </h2>
      <div className="space-y-6 mx-10">
      <form 
    //   onSubmit={handleSubmit}
       className="flex flex-col gap-6">
      <div className="flex gap-4 items-center justify-between">
            <div className="flex-1">
              <TextInput
                type="text"
                name="courseTitle"
                value={course.courseTitle}
                // onChange={handleChange}
                label={"Course Title"}
                required
              />
              <TextAreaInput
                name="courseDescription"
                value={course.courseDescription}
                // onChange={handleChange}
                label="Course Description"
                required
              />
            </div>
            <div className="flex flex-col items-center justify-center px-4 py-2 border-2 border-primary rounded-md">
              <label>Cover Image</label>
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
                      setCourse({ ...course, courseImage: "" })
                      deleteFile(course.courseImage)
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
            // onChange={handleChange}
            label="About Course"
            required
          />
          <TextAreaInput
            name="moduledescription"
            value={course.moduledescription}
            // onChange={handleChange}
            label="Module Description"
            required
          />
          <TextInput
            type="text"
            name="topicsCovered"
            // onChange={(e) => handleArrayChange(e, "topicsCovered")}
            label={"Topics Covered (comma-separated)"}
            required
          />
       </form>
      </div>
    </div>
  )
}

export default EditCoursesPage
