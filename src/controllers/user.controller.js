import db from "../database/database.connection.js";


export async function InOutTransaction(req, res) {
    const {tipo} = res.params;
    const {value, description} =req.body;
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "");   
    const transactionData = {
        value: tipo === "entrada" ? parseInt(value) : -parseInt(value),
        description: description,
        date: dayjs().format("DD"/"MM"),
        token: token
    }

    if(!token)return res.sendStatus(401);   
    try {
        await db.collection("transactions").insertOne(transactionData)
        res.status(200).send(transactionData)

    }catch (err) {
        res.send(err.message)
    }
}


export async function transactions(req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "");

    if(!token)return res.sendStatus(401);
    try {
        const session = await db.collection("sessions").findOne({ token: token });
        if(!session) return res.sendStatus(401);
        const user = await db.collection("transaction").findOne({token: token});
        if(user){
            return res.status(200).send(user);
        } else {
            return res.sendStatus(401);
        }

    }catch (err) {
        res.send(err.message)
    }
        
}