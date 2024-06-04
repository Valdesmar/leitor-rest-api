import express from "express";
import connectToMongoDB from "./config/dbConnect.js";
import routes from "./routes/index.js";

const con = await connectToMongoDB();

con.on("error", (err) => {
    console.log("Erro de conexao:", err);
});

con.once("open", () => {
    console.log("Conexao com banco de dados bem sucedida!");
});

const app = express();
routes(app);

export default app;
