import { Router } from "express";
import authRouter from "./auth.routes.js"
import transactionRouter from "./transactions.routes.js";


const routes = Router();
routes.use(authRouter);
routes.use(transactionRouter);

export default routes;


