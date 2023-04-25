import { db }  from "../database/database.connection.js";
import dayjs from "dayjs";

export async function InOutTransaction(req, res) {
    const {tipo} = req.params;
    const {value, description} =req.body;
    const {authorization} = req.headers;
    const valor = value.replace(",", ".");
    const token = authorization?.replace("Bearer ", "");
    console.log(tipo)
    
    
    if(!token) return res.sendStatus(401);

    try {
        const session = await db.collection("sessions").findOne({ token: token});
        const transactionData = {
            value: tipo === entrada ? parseFloat(valor).toFixed(2): parseFloat(-valor).toFixed(2),
            description: description,
            date: dayjs().format("DD/MM"),
            userId: session.userId
        }
        await db.collection("transactions").insertOne(transactionData);
        const transaction = await db.collection("transaction").find().toArray();
        res.status(200).send(transaction)

    } catch(err) {
        res.send(err.message)
    }
}

export async function transactions(req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);
    try {
        const session = await db.collection("sessions").findOne({ token: token});
        if(!session) return res.sendStatus(401);
        const transactions = await db.collection("transactions").find({ userId: session.userId}).toArray();
        if(transactions) {
            return res.status(200).send(transactions);
        } else {
            return res.status(200).send([]);
        }             

    } catch(err) {
        res.send(err.message)
    }
        
}