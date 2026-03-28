import express from "express";
import ConfiguracoesController from "../controllers/configuracoesController.js";

const rotas = express.Router();

rotas.get("/configuracoes", ConfiguracoesController.listarTodosRegistros);
rotas.get("/configuracoes/:id", ConfiguracoesController.listarRegistrosPorID);
rotas.post("/configuracoes", ConfiguracoesController.cadastrarRegistro);
rotas.put("/configuracoes/:id", ConfiguracoesController.atualizarRegistro);
rotas.delete("/configuracoes/:id", ConfiguracoesController.excluirRegistro);

export default rotas;