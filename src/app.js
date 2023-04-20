import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";


const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
dotenv.config();

//fazer a conexão com o Mongo aqui
const mongoClient = new MongoClient(process.env.DATABASE_URL);
    try {
        await mongoClient.connect();
        console.log('MongoDB Connected!');
    } catch (err) {
        console.log(err.message);
    }
    const db = mongoClient.db();

//escrever os endpoint aqui


app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));