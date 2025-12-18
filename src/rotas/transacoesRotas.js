import express from "express";
import TransacoesController from "../controllers/transacoesController.js";

const rotas = express.Router();

rotas.get("/transacoes", TransacoesController.listarTransacoes);
rotas.get("/transacoes/:id", TransacoesController.listarTransacoesPorID);
rotas.post("/transacoes", TransacoesController.cadastrarTransacao);
rotas.put("/transacoes/:id", TransacoesController.atualizarTransacao);
rotas.delete("/transacoes/:id", TransacoesController.excluirTransacao);

export default rotas;