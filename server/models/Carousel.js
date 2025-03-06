import mongoose from "mongoose";

// Course Schema
const carouselSchema = new mongoose.Schema({
  image: { type: String, required: true },
  description: { type: String, required: true },
});

const Carousel = mongoose.model("Carousel", carouselSchema);
export default Carousel;
