import express from "express";
import CursoAreasController from "../controllers/cursosAreasController.js";

const rotas = express.Router();

rotas.get("/areas", CursoAreasController.listarAreas);
rotas.get("/areas/:id", CursoAreasController.listarAreasPorID);
rotas.post("/areas", CursoAreasController.cadastrarAreas);
rotas.put("/areas/:id", CursoAreasController.atualizarAreas);
rotas.delete("/areas/:id", CursoAreasController.excluirAreas);

export default rotas;