import { Router } from "express";
import { createTransaction, deleteTransaction, getTransactions, updateTransaction } from "../controllers/transaction.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import validateSchema from "../middlewares/validateSchema.js";
import { transactionSchema } from "../schemas/transaction.schemas.js";

const transactionRouter = Router()
transactionRouter.use(authValidation)

transactionRouter.post("/transactions", validateSchema(transactionSchema), createTransaction)
transactionRouter.get("/transactions", getTransactions)
transactionRouter.delete("/transactions/:type", deleteTransaction)
transactionRouter.put("/transactions/:type", validateSchema(transactionSchema), updateTransaction)

export default transactionRouter