import express from "express";
import cors from "cors";
import routes from "./routes/index.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));