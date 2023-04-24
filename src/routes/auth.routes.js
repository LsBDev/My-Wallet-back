import { Router } from "express";
import { signUp, signIn, users } from "../controllers/auth.controller.js";


const router = Router();
router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/signIn", users);

export default router;