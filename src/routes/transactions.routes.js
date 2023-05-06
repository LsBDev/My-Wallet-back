import { Router } from "express";
import { createTransaction, getTransactions } from "../controllers/transaction.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const transactionRouter = Router()
transactionRouter.use(authValidation)

transactionRouter.post("transactions", validateSchema(transactionSchema), createTransaction)
transactionRouter.get("transactions", getTransactions)

export default transactionRouter