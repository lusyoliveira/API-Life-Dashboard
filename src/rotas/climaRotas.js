import express from "express";
import ClimaController from "../controllers/climaController.js";

const rotas = express.Router();

rotas.get("/clima", ClimaController.listarTodosRegistros);
rotas.get("/clima/:id", ClimaController.listarRegistrosPorID);
rotas.post("/clima", ClimaController.cadastrarRegistro);
rotas.put("/clima/:id", ClimaController.atualizarRegistro);
rotas.delete("/clima/:id", ClimaController.excluirRegistro);

export default rotas;