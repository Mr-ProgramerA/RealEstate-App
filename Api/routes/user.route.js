import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUserLstings,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { inputCheck } from "../utils/inputCheck.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, inputCheck, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserLstings);
router.get("/:id", verifyToken, getUser);

export default router;
