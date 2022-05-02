import { Router } from "express";
import {
  getAllMenus,
  getSingleMenu,
  createMenu,
  editMenu,
  deleteMenu,
} from "../controllers/menus";

const router = Router();

router.get("/", getAllMenus);
router.get("/:id", getSingleMenu);
router.post("/", createMenu);
router.post("/:id", editMenu);
router.delete("/:id", deleteMenu);

export default router;
