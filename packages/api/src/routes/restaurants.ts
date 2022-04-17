import { Router } from "express";
import { getAllRestaurants } from "../controllers/restaurants";

const router = Router();

router.get("/", getAllRestaurants);

export default router;
