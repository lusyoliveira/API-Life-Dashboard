import express from "express";
import TiposController from "../controllers/tiposController.js";

const rotas = express.Router();

rotas.get("/tipos", TiposController.listarTipos);
rotas.get("/tipos/:id", TiposController.listarTiposPorID);
rotas.post("/tipos/", TiposController.cadastrarTipo);
rotas.put("/tipos/:id", TiposController.atualizarTipo);
rotas.delete("/tipos/:id", TiposController.excluirTipo);

export default rotas;