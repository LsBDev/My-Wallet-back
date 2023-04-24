import express from "express";
import cors from "cors";
import routes from "./routes/index.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

//fazer a conexão com o Mongo

//escrever os endpoint aqui
// app.post("/singUp", signUp);
// app.post("/", signIn);
// app.get("/home", transactions);
// app.post("/nova-transacao", InOutTransaction);

const PORT = 5000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));