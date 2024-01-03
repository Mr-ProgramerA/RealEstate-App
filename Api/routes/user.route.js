import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { inputCheck } from "../utils/inputCheck.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, inputCheck, updateUser);

export default router;
