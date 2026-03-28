import express from "express";
import TiposController from "../controllers/tiposController.js";

const rotas = express.Router();

rotas.get("/tipos", TiposController.listarTodosRegistros);
rotas.get("/tipos/:id", TiposController.listarRegistrosPorID);
rotas.post("/tipos/", TiposController.cadastrarRegistro);
rotas.put("/tipos/:id", TiposController.atualizarRegistro);
rotas.delete("/tipos/:id", TiposController.excluirRegistro);

export default rotas;