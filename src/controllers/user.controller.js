import { db }  from "../database/database.connection.js";

export async function InOutTransaction(req, res) {
    const {tipo} = res.params;
    const {value, description} =req.body;
    const {authorization} = req.headers;
    const valor = value.replace(",", ".");
    const token = authorization?.replace("Bearer ", "");
    const transactionData = {
        value: parseFloat(valor).toFixed(2),
        description: description,
        date: dayjs().format("DD/MM/YYYY"),
        token: token
    }

    if(!token) return res.sendStatus(401);  
    try {
        await db.collection("transactions").insertOne(transactionData)
        res.status(200).send(transactionData)

    }catch (err) {
        res.send(err.message)
    }
}

export async function transactions(req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);
    try {
        const session = await db.collection("sessions").findOne({ token: token });
        if(!session) return res.sendStatus(401);
        const transaction = await db.collection("transactions").findOne({token: token});
        if(transaction) {
            return res.status(200).send(transaction.toArray());
        } else {
            return res.status(200).send([]);
        }             

    } catch(err) {
        res.send(err.message)
    }
        
}