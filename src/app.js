import express from "express";
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
rotas(app)


app.delete("/tarefas/:id", (req, res) => {
    const inddex = buscarTaresfa(req.params.id);
    tarefas.splice(inddex, 1);

    res.status(200).send("Removido com sucesso");
});

export default app;