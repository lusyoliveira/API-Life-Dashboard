import express from "express";
import AreasController from "../controllers/areasController.js";

const rotas = express.Router();

rotas.get("/areas", AreasController.listarTodosRegistros);
rotas.get("/areas/:id", AreasController.listarRegistrosPorID);
rotas.post("/areas", AreasController.cadastrarRegistro);
rotas.put("/areas/:id", AreasController.atualizarRegistro);
rotas.delete("/areas/:id", AreasController.excluirRegistro);

export default rotas;