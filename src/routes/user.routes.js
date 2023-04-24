import { Router } from "express";
import { transactions, InOutTransaction } from "../controllers/user.controller.js";


const router = Router();
router.get("/home", transactions);
router.post("/nova-transacao", InOutTransaction);


export default router;