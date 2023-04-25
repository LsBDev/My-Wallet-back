import { Router } from "express";
import { signUp, signIn} from "../controllers/auth.controller.js";


const router = Router();
router.post("/signUp", signUp);
router.post("/signIn", signIn);
// router.get("/signIn", users);
// router.get("/sessions", session);
// router.get("/transactions", transacoes);

export default router;