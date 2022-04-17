import { Router } from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getSingleRestaurant,
} from "../controllers/restaurants";

const router = Router();

router.get("/", getAllRestaurants);
router.get("/:id", getSingleRestaurant);
router.post("/", createRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
