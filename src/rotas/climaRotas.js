import express from "express";
import ClimaController from "../controllers/climaController.js";

const rotas = express.Router();

rotas.get("/clima", ClimaController.listarClima);
rotas.get("/clima/:id", ClimaController.listarClimaPorID);
rotas.post("/clima", ClimaController.cadastrarClima);
rotas.put("/clima/:id", ClimaController.atualizarClima);
rotas.delete("/clima/:id", ClimaController.excluirClima);

export default rotas;