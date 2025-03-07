import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "../../components/use-toast"; // Using your custom toast component
import { AiOutlineClose } from "react-icons/ai"; // Using React Icons
import ImageUploader from "../../ui/imageUploader";
import TextAreaInput from "../../ui/textarea";
import useCarousel from "../../logic/features/createCarousel";
import { Button } from "../../ui/button";

const AddCarouselPage = () => {
  const { carouselItems, addCarouselItem, deleteCarouselItem } = useCarousel(); // Use the hook
  const [formData, setFormData] = useState({ image: null, description: "" });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addCarouselItem(formData);
    if (success) {
      setFormData({ image: null, description: "" }); // Reset form if success
    }
  };

  return (
    <div className="ml-16 mr-10">
      <div className="">
        <h2 className="md-10 font-header text-3xl font-semibold md:tracking-wide text-center">
          Add Carousel Image
        </h2>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="flex gap-8 w-full items-center justify-between mt-10">
            <div className="flex flex-col gap-10 items-center justify-center p-8 border-[1px] border-primary rounded-md">
              <p className="font-bold">Add Carousel Image</p>
              <ImageUploader
                label="Upload Image"
                id="imageUpload"
                required
                onChange={(file) => setFormData({ ...formData, image: file })}
              />
            </div>
            <div className="flex-1">
              <TextAreaInput
                label="Description"
                name="description"
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              {loading && <p>Uploading... {progress}%</p>}
              <Button
                text="Add to Carousel"
                size="lg"
                variant="primary"
                type="submit"
                className="w-fit"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="mt-16">
        <h2 className="mb-10 font-header text-3xl font-semibold md:tracking-wide text-center">
          Preview Images
        </h2>

        {carouselItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {carouselItems.map((item) => (
              <div key={item._id} className="relative group">
                <img
                  src={item.image}
                  alt={item.description}
                  className="w-full h-56 object-cover rounded-md shadow"
                />
                <button
                  onClick={() => deleteCarouselItem(item._id)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition"
                >
                  <AiOutlineClose size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">
            No carousel images available
          </p>
        )}
      </div>
    </div>
  );
};

export default AddCarouselPage;
