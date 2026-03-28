import express from "express";
import CatalogoController from "../controllers/catalogoController.js";

const rotas = express.Router();

rotas.get("/catalogo", CatalogoController.listarTodosRegistros);
rotas.get("/catalogo/:id", CatalogoController.listarRegistrosPorID);
rotas.post("/catalogo", CatalogoController.cadastrarRegistro);
rotas.put("/catalogo/:id", CatalogoController.atualizarRegistro);
rotas.delete("/catalogo/:id", CatalogoController.excluirRegistro);

export default rotas;