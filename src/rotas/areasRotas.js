import express from "express";
import AreasController from "../controllers/areasController.js";

const rotas = express.Router();

rotas.get("/areas", AreasController.listarAreas);
rotas.get("/areas/:id", AreasController.listarAreasPorID);
rotas.post("/areas", AreasController.cadastrarAreas);
rotas.put("/areas/:id", AreasController.atualizarAreas);
rotas.delete("/areas/:id", AreasController.excluirAreas);

export default rotas;