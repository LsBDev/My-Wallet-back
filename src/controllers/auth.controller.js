import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid'

//CADASTRO
export async function signUp(req, res) {
    const {name, email, password} = req.body   
    
    try {
        const userExisting = await db.collection("users").findOne({name: name, email: email})
        if(userExisting) return res.status(409).send("E-mail já cadastrado!")
        
        const encryptedPassword = bcrypt.hashSync(password, 10)        
        const user = {name: name, email: email, password: encryptedPassword}
        await db.collection("users").insertOne(user)
        return res.sendStatus(201)

    } catch(err) {
        res.send(err.message)
    }
}

//LOGIN
export async function signIn(req, res) {
    const {email, password} = req.body

    try {
        const userExisting = await db.collection("users").findOne({email: email})
        if(!userExisting || !bcrypt.compareSync(password, userExisting.password)) return res.sendStatus(404)

        const token = uuid()
        await db.collection("sessions").insertOne({userId: userExisting._id, token: token})
        return res.status(200).send({name: userExisting.name, userId: userExisting._id, token: token})   

    } catch(err) {
        res.send(err.message)
    }    
}

//LOGOUT
export async function signOut(req, res) {  
    const token = res.locals.token
    try {
        await db.collection("sessions").deleteOne({token})
        res.sendStatus(200)

    } catch(err) {
        res.status(500).send(err.message)
    }
}





