import express from "express";
import cors from "cors";
import {signIn , signUp } from "./controllers/auth.controller.js";
import { InOutTransaction, transactions } from "./controllers/user.controller.js";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

//fazer a conexão com o Mongo

//escrever os endpoint aqui
app.post("/singUp", signUp);
app.post("/", signIn);
app.get("/home", transactions);
app.post("/nova-transacao", InOutTransaction);



const PORT = 5000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));