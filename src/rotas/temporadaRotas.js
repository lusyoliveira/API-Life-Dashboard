import express from "express";
import TemporadaController from "../controllers/temporadaController.js";

const rotas = express.Router();

rotas.get("/catalogo/:tituloId/temporadas", TemporadaController.listarTodosRegistros);
rotas.get("/catalogo/temporadas/:id", TemporadaController.listarRegistrosPorID);
rotas.post("/catalogo/:tituloId/temporadas", TemporadaController.cadastrarRegistro);
rotas.put("/catalogo/temporadas/:id", TemporadaController.atualizarRegistro);
rotas.delete("/catalogo/temporadas/:id", TemporadaController.excluirRegistro);

export default rotas;