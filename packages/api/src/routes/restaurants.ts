import { Router } from "express";
import {
  createRestaurant,
  deleteRestaurant,
  editRestaurant,
  getAllRestaurants,
  getSingleRestaurant,
} from "../controllers/restaurants";
import multer from "multer";

const upload = multer({});

const router = Router();

router.get("/", getAllRestaurants);
router.get("/:id", getSingleRestaurant);
router.post("/", createRestaurant);
router.post("/:id", editRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
