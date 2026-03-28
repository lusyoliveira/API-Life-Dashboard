import express from "express";
import StatusController from "../controllers/statusController.js";

const rotas = express.Router();

rotas.get("/status", StatusController.listarTodosRegistros);
rotas.get("/status/:id", StatusController.listarRegistrosPorID);
rotas.post("/status/", StatusController.cadastrarRegistro);
rotas.put("/status/:id", StatusController.atualizarRegistro);
rotas.delete("/status/:id", StatusController.excluirRegistro);

export default rotas;