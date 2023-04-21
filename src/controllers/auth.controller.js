import joi from "joi";
import db from "../app.js";
import bcrypt from "bcrypt";

const signUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.min(6),
    confirmPassword: joi.min(6)
})

export async function signUp(req, res) {
    const {name, email, password, confirmPassword} = req.body;    
    const validation = signUpSchema.validate(req.body);

    if(password !== confirmPassword) return res.status(422).send("As senhas não conferem");
    if(validation.error) {
        return res.status(422).send("Todos os campos são obrigatórios");
    }
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const user = {name: name, email: email, password: encryptedPassword}

    try {
        const userexisting = await db.collection("users").findOne({name: name, email: email})
        if(userexisting) return res.status(409).send("usuário já existe");

        await db.collection("users").insertOne(user);
        return res.sendStatus(201);

    }catch (err) {
        res.send(err.message)
    }
};

// export async function signIn(req, res) {
    
// };


