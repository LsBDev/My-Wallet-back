import { Router } from "express";
import { createTransaction, getTransactions } from "../controllers/transaction.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import validateSchema from "../middlewares/validateSchema.js";
import { transactionSchema } from "../schemas/transaction.schemas.js";

const transactionRouter = Router()
transactionRouter.use(authValidation)

transactionRouter.post("/transactions", validateSchema(transactionSchema), createTransaction)
transactionRouter.get("/transactions", getTransactions)

export default transactionRouter