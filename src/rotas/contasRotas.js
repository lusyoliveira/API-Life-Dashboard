import express from "express";
import ContasController from "../controllers/contasController.js";

const rotas = express.Router();

rotas.get("/contas", ContasController.listarCursos);
rotas.get("/contas/:id", ContasController.listarCursosPorID);
rotas.post("/contas", ContasController.cadastrarCurso);
rotas.put("/contas/:id", ContasController.atualizarCurso);
rotas.delete("/contas/:id", ContasController.excluirCurso);

export default rotas;