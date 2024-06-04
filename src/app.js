/* eslint-disable no-unused-vars */
import express from "express";
import connectToMongoDB from "./config/dbConnect.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import manipuladorDeErros from "./middleware/manipuladorDeErros.js";

const con = await connectToMongoDB();

con.on("error", (err) => {
    console.log.bind("Erro de conexao:", err);
});

con.once("open", () => {
    console.log("Conexao com banco de dados bem sucessida!");
});

const app = express();
app.use(express.json());
routes(app);

app.use(manipuladorDeErros);

export default app;
