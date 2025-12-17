import express from "express";
import ContasController from "../controllers/contasController.js";

const rotas = express.Router();

rotas.get("/contas", ContasController.listarContas);
rotas.get("/contas/:id", ContasController.listarContasPorID);
rotas.post("/contas", ContasController.cadastrarConta);
rotas.put("/contas/:id", ContasController.atualizarConta);
rotas.delete("/contas/:id", ContasController.excluirConta);

export default rotas;