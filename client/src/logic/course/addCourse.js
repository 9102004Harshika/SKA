import { useState } from "react";
import axios from "axios";
import { toast } from "../../components/use-toast";

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
            `${process.env.CLOUDINARY_URL}`,
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
    
    const handleSubmit = async (e, courseData, setCourseData, openModal, closeModal, resetForm,setUploadType,setIndex) => {
        e.preventDefault();
        openModal();
        setLoading(true);

        try {
            // Step 1: Upload the course image first
            const imageFile = await convertBlobUrlToFile(courseData.courseImage, "course_image.jpg");
            setUploadType(imageFile.type.replace("$", "").split("/")[0].trim())
            setIndex(null)
            const imageUrl = await uploadToCloudinary(imageFile, "Course_Image");

            if (!imageUrl) {
                setLoading(false);
                return;
            }

            // Step 2: Upload videos one by one (sequentially)
            const updatedModules = [];
            for (let i = 0; i < courseData.modules.length; i++) {
                let module = courseData.modules[i];
                if (module.videoLink) {
                    const videoFile = await convertBlobUrlToFile(module.videoLink, `course_video_${i}.mp4`);
                    setUploadType(videoFile.type.replace("$", "").split("/")[0].trim());
                    setIndex(i)
                    const videoUrl = await uploadToCloudinary(videoFile, "Course_Video");
                    updatedModules.push({ ...module, videoLink: videoUrl });
                } else {
                    updatedModules.push(module);
                }
            }

            // Step 3: Prepare the final data
            const formattedData = {
                ...courseData,
                class: courseData.classFor,
                discountPercentage: calculateDiscountPercentage(courseData.originalPrice, courseData.discountedPrice),
                keyFeatures: Array.isArray(courseData.keyFeatures) ? courseData.keyFeatures : Object.values(courseData.keyFeatures),
                courseImage: imageUrl,
                modules: updatedModules,
            };

            // Step 4: Send data to backend
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/courses/add`, formattedData);

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
