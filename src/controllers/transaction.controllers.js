import dayjs from "dayjs"
import {db} from "../database/database.connection.js"

export async function createTransaction(req, res) {
  const {value, description, type} = req.body
  const {userId} = res.locals.session

  try {
    const transaction = {value: Number(value), description, type, userId, date: dayjs().valueOf()}
    await db.collection("transactions").insertOne(transaction)
    res.sendStatus(201)

  } catch(err) {
    res.status(500).send(err.message)
  }
}

export async function getTransactions() {

  try {

  } catch(err) {
    res.status(500).send(err.message)
  }

  
}