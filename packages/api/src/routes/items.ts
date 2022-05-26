import { Router } from "express";
import {
  getAllItems,
  getSingleItem,
  createItem,
  editItem,
  deleteItem,
} from "../controllers/items";

const router = Router();

router.get("/", getAllItems);
router.get("/:id", getSingleItem);
router.post("/", createItem);
router.post("/:id", editItem);
router.delete("/:id", deleteItem);

export default router;
