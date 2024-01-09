import express from "express";
import { signin, signup, google, signOut} from "../controllers/auth.controller.js";
import { inputCheck } from "../utils/inputCheck.js";

const router = express.Router();
router.post("/signup", inputCheck, signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signOut);

export default router;
