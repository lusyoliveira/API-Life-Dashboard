import express from "express";
import AgendaTiposController from "../controllers/agendaTiposController.js";

const rotas = express.Router();

rotas.get("/tipos", AgendaTiposController.listarTipos);
rotas.get("/tipos/:id", AgendaTiposController.listarTiposPorID);
rotas.post("/tipos/", AgendaTiposController.cadastrarTipo);
rotas.put("/tipos/:id", AgendaTiposController.atualizarTipo);
rotas.delete("/tipos/:id", AgendaTiposController.excluirTipo);

export default rotas;