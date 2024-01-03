import express from "express";
import { signin, signup, google} from "../controllers/auth.controller.js";
import { inputCheck } from "../utils/inputCheck.js";

const router = express.Router();
router.post("/signup", inputCheck, signup);
router.post("/signin", signin);
router.post("/google", google);

export default router;
