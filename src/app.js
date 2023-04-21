import express from "express";
import cors from "cors";
import {signIn , signUp } from "./controllers/auth.controller.js"
// import { db } from "./database/database.connection.js"
import mongoClient from "./database/database.connection.js"


const app = express();


app.use(express.json());
app.use(cors());
dotenv.config();

//fazer a conexão com o Mongo aqui


//escrever os endpoint aqui
app.post("/singUp", signUp);
app.post("/singIn", signIn);



const PORT = 5000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));