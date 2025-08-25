import { useState } from "react";
import axios from "axios";
import { toast } from "../../components/use-toast";
const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/";
export const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
    if (originalPrice && discountedPrice) {
        const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
        return discount.toFixed(2);
    }
    return 0;
};

const useAddCourse = () => {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const uploadToCloudinary = async (file, preset) => {
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", preset);
  
        const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dsnsi0ioz/upload",
          form,
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
    
      const handleSubmit = async (
        e,
        courseData,
        setCourseData,
        openModal,
        closeModal,
        resetForm,
        setUploadType,
        setIndex
      ) => {
        console.log(courseData)
        e.preventDefault();
        openModal();
        setLoading(true);
      
        try {
          let courseImage = "";
          const updatedModules = [];
      
          // Step 1: Upload the course image if it's a File
          if (courseData.courseImage instanceof File) {
            setUploadType(courseData.courseImage.type.replace("$", "").split("/")[0].trim());
            setIndex(null);
            courseImage = await uploadToCloudinary(courseData.courseImage, "Course_Image");
      
            if (!courseImage) {
              setLoading(false);
              return;
            }
          }
      
          // Step 2: Upload videos one by one (sequentially)
          for (let i = 0; i < courseData.modules.length; i++) {
            let module = courseData.modules[i];
      
            if (module.videoLink instanceof File) {
              setUploadType(module.videoLink.type.replace("$", "").split("/")[0].trim());
              setIndex(i);
      
              const videoUrl = await uploadToCloudinary(module.videoLink, "Course_Video");
              updatedModules.push({ ...module, videoLink: videoUrl });
            } else {
              updatedModules.push(module);
            }
          }
      
          // Step 3: Prepare the final data
          const formattedData = {
            ...courseData,
            class: courseData.classFor,
            discountPercentage: calculateDiscountPercentage(
              courseData.originalPrice,
              courseData.discountedPrice
            ),
            keyFeatures: Array.isArray(courseData.keyFeatures)
              ? courseData.keyFeatures
              : Object.values(courseData.keyFeatures),
            courseImage,
            modules: updatedModules,
          };
      
          console.log("Data sent to backend:", formattedData);
           
          // Step 4: Send data to backend
          await axios.post(`${API_URL}api/courses/add`, formattedData);
      
          toast({
            title: "Course Created Successfully",
            description: `You have successfully created the course: ${formattedData.courseTitle}`,
            variant: "success",
          });
      
          resetForm();
          closeModal();
        } catch (error) {
          console.error("Error creating course:", error);
          toast({
            title: "Error",
            description: "Failed to create course. Please try again.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };
      
      

    return { handleSubmit, loading, progress };
};

export default useAddCourse;
