import express from "express";
import ConfiguracoesController from "../controllers/configuracoesController.js";

const rotas = express.Router();

rotas.get("/configuracoes", ConfiguracoesController.listarConfiguracoes);
rotas.get("/configuracoes/:id", ConfiguracoesController.listarConfiguracoesPorID);
rotas.post("/configuracoes", ConfiguracoesController.cadastrarConfiguracoes);
rotas.put("/configuracoes/:id", ConfiguracoesController.atualizarConfiguracoes);
rotas.delete("/configuracoes/:id", ConfiguracoesController.excluirConfiguracoes);

export default rotas;