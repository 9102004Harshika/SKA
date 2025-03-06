import express from "express";
import {
  addCarouselItem,
  deleteCarouselItem,
  getAllCarouselItems,
} from "../controllers/carouselController.js";

const router = express.Router();

router.get("/", getAllCarouselItems); // Get all carousel items
router.post("/", addCarouselItem); // Add a new carousel item
router.delete("/:id", deleteCarouselItem); // Delete a carousel item by ID

export default router;
