import express from "express";
import cors from "cors";
import conectar from "./config/dbConexao.js";
import rotas from "./rotas/index.js"

const conexao = await conectar();

conexao.on("erro", (erro) => {
    console.log("Erro de conexão", erro);    
});

conexao.once("open", () => {
    console.log("Conexão realizada com sucesso!");    
});

const app = express();

app.use(cors({
    origin: "http://127.0.0.1:5500"
}));

app.use(express.json());

rotas(app);

export default app;