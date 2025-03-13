import React from "react";
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
const EditCoursesPage = () => {
  const { course, setCourse, deleteFile } = useUpdateCourse();

  return (
    <div className="mx-10 font-body">
      <h2 className="mb-10 font-header text-3xl md:tracking-wide font-semibold text-center">
        Edit This Course
      </h2>
      <div className="space-y-6 mx-10">
        <form className="flex flex-col gap-6">
          {/* Title & Description */}
          <div className="flex gap-4 items-center justify-between">
            <div className="flex-1">
              <TextInput
                type="text"
                name="courseTitle"
                value={course.courseTitle}
                label="Course Title"
                required
              />
              <TextAreaInput
                name="courseDescription"
                value={course.courseDescription}
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
            label="About Course"
            required
          />
          <TextAreaInput
            name="moduledescription"
            value={course.moduledescription}
            label="Module Description"
            required
          />
          <TextInput
            type="text"
            name="topicsCovered"
            value={course.topicsCovered}
            label="Topics Covered (comma-separated)"
            required
          />
          {/* Fields Beside VideoUploader */}

          <TextInput
            type="number"
            name="studentCount"
            value={course.studentCount}
            label="Number of Students"
          />
          <div className="flex items-center justify-between space-x-4">
            <TextInput
              label="Original Price"
              type="number"
              name="originalPrice"
              value={course.originalPrice}
            />
            <TextInput
              label="Discounted Price"
              type="number"
              name="discountedPrice"
              value={course.discountedPrice}
            />
          </div>
          <Select
            menuTitle="Board"
            submenuItems={boards}
            value={course.board}
            ///value aana chahiye idhhar
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
            value={course.classFor}
            submenuItems={getClassOptions(course.board)}
            onSelect={(selectedClass) => {
              setCourse({
                ...course,
                classFor: selectedClass,
                stream: undefined,
                subject: "",
              });
            }}
            disabled={!course.board}
          />

          {!(
            parseInt(course.classFor) > 0 && parseInt(course.classFor) <= 10
          ) && (
            <Select
              menuTitle="Stream"
              submenuItems={streams}
              value={course.stream}
              onSelect={(selectedStream) => {
                setCourse({
                  ...course,
                  stream: selectedStream || undefined,
                  subject: "",
                });
              }}
              disabled={!course.board}
            />
          )}
          <Select
            value={course.subject}
            menuTitle="Subject"
            submenuItems={getSubjects(course.classFor, course.stream)}
            onSelect={(selectedSubject) => {
              setCourse({ ...course, subject: selectedSubject });
            }}
            disabled={
              !course.classFor || (course.classFor > 10 && !course.stream)
            }
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
          <div className="flex gap-6 items-start">
            {/* Video Uploader with Border Similar to Image Uploader */}
            <div className="flex flex-col items-center justify-center px-4 py-2 border-2 border-primary rounded-md">
              <label>Demo Video</label>
              {course.demoVideo ? (
                <div className="flex flex-col items-center">
                  <video
                    src={course.demoVideo}
                    controls
                    className="w-60 h-40 rounded-md"
                  />
                  <Button
                    text="Remove Video"
                    variant="secondary"
                    size="xs"
                    onClick={() => {
                      setCourse({ ...course, demoVideo: "" });
                      deleteFile(course.demoVideo);
                    }}
                  />
                </div>
              ) : (
                <VideoUploader
                  label="Upload Video"
                  id="videoUpload"
                  required
                  onChange={(file) => setCourse({ ...course, demoVideo: file })}
                />
              )}
            </div>
          </div>

          {/* Pricing Fields */}

          <TextInput
            type="text"
            name="keyFeatures"
            value={course.keyFeatures}
            label="Key Features (comma-separated)"
            required
          />
          <TextInput
            type="text"
            name="notes"
            value={course.notes}
            label="Notes (comma-separated)"
            required
          />
          <TextInput
            type="text"
            name="quizzes"
            value={course.quizzes}
            label="Quizzes (comma-separated)"
            required
          />
          <TextInput
            type="text"
            name="instructor"
            value={course.instructor}
            label="Instructor"
            required
          />
          <div className="flex justify-between">
            <Button text="Reset" variant="accent" size="lg" />
            <Button text="Update Course" variant="primary" size="lg" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoursesPage;
