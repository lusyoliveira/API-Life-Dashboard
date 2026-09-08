import express from "express";
import TemporadaController from "../controllers/temporadaController.js";

const rotas = express.Router();

rotas.get("/temporada", TemporadaController.listarTodosRegistros);
rotas.get("/temporada/:id", TemporadaController.listarRegistrosPorID);
rotas.post("/temporada", TemporadaController.cadastrarRegistro);
rotas.put("/temporada/:id", TemporadaController.atualizarRegistro);
rotas.delete("/temporada/:id", TemporadaController.excluirRegistro);

export default rotas;