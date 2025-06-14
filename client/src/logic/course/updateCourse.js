import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "../../components/use-toast";
const useUpdateCourse=()=>{
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [course, setCourse] = useState({
          courseTitle: "",
            courseDescription: "",
            courseImage: "",
            originalPrice: "",
            discountedPrice: "",
            aboutCourse: "",
            moduledescription: "",
            demoVideo: "",
            studentCount: "",
            lastUpdated: "",
            classFor: "",
            board: "",
            subject: "",
            stream: "",
            category: "",
            keyFeatures: [],
            topicsCovered: [],
            modules: [{ name: "", estimatedTime: "", videoLink: "" }],
            instructor: "",
            notes: [],
            quizzes: [],
      });
    
      useEffect(() => {
        const fetchNoteDetails = async () => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_BASE_URL}api/courses/${id}`
            );
            setCourse(response.data);
          } catch (error) {
            console.error("Error fetching note details:", error);
          }
        };
    
        fetchNoteDetails();
      }, [id]);
     const deleteFile=async(Url)=>{
        try{
         await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/files/deleteVideoUrl`, {
            url: Url,
            course:course._id
          });
        }
        catch{
            console.log("Error occured during deletion of file")
        }
      
      }
      const convertBlobUrlToFile = async (blobUrl, filename) => {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
    };

    const uploadToCloudinary = async (file, preset) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset);

        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dsnsi0ioz/upload",
            formData,
            {
                onUploadProgress: (progressEvent) => {
                    const fileProgress = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );
                    setProgress(fileProgress);
                },
            }
        );
        return response.data.secure_url;
    };

    const handleSubmit = async (e,isImageRemoved,isVideoRemoved, openModal, closeModal,) => {
      e.preventDefault();
      openModal();
  
      try {
          let imageUrl = course.courseImage; // Keep existing image if not removed
          let updatedModules = [...course.modules]; // Keep existing modules
  
          // Step 1: Upload course image ONLY if it was removed
          if (isImageRemoved) {
              const imageFile = await convertBlobUrlToFile(course.courseImage, "course_image.jpg");
              imageUrl = await uploadToCloudinary(imageFile, "Course_Image");
  
              if (!imageUrl) {
                  setLoading(false);
                  return;
              }
          }
  
          // Step 2: Upload videos ONLY if they were removed
          if (isVideoRemoved) {
              updatedModules = [];
              for (let i = 0; i < course.modules.length; i++) {
                  let module = course.modules[i];
  
                  if (module.videoLink) {
                      const videoFile = await convertBlobUrlToFile(module.videoLink, `course_video_${i}.mp4`);
                      const videoUrl = await uploadToCloudinary(videoFile, "Course_Video");
  
                      updatedModules.push({ ...module, videoLink: videoUrl });
                  } else {
                      updatedModules.push(module);
                  }
              }
          }
  
          // Step 3: Prepare final data
          const formattedData = {
              ...course,
              courseImage: imageUrl,
              modules: updatedModules,
          };
  
          // Step 4: Send data to backend
          await axios.put(`${process.env.REACT_APP_API_BASE_URL}api/courses/update/${id}`, formattedData);
  
          toast({
              title: "Course Edited Successfully",
              description: `You have successfully edited the course: ${formattedData.courseTitle}`,
              variant: "success",
          });
  
      } catch (error) {
          console.error("Error updating course:", error);
          toast({
              title: "Error",
              description: "Failed to edit course. Please try again.",
              variant: "destructive",
          });
      } finally {
          closeModal();
          setLoading(false);
      }
  };
  
    const handleChange = (e) => {
      setCourse({ ...course, [e.target.name]: e.target.value });
    };
      return { course, setCourse,deleteFile,handleSubmit,handleChange,loading, progress };
}
export default useUpdateCourse