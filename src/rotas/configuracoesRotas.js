import express from "express";
import ConfiguracoesController from "../controllers/configuracoesController.js";

const rotas = express.Router();

rotas.get("/configuracoes", ConfiguracoesController.listarCursos);
rotas.get("/configuracoes/:id", ConfiguracoesController.listarCursosPorID);
rotas.post("/configuracoes", ConfiguracoesController.cadastrarCurso);
rotas.put("/configuracoes/:id", ConfiguracoesController.atualizarCurso);
rotas.delete("/configuracoes/:id", ConfiguracoesController.excluirCurso);

export default rotas;