import express from "express";
import cors from "cors";
import conectar from "./config/dbConexao.js";
import rotas from "./rotas/index.js"
import ManipularErros from "./middlewares/manipuladorErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

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

app.use(manipulador404);
app.use(ManipularErros);

export default app;