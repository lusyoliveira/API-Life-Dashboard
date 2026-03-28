import express from "express";
import ContasController from "../controllers/contasController.js";

const rotas = express.Router();

rotas.get("/contas", ContasController.listarTodosRegistros);
rotas.get("/contas/:id", ContasController.listarRegistrosPorID);
rotas.post("/contas", ContasController.cadastrarRegistro);
rotas.put("/contas/:id", ContasController.atualizarRegistro);
rotas.delete("/contas/:id", ContasController.excluirRegistro);

export default rotas;