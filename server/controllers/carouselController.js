import Carousel from "../models/Carousel.js";

// Get all carousel items
export const getAllCarouselItems = async (req, res) => {
  try {
    const carouselItems = await Carousel.find({});
    res.status(200).json(carouselItems);
  } catch (error) {
    console.error("Error fetching carousel items:", error);
    res
      .status(500)
      .json({ message: "Error fetching carousel items", error: error.message });
  }
};

// Add a new carousel item
export const addCarouselItem = async (req, res) => {
  try {
    const { image, description } = req.body;

    if (!image || !description) {
      return res
        .status(400)
        .json({ message: "Image and description are required" });
    }

    const newCarouselItem = new Carousel({ image, description });
    await newCarouselItem.save();

    res.status(201).json({
      message: "Carousel item added successfully",
      item: newCarouselItem,
    });
  } catch (error) {
    console.error("Error adding carousel item:", error);
    res
      .status(500)
      .json({ message: "Error adding carousel item", error: error.message });
  }
};

// Delete a carousel item
export const deleteCarouselItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Carousel.findByIdAndDelete(id);
    res.status(200).json({ message: "Carousel item deleted successfully" });
  } catch (error) {
    console.error("Error deleting carousel item:", error);
    res
      .status(500)
      .json({ message: "Error deleting carousel item", error: error.message });
  }
};
