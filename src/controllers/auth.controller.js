import { db } from "../database/database.connection.js"
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

const signUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
    confirmPassword: joi.string().min(3).required()
})
//CADASTRO
export async function signUp(req, res) {
    const {name, email, password, confirmPassword} = req.body;    
    const validation = signUpSchema.validate(req.body);

    if(password !== confirmPassword) return res.status(422).send("As senhas não conferem");
    if(validation.error) {
        return res.status(422).send("Preencha os campos corretamente");
    }
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const user = {name: name, email: email, password: encryptedPassword}

    try {
        const userExisting = await db.collection("users").findOne({name: name, email: email})
        if(userExisting) return res.status(409).send("usuário já existe");

        await db.collection("users").insertOne(user);
        return res.sendStatus(201);

    }catch (err) {
        res.send(err.message)
    }
};
//LOGIN
//USAR LOCAL STORAGE
export async function signIn(req, res) {
    const {email, password} = req.body;
    try {
        const userExisting = await db.collection("users").findOne({email: email});
        if(!userExisting) return res.sendStatus(404);
        if(userExisting && bcrypt.compareSync(password, userExisting.password)) {
            const token = uuid();
            await db.collection("sessions").insertOne({userId: userExisting._id, token: token})
            return res.status(200).send(token);
        }

    }catch (err) {
        res.send(err.message)
    }    
};





