import express from "express";
import TransacoesController from "../controllers/transacoesController.js";

const rotas = express.Router();

rotas.get("/transacoes", TransacoesController.listarTodosRegistros);
rotas.get("/transacoes/:id", TransacoesController.listarRegistrosPorID);
rotas.post("/transacoes", TransacoesController.cadastrarRegistro);
rotas.put("/transacoes/:id", TransacoesController.atualizarRegistro);
rotas.delete("/transacoes/:id", TransacoesController.excluirRegistro);

export default rotas;