import joi from "joi"

export const transactionSchema = joi.object({
  value: joi.number().positive().required(),
  description: joi.string().required().max(15),
  type:  joi.string().required().valid("income", "expense")
})