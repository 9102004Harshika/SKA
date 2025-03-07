import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "../../components/use-toast";

const useCarousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/carousel");
        setCarouselItems(data);
      } catch (error) {
        console.error("Error fetching carousel items:", error);
      }
    };

    fetchCarouselItems();
  }, []);

  const convertBlobUrlToFile = async (blobUrl, filename) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  const uploadToCloudinary = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "carousel_image");

    try {
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
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      toast({
        title: "Cloudinary Upload Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
      return null;
    }
  };

  const addCarouselItem = async (formData) => {
    if (!formData.image || !formData.description) {
      return toast({
        title: "Missing Fields",
        description: "Please provide both an image and a description.",
        variant: "destructive",
      });
    }

    setLoading(true);
    setProgress(0);

    try {
      const imageFile = await convertBlobUrlToFile(
        formData.image,
        "carousel_image.jpg"
      );
      const imageUrl = await uploadToCloudinary(imageFile);

      if (!imageUrl) {
        setLoading(false);
        return false;
      }

      const { data } = await axios.post("http://localhost:5000/api/carousel", {
        image: imageUrl,
        description: formData.description,
      });

      setCarouselItems([...carouselItems, data.item]);

      toast({
        title: "Success",
        description: "Carousel item added successfully!",
        variant: "success",
      });

      return true;
    } catch (error) {
      console.error("Error adding carousel item:", error);
      toast({
        title: "Error adding carousel item",
        description: `${error}`,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCarouselItem = async (id,image) => {
    if (!window.confirm("Are you sure you want to delete this carousel item?"))
      return;

    try {
      await axios.post("http://localhost:5000/api/files/deleteFile",{
         Url: image,
      })
      console.log("Deleted Pdf from cloudinary")
      await axios.delete(`http://localhost:5000/api/carousel/${id}`);
      console.log("Deleted from MongoDB!");

      // Update state
      setCarouselItems(
        carouselItems.filter((carousel) => carousel._id !== id)
      );

      toast({
        title: "Deleted",
        description: "Carousel item removed successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting carousel item:", error);
      toast({
        title: "Error deleting carousel item",
        description: "Failed to delete carousel item.",
        variant: "destructive",
      });
    }
  };

  return {
    carouselItems,
    addCarouselItem,
    deleteCarouselItem,
    loading,
    progress,
  };
};

export default useCarousel;
