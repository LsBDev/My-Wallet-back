import { Router } from "express";
import auth from "./auth.routes.js";
import user from "./user.routes.js";


const router = Router();
router.use(auth);
router.use(user);

export default router;


