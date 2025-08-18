import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import ImageUploader from "../../../ui/imageUploader";
import useCarousel from "../../../logic/features/createCarousel";
import { Button } from "../../../ui/button";
import { toast } from "../../../components/use-toast";

const CarouselSettings = () => {
  const {
    carouselItems,
    addCarouselItem,
    deleteCarouselItem,
    loading,
    progress,
  } = useCarousel();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ image: null, description: "" });
  const [imagePreview, setImagePreview] = useState(null);
  const textareaRef = useRef(null);

  const handleImageChange = (file) => {
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file (JPEG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, image: file }));
      };
      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to read the image file",
          variant: "destructive",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setFormData({ image: null, description: "" });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      toast({
        title: "Error",
        description: "Please select an image",
        variant: "destructive",
      });
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("image", formData.image);
      formDataToSend.append("description", formData.description);

      const success = await addCarouselItem(formDataToSend);
      if (success) {
        setFormData({ image: null, description: "" });
        setImagePreview(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description:
          error.message || "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id) => {
    await deleteCarouselItem(id);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-primary font-semibold">
          Carousel Settings
        </h2>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-md transition-colors border border-primary/20"
        >
          {isExpanded ? (
            <>
              <span>Collapse</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </>
          ) : (
            <>
              <span>Manage</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-md font-medium text-gray-900">
              Current Carousel Items
            </h4>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm"
            >
              <AiOutlinePlus /> Add New
            </button>
          </div>

          {carouselItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {carouselItems.map((item) => (
                <div
                  key={item._id}
                  className="relative group rounded-lg overflow-hidden border border-gray-200"
                >
                  <img
                    src={item.image}
                    alt={item.description}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteCarouselItem(item._id, item.image)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Delete image"
                  >
                    <AiOutlineClose size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500 mb-4">No carousel items added yet</p>
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm"
              >
                <AiOutlinePlus /> Add Your First Item
              </button>
            </div>
          )}
        </div>
      )}

      {/* Add New Item Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full my-8">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Add Carousel Item
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-error transition-colors"
                >
                  <AiOutlineClose size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg pt-10 pb-6 text-center hover:border-primary/50 transition-colors flex flex-col items-center">
                    <ImageUploader
                      label="Upload Image"
                      id="carouselImage"
                      required
                      onChange={handleImageChange}
                      className="mx-auto"
                    />
                    <p className="mt-2 text-sm text-primary">
                      *Click to select or drag and drop an image
                    </p>
                    {formData.image && (
                      <p className="mt-2 text-sm text-gray-700 truncate">
                        {formData.image.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <div className="relative">
                      <textarea
                        ref={textareaRef}
                        name="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        placeholder="Enter a description for this carousel item"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? "Uploading..." : "Add to Carousel"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselSettings;
